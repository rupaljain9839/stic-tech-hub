/**
 * Mock content for the STIC frontend.
 * Everything here is sample data — no backend calls anywhere.
 */
import hackathonImg from "@/assets/event-hackathon.jpg";
import workshopImg from "@/assets/event-workshop.jpg";
import seminarImg from "@/assets/event-seminar.jpg";
import dashboardImg from "@/assets/project-dashboard.jpg";
import aiImg from "@/assets/project-ai.jpg";

const gallery = [hackathonImg, workshopImg, seminarImg, aiImg, dashboardImg];

/** Deterministic placeholder banner when no real artwork exists. */
export const placeholderImage = (seed: string, i = 0) =>
  gallery[i % gallery.length] ?? `https://picsum.photos/seed/${seed}/1200/800`;

export const avatarFor = (name: string) =>
  `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundType=gradientLinear&fontWeight=600`;

/* ------------------------------------------------------------------ stats */

export const heroStats = [
  { label: "Total Members", value: 1240, suffix: "+" },
  { label: "Events Conducted", value: 128, suffix: "+" },
  { label: "Projects Built", value: 76, suffix: "" },
  { label: "Achievements", value: 42, suffix: "" },
];

export const technologies = [
  "Python",
  "TypeScript",
  "React",
  "Machine Learning",
  "Cloud Native",
  "Cybersecurity",
  "IoT",
  "UI / UX",
  "Blockchain",
  "DevOps",
];

/* --------------------------------------------------------------- features */

export const features = [
  {
    icon: "Lightbulb",
    title: "Innovation",
    body: "Idea labs, rapid prototyping weekends and a maker space where concepts turn into working demos.",
  },
  {
    icon: "Users",
    title: "Collaboration",
    body: "Cross-branch squads pairing designers, developers and hardware folks on one shared roadmap.",
  },
  {
    icon: "GraduationCap",
    title: "Learning",
    body: "Structured tracks, weekly hands-on sessions and mentor reviews on everything you ship.",
  },
  {
    icon: "Target",
    title: "Leadership",
    body: "Own a team, run an event, mentor juniors — real responsibility with real support behind it.",
  },
] as const;

/* ------------------------------------------------------------------- team */

export type TeamMember = {
  id: string;
  name: string;
  designation: string;
  role: TeamRole;
  department: string;
  bio: string;
  email: string;
  linkedin: string;
  photo: string;
};

export type TeamRole =
  | "Faculty"
  | "Leadership"
  | "Technical"
  | "Design"
  | "Events"
  | "Marketing"
  | "Core Team";

export const teamRoles: TeamRole[] = [
  "Faculty",
  "Leadership",
  "Technical",
  "Design",
  "Events",
  "Marketing",
  "Core Team",
];

const member = (
  name: string,
  designation: string,
  role: TeamRole,
  department: string,
  bio: string,
): TeamMember => ({
  id: name.toLowerCase().replace(/\s+/g, "-"),
  name,
  designation,
  role,
  department,
  bio,
  email: `${name.split(" ")[0]!.toLowerCase()}@stictechhub.edu`,
  linkedin: `https://linkedin.com/in/${name.toLowerCase().replace(/\s+/g, "-")}`,
  photo: avatarFor(name),
});

export const team: TeamMember[] = [
  member(
    "Dr. Ananya Deshmukh",
    "Faculty Coordinator",
    "Faculty",
    "Computer Science & Engineering",
    "Guides club strategy and industry partnerships. Researches applied ML and edge computing.",
  ),
  member(
    "Rohan Mehta",
    "President",
    "Leadership",
    "Computer Science & Engineering",
    "Runs the club roadmap and campus-wide programs. Full-stack engineer and hackathon regular.",
  ),
  member(
    "Isha Kulkarni",
    "Vice President",
    "Leadership",
    "Information Technology",
    "Coordinates departments and mentorship circles. Loves systems design and public speaking.",
  ),
  member(
    "Aditya Rane",
    "Technical Lead",
    "Technical",
    "Computer Science & Engineering",
    "Leads the build teams across web, AI and cloud. Maintains the club's open-source repos.",
  ),
  member(
    "Sanya Bhatt",
    "Design Lead",
    "Design",
    "Design & Media",
    "Owns the visual system, event branding and product UX reviews for every club project.",
  ),
  member(
    "Kabir Nair",
    "Event Coordinator",
    "Events",
    "Electronics & Communication",
    "Plans hackathons and workshops end to end — venues, sponsors, schedules and logistics.",
  ),
  member(
    "Meera Iyer",
    "Marketing Lead",
    "Marketing",
    "Business Administration",
    "Handles outreach, social storytelling and collaborations with student communities.",
  ),
  member(
    "Arjun Saxena",
    "Core Member — Backend",
    "Core Team",
    "Computer Science & Engineering",
    "Builds APIs and internal tooling. Ask him about Postgres, queues and observability.",
  ),
  member(
    "Nikita Joshi",
    "Core Member — ML",
    "Core Team",
    "Artificial Intelligence & Data Science",
    "Works on vision models and dataset pipelines for club research submissions.",
  ),
  member(
    "Devansh Patel",
    "Core Member — Cloud",
    "Core Team",
    "Information Technology",
    "Runs deployments and CI for club products. Cloud certified and infra obsessed.",
  ),
  member(
    "Riya Kapoor",
    "Core Member — Content",
    "Core Team",
    "Computer Science & Engineering",
    "Writes technical blogs, event recaps and the club's weekly newsletter.",
  ),
  member(
    "Yash Verma",
    "Core Member — Robotics",
    "Core Team",
    "Mechanical Engineering",
    "Builds autonomous rovers and drone prototypes with the hardware squad.",
  ),
];

