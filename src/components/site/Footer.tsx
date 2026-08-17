import { Link } from "@tanstack/react-router";
import { Github, Linkedin, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";
import logo from "@/lib/logo";
import { contactInfo } from "@/lib/mock";

const quickLinks = [
  { to: "/about", label: "About" },
  { to: "/team", label: "Team" },
  { to: "/events", label: "Events" },
  { to: "/achievements", label: "Achievements" },
  { to: "/testimonials", label: "Testimonials" },
  { to: "/contact", label: "Contact" },
] as const;

const socials = [
  { href: "https://github.com/stictechhub", label: "GitHub", Icon: Github },
  { href: "https://linkedin.com/company/stictechhub", label: "LinkedIn", Icon: Linkedin },
  { href: "https://instagram.com/stictechhub", label: "Instagram", Icon: Instagram },
  { href: "https://twitter.com/stictechhub", label: "X", Icon: Twitter },
];

export function Footer() {
  return (
    <footer className="mt-8 border-t border-border bg-[var(--color-surface)]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logo}
              alt="STIC logo"
              width={44}
              height={44}
              className="size-11 rounded-full"
            />
            <span>
              <span className="block font-display text-lg font-bold">STIC</span>
              <span className="block text-xs text-muted-foreground">
                Ideas today, innovation tomorrow.
              </span>
            </span>
          </Link>
          <p className="mt-5 max-w-md text-sm text-muted-foreground">
            A student-run technology and innovation community running hackathons, workshops and
            open-source projects across every branch on campus.
          </p>
          <div className="mt-6 flex gap-2">
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

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-widest">
            Quick Links
          </h3>
          <ul className="mt-4 grid gap-2 text-sm">
            {quickLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-muted-foreground transition-colors hover:text-foreground">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-widest">Contact</h3>
          <ul className="mt-4 grid gap-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 size-4 shrink-0 text-[var(--color-cyan)]" />
              <a href={`mailto:${contactInfo.email}`} className="hover:text-foreground">
                {contactInfo.email}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Phone className="mt-0.5 size-4 shrink-0 text-[var(--color-cyan)]" />
              <a href={`tel:${contactInfo.phone.replace(/\s+/g, "")}`} className="hover:text-foreground">
                {contactInfo.phone}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-[var(--color-cyan)]" />
              <span>{contactInfo.address}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} STIC. All rights reserved.</p>
          <p>Built by students, for students.</p>
        </div>
      </div>
    </footer>
  );
}
