import { createFileRoute } from "@tanstack/react-router";
import { Handshake } from "lucide-react";
import { toast } from "sonner";
import { AuroraBackground, Reveal, SectionHeading } from "@/components/site/Primitives";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { sponsors } from "@/lib/site-data";

export const Route = createFileRoute("/sponsors")({
  head: () => ({
    meta: [
      { title: "Sponsors — Partner With STIC" },
      {
        name: "description",
        content:
          "STIC partners with companies for sponsored workshops, hackathons, hiring sessions and research collaborations.",
      },
      { property: "og:title", content: "Sponsors — Partner With STIC" },
      {
        property: "og:description",
        content: "Reach 1000+ engineering students through workshops, hackathons and hiring events.",
      },
    ],
  }),
  component: Sponsors,
});

function Sponsors() {
  return (
    <section className="relative overflow-hidden">
      <AuroraBackground particles={14} />
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <SectionHeading
          eyebrow="Sponsors"
          title="Backed by teams who hire our members"
          subtitle="Sponsorship funds hardware, travel to national contests and prize pools for campus hackathons."
        />

        <div className="relative mt-14 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex w-max animate-marquee gap-4">
            {[...sponsors, ...sponsors].map((s, i) => (
              <div
                key={`${s.name}-${i}`}
                className="glass flex h-20 w-56 items-center justify-center rounded-2xl px-6"
              >
                <span className="font-display text-base font-semibold text-muted-foreground">
                  {s.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {sponsors.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.05}>
              <div className="glass gradient-border glow-hover h-full rounded-2xl p-6">
                <Badge variant={s.tier === "Platinum" ? "brand" : "outline"}>{s.tier}</Badge>
                <h3 className="mt-4 font-display text-lg font-semibold">{s.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Supporting workshops, mentorship and prize pools for STIC members.
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="glass mt-16 flex flex-col items-center gap-4 rounded-3xl px-6 py-12 text-center">
            <span
              className="grid size-12 place-items-center rounded-xl text-primary-foreground"
              style={{ background: "var(--gradient-brand)" }}
            >
              <Handshake className="size-5" />
            </span>
            <h2 className="text-balance text-2xl font-bold sm:text-3xl">
              Put your brand in front of 1000+ builders
            </h2>
            <p className="max-w-xl text-muted-foreground">
              Tiers from community to platinum, with workshop slots, hackathon branding and direct
              hiring pipelines.
            </p>
            <Button
              variant="hero"
              size="lg"
              onClick={() => toast.success("Sponsorship deck request sent — we'll email you shortly.")}
            >
              Become a Sponsor
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