/* ----------------------------------------------------------------- events */

export type EventStatus = "upcoming" | "ongoing" | "past";

export type ClubEvent = {
  id: string;
  title: string;
  status: EventStatus;
  category: string;
  date: string;
  venue: string;
  description: string;
  details: string;
  image: string;
  seats: string;
};

export const eventCategories = ["Hackathon", "Workshop", "Bootcamp", "Seminar", "Competition"];

export const events: ClubEvent[] = [
  {
    id: "hackstic-4",
    title: "HackSTIC 4.0 — 36 Hour Build Sprint",
    status: "upcoming",
    category: "Hackathon",
    date: "Sep 12, 2026",
    venue: "Innovation Hall, Block C",
    description:
      "Three tracks, thirty-six hours and mentors from industry labs judging shipped products.",
    details:
      "Teams of up to four build across AI, sustainability and campus-tech tracks. Overnight access, free meals, hardware lending desk and a ₹2L prize pool. Mentor checkpoints every six hours keep teams unblocked.",
    image: placeholderImage("hackstic", 0),
    seats: "400 seats",
  },
  {
    id: "genai-bootcamp",
    title: "Generative AI Bootcamp",
    status: "upcoming",
    category: "Bootcamp",
    date: "Sep 28 – Oct 2, 2026",
    venue: "AI Lab 204",
    description:
      "Five evenings from tokenizers to a deployed retrieval-augmented assistant of your own.",
    details:
      "Day one covers embeddings and vector stores, day three covers evaluation, and the final evening is a demo night where every participant ships a working assistant. Laptops required, no prior ML needed.",
    image: placeholderImage("genai", 3),
    seats: "120 seats",
  },
  {
    id: "product-design-jam",
    title: "Product Design Jam",
    status: "upcoming",
    category: "Workshop",
    date: "Oct 14, 2026",
    venue: "Design Studio, Library Wing",
    description:
      "A one-day sprint from problem statement to clickable prototype with critique rounds.",
    details:
      "Run in pairs using a real campus problem brief. Covers research framing, low-fidelity wireframes, design tokens and a live critique panel from senior designers and alumni.",
    image: placeholderImage("design", 1),
    seats: "80 seats",
  },
  {
    id: "cloud-week",
    title: "Cloud Native Week",
    status: "ongoing",
    category: "Workshop",
    date: "Aug 8 – Aug 14, 2026",
    venue: "Lab 301 & Online",
    description:
      "Containers, pipelines and observability — one focused session every evening this week.",
    details:
      "Hands-on labs on Docker, GitHub Actions, Kubernetes basics and tracing. Each attendee deploys a service and instruments it before the week ends.",
    image: placeholderImage("cloud", 4),
    seats: "In progress",
  },
  {
    id: "cp-ladder",
    title: "Competitive Programming Ladder",
    status: "ongoing",
    category: "Competition",
    date: "Rolling — Aug 2026",
    venue: "Online Arena",
    description: "A four-week rated ladder with weekly contests and editorial breakdowns.",
    details:
      "Weekly problem sets ramp from implementation to graphs and DP. Editorials drop every Sunday and the top ten climbers get placement mentorship sessions.",
    image: placeholderImage("cp", 2),
    seats: "Open entry",
  },
  {
    id: "cyber-seminar",
    title: "Offensive Security Seminar",
    status: "past",
    category: "Seminar",
    date: "Jul 19, 2026",
    venue: "Auditorium A",
    description: "A live red-team walkthrough of web exploitation and hardening practices.",
    details:
      "Guest speakers from a security consultancy demonstrated real attack chains against a lab target, then walked through mitigations and secure defaults.",
    image: placeholderImage("cyber", 2),
    seats: "320 attended",
  },
  {
    id: "iot-makeathon",
    title: "IoT Makeathon",
    status: "past",
    category: "Hackathon",
    date: "Apr 6, 2026",
    venue: "Robotics Lab",
    description: "Sensor-to-dashboard builds using loaned microcontroller kits.",
    details:
      "Eighteen teams built air-quality monitors, smart irrigation rigs and campus occupancy trackers, with live dashboards judged on reliability and cost.",
    image: placeholderImage("iot", 4),
    seats: "18 teams",
  },
  {
    id: "open-source-day",
    title: "Open Source Contribution Day",
    status: "past",
    category: "Workshop",
    date: "Feb 22, 2026",
    venue: "Block C Atrium",
    description: "First pull requests, reviewed live by maintainers on campus.",
    details:
      "Attendees picked good-first-issues from curated repos and shipped 94 merged pull requests across the day with maintainer office hours running throughout.",
    image: placeholderImage("oss", 1),
    seats: "210 attended",
  },
];

