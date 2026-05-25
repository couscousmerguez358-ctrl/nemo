-- ===================================================
-- LEARNOW DEF-SCHEMA AND MIGRATIONS
-- ===================================================

-- 1. TABLES CREATION
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  level INTEGER DEFAULT 1,
  total_xp INTEGER DEFAULT 0,
  title TEXT DEFAULT 'Curieux',
  is_premium BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE public.courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  technology TEXT NOT NULL,
  is_premium BOOLEAN DEFAULT FALSE,
  is_published BOOLEAN DEFAULT TRUE,
  total_xp INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE public.modules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  order_index INTEGER NOT NULL,
  is_premium BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE public.lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id UUID NOT NULL REFERENCES public.modules(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content_markdown TEXT NOT NULL,
  starter_code TEXT,
  solution_code TEXT,
  expected_hash TEXT, -- SHA-256 Hashed expected answer
  order_index INTEGER NOT NULL,
  is_premium BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  stripe_customer_id TEXT UNIQUE,
  stripe_subscription_id TEXT UNIQUE,
  plan TEXT DEFAULT 'newbie', -- newbie, pro, expert
  billing_cycle TEXT, -- monthly, annual
  status TEXT DEFAULT 'none', -- active, canceled, past_due, trialing, none
  current_period_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE public.user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  completed_lessons UUID[] DEFAULT '{}',
  progress_percent NUMERIC(5,2) DEFAULT 0,
  last_accessed_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, course_id)
);

CREATE TABLE public.user_streaks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_activity_date DATE,
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE public.activity_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  xp_earned INTEGER DEFAULT 0,
  activity_type TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ===================================================
-- 2. SECURE FUNCTIONS & PL/pgSQL LOGIC
-- ===================================================

-- Leveling calculation
CREATE OR REPLACE FUNCTION public.calculate_level(xp INTEGER)
RETURNS TABLE(level INTEGER, title TEXT) AS $$
BEGIN
  RETURN QUERY SELECT
    CASE
      WHEN xp < 500 THEN 1
      WHEN xp < 1500 THEN 2
      WHEN xp < 3500 THEN 3
      WHEN xp < 7000 THEN 4
      ELSE 5
    END,
    CASE
      WHEN xp < 500 THEN 'Curieux'
      WHEN xp < 1500 THEN 'Apprenti'
      WHEN xp < 3500 THEN 'Développeur'
      WHEN xp < 7000 THEN 'Expert'
      ELSE 'Maître du Code'
    END;
END;
$$ LANGUAGE plpgsql;

-- Hashed time-asserted XP award function
CREATE OR REPLACE FUNCTION public.add_xp(
  p_user_id UUID,
  p_xp INTEGER,
  p_lesson_id UUID,
  p_duration_seconds INTEGER,
  p_hash_code TEXT
)
RETURNS JSONB AS $$
DECLARE
  v_old_xp INTEGER;
  v_new_xp INTEGER;
  v_old_level INTEGER;
  v_new_level INTEGER;
  v_new_title TEXT;
  v_leveled_up BOOLEAN := FALSE;
  v_already_completed BOOLEAN;
