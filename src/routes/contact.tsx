import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Clock,
  Github,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  Twitter,
} from "lucide-react";
import { toast } from "sonner";
import { AuroraBackground, Reveal, SectionHeading } from "@/components/site/Primitives";
import { CtaBand } from "@/components/site/Cards";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { contactInfo, faqs } from "@/lib/mock";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact STIC — Join, Collaborate or Sponsor" },
      {
        name: "description",
        content:
          "Reach STIC for membership, event collaborations or sponsorships. Email, phone, campus location and FAQs.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "Contact STIC" },
      {
        property: "og:description",
        content: "Membership, collaborations and sponsorship enquiries — all in one place.",
      },
    ],
  }),
  component: Contact,
});

const socials = [
  { href: "https://github.com/stictechhub", label: "GitHub", Icon: Github },
  { href: "https://linkedin.com/company/stictechhub", label: "LinkedIn", Icon: Linkedin },
  { href: "https://instagram.com/stictechhub", label: "Instagram", Icon: Instagram },
  { href: "https://twitter.com/stictechhub", label: "X", Icon: Twitter },
];

type Errors = Partial<Record<"name" | "email" | "subject" | "message", string>>;

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);

  const set = (key: keyof typeof form) => (value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Errors = {};
    if (form.name.trim().length < 2) next.name = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Enter a valid email address.";
    if (form.subject.trim().length < 3) next.subject = "Add a short subject.";
    if (form.message.trim().length < 15) next.message = "Tell us a bit more (15+ characters).";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSending(true);
    setTimeout(() => {
      setSending(false);
      setForm({ name: "", email: "", subject: "", message: "" });
      toast.success("Message sent", {
        description: "This is a demo form — no data leaves your browser yet.",
      });
    }, 800);
  };

  return (
    <>
      <section className="relative overflow-hidden">
        <AuroraBackground particles={20} />
        <div className="mx-auto max-w-7xl px-4 pb-16 pt-28 sm:px-6 lg:pt-36">
          <SectionHeading
            eyebrow="Contact"
            title="Let's talk — membership, events or sponsorship"
            subtitle="We reply to most messages within two working days."
          />

          <div className="mt-14 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            {/* form */}
            <Reveal>
              <form onSubmit={submit} className="glass gradient-border rounded-2xl p-6 sm:p-8" noValidate>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    id="name"
                    label="Full name"
                    value={form.name}
                    onChange={set("name")}
                    error={errors.name}
                    placeholder="Ananya Sharma"
                  />
                  <Field
                    id="email"
                    label="Email"
                    type="email"
                    value={form.email}
                    onChange={set("email")}
                    error={errors.email}
                    placeholder="you@university.edu"
                  />
                </div>
                <div className="mt-5">
                  <Field
                    id="subject"
                    label="Subject"
                    value={form.subject}
                    onChange={set("subject")}
                    error={errors.subject}
                    placeholder="Membership enquiry"
                  />
                </div>
                <div className="mt-5 grid gap-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    rows={6}
                    value={form.message}
                    onChange={(e) => set("message")(e.target.value)}
                    placeholder="Tell us what you're interested in…"
                    aria-invalid={!!errors.message}
                  />
                  {errors.message && <p className="text-xs text-destructive">{errors.message}</p>}
                </div>
                <Button type="submit" variant="hero" size="lg" className="mt-7 w-full" disabled={sending}>
                  {sending ? "Sending…" : (
                    <>
                      Send message <Send className="size-4" />
                    </>
                  )}
                </Button>
              </form>
            </Reveal>

            {/* info */}
            <Reveal delay={0.1}>
              <div className="grid gap-4">
                <div className="glass grid gap-4 rounded-2xl p-6">
                  <InfoRow Icon={Mail} label="Email">
                    <a href={`mailto:${contactInfo.email}`} className="hover:text-foreground">
                      {contactInfo.email}
                    </a>
                  </InfoRow>
                  <InfoRow Icon={Phone} label="Phone">
                    <a
                      href={`tel:${contactInfo.phone.replace(/\s+/g, "")}`}
                      className="hover:text-foreground"
                    >
                      {contactInfo.phone}
                    </a>
                  </InfoRow>
                  <InfoRow Icon={MapPin} label="Address">
                    {contactInfo.address}
                  </InfoRow>
                  <InfoRow Icon={Clock} label="Office hours">
                    {contactInfo.hours}
                  </InfoRow>
                  <div className="flex gap-2 pt-1">
                    {socials.map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={s.label}
                        className="grid size-10 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-[var(--color-cyan)] hover:text-[var(--color-cyan)]"
                      >
                        <s.Icon className="size-4" />
                      </a>
                    ))}
                  </div>
                </div>

                <div className="glass overflow-hidden rounded-2xl">
                  <iframe
                    title="Campus location map"
                    src="https://www.openstreetmap.org/export/embed.html?bbox=75.79%2C22.68%2C75.90%2C22.76&layer=mapnik"
                    loading="lazy"
                    className="h-64 w-full border-0 opacity-90"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-[var(--color-surface)]">
        <div className="section-pad mx-auto max-w-3xl px-4 sm:px-6">
          <SectionHeading eyebrow="FAQ" title="Questions we get every semester" />
          <Accordion type="single" collapsible className="mt-12">
            {faqs.map((f) => (
              <AccordionItem key={f.q} value={f.q}>
                <AccordionTrigger className="text-left font-display">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  placeholder,
  type = "text",
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string | undefined;
  placeholder?: string | undefined;
  type?: string;
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        aria-invalid={!!error}
        onChange={(e) => onChange(e.target.value)}
      />
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

function InfoRow({
  Icon,
  label,
  children,
}: {
  Icon: React.ComponentType<{ className?: string }>;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-w-0 gap-3">
      <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-border text-[var(--color-cyan)]">
        <Icon className="size-4" />
      </span>
      <span className="min-w-0">
        <span className="block text-[11px] uppercase tracking-widest text-muted-foreground">
          {label}
        </span>
        <span className="block text-sm text-muted-foreground">{children}</span>
      </span>
    </div>
  );
}
