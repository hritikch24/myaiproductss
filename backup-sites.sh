#!/bin/bash
# ============================================================================
#  FULL BACKUP SCRIPT — Urban Shopfronts & Sigma Shopfronts
#  Backs up: Neon PostgreSQL databases (all tables as CSV + full SQL dump)
#            + Git repos (code snapshot)
#
#  Run daily via cron:
#    crontab -e
#    0 3 * * * /path/to/backup-sites.sh >> /path/to/backup.log 2>&1
#
#  Requirements: psql, pg_dump (brew install libpq && brew link --force libpq)
# ============================================================================

# ─── CONFIGURATION (edit these) ─────────────────────────────────────────────

# Neon database connection strings (paste your full postgres:// URLs)
URBAN_DB_URL="YOUR_URBAN_NEON_CONNECTION_STRING_HERE"
SIGMA_DB_URL="YOUR_SIGMA_NEON_CONNECTION_STRING_HERE"

# Local backup root — all backups go here
BACKUP_ROOT="$HOME/shopfront-backups"

# Git repo paths (local clones)
URBAN_REPO="$HOME/Projects/Urban-shopfronts-limited"
SIGMA_REPO="$HOME/Projects/sigmashopfronts"

# How many days of backups to keep (older ones auto-deleted)
RETENTION_DAYS=30

# Tables to export as CSV (same for both sites)
TABLES=("page_views" "leads" "call_clicks" "customers" "documents")

# ─── DO NOT EDIT BELOW THIS LINE ────────────────────────────────────────────

set -euo pipefail

DATE=$(date +"%Y-%m-%d")
TIMESTAMP=$(date +"%Y-%m-%d_%H-%M-%S")

log() { echo "[$(date '+%H:%M:%S')] $1"; }

backup_database() {
  local site_name="$1"
  local db_url="$2"
  local db_dir="$3/database"

  mkdir -p "$db_dir/csv"

  log "[$site_name] Starting database backup..."

  # Full SQL dump (schema + data) — complete restore capability
  log "[$site_name] pg_dump (full SQL)..."
  pg_dump "$db_url" \
    --no-owner --no-privileges --clean --if-exists \
    -f "$db_dir/${site_name}_full_${TIMESTAMP}.sql" 2>/dev/null || {
    log "[$site_name] WARNING: pg_dump failed — trying CSV-only export"
  }

  # Individual table CSV exports — human-readable, importable anywhere
  for table in "${TABLES[@]}"; do
    log "[$site_name] Exporting $table → CSV..."
    psql "$db_url" -c "\COPY (SELECT * FROM $table ORDER BY \"createdAt\" DESC) TO STDOUT WITH CSV HEADER" \
      > "$db_dir/csv/${table}.csv" 2>/dev/null || {
      log "[$site_name] WARNING: Failed to export $table"
    }
  done

  # Row counts for verification
  log "[$site_name] Row counts:"
  for table in "${TABLES[@]}"; do
    count=$(psql "$db_url" -t -c "SELECT COUNT(*) FROM $table" 2>/dev/null | tr -d ' ' || echo "?")
    echo "    $table: $count rows"
  done

  log "[$site_name] Database backup complete."
}

backup_code() {
  local site_name="$1"
  local repo_path="$2"
  local code_dir="$3/code"

  mkdir -p "$code_dir"

  if [ ! -d "$repo_path" ]; then
    log "[$site_name] WARNING: Repo not found at $repo_path — skipping code backup"
    return
  fi

  log "[$site_name] Backing up code..."

  # Copy key files (not node_modules / .next / .git)
  rsync -a --delete \
    --exclude 'node_modules' \
    --exclude '.next' \
    --exclude '.git' \
    --exclude '.vercel' \
    --exclude '.turbo' \
    "$repo_path/" "$code_dir/"

  # Save current git info
  (
    cd "$repo_path"
    echo "branch: $(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo 'unknown')"
    echo "commit: $(git rev-parse HEAD 2>/dev/null || echo 'unknown')"
    echo "date:   $(git log -1 --format=%ci 2>/dev/null || echo 'unknown')"
    echo "status:"
    git status --short 2>/dev/null || true
  ) > "$code_dir/_git_info.txt"

  log "[$site_name] Code backup complete."
}

