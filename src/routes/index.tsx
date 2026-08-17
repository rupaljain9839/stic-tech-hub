import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Code2,
  GraduationCap,
  Lightbulb,
  Rocket,
  Target,
  Trophy,
  Users,
} from "lucide-react";
import {
  AuroraBackground,
  Counter,
  Reveal,
  SectionHeading,
  TypingEffect,
} from "@/components/site/Primitives";
import {
  CtaBand,
  EventCard,
  FeatureCard,
  StatCard,
  TestimonialCard,
} from "@/components/site/Cards";
import { Button } from "@/components/ui/button";
import logo from "@/lib/logo";
import { events, features, heroStats, technologies, testimonials } from "@/lib/mock";

const icons = { Lightbulb, Users, GraduationCap, Target } as const;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "STIC — Students' Technical and Innovation Club" },
      {
        name: "description",
        content:
          "STIC is a student technology community running hackathons, workshops and open-source projects. Ideas today, innovation tomorrow.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "STIC — Students' Technical and Innovation Club" },
      {
        property: "og:description",
        content:
          "Hackathons, workshops, research and open-source projects built by students, for students.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const upcoming = events.filter((e) => e.status !== "past").slice(0, 3);
  const featured = testimonials.slice(0, 3);

  return (
    <>
      {/* ---------------------------------------------------------- hero */}
      <section className="relative overflow-hidden">
        <AuroraBackground particles={30} />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-28 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:pt-36">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-cyan)]">
              <Rocket className="size-3.5" /> Ideas today, innovation tomorrow
            </span>
            <h1 className="mt-6 text-balance text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
              We build{" "}
              <TypingEffect
                words={["AI products", "hackathon winners", "open source", "future engineers"]}
              />
              <span className="block">at STIC</span>
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-base text-muted-foreground sm:text-lg">
              A student-run technical innovation club where beginners become builders — through
              weekly hands-on sessions, mentor-backed projects and events that ship real software.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild variant="hero" size="lg">
                <Link to="/contact">
                  Join Community <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="glass" size="lg">
                <Link to="/events">Explore Events</Link>
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="relative mx-auto grid max-w-sm place-items-center">
              <div
                className="absolute inset-0 animate-float-slow rounded-full opacity-70 blur-3xl"
                style={{ background: "var(--gradient-glow)" }}
              />
              <div className="glass gradient-border relative w-full rounded-3xl p-8 text-center">
                <div className="relative mx-auto size-40">
                  <div className="absolute inset-0 animate-spin-slow rounded-full border border-dashed border-[var(--color-cyan)]/60" />
                  <img
                    src={logo}
                    alt="STIC logo"
                    width={144}
                    height={144}
                    className="absolute inset-2 size-36 rounded-full object-cover"
                  />
                </div>
                <p className="mt-6 font-display text-lg font-semibold">Students' Technical</p>
                <p className="font-display text-lg font-semibold gradient-text">and Innovation Club</p>
                <div className="mt-6 grid grid-cols-3 gap-2 text-[11px] text-muted-foreground">
                  <span className="rounded-lg border border-border py-2">15 Teams</span>
                  <span className="rounded-lg border border-border py-2">7 Tracks</span>
                  <span className="rounded-lg border border-border py-2">4 Years</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* stats */}
        <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {heroStats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.07}>
                <StatCard label={s.label}>
                  <Counter value={s.value} suffix={s.suffix} />
                </StatCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ tech strip */}
      <section className="overflow-hidden border-y border-border bg-[var(--color-surface)] py-5">
        <div className="flex w-max animate-marquee gap-10 pr-10">
          {[...technologies, ...technologies].map((t, i) => (
            <span
              key={`${t}-${i}`}
              className="flex items-center gap-2 whitespace-nowrap font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground"
            >
              <Code2 className="size-3.5 text-[var(--color-cyan)]" /> {t}
            </span>
          ))}
        </div>
      </section>

      {/* -------------------------------------------------------- features */}
      <section className="section-pad mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Why STIC"
          title="Four pillars behind everything we run"
          subtitle="Innovation, collaboration, learning and leadership — each backed by a real program, not a slogan."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.07}>
              <FeatureCard Icon={icons[f.icon as keyof typeof icons]} title={f.title} body={f.body} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* -------------------------------------------------- upcoming events */}
      <section className="border-y border-border bg-[var(--color-surface)]">
        <div className="section-pad mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="What's next"
            title="Upcoming & ongoing events"
            subtitle="Free for members unless a materials fee is listed. Bring a laptop and curiosity."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {upcoming.map((e, i) => (
              <Reveal key={e.id} delay={i * 0.07}>
                <EventCard event={e} />
              </Reveal>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button asChild variant="glass">
              <Link to="/events">
                See all events <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- testimonials */}
      <section className="section-pad mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Community voices"
          title="What members say about STIC"
          subtitle="Students, alumni and faculty on what changes once you start shipping in public."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {featured.map((t, i) => (
            <Reveal key={t.id} delay={i * 0.07}>
              <TestimonialCard testimonial={t} />
            </Reveal>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          <Button asChild variant="glass">
            <Link to="/testimonials">Read more stories</Link>
          </Button>
          <Button asChild variant="glass">
            <Link to="/achievements">
              <Trophy className="size-4" /> Our achievements
            </Link>
          </Button>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