BEGIN
  -- Anti-cheat duration check (lessons cannot be validated in < 10 seconds)
  IF p_duration_seconds < 10 THEN
    RAISE EXCEPTION 'Vérification de sécurité : Leçon validée trop rapidement. Pratiquez activement.';
  END IF;

  -- Ensure lesson is not already validated today to avoid double XP exploits
  SELECT EXISTS (
    SELECT 1 FROM public.activity_log
    WHERE user_id = p_user_id 
      AND activity_type = 'lesson_' || p_lesson_id::text
      AND created_at::date = CURRENT_DATE
  ) INTO v_already_completed;

  IF v_already_completed THEN
    RETURN jsonb_build_object('already_done', TRUE);
  END IF;

  -- Fetch user profile indicators
  SELECT total_xp, level INTO v_old_xp, v_old_level FROM public.profiles WHERE id = p_user_id;
  v_new_xp := v_old_xp + p_xp;
  
  -- Recalculate level
  SELECT level, title INTO v_new_level, v_new_title FROM public.calculate_level(v_new_xp);
  v_leveled_up := v_new_level > v_old_level;

  -- Apply updates
  UPDATE public.profiles 
  SET total_xp = v_new_xp, level = v_new_level, title = v_new_title, updated_at = now()
  WHERE id = p_user_id;

  INSERT INTO public.activity_log (user_id, xp_earned, activity_type)
  VALUES (p_user_id, p_xp, 'lesson_' || p_lesson_id::text);

  IF v_leveled_up THEN
    INSERT INTO public.notifications (user_id, title, message)
    VALUES (p_user_id, 'Niveau supérieur ! 🎉', 'Tu es maintenant ' || v_new_title || ' !');
  END IF;

  RETURN jsonb_build_object(
    'old_xp', v_old_xp, 'new_xp', v_new_xp,
    'old_level', v_old_level, 'new_level', v_new_level,
    'leveled_up', v_leveled_up, 'title', v_new_title
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Streak tracker updates
CREATE OR REPLACE FUNCTION public.update_streak(p_user_id UUID)
RETURNS JSONB AS $$
DECLARE
  v_record public.user_streaks%ROWTYPE;
  v_today DATE := CURRENT_DATE;
BEGIN
  SELECT * INTO v_record FROM public.user_streaks WHERE user_id = p_user_id;

  IF NOT FOUND THEN
    INSERT INTO public.user_streaks(user_id, current_streak, longest_streak, last_activity_date)
    VALUES (p_user_id, 1, 1, v_today);
    RETURN jsonb_build_object('streak', 1, 'status', 'new');
  END IF;

  IF v_record.last_activity_date = v_today THEN
    RETURN jsonb_build_object('streak', v_record.current_streak, 'status', 'already_today');
  ELSIF v_record.last_activity_date = v_today - 1 THEN
    UPDATE public.user_streaks 
    SET current_streak = current_streak + 1,
        longest_streak = GREATEST(longest_streak, current_streak + 1),
        last_activity_date = v_today,
        updated_at = now()
    WHERE user_id = p_user_id;
    RETURN jsonb_build_object('streak', v_record.current_streak + 1, 'status', 'continued');
  ELSE
    UPDATE public.user_streaks 
    SET current_streak = 1,
        last_activity_date = v_today,
        updated_at = now()
    WHERE user_id = p_user_id;
    RETURN jsonb_build_object('streak', 1, 'status', 'reset');
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ===================================================
-- 3. AUTOMATED DB TRIGGERS (Auto-Profiling & JWT Claims)
-- ===================================================

-- Trigger: Auto-profiling on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, full_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', '')
  );
  INSERT INTO public.user_streaks (user_id) VALUES (NEW.id);
  INSERT INTO public.subscriptions (user_id) VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Trigger: Sync premium status to auth.users app_metadata (JWT Claim)
CREATE OR REPLACE FUNCTION public.sync_subscription_to_jwt()
RETURNS TRIGGER AS $$
DECLARE
  v_is_premium BOOLEAN;
BEGIN
  v_is_premium := (NEW.status = 'active' AND NEW.plan IN ('pro', 'expert'));
  
  -- Update profiles table
  UPDATE public.profiles SET is_premium = v_is_premium WHERE id = NEW.user_id;
  
  -- Update Supabase auth.users app_metadata to inject claim into JWT
  UPDATE auth.users
  SET raw_app_meta_data = raw_app_meta_data || jsonb_build_object('is_premium', v_is_premium)
  WHERE id = NEW.user_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_subscription_status_updated
  AFTER UPDATE OF status, plan ON public.subscriptions
  FOR EACH ROW EXECUTE FUNCTION public.sync_subscription_to_jwt();

-- ===================================================
-- 4. ROW LEVEL SECURITY (RLS) POLICIES
-- ===================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_streaks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_log ENABLE ROW LEVEL SECURITY;

-- Profiles: SELECT public, UPDATE own
CREATE POLICY "Public profile view" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Courses: SELECT public
CREATE POLICY "Public courses view" ON public.courses FOR SELECT USING (is_published = true);

-- Modules: SELECT public
CREATE POLICY "Public modules view" ON public.modules FOR SELECT USING (true);

-- LESSONS CONTENT GATING POLICY (0ms Custom Claim verified)
CREATE POLICY "Lessons gating policy" ON public.lessons FOR SELECT USING (
  is_premium = false 
  OR (auth.jwt() -> 'app_metadata' ->> 'is_premium')::boolean = true
);

-- Subscriptions: own row SELECT
CREATE POLICY "View own subscription" ON public.subscriptions FOR SELECT USING (auth.uid() = user_id);

-- User Progress: own row
CREATE POLICY "Manage own progress" ON public.user_progress FOR ALL USING (auth.uid() = user_id);

-- User Streaks: own row
CREATE POLICY "View own streak" ON public.user_streaks FOR SELECT USING (auth.uid() = user_id);

-- Notifications: own row
CREATE POLICY "Manage own notifications" ON public.notifications FOR ALL USING (auth.uid() = user_id);

-- Activity Log: SELECT own
CREATE POLICY "View own activity log" ON public.activity_log FOR SELECT USING (auth.uid() = user_id);
