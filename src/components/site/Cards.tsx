import { Github, Linkedin, Mail, Calendar, MapPin, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { ClubEvent, Member } from "@/lib/site-data";
import { toast } from "sonner";

export function TeamCard({ member }: { member: Member }) {
  return (
    <article className="glass gradient-border glow-hover group relative overflow-hidden rounded-2xl p-5 text-center">
      <div className="relative mx-auto size-24">
        <div
          className="absolute inset-0 rounded-full opacity-70 blur-md transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: "var(--gradient-brand)" }}
        />
        <div className="absolute inset-[3px] grid place-items-center rounded-full bg-[var(--color-surface)] font-display text-2xl font-bold">
          {member.initials}
        </div>
      </div>
      <h3 className="mt-4 truncate font-display text-base font-semibold">{member.name}</h3>
      <p className="mt-1 text-xs text-[var(--color-cyan)]">{member.position}</p>
      <p className="mt-0.5 text-[11px] text-muted-foreground">
        {member.branch} · {member.year} year
      </p>

      <div className="mt-4 flex justify-center gap-2 opacity-70 transition-opacity group-hover:opacity-100">
        <a
          href={member.linkedin}
          target="_blank"
          rel="noreferrer"
          aria-label={`${member.name} on LinkedIn`}
          className="grid size-8 place-items-center rounded-full border border-border transition-colors hover:border-[var(--color-cyan)]"
        >
          <Linkedin className="size-3.5" />
        </a>
        <a
          href={member.github}
          target="_blank"
          rel="noreferrer"
          aria-label={`${member.name} on GitHub`}
          className="grid size-8 place-items-center rounded-full border border-border transition-colors hover:border-[var(--color-cyan)]"
        >
          <Github className="size-3.5" />
        </a>
        <a
          href={`mailto:${member.email}`}
          aria-label={`Email ${member.name}`}
          className="grid size-8 place-items-center rounded-full border border-border transition-colors hover:border-[var(--color-cyan)]"
        >
          <Mail className="size-3.5" />
        </a>
      </div>
    </article>
  );
}

export function EventCard({
  event,
}: {
  event: Omit<ClubEvent, "category"> & { category: string };
}) {
  return (
    <article className="glass gradient-border glow-hover group flex flex-col overflow-hidden rounded-2xl">
      <div className="relative aspect-[16/9] overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          loading="lazy"
          width={1280}
          height={800}
          className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,var(--color-surface),transparent_60%)]" />
        <Badge className="absolute left-3 top-3" variant="brand">
          {event.category}
        </Badge>
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
        </div>
        <p className="mt-3 flex-1 text-sm text-muted-foreground">{event.description}</p>
        <Button
          variant="hero"
          className="mt-5 w-full"
          onClick={() => toast.success(`Registered interest in ${event.title}`)}
        >
          Register
        </Button>
      </div>
    </article>
  );
}

export function ProjectCard({
  project,
}: {
  project: {
    title: string;
    description: string;
    stack: string[];
    image: string;
    github: string;
    demo: string;
  };
}) {
  return (
    <article className="glass gradient-border glow-hover group flex flex-col overflow-hidden rounded-2xl">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          width={1280}
          height={800}
          className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,var(--color-surface),transparent_65%)]" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-semibold">{project.title}</h3>
        <p className="mt-2 flex-1 text-sm text-muted-foreground">{project.description}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <Badge key={s} variant="outline" className="font-mono text-[10px]">
              {s}
            </Badge>
          ))}
        </div>
        <div className="mt-5 flex gap-2">
          <Button asChild variant="glass" size="sm" className="flex-1">
            <a href={project.github} target="_blank" rel="noreferrer">
              <Github className="size-4" /> Code
            </a>
          </Button>
          <Button asChild variant="hero" size="sm" className="flex-1">
            <a href={project.demo} target="_blank" rel="noreferrer">
              <ExternalLink className="size-4" /> Demo
            </a>
          </Button>
        </div>
      </div>
    </article>
  );
}