/* ----------------------------------------------------------- achievements */

export const achievementCategories = [
  "Hackathons",
  "Competitions",
  "Certifications",
  "Research",
  "Club Milestones",
] as const;

export type Achievement = {
  id: string;
  title: string;
  description: string;
  date: string;
  category: (typeof achievementCategories)[number];
  image: string;
};

export const achievements: Achievement[] = [
  {
    id: "smart-india",
    title: "Smart India Hackathon — National Winner",
    description:
      "Team Vega won the national grand finale with a low-cost flood early-warning network.",
    date: "Jun 2026",
    category: "Hackathons",
    image: placeholderImage("sih", 0),
  },
  {
    id: "hack-asia",
    title: "HackAsia Regionals — 2nd Place",
    description: "An accessibility-first campus navigation app placed second among 190 teams.",
    date: "Apr 2026",
    category: "Hackathons",
    image: placeholderImage("hackasia", 1),
  },
  {
    id: "icpc",
    title: "ICPC Regionals Qualification",
    description: "Two club teams qualified for the regional round after topping the online prelims.",
    date: "Mar 2026",
    category: "Competitions",
    image: placeholderImage("icpc", 2),
  },
  {
    id: "robocon",
    title: "RoboCon Finalists",
    description: "The hardware squad's autonomous rover reached the national finals in its debut year.",
    date: "Feb 2026",
    category: "Competitions",
    image: placeholderImage("robocon", 3),
  },
  {
    id: "cloud-certs",
    title: "120+ Cloud Certifications",
    description:
      "Members cleared associate-level cloud certifications through the club's study cohort.",
    date: "Jan 2026",
    category: "Certifications",
    image: placeholderImage("certs", 4),
  },
  {
    id: "security-certs",
    title: "40 Security+ Certified Members",
    description: "A guided six-week track took forty members through their first security exam.",
    date: "Dec 2025",
    category: "Certifications",
    image: placeholderImage("sec", 2),
  },
  {
    id: "paper-ieee",
    title: "IEEE Paper Accepted",
    description:
      "Two students published on lightweight vision models for low-power campus devices.",
    date: "Nov 2025",
    category: "Research",
    image: placeholderImage("ieee", 3),
  },
  {
    id: "patent",
    title: "Patent Filed — Smart Energy Meter",
    description: "A student-built metering design entered the national patent filing process.",
    date: "Oct 2025",
    category: "Research",
    image: placeholderImage("patent", 4),
  },
  {
    id: "members-1000",
    title: "1000 Members Milestone",
    description: "The club crossed a thousand active members across every branch on campus.",
    date: "Aug 2025",
    category: "Club Milestones",
    image: placeholderImage("members", 0),
  },
  {
    id: "best-community",
    title: "Best Student Technical Community",
    description: "Recognised at the state technology summit for community impact and consistency.",
    date: "May 2025",
    category: "Club Milestones",
    image: placeholderImage("community", 1),
  },
  {
    id: "incubation",
    title: "Two Startups Incubated",
    description: "Club projects graduated into the university incubator with seed grants.",
    date: "Mar 2025",
    category: "Club Milestones",
    image: placeholderImage("startup", 2),
  },
];

export const achievementTimeline = [
  { year: "2022", title: "Club founded", body: "Twenty-four students, one lab and a whiteboard." },
  { year: "2023", title: "First hackathon", body: "300 builders across 60 teams joined HackSTIC 1.0." },
  { year: "2024", title: "Ten departments", body: "Technical, design, content and outreach verticals formed." },
  { year: "2025", title: "National recognition", body: "Best Student Technical Community award." },
  { year: "2026", title: "Research & patents", body: "First IEEE publication and patent filing." },
];

