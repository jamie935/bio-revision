-- Run this in Supabase SQL Editor
CREATE TABLE reminder_preferences (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID REFERENCES users(id) ON DELETE CASCADE,
  subject     TEXT NOT NULL,     -- 'biology' | 'chemistry' | 'physics'
  enabled     BOOLEAN DEFAULT TRUE,
  created_at  TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, subject)
);
