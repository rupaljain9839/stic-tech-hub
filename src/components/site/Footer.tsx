import { Link } from "@tanstack/react-router";
import { Github, Linkedin, Instagram, Twitter, Mail, Heart } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import logoAsset from "@/assets/stic-logo.jpg.asset.json";
const logo = logoAsset.url;
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const quickLinks = [
  { to: "/about", label: "About" },
  { to: "/events", label: "Events" },
  { to: "/team", label: "Team" },
  { to: "/projects", label: "Projects" },
  { to: "/resources", label: "Resources" },
  { to: "/sponsors", label: "Sponsors" },
  { to: "/gallery", label: "Gallery" },
  { to: "/blogs", label: "Blogs" },
] as const;

const socials = [
  { href: "https://github.com/stic", label: "GitHub", Icon: Github },
  { href: "https://linkedin.com/company/stic", label: "LinkedIn", Icon: Linkedin },
  { href: "https://instagram.com/stic", label: "Instagram", Icon: Instagram },
  { href: "https://twitter.com/stic", label: "X", Icon: Twitter },
];

export function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="relative mt-24 border-t border-border bg-[var(--color-surface)]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-4">
        <div>
          <Link to="/" className="flex items-center gap-2.5">
            <img src={logo} alt="STIC logo" width={36} height={36} loading="lazy" className="h-9 w-9" />
            <span className="font-display text-lg font-bold">STIC</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            Student Technical Innovation Club — building engineers, shipping projects and growing a
            campus culture of open technology.
          </p>
          <div className="mt-5 flex gap-2">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noreferrer"
                className="grid size-9 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-[var(--color-cyan)] hover:text-foreground"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Quick Links
          </h3>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">
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
          <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Reach Us
          </h3>
          <ul className="mt-4 grid gap-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <Mail className="size-4 shrink-0" /> hello@stic.edu
            </li>
            <li>Dept. of Computer Science</li>
            <li>Innovation Block C, University Campus</li>
            <li>+91 98765 43210</li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Newsletter
          </h3>
          <p className="mt-4 text-sm text-muted-foreground">
            Monthly digest: events, resources and project drops.
          </p>
          <form
            className="mt-4 flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
                toast.error("Enter a valid email address");
                return;
              }
              toast.success("Subscribed! Check your inbox for a confirmation.");
              setEmail("");
            }}
          >
            <Input
              type="email"
              value={email}
              maxLength={255}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@university.edu"
              aria-label="Email address"
            />
            <Button type="submit" variant="hero">
              Join
            </Button>
          </form>
        </div>
      </div>

      <div className="border-t border-border px-4 py-6 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} STIC — Student Technical Innovation Club.</p>
          <p className="flex items-center gap-1.5">
            Made with <Heart className="size-3.5 text-[var(--color-purple)]" /> by STIC
          </p>
        </div>
      </div>
    </footer>
  );
}