export const achievementCounters = [
  { label: "Awards Won", value: 42, suffix: "" },
  { label: "Hackathons Entered", value: 65, suffix: "+" },
  { label: "Certifications", value: 160, suffix: "+" },
  { label: "Papers & Patents", value: 8, suffix: "" },
];

/* ----------------------------------------------------------- testimonials */

export type TestimonialGroup = "Students" | "Alumni" | "Faculty";

export type Testimonial = {
  id: string;
  name: string;
  designation: string;
  group: TestimonialGroup;
  rating: number;
  feedback: string;
  photo: string;
};

const testimonial = (
  name: string,
  designation: string,
  group: TestimonialGroup,
  rating: number,
  feedback: string,
): Testimonial => ({
  id: name.toLowerCase().replace(/\s+/g, "-"),
  name,
  designation,
  group,
  rating,
  feedback,
  photo: avatarFor(name),
});

export const testimonials: Testimonial[] = [
  testimonial(
    "Ritika Sharma",
    "3rd Year, CSE",
    "Students",
    5,
    "I joined knowing nothing beyond classroom Java. Eight months later I had shipped two products and won my first hackathon. The mentorship here is unreal.",
  ),
  testimonial(
    "Aman Gupta",
    "2nd Year, IT",
    "Students",
    5,
    "The weekly build sessions forced me to finish things instead of collecting tutorials. My GitHub finally looks like an engineer's.",
  ),
  testimonial(
    "Sneha Pillai",
    "4th Year, AI & DS",
    "Students",
    4,
    "The research circle helped me co-author a paper as an undergrad. Reviews were tough but genuinely kind.",
  ),
  testimonial(
    "Harsh Vardhan",
    "3rd Year, ECE",
    "Students",
    5,
    "Hardware people usually get ignored in tech clubs. Here the robotics squad had budget, space and teammates who cared.",
  ),
  testimonial(
    "Nandini Rao",
    "Alumna '24 — SDE at a product firm",
    "Alumni",
    5,
    "Every interview loop I cleared traced back to projects I built in this club. It was my real curriculum.",
  ),
  testimonial(
    "Vikram Shetty",
    "Alumnus '23 — Founder, DevTools startup",
    "Alumni",
    5,
    "I met my co-founder at a club demo night. The culture of shipping in public is exactly what startups need.",
  ),
  testimonial(
    "Pooja Menon",
    "Alumna '22 — Cloud Engineer",
    "Alumni",
    4,
    "The cloud cohort gave me certifications and, more importantly, the confidence to run production systems.",
  ),
  testimonial(
    "Dr. Ananya Deshmukh",
    "Faculty Coordinator, CSE",
    "Faculty",
    5,
    "In four years this group has become the most reliable student body on campus — organised, ambitious and remarkably self-driven.",
  ),
  testimonial(
    "Prof. Rajeev Khanna",
    "Head, Information Technology",
    "Faculty",
    5,
    "Their workshops consistently raise the practical skill floor of an entire batch. Industry partners notice.",
  ),
  testimonial(
    "Dr. Sunita Verma",
    "Associate Professor, AI & DS",
    "Faculty",
    4,
    "Students arrive at my research lab already knowing how to read a paper and build a baseline. That's the club's doing.",
  ),
];

/* ------------------------------------------------------------------- misc */

export const contactInfo = {
  email: "hello@stictechhub.edu",
  phone: "+91 98765 43210",
  address: "Innovation Hall, Block C, Department of Computer Science, University Campus",
  hours: "Mon – Fri · 10:00 AM – 6:00 PM",
};

export const faqs = [
  {
    q: "Who can join STIC?",
    a: "Any enrolled student, from any branch or year. There is no entrance test — only a short interest form and a willingness to build.",
  },
  {
    q: "Is there a membership fee?",
    a: "Core membership is free. A few hardware-heavy bootcamps carry a small materials fee, always announced upfront.",
  },
  {
    q: "Do I need prior coding experience?",
    a: "No. Beginner tracks start from fundamentals with senior mentors paired to each cohort.",
  },
  {
    q: "How do I propose an event or project?",
    a: "Send a two-paragraph pitch to the club email. Proposals are reviewed every fortnight by the coordinating team.",
  },
  {
    q: "Can companies collaborate with the club?",
    a: "Yes — we host sponsored hackathons, guest sessions and recruiting demo days. Reach out through the contact form.",
  },
];

/* ------------------------------------------------------- admin mock rows */

export const adminStats = [
  { label: "Total Members", value: 1240, delta: "+38 this month" },
  { label: "Total Events", value: 128, delta: "3 upcoming" },
  { label: "Total Achievements", value: 42, delta: "+2 this quarter" },
  { label: "Total Testimonials", value: 96, delta: "+11 pending review" },
];
