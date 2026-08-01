import { createFileRoute } from "@tanstack/react-router";
import { Clock, User } from "lucide-react";
import { AuroraBackground, Reveal, SectionHeading } from "@/components/site/Primitives";
import { Badge } from "@/components/ui/badge";
import { blogs } from "@/lib/site-data";

export const Route = createFileRoute("/blogs")({
  head: () => ({
    meta: [
      { title: "Blogs — Engineering Write-ups by STIC Members" },
      {
        name: "description",
        content:
          "Technical write-ups from STIC members on hackathon operations, fine-tuning LLMs, Kubernetes on campus and CTF prep.",
      },
      { property: "og:title", content: "Blogs — Engineering Write-ups by STIC Members" },
      {
        property: "og:description",
        content: "Long-form posts on AI, cloud, security and community building.",
      },
    ],
  }),
  component: Blogs,
});

function Blogs() {
  return (
    <section className="relative overflow-hidden">
      <AuroraBackground particles={14} />
      <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
        <SectionHeading
          eyebrow="Blogs"
          title="Notes from the build log"
          subtitle="Members write up what worked, what broke and what they'd do differently."
        />
        <div className="mt-12 grid gap-5">
          {blogs.map((b, i) => (
            <Reveal key={b.title} delay={i * 0.06}>
              <article className="glass gradient-border glow-hover rounded-2xl p-6 sm:p-7">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge variant="brand">{b.tag}</Badge>
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <User className="size-3.5" /> {b.author}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="size-3.5" /> {b.readTime} · {b.date}
                  </span>
                </div>
                <h3 className="mt-4 text-balance font-display text-xl font-semibold">{b.title}</h3>
                <p className="mt-2 text-muted-foreground">{b.excerpt}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
