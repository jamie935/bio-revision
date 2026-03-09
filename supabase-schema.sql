-- Bio-Revision Database Schema
-- Run this in Supabase SQL Editor to set up all tables

-- Users
CREATE TABLE users (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone           TEXT UNIQUE NOT NULL,
  display_name    TEXT,
  role            TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin', 'super_admin')),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  trial_ends_at   TIMESTAMPTZ NOT NULL DEFAULT (now() + INTERVAL '7 days'),
  has_paid        BOOLEAN NOT NULL DEFAULT FALSE,
  free_access     BOOLEAN NOT NULL DEFAULT FALSE,
  granted_by      UUID REFERENCES users(id),
  stripe_customer_id TEXT,
  paid_at         TIMESTAMPTZ,
  whatsapp_opted_in BOOLEAN NOT NULL DEFAULT TRUE,
  last_active_at  TIMESTAMPTZ
);
CREATE INDEX idx_users_phone ON users(phone);
CREATE INDEX idx_users_last_active ON users(last_active_at);

-- OTP codes
CREATE TABLE otp_codes (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone       TEXT NOT NULL,
  code        TEXT NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at  TIMESTAMPTZ NOT NULL DEFAULT (now() + INTERVAL '5 minutes'),
  verified    BOOLEAN NOT NULL DEFAULT FALSE,
  attempts    INT NOT NULL DEFAULT 0
);
CREATE INDEX idx_otp_phone ON otp_codes(phone, created_at DESC);

-- Sessions
CREATE TABLE sessions (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token       TEXT UNIQUE NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at  TIMESTAMPTZ NOT NULL DEFAULT (now() + INTERVAL '30 days'),
  revoked     BOOLEAN NOT NULL DEFAULT FALSE
);
CREATE INDEX idx_sessions_token ON sessions(token);
CREATE INDEX idx_sessions_user ON sessions(user_id);

-- Card performance
CREATE TABLE card_performance (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  card_id         TEXT NOT NULL,
  correct_count   INT NOT NULL DEFAULT 0,
  incorrect_count INT NOT NULL DEFAULT 0,
  streak          INT NOT NULL DEFAULT 0,
  last_seen       TIMESTAMPTZ,
  next_due        TIMESTAMPTZ,
  ease            FLOAT NOT NULL DEFAULT 2.5,
  interval_mins   INT NOT NULL DEFAULT 0,
  topic           TEXT NOT NULL,
  subtopic        TEXT NOT NULL,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, card_id)
);
CREATE INDEX idx_perf_user ON card_performance(user_id);
CREATE INDEX idx_perf_next_due ON card_performance(user_id, next_due);

-- Study sessions
CREATE TABLE study_sessions (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  subject         TEXT NOT NULL CHECK (subject IN ('biology', 'chemistry', 'physics')),
  started_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  total_answered  INT NOT NULL DEFAULT 0,
  correct         INT NOT NULL DEFAULT 0
);
CREATE INDEX idx_study_sessions_user ON study_sessions(user_id, started_at DESC);

-- WhatsApp conversation state
CREATE TABLE whatsapp_state (
  user_id         UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  mode            TEXT NOT NULL DEFAULT 'idle' CHECK (mode IN ('idle', 'quiz', 'conversation')),
  current_card_id TEXT,
  quiz_subject    TEXT,
  quiz_topic      TEXT,
  quiz_score      INT NOT NULL DEFAULT 0,
  quiz_total      INT NOT NULL DEFAULT 0,
  quiz_cards_used TEXT[] NOT NULL DEFAULT '{}',
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Message log
CREATE TABLE message_log (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID REFERENCES users(id) ON DELETE SET NULL,
  phone         TEXT NOT NULL,
  direction     TEXT NOT NULL CHECK (direction IN ('inbound', 'outbound')),
  message_type  TEXT NOT NULL,
  content       TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_messages_user ON message_log(user_id, created_at DESC);

-- After first deploy, set yourself as super_admin:
-- UPDATE users SET role = 'super_admin' WHERE phone = '+44YOUR_NUMBER';
