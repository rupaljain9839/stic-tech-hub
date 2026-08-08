-- roles
CREATE TYPE public.app_role AS ENUM ('admin', 'member');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Admins can view roles" ON public.user_roles
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- profiles
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text,
  full_name text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT TO authenticated USING (auth.uid() = id OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name'))
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- content tables
CREATE TABLE public.resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  type text NOT NULL DEFAULT 'Guide',
  description text NOT NULL DEFAULT '',
  link text NOT NULL DEFAULT '#',
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.club_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text NOT NULL DEFAULT 'Workshop',
  date_label text NOT NULL DEFAULT '',
  venue text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  image_url text,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.blogs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  author text NOT NULL DEFAULT '',
  date_label text NOT NULL DEFAULT '',
  read_time text NOT NULL DEFAULT '5 min',
  tag text NOT NULL DEFAULT 'Community',
  excerpt text NOT NULL DEFAULT '',
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.gallery_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  caption text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT 'Events',
  image_url text,
  span text NOT NULL DEFAULT 'short',
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.club_projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  stack text[] NOT NULL DEFAULT '{}',
  image_url text,
  github text,
  demo text,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.resources, public.club_events, public.blogs, public.gallery_items, public.club_projects TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.resources, public.club_events, public.blogs, public.gallery_items, public.club_projects TO authenticated;
GRANT ALL ON public.resources, public.club_events, public.blogs, public.gallery_items, public.club_projects TO service_role;

ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.club_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.club_projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read resources" ON public.resources FOR SELECT USING (true);
CREATE POLICY "Admins manage resources" ON public.resources FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Public can read events" ON public.club_events FOR SELECT USING (true);
CREATE POLICY "Admins manage events" ON public.club_events FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Public can read blogs" ON public.blogs FOR SELECT USING (true);
CREATE POLICY "Admins manage blogs" ON public.blogs FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Public can read gallery" ON public.gallery_items FOR SELECT USING (true);
CREATE POLICY "Admins manage gallery" ON public.gallery_items FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Public can read projects" ON public.club_projects FOR SELECT USING (true);
CREATE POLICY "Admins manage projects" ON public.club_projects FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER touch_resources BEFORE UPDATE ON public.resources FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE TRIGGER touch_club_events BEFORE UPDATE ON public.club_events FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE TRIGGER touch_blogs BEFORE UPDATE ON public.blogs FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE TRIGGER touch_gallery_items BEFORE UPDATE ON public.gallery_items FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE TRIGGER touch_club_projects BEFORE UPDATE ON public.club_projects FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE TRIGGER touch_profiles BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- seed existing site content
INSERT INTO public.resources (title, type, description, link, sort_order) VALUES
('DSA Roadmap 2026','Roadmap','Twelve-week structured path from arrays to graphs with 300 curated problems.','#',1),
('Machine Learning Starter Kit','Notebook Pack','Colab notebooks covering regression, CNNs and transformers with campus datasets.','#',2),
('Cloud & DevOps Handbook','Guide','Docker, Kubernetes and CI/CD reference written by the STIC cloud team.','#',3),
('Interview Prep Vault','Archive','Question banks and alumni experiences from 40+ product and research interviews.','#',4),
('Design Systems Primer','Guide','Tokens, typography and accessibility fundamentals for student product teams.','#',5),
('Open Source Onboarding','Playbook','How to pick an issue, write a good PR and land your first upstream contribution.','#',6);

INSERT INTO public.club_events (title, category, date_label, venue, description, sort_order) VALUES
('HackSTIC 3.0 — 36 Hour Build Sprint','Hackathon','Sep 12, 2026','Innovation Hall, Block C','Three tracks, thirty-six hours, mentors from industry labs and a ₹2L prize pool for shipped products.',1),
('Neural Networks From Scratch','Workshop','Aug 22, 2026','AI Lab 204','Build a working MLP in NumPy, then port it to PyTorch. Laptops required, no prior ML needed.',2),
('Cloud Native Bootcamp','Bootcamp','Aug 05 – Aug 09, 2026','Seminar Hall 1','Five evenings of containers, Kubernetes, CI/CD and observability with hands-on deployments.',3),
('Careers in Cybersecurity','Seminar','Jul 28, 2026','Main Auditorium','Alumni security engineers on red teams, bug bounties and building a credible portfolio.',4),
('CodeClash Algorithmic Cup','Competition','Jul 19, 2026','Programming Lab 3','Two-hour ICPC-style contest with live leaderboard, editorial session and campus rankings.',5),
('UI/UX Design Jam','Workshop','Jul 06, 2026','Design Studio','From wireframe to prototype in one afternoon — critique-driven, Figma-first, portfolio ready.',6);

INSERT INTO public.blogs (title, author, date_label, read_time, tag, excerpt, sort_order) VALUES
('How we ran a 36-hour hackathon for 300 students','Meera Nair','Jul 14, 2026','8 min','Community','Logistics, mentor rotas, judging rubrics and the spreadsheet that nearly broke us — a full retrospective.',1),
('Fine-tuning small language models on a student budget','Ananya Verma','Jun 30, 2026','11 min','AI/ML','LoRA, quantisation and colab-only training runs that still beat the baseline on our campus QA set.',2),
('Shipping our first Kubernetes cluster on campus','Yash Kulkarni','Jun 12, 2026','9 min','Cloud','What we learned wiring up ingress, secrets and observability for student projects in production.',3),
('A practical guide to your first CTF','Nikhil Bose','May 28, 2026','6 min','Security','Tooling, categories and the mindset shift that took our team from last place to the top 20.',4);

INSERT INTO public.gallery_items (caption, category, span, sort_order) VALUES
('HackSTIC 2.0 final hours','Hackathons','tall',1),
('Neural nets workshop','Workshops','short',2),
('Cybersecurity seminar','Events','short',3),
('AI research showcase','Events','tall',4),
('Cloud bootcamp demos','Workshops','short',5),
('Core team night shift','Team','short',6),
('Open source Saturday','Workshops','tall',7),
('Annual tech fest','Events','short',8),
('Winning team, HackSTIC','Hackathons','short',9);

INSERT INTO public.club_projects (title, description, stack, github, demo, sort_order) VALUES
('CampusPulse','Real-time campus analytics dashboard tracking event attendance, club growth and lab utilisation.','{React,TypeScript,Node,PostgreSQL}','https://github.com/stic/campuspulse','https://campuspulse.stic.edu',1),
('LectureLens','Transformer-based lecture summariser that turns recordings into searchable notes and flashcards.','{Python,PyTorch,FastAPI}','https://github.com/stic/lecturelens','https://lecturelens.stic.edu',2),
('SafeNet Scanner','Automated web vulnerability scanner used by the security team for internal campus audits.','{Go,Docker,Redis}','https://github.com/stic/safenet','https://safenet.stic.edu',3),
('HackDesk','Hackathon operations platform: team formation, judging rubrics, live scoring and submissions.','{"Next.js",Supabase,Tailwind}','https://github.com/stic/hackdesk','https://hackdesk.stic.edu',4),
('LabQueue','Mobile-first slot booking for the robotics and fabrication labs with hardware inventory tracking.','{Flutter,Firebase}','https://github.com/stic/labqueue','https://labqueue.stic.edu',5),
('OpenSyllabus','Community-maintained roadmap of curated resources for every CS course on campus.','{Astro,MDX,Cloudflare}','https://github.com/stic/opensyllabus','https://opensyllabus.stic.edu',6);