-- Track IP addresses on documents to prevent free-tier abuse via multiple accounts
ALTER TABLE documents ADD COLUMN ip_address TEXT;

CREATE INDEX idx_documents_ip_address ON documents(ip_address);
