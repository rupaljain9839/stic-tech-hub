import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Calendar, Rocket, Users, Code2, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AuroraBackground,
  Counter,
  Reveal,
  SectionHeading,
  TypingEffect,
} from "@/components/site/Primitives";
import { EventCard } from "@/components/site/Cards";
import { events, stats, technologies } from "@/lib/site-data";
import logo from "@/lib/logo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "STIC — Student Technical Innovation Club" },
      {
        name: "description",
        content:
          "STIC is a university student technical innovation club: 1000+ members, hackathons, workshops and open-source projects across AI, cloud, security and design.",
      },
      { property: "og:title", content: "STIC — Student Technical Innovation Club" },
      {
        property: "og:description",
        content:
          "STIC is a university student technical innovation club: 1000+ members, hackathons, workshops and open-source projects across AI, cloud, security and design.",
      },
    ],
  }),
  component: Home,
});

const pillars = [
  {
    Icon: Code2,
    title: "Build weekly",
    body: "Hands-on labs where every session ends with something running on your machine.",
  },
  {
    Icon: Users,
    title: "15 technical teams",
    body: "AI, cloud, security, web, app, robotics, design, content — pick your lane, switch anytime.",
  },
  {
    Icon: Trophy,
    title: "Compete nationally",
    body: "Contest prep, travel support and mentors who have won the events you're entering.",
  },
  {
    Icon: Rocket,
    title: "Ship in public",
    body: "Open-source repos, demo days and a portfolio you can actually show recruiters.",
  },
];

function Home() {
  return (
    <>
      <section className="relative overflow-hidden">
        <AuroraBackground particles={34} />
        <div className="mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 sm:pt-24">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <img
                src={logo}
                alt="STIC club logo"
                width={96}
                height={96}
                className="mx-auto h-24 w-24 rounded-full drop-shadow-[0_0_40px_color-mix(in_oklab,var(--color-cyan)_45%,transparent)]"
              />
            </Reveal>
            <Reveal delay={0.05}>
              <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-cyan)]">
                Student Technical Innovation Club
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="mt-5 text-balance text-4xl font-bold leading-[1.05] sm:text-6xl">
                Empowering Students Through Technology
              </h1>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mx-auto mt-5 max-w-xl text-pretty text-base text-muted-foreground sm:text-lg">
                We are a community of builders learning{" "}
                <TypingEffect
                  words={["Artificial Intelligence", "Cloud Native", "Cybersecurity", "Product Design"]}
                  className="font-display font-semibold"
                />{" "}
                — together, in public, every week.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button asChild variant="hero" size="lg">
                  <Link to="/contact">
                    Join Club <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button asChild variant="glass" size="lg">
                  <Link to="/events">
                    <Calendar className="size-4" /> Explore Events
                  </Link>
                </Button>
              </div>
            </Reveal>
          </div>

          <div className="mt-20 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08}>
                <div className="glass gradient-border glow-hover rounded-2xl p-6 text-center">
                  <p className="font-display text-3xl font-bold gradient-text sm:text-4xl">
                    <Counter value={s.value} suffix={s.suffix} />
                  </p>
                  <p className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">
                    {s.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-[var(--color-surface)] py-6">
        <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
          <div className="flex w-max animate-marquee gap-3">
            {[...technologies, ...technologies].map((t, i) => (
              <span
                key={`${t}-${i}`}
                className="rounded-full border border-border px-5 py-2 font-mono text-sm text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Why STIC"
          title="A club built like an engineering team"
          subtitle="Structured tracks, real mentorship and a culture where shipping beats sitting in lectures about shipping."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <div className="glass gradient-border glow-hover h-full rounded-2xl p-6">
                <span
                  className="grid size-11 place-items-center rounded-xl text-primary-foreground"
                  style={{ background: "var(--gradient-brand)" }}
                >
                  <p.Icon className="size-5" />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-pad relative overflow-hidden">
        <AuroraBackground particles={14} />
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Upcoming"
            title="Next on the calendar"
            subtitle="Hackathons, workshops and bootcamps open to every branch and every year."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.slice(0, 3).map((e, i) => (
              <Reveal key={e.title} delay={i * 0.08}>
                <EventCard event={e} />
              </Reveal>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button asChild variant="glass" size="lg">
              <Link to="/events">
                View all events <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6">
        <Reveal>
          <div className="glass relative overflow-hidden rounded-3xl px-6 py-14 text-center">
            <div
              className="pointer-events-none absolute inset-x-0 -top-24 h-64 opacity-60"
              style={{ background: "var(--gradient-glow)" }}
            />
            <h2 className="text-balance text-3xl font-bold sm:text-4xl">
              Applications for the new semester are open
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Join 1000+ students building the things they wish existed on campus.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild variant="hero" size="lg">
                <Link to="/contact">Join Club</Link>
              </Button>
              <Button asChild variant="glass" size="lg">
                <Link to="/sponsors">Become a Sponsor</Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
