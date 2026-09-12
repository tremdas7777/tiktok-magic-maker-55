CREATE TABLE public.shop_orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reference_id text UNIQUE NOT NULL,
  transaction_id text,
  status text NOT NULL DEFAULT 'pending',
  amount_cents integer NOT NULL DEFAULT 0,
  customer_name text,
  customer_email text,
  customer_phone text,
  customer_document text,
  city text,
  state text,
  items jsonb NOT NULL DEFAULT '[]'::jsonb,
  pix_code text,
  click_id text,
  session_id text,
  utm jsonb NOT NULL DEFAULT '{}'::jsonb,
  tiktok_purchase_sent boolean NOT NULL DEFAULT false,
  paid_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT ALL ON public.shop_orders TO service_role;
ALTER TABLE public.shop_orders ENABLE ROW LEVEL SECURITY;

CREATE INDEX shop_orders_created_at_idx ON public.shop_orders (created_at DESC);
CREATE INDEX shop_orders_status_idx ON public.shop_orders (status);

CREATE TABLE public.shop_events (
  id bigserial PRIMARY KEY,
  session_id text,
  event_type text NOT NULL,
  path text,
  product_id text,
  product_title text,
  value_cents integer NOT NULL DEFAULT 0,
  referrer text,
  utm jsonb NOT NULL DEFAULT '{}'::jsonb,
  click_id text,
  user_agent text,
  country text,
  city text,
  device text,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT ALL ON public.shop_events TO service_role;
GRANT USAGE, SELECT ON SEQUENCE public.shop_events_id_seq TO service_role;
ALTER TABLE public.shop_events ENABLE ROW LEVEL SECURITY;

CREATE INDEX shop_events_created_at_idx ON public.shop_events (created_at DESC);
CREATE INDEX shop_events_type_idx ON public.shop_events (event_type);
CREATE INDEX shop_events_session_idx ON public.shop_events (session_id);

CREATE TABLE public.shop_settings (
  key text PRIMARY KEY,
  value jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT ALL ON public.shop_settings TO service_role;
ALTER TABLE public.shop_settings ENABLE ROW LEVEL SECURITY;

INSERT INTO public.shop_settings (key, value) VALUES
  ('tiktok', '{"pixel_ids": [], "access_token": "", "test_event_code": "", "server_events_enabled": true, "track_pageview": true}'::jsonb);
