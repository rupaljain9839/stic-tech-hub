import { Link } from "@tanstack/react-router";
import { Calendar, Linkedin, Mail, MapPin, Star, Ticket, Trophy } from "lucide-react";
import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Achievement, ClubEvent, TeamMember, Testimonial } from "@/lib/mock";

/* ------------------------------------------------------------------ stats */

export function StatCard({
  children,
  label,
  className,
}: {
  children: React.ReactNode;
  label: string;
  className?: string;
}) {
  return (
    <div className={cn("glass gradient-border glow-hover rounded-2xl p-6 text-center", className)}>
      <p className="font-display text-3xl font-bold gradient-text sm:text-4xl">{children}</p>
      <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
    </div>
  );
}

export function FeatureCard({
  Icon,
  title,
  body,
}: {
  Icon: React.ComponentType<{ className?: string }>;
  title: string;
  body: string;
}) {
  return (
    <div className="glass gradient-border glow-hover h-full rounded-2xl p-6">
      <span
        className="grid size-11 place-items-center rounded-xl text-primary-foreground"
        style={{ background: "var(--gradient-brand)" }}
      >
        <Icon className="size-5" />
      </span>
      <h3 className="mt-5 font-display text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{body}</p>
    </div>
  );
}

/* ------------------------------------------------------------------- team */

export function TeamMemberCard({ member }: { member: TeamMember }) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="glass gradient-border group flex h-full flex-col rounded-2xl p-6 text-center"
    >
      <div className="relative mx-auto size-24 shrink-0">
        <div
          className="absolute inset-0 rounded-full opacity-60 blur-md transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: "var(--gradient-brand)" }}
        />
        <img
          src={member.photo}
          alt={member.name}
          width={96}
          height={96}
          loading="lazy"
          className="absolute inset-[3px] size-[calc(100%-6px)] rounded-full bg-[var(--color-surface)] object-cover"
        />
      </div>

      <h3 className="mt-4 font-display text-base font-semibold">{member.name}</h3>
      <p className="mt-1 text-xs font-medium text-[var(--color-cyan)]">{member.designation}</p>
      {member.department && (
        <p className="mt-0.5 text-[11px] text-muted-foreground">{member.department}</p>
      )}
      <p className="mt-3 flex-1 text-sm text-muted-foreground">{member.bio}</p>

      {(member.linkedin || member.email) && (
        <div className="mt-5 flex justify-center gap-2">
          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label={`${member.name} on LinkedIn`}
              className="grid size-9 place-items-center rounded-full border border-border transition-colors hover:border-[var(--color-cyan)] hover:text-[var(--color-cyan)]"
            >
              <Linkedin className="size-4" />
            </a>
          )}
          {member.email && (
            <a
              href={`mailto:${member.email}`}
              aria-label={`Email ${member.name}`}
              className="grid size-9 place-items-center rounded-full border border-border transition-colors hover:border-[var(--color-cyan)] hover:text-[var(--color-cyan)]"
            >
              <Mail className="size-4" />
            </a>
          )}
        </div>
      )}
    </motion.article>
  );
}

/* ----------------------------------------------------------------- events */

export function EventCard({
  event,
  onDetails,
}: {
  event: ClubEvent;
  onDetails?: (event: ClubEvent) => void;
}) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="glass gradient-border group flex h-full flex-col overflow-hidden rounded-2xl"
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          loading="lazy"
          width={1280}
          height={720}
          className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,var(--color-surface),transparent_60%)]" />
        <Badge className="absolute left-3 top-3" variant="brand">
          {event.category}
        </Badge>
        <span className="absolute right-3 top-3 rounded-full border border-border bg-background/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground backdrop-blur">
          {event.status}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-balance font-display text-lg font-semibold">{event.title}</h3>
        <div className="mt-3 grid gap-1.5 text-xs text-muted-foreground">
          <span className="flex items-center gap-2">
            <Calendar className="size-3.5 shrink-0 text-[var(--color-cyan)]" /> {event.date}
          </span>
          <span className="flex items-center gap-2">
            <MapPin className="size-3.5 shrink-0 text-[var(--color-cyan)]" /> {event.venue}
          </span>
          <span className="flex items-center gap-2">
            <Ticket className="size-3.5 shrink-0 text-[var(--color-cyan)]" /> {event.seats}
          </span>
        </div>
        <p className="mt-3 flex-1 text-sm text-muted-foreground">{event.description}</p>

        <div className="mt-5 flex gap-2">
          <Button variant="hero" className="flex-1" disabled={event.status === "past"}>
            {event.status === "past" ? "Closed" : "Register"}
          </Button>
          {onDetails && (
            <Button variant="glass" onClick={() => onDetails(event)}>
              Details
            </Button>
          )}
        </div>
      </div>
    </motion.article>
  );
}

/* ----------------------------------------------------------- achievements */

export function AchievementCard({ achievement }: { achievement: Achievement }) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="glass gradient-border group flex h-full flex-col overflow-hidden rounded-2xl"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={achievement.image}
          alt={achievement.title}
          loading="lazy"
          width={1200}
          height={750}
          className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,var(--color-surface),transparent_65%)]" />
        <Badge className="absolute left-3 top-3" variant="brand">
          {achievement.category}
        </Badge>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-[var(--color-cyan)]">
          <Trophy className="size-3.5" /> {achievement.date}
        </span>
        <h3 className="mt-2 text-balance font-display text-lg font-semibold">
          {achievement.title}
        </h3>
        <p className="mt-2 flex-1 text-sm text-muted-foreground">{achievement.description}</p>
      </div>
    </motion.article>
  );
}

/* ----------------------------------------------------------- testimonials */

export function Rating({ value }: { value: number }) {
  return (
    <span className="flex items-center gap-0.5" aria-label={`${value} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={cn(
            "size-3.5",
            i < value ? "fill-[var(--color-cyan)] text-[var(--color-cyan)]" : "text-muted-foreground/40",
          )}
        />
      ))}
    </span>
  );
}

export function TestimonialCard({
  testimonial,
  className,
}: {
  testimonial: Testimonial;
  className?: string;
}) {
  return (
    <article className={cn("glass gradient-border flex h-full flex-col rounded-2xl p-6", className)}>
      <Rating value={testimonial.rating} />
      <p className="mt-4 flex-1 text-pretty text-sm leading-relaxed text-muted-foreground">
        “{testimonial.feedback}”
      </p>
      <div className="mt-6 flex min-w-0 items-center gap-3">
        <img
          src={testimonial.photo}
          alt={testimonial.name}
          width={44}
          height={44}
          loading="lazy"
          className="size-11 shrink-0 rounded-full bg-[var(--color-surface)] object-cover"
        />
        <span className="min-w-0">
          <span className="block truncate font-display text-sm font-semibold">
            {testimonial.name}
          </span>
          <span className="block truncate text-xs text-muted-foreground">
            {testimonial.designation}
          </span>
        </span>
      </div>
    </article>
  );
}

/* -------------------------------------------------------------------- cta */

export function CtaBand() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
      <div className="glass relative overflow-hidden rounded-3xl px-6 py-14 text-center">
        <div
          className="pointer-events-none absolute inset-x-0 -top-24 h-64 opacity-60"
          style={{ background: "var(--gradient-glow)" }}
        />
        <h2 className="text-balance text-3xl font-bold sm:text-4xl">
          Ready to build something worth showing?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Applications for the new semester cohort are open to every branch and every year.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild variant="hero" size="lg">
            <Link to="/contact">Join Community</Link>
          </Button>
          <Button asChild variant="glass" size="lg">
            <Link to="/events">Explore Events</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
