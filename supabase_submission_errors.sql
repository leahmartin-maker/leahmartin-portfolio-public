-- Create a table to log failed mural submissions
CREATE TABLE IF NOT EXISTS public.submission_errors (
  id BIGSERIAL PRIMARY KEY,
  email TEXT,
  error_message TEXT NOT NULL,
  failed_at TIMESTAMPTZ DEFAULT NOW(),
  form_type TEXT
);

-- Add an index for quick lookup by email
CREATE INDEX IF NOT EXISTS idx_submission_errors_email ON public.submission_errors(email);