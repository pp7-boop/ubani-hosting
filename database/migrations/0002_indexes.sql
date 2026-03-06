CREATE INDEX IF NOT EXISTS idx_projects_user_id ON projects(user_id);
CREATE INDEX IF NOT EXISTS idx_invoices_user_id ON invoices(user_id);
CREATE INDEX IF NOT EXISTS idx_site_files_project_id ON site_files(project_id);
CREATE INDEX IF NOT EXISTS idx_site_files_user_id ON site_files(user_id);
CREATE INDEX IF NOT EXISTS idx_site_files_project_path ON site_files(project_id, path);
