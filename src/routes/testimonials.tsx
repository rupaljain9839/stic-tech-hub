import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Quote } from "lucide-react";
import { AuroraBackground, Reveal, SectionHeading } from "@/components/site/Primitives";
import { CtaBand, TestimonialCard } from "@/components/site/Cards";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { testimonials, type TestimonialGroup } from "@/lib/mock";
import { cn } from "@/lib/utils";

const groups: TestimonialGroup[] = ["Students", "Alumni", "Faculty"];

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: "Testimonials — Student, Alumni & Faculty Voices | STIC Tech Hub" },
      {
        name: "description",
        content:
          "What students, alumni and faculty say about STIC Tech Hub: mentorship, hackathon wins, research and placement outcomes.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "Testimonials — Student, Alumni & Faculty Voices" },
      {
        property: "og:description",
        content: "Real feedback from the people who built, mentored and grew inside the club.",
      },
    ],
  }),
  component: Testimonials,
});

function Testimonials() {
  const [group, setGroup] = useState<string>("All");
  const filtered = useMemo(
    () => (group === "All" ? testimonials : testimonials.filter((t) => t.group === group)),
    [group],
  );
  const featured = testimonials.filter((t) => t.rating === 5).slice(0, 6);

  return (
    <>
      <section className="relative overflow-hidden">
        <AuroraBackground particles={20} />
        <div className="mx-auto max-w-7xl px-4 pb-16 pt-28 sm:px-6 lg:pt-36">
          <SectionHeading
            eyebrow="Testimonials"
            title="The club, in their own words"
            subtitle="Ninety-six reviews collected across four years — here are the ones that keep coming back."
          />

          <Reveal delay={0.1}>
            <div className="mt-14">
              <Carousel opts={{ align: "start", loop: true }}>
                <CarouselContent>
                  {featured.map((t) => (
                    <CarouselItem key={t.id} className="md:basis-1/2 lg:basis-1/3">
                      <TestimonialCard testimonial={t} className="h-full" />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="mt-6 flex justify-center gap-3">
                  <CarouselPrevious className="static translate-y-0" />
                  <CarouselNext className="static translate-y-0" />
                </div>
              </Carousel>
            </div>
          </Reveal>

          <div className="mt-16 flex flex-wrap justify-center gap-2">
            {["All", ...groups].map((g) => (
              <button
                key={g}
                onClick={() => setGroup(g)}
                aria-pressed={group === g}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm transition-all",
                  group === g
                    ? "border-transparent bg-[image:var(--gradient-brand)] text-primary-foreground shadow-[var(--shadow-glow)]"
                    : "border-border text-muted-foreground hover:text-foreground",
                )}
              >
                {g}
              </button>
            ))}
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((t, i) => (
              <Reveal key={t.id} delay={(i % 6) * 0.06}>
                <TestimonialCard testimonial={t} />
              </Reveal>
            ))}
          </div>

          <p className="mt-14 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Quote className="size-4 text-[var(--color-cyan)]" /> Want to add yours? Send it through
            the contact form.
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
