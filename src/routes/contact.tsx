import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Phone, MapPin, Github, Linkedin, Instagram, Twitter } from "lucide-react";
import { toast } from "sonner";
import { AuroraBackground, Reveal, SectionHeading } from "@/components/site/Primitives";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { faqs } from "@/lib/site-data";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Join — STIC" },
      {
        name: "description",
        content:
          "Join STIC or get in touch: contact form, campus location, email, phone, social links and frequently asked questions.",
      },
      { property: "og:title", content: "Contact & Join — STIC" },
      {
        property: "og:description",
        content: "Membership is free for enrolled students — send us a message to get started.",
      },
    ],
  }),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(2, "Enter your full name").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  subject: z.string().trim().min(3, "Add a short subject").max(120),
  message: z.string().trim().min(10, "Tell us a bit more").max(1000),
});

const socials = [
  { href: "https://github.com/stic", label: "GitHub", Icon: Github },
  { href: "https://linkedin.com/company/stic", label: "LinkedIn", Icon: Linkedin },
  { href: "https://instagram.com/stic", label: "Instagram", Icon: Instagram },
  { href: "https://twitter.com/stic", label: "X", Icon: Twitter },
];

function Contact() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  return (
    <section className="relative overflow-hidden">
      <AuroraBackground particles={16} />
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <SectionHeading
          eyebrow="Contact"
          title="Say hello, or ask to join"
          subtitle="We reply to every message within two working days during the semester."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <div className="glass rounded-2xl p-6 sm:p-8">
              <Form {...form}>
                <form
                  className="grid gap-5"
                  onSubmit={form.handleSubmit((values) => {
                    toast.success(`Thanks ${values.name.split(" ")[0]}! Your message is on its way.`);
                    form.reset();
                  })}
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full name</FormLabel>
                          <FormControl>
                            <Input placeholder="Aarav Mehta" maxLength={100} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="you@university.edu"
                              maxLength={255}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input placeholder="I'd like to join the ML team" maxLength={120} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea rows={6} maxLength={1000} placeholder="Tell us about yourself…" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" variant="hero" size="lg" className="justify-self-start">
                    Send message
                  </Button>
                </form>
              </Form>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-2">
            <div className="grid gap-6">
              <div className="glass rounded-2xl p-6">
                <h3 className="font-display text-lg font-semibold">Reach us directly</h3>
                <ul className="mt-4 grid gap-3 text-sm text-muted-foreground">
                  <li className="flex items-center gap-3">
                    <Mail className="size-4 shrink-0 text-[var(--color-cyan)]" />
                    <a href="mailto:hello@stic.edu" className="hover:text-foreground">
                      hello@stic.edu
                    </a>
                  </li>
                  <li className="flex items-center gap-3">
                    <Phone className="size-4 shrink-0 text-[var(--color-cyan)]" />
                    <a href="tel:+919876543210" className="hover:text-foreground">
                      +91 98765 43210
                    </a>
                  </li>
                  <li className="flex items-start gap-3">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-[var(--color-cyan)]" />
                    Innovation Block C, Dept. of Computer Science, University Campus
                  </li>
                </ul>
                <div className="mt-5 flex gap-2">
                  {socials.map(({ href, label, Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={label}
                      className="grid size-9 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-[var(--color-cyan)] hover:text-foreground"
                    >
                      <Icon className="size-4" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="glass overflow-hidden rounded-2xl">
                <iframe
                  title="STIC campus location map"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=77.55%2C12.95%2C77.62%2C13.01&layer=mapnik"
                  loading="lazy"
                  className="h-64 w-full border-0 grayscale-[0.3]"
                />
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mx-auto mt-24 max-w-3xl">
          <SectionHeading eyebrow="FAQ" title="Frequently asked questions" />
          <Accordion type="single" collapsible className="mt-8">
            {faqs.map((f) => (
              <AccordionItem key={f.q} value={f.q} className="border-border">
                <AccordionTrigger className="text-left font-display text-base">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
