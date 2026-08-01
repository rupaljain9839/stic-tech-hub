import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { cn } from "@/lib/utils";

/** Reveals children on scroll into view. */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  return (
    <Reveal className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      {eyebrow && (
        <span className="inline-flex items-center rounded-full border border-border px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-cyan)]">
          {eyebrow}
        </span>
      )}
      <h2 className="mt-4 text-balance text-3xl font-bold sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-3 text-pretty text-muted-foreground">{subtitle}</p>}
    </Reveal>
  );
}

export function Counter({
  value,
  suffix = "",
  className,
}: {
  value: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let frame = 0;
    const total = 60;
    const tick = () => {
      frame += 1;
      const eased = 1 - Math.pow(1 - frame / total, 3);
      setDisplay(Math.round(value * eased));
      if (frame < total) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value]);

  return (
    <span ref={ref} className={className}>
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}

export function TypingEffect({ words, className }: { words: string[]; className?: string }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index % words.length] ?? "";

    const done = !deleting && text === word;
    const empty = deleting && text === "";
    const timeout = setTimeout(
      () => {
        if (done) return setDeleting(true);
        if (empty) {
          setDeleting(false);
          setIndex((i) => i + 1);
          return;
        }
        setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1));
      },
      done ? 1600 : deleting ? 40 : 75,
    );
    return () => clearTimeout(timeout);
  }, [text, deleting, index, words]);

  return (
    <span className={className}>
      <span className="gradient-text">{text}</span>
      <span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] animate-blink bg-[var(--color-cyan)]" />
    </span>
  );
}

/** Soft animated gradient blobs + particle field for hero/section backgrounds. */
export function AuroraBackground({ particles = 26 }: { particles?: number }) {
  const dots = Array.from({ length: particles }, (_, i) => ({
    left: `${(i * 37) % 100}%`,
    top: `${(i * 53) % 100}%`,
    delay: `${(i % 9) * 0.7}s`,
    duration: `${8 + (i % 7) * 2}s`,
    size: i % 5 === 0 ? 3 : 2,
  }));

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="absolute -left-40 -top-32 size-[34rem] animate-float-slow rounded-full bg-primary/25 blur-[110px]" />
      <div className="absolute -right-32 top-10 size-[30rem] animate-float-slower rounded-full bg-[var(--color-cyan)]/20 blur-[120px]" />
      <div className="absolute bottom-[-12rem] left-1/3 size-[32rem] animate-float-slow rounded-full bg-[var(--color-purple)]/25 blur-[130px]" />
      <div className="absolute inset-0 opacity-[0.16] [background-image:linear-gradient(to_right,color-mix(in_oklab,var(--color-cyan)_45%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklab,var(--color-cyan)_45%,transparent)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]" />
      {dots.map((d, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-[var(--color-cyan)]/70 animate-float-slow"
          style={{
            left: d.left,
            top: d.top,
            width: d.size,
            height: d.size,
            animationDelay: d.delay,
            animationDuration: d.duration,
          }}
        />
      ))}
    </div>
  );
}