backup_env_snapshot() {
  local site_name="$1"
  local repo_path="$2"
  local env_dir="$3"

  # Copy .env files if they exist (important for recovery)
  for f in .env .env.local .env.production .env.production.local; do
    if [ -f "$repo_path/$f" ]; then
      cp "$repo_path/$f" "$env_dir/${site_name}_${f}"
      log "[$site_name] Backed up $f"
    fi
  done
}

# ─── MAIN ────────────────────────────────────────────────────────────────────

log "=========================================="
log "Backup started: $TIMESTAMP"
log "=========================================="

# Create today's backup directories
URBAN_DIR="$BACKUP_ROOT/urban-shopfronts/$DATE"
SIGMA_DIR="$BACKUP_ROOT/sigma-shopfronts/$DATE"
mkdir -p "$URBAN_DIR" "$SIGMA_DIR"

# ── Urban Shopfronts ──
if [ "$URBAN_DB_URL" != "YOUR_URBAN_NEON_CONNECTION_STRING_HERE" ]; then
  backup_database "urban" "$URBAN_DB_URL" "$URBAN_DIR"
else
  log "[urban] SKIPPED database — connection string not set"
fi
backup_code "urban" "$URBAN_REPO" "$URBAN_DIR"
backup_env_snapshot "urban" "$URBAN_REPO" "$URBAN_DIR"

# ── Sigma Shopfronts ──
if [ "$SIGMA_DB_URL" != "YOUR_SIGMA_NEON_CONNECTION_STRING_HERE" ]; then
  backup_database "sigma" "$SIGMA_DB_URL" "$SIGMA_DIR"
else
  log "[sigma] SKIPPED database — connection string not set"
fi
backup_code "sigma" "$SIGMA_REPO" "$SIGMA_DIR"
backup_env_snapshot "sigma" "$SIGMA_REPO" "$SIGMA_DIR"

# ── Cleanup old backups ──
log "Cleaning backups older than $RETENTION_DAYS days..."
find "$BACKUP_ROOT/urban-shopfronts" -maxdepth 1 -type d -mtime +$RETENTION_DAYS -exec rm -rf {} + 2>/dev/null || true
find "$BACKUP_ROOT/sigma-shopfronts" -maxdepth 1 -type d -mtime +$RETENTION_DAYS -exec rm -rf {} + 2>/dev/null || true

# ── Summary ──
URBAN_SIZE=$(du -sh "$URBAN_DIR" 2>/dev/null | cut -f1 || echo "?")
SIGMA_SIZE=$(du -sh "$SIGMA_DIR" 2>/dev/null | cut -f1 || echo "?")
TOTAL_SIZE=$(du -sh "$BACKUP_ROOT" 2>/dev/null | cut -f1 || echo "?")

log ""
log "=========================================="
log "Backup complete!"
log "  Urban: $URBAN_DIR ($URBAN_SIZE)"
log "  Sigma: $SIGMA_DIR ($SIGMA_SIZE)"
log "  Total backup folder: $TOTAL_SIZE"
log "=========================================="
log ""
log "Folder structure:"
log "  $BACKUP_ROOT/"
log "  ├── urban-shopfronts/"
log "  │   └── $DATE/"
log "  │       ├── database/"
log "  │       │   ├── urban_full_*.sql    (full restore)"
log "  │       │   └── csv/"
log "  │       │       ├── leads.csv"
log "  │       │       ├── customers.csv"
log "  │       │       ├── documents.csv"
log "  │       │       ├── page_views.csv"
log "  │       │       └── call_clicks.csv"
log "  │       ├── code/                   (full repo minus node_modules)"
log "  │       └── urban_.env*             (env files if present)"
log "  └── sigma-shopfronts/"
log "      └── $DATE/ (same structure)"
