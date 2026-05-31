-- ============================================================
--  Dragon Forge — Schema PostgreSQL
--  Executar: psql -U postgres -d dragon_forge -f schema.sql
-- ============================================================

-- Extensão para UUIDs
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ── USERS ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(120)        NOT NULL,
  email       VARCHAR(180)        UNIQUE NOT NULL,
  password    VARCHAR(255)        NOT NULL,
  role        VARCHAR(20)         NOT NULL DEFAULT 'customer'
                                  CHECK (role IN ('admin','customer')),
  phone       VARCHAR(30),
  created_at  TIMESTAMPTZ         NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ         NOT NULL DEFAULT NOW()
);

-- ── REFRESH TOKENS ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS refresh_tokens (
  id          SERIAL PRIMARY KEY,
  user_id     INT                 NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token       TEXT                UNIQUE NOT NULL,
  expires_at  TIMESTAMPTZ         NOT NULL,
  created_at  TIMESTAMPTZ         NOT NULL DEFAULT NOW()
);

-- ── PRODUCTS ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS products (
  id            SERIAL PRIMARY KEY,
  name          VARCHAR(120)      NOT NULL,
  type          VARCHAR(60)       NOT NULL,
  steel         VARCHAR(80)       NOT NULL,
  handle        VARCHAR(80)       NOT NULL,
  finish        VARCHAR(80)       NOT NULL,
  price         NUMERIC(10,2)     NOT NULL,
  status        VARCHAR(20)       NOT NULL DEFAULT 'order'
                                  CHECK (status IN ('ready','order','inactive')),
  length        VARCHAR(20),
  weight        VARCHAR(20),
  thick         VARCHAR(20),
  hrc           VARCHAR(20),
  application   VARCHAR(200),
  description   TEXT,
  img_url       TEXT,
  specs         JSONB             DEFAULT '{}',
  created_at    TIMESTAMPTZ       NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ       NOT NULL DEFAULT NOW()
);

-- ── ORDERS ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS orders (
  id              SERIAL PRIMARY KEY,
  order_code      VARCHAR(20)     UNIQUE NOT NULL,   -- ex: DF001
  tracking_code   VARCHAR(20)     UNIQUE,             -- ex: SQ123456789BR
  user_id         INT             REFERENCES users(id) ON DELETE SET NULL,
  client_name     VARCHAR(120)    NOT NULL,
  client_email    VARCHAR(180),
  model           VARCHAR(120)    NOT NULL,
  steel           VARCHAR(80),
  handle          VARCHAR(80),
  finish          VARCHAR(80),
  sheath          VARCHAR(80),
  construction    VARCHAR(80),
  amount          NUMERIC(10,2)   NOT NULL,
  payment_method  VARCHAR(30)     NOT NULL DEFAULT 'pix'
                                  CHECK (payment_method IN ('pix','credit','bank')),
  payment_status  VARCHAR(20)     NOT NULL DEFAULT 'pending'
                                  CHECK (payment_status IN ('pending','confirmed','failed','refunded')),
  status          VARCHAR(30)     NOT NULL DEFAULT 'new'
                                  CHECK (status IN ('new','progress','finishing','quality','shipped','delivered','cancelled')),
  current_step    INT             NOT NULL DEFAULT 0,
  deadline        DATE,
  notes           TEXT,
  pix_key         VARCHAR(100),
  created_at      TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ     NOT NULL DEFAULT NOW()
);

-- ── ORDER STEPS (timeline de rastreio) ─────────────────────
CREATE TABLE IF NOT EXISTS order_steps (
  id          SERIAL PRIMARY KEY,
  order_id    INT             NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  step_index  INT             NOT NULL,              -- 0..5
  label       VARCHAR(80)     NOT NULL,
  detail      TEXT,
  done        BOOLEAN         NOT NULL DEFAULT false,
  done_at     TIMESTAMPTZ,
  created_at  TIMESTAMPTZ     NOT NULL DEFAULT NOW()
);

-- ── PROMOTIONS ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS promotions (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(120)    NOT NULL,
  description TEXT,
  price_old   NUMERIC(10,2)   NOT NULL,
  price_now   NUMERIC(10,2)   NOT NULL,
  discount    INT             NOT NULL,              -- percentual
  badge       VARCHAR(60),
  expires_at  TIMESTAMPTZ,
  active      BOOLEAN         NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ     NOT NULL DEFAULT NOW()
);

-- ── CUSTOM ORDERS (encomendas personalizadas) ───────────────
CREATE TABLE IF NOT EXISTS custom_orders (
  id          SERIAL PRIMARY KEY,
  user_id     INT             REFERENCES users(id) ON DELETE SET NULL,
  client_name VARCHAR(120)    NOT NULL,
  email       VARCHAR(180),
  phone       VARCHAR(30),
  model       VARCHAR(80)     NOT NULL,
  steel       VARCHAR(80)     NOT NULL,
  handle      VARCHAR(80)     NOT NULL,
  finish      VARCHAR(80)     NOT NULL,
  sheath      VARCHAR(80),
  notes       TEXT,
  amount      NUMERIC(10,2),
  status      VARCHAR(20)     NOT NULL DEFAULT 'new'
                              CHECK (status IN ('new','progress','done','cancelled')),
  created_at  TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ     NOT NULL DEFAULT NOW()
);

-- ── UPDATED_AT auto-trigger ─────────────────────────────────
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

DO $$
DECLARE t TEXT;
BEGIN
  FOREACH t IN ARRAY ARRAY['users','products','orders','promotions','custom_orders'] LOOP
    EXECUTE format('
      DROP TRIGGER IF EXISTS trg_updated_at ON %I;
      CREATE TRIGGER trg_updated_at BEFORE UPDATE ON %I
      FOR EACH ROW EXECUTE FUNCTION set_updated_at();
    ', t, t);
  END LOOP;
END $$;

-- ── ÍNDICES ─────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_orders_user        ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_code        ON orders(order_code);
CREATE INDEX IF NOT EXISTS idx_orders_tracking    ON orders(tracking_code);
CREATE INDEX IF NOT EXISTS idx_order_steps_order  ON order_steps(order_id);
CREATE INDEX IF NOT EXISTS idx_tokens_user        ON refresh_tokens(user_id);
CREATE INDEX IF NOT EXISTS idx_custom_user        ON custom_orders(user_id);
