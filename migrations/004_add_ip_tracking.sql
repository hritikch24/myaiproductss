-- Track IP addresses on documents to prevent free-tier abuse via multiple accounts
ALTER TABLE documents ADD COLUMN IF NOT EXISTS ip_address TEXT;

CREATE INDEX IF NOT EXISTS idx_documents_ip_address ON documents(ip_address);
