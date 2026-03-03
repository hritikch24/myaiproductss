-- Add password column to users table for credentials login
ALTER TABLE users ADD COLUMN IF NOT EXISTS password TEXT;
