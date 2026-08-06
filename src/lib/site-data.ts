import hackathonImg from "@/assets/event-hackathon.jpg";
import workshopImg from "@/assets/event-workshop.jpg";
import seminarImg from "@/assets/event-seminar.jpg";
import dashboardImg from "@/assets/project-dashboard.jpg";
import aiImg from "@/assets/project-ai.jpg";

export const eventImages = { hackathonImg, workshopImg, seminarImg };

export const stats = [
  { label: "Members", value: 1000, suffix: "+" },
  { label: "Events", value: 120, suffix: "+" },
  { label: "Workshops", value: 40, suffix: "+" },
  { label: "Technical Teams", value: 15, suffix: "+" },
];

export const technologies = [
  "Python",
  "Java",
  "C++",
  "AI",
  "Machine Learning",
  "Cloud",
  "Cybersecurity",
  "Web Development",
  "App Development",
  "UI/UX",
];

export const timeline = [
  {
    year: "2022",
    title: "Club Started",
    body: "STIC was founded by 24 students with a single lab, a whiteboard and a lot of ambition.",
  },
  {
    year: "2023",
    title: "First Hackathon",
    body: "HackSTIC 24h brought 300 builders together across 60 teams and 9 campuses.",
  },
  {
    year: "2024",
    title: "1000 Members",
    body: "Fifteen technical teams, weekly workshops and an open-source program crossed 1000 members.",
  },
  {
    year: "2025",
    title: "National Recognition",
    body: "Awarded Best Student Technical Community and partnered with industry research labs.",
  },
];

export type TeamGroup =
  | "President"
  | "Vice President"
  | "Content & Ideation"
  | "Graphics"
  | "Operations and Management"
  | "PR & Outreach"
  | "Technical"
  | "Videography and Editing"
  | "Techno Ambassador";

export type Member = {
  name: string;
  position: string;
  group: TeamGroup;
  branch: string;
  year: string;
  initials: string;
  linkedin: string;
  github: string;
  email: string;
};

const m = (
  name: string,
  position: string,
  group: TeamGroup,
  email: string,
  branch: string,
  year: string,
): Member => ({
  name,
  position,
  group,
  branch,
  year,
  email,
  initials: name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase(),
  linkedin: `https://linkedin.com/in/${name.toLowerCase().replace(/\s+/g, "-")}`,
  github: `https://github.com/${name.toLowerCase().replace(/\s+/g, "")}`,
});

export const team: Member[] = [
  m("Anurag Tiwari", "President", "President", "en24cs3010191@medicaps.ac.in", "B.Tech CSE", "3rd"),
  m("Kopal Hedau", "Vice President", "Vice President", "en24cs3010541@medicaps.ac.in", "B.Tech CSE", "3rd"),
  m("Vedant Beohar", "Vice President", "Vice President", "en24cs3040198@medicaps.ac.in", "B.Tech CSE", "3rd"),

  m("Yash Shukla", "Head", "Content & Ideation", "en24cs3011173@medicaps.ac.in", "B.Tech CSE", "3rd"),
  m("Manasvi Dariya", "Executive", "Content & Ideation", "en24cs3010603@medicaps.ac.in", "B.Tech CSE", "3rd"),
  m("Aanya Nayak", "Executive", "Content & Ideation", "en24cs3010003@medicaps.ac.in", "B.Tech CSE", "3rd"),
  m("Akanksha Sharma", "Executive", "Content & Ideation", "en24cs3010082@medicaps.ac.in", "B.Tech CSE", "3rd"),

  m("Divyanshi Pateria", "Head", "Graphics", "en24it3010035@medicaps.ac.in", "B.Tech IT", "3rd"),
  m("Ridhika Jangir", "Head", "Graphics", "en24cs3040143@medicaps.ac.in", "B.Tech CSE AI", "3rd"),
  m("Razeena Shaikh", "Executive", "Graphics", "en24cs3040142@medicaps.ac.in", "B.Tech CSE", "3rd"),
  m("Pratham Raghuvanshi", "Executive", "Graphics", "en24cs3010785@medicaps.ac.in", "B.Tech CSE", "3rd"),
  m("Yashi Sharma", "Executive", "Graphics", "en24cs3011180@medicaps.ac.in", "B.Tech CSE", "3rd"),
  m("Kanak Holkar", "Executive", "Graphics", "en24cs3010500@medicaps.ac.in", "B.Tech CSE", "3rd"),

  m("Arindam Dhali", "Head", "Operations and Management", "en24cs3010210@medicaps.ac.in", "B.Tech CSE", "3rd"),
  m("Shantanu Karkare", "Head", "Operations and Management", "en24cs3010947@medicaps.ac.in", "B.Tech CSE", "3rd"),
  m("Riddhi Patel", "Executive", "Operations and Management", "en25ca5030089@medicaps.ac.in", "MCA", "2nd"),
  m("Prakhar Gupta", "Executive", "Operations and Management", "en24cs3060038@medicaps.ac.in", "B.Tech CSBS", "3rd"),
  m("Nidhi Thakre", "Executive", "Operations and Management", "en24cs3010691@medicaps.ac.in", "B.Tech CSE", "3rd"),
  m("Arnav Verma", "Executive", "Operations and Management", "en24cs3010217@medicaps.ac.in", "B.Tech CSE", "3rd"),
  m("Anushka Patidar", "Executive", "Operations and Management", "en24cs3010194@medicaps.ac.in", "B.Tech CSE", "3rd"),
  m("Tanishq Jain", "Executive", "Operations and Management", "en24cs3011061@medicaps.ac.in", "B.Tech CSE", "3rd"),
  m("Lavisha Agrawal", "Executive", "Operations and Management", "en24cs3010588@medicaps.ac.in", "B.Tech CSE", "3rd"),
  m("Arshi Kaushal", "Executive", "Operations and Management", "en24cs3010225@medicaps.ac.in", "B.Tech CSE", "3rd"),

  m("Pratishtha Jaiswal", "Head", "PR & Outreach", "pratishthajaiswal7@gmail.com", "B.Tech Robotics & Automation", "3rd"),
  m("Varnika Kosta", "Executive", "PR & Outreach", "en24cs3011116@medicaps.ac.in", "B.Tech CSE", "3rd"),
  m("Shlok Thakur", "Executive", "PR & Outreach", "en24cs3011083@medicaps.ac.in", "B.Tech CSE", "3rd"),
  m("Divyani Kadam", "Executive", "PR & Outreach", "en24cs3060018@medicaps.ac.in", "B.Tech CSBS", "3rd"),
  m("Anushka Mahajan", "Executive", "PR & Outreach", "en24cs3010193@medicaps.ac.in", "B.Tech CSE", "3rd"),

  m("Piyush Kumar", "Head", "Technical", "en24cs3010738@medicaps.ac.in", "B.Tech CSE", "3rd"),
  m("Anushka Rathore", "Executive", "Technical", "en24cs3010195@medicaps.ac.in", "B.Tech CSE", "3rd"),
  m("Henil Mandge", "Executive", "Technical", "en25me3030013@medicaps.ac.in", "B.Tech Mechanical", "2nd"),
  m("Varenyam Sharma", "Executive", "Technical", "en24cs3011115@medicaps.ac.in", "B.Tech CSE", "3rd"),
  m("Rupal Jain", "Executive", "Technical", "en24cs3010885@medicaps.ac.in", "B.Tech CSE", "3rd"),

  m("Suyog Jadhav", "Executive", "Videography and Editing", "en25cs3090224@medicaps.ac.in", "B.Tech Advanced AI (IBM)", "2nd"),
  m("Rashi Bhayre", "Executive", "Videography and Editing", "en24cs3010838@medicaps.ac.in", "B.Tech CSE", "3rd"),
  m("Anuj Khodre", "Member", "Videography and Editing", "en25cs3060010@medicaps.ac.in", "B.Tech CSE", "2nd"),

  m("Vidhi Jain", "Head", "Techno Ambassador", "en25cs3011042@medicaps.ac.in", "B.Tech CSE", "2nd"),
  m("Rishika Retrekar", "Executive", "Techno Ambassador", "en25cs3030046@medicaps.ac.in", "B.Tech CSDS", "2nd"),
  m("Argho Biswas", "Executive", "Techno Ambassador", "en25cs3090031@medicaps.ac.in", "B.Tech Advanced AI (IBM)", "2nd"),
];

export const teamGroups: TeamGroup[] = [
  "President",
  "Vice President",
  "Content & Ideation",
  "Graphics",
  "Operations and Management",
  "PR & Outreach",
  "Technical",
  "Videography and Editing",
  "Techno Ambassador",
];

export type EventCategory =
  | "Hackathon"
  | "Workshop"
  | "Bootcamp"
  | "Seminar"
  | "Competition";

export const eventCategories: EventCategory[] = [
  "Hackathon",
  "Workshop",
  "Bootcamp",
  "Seminar",
  "Competition",
];

export type ClubEvent = {
  title: string;
  category: EventCategory;
  date: string;
  venue: string;
  description: string;
  image: string;
};

export const events: ClubEvent[] = [
  {
    title: "HackSTIC 3.0 — 36 Hour Build Sprint",
    category: "Hackathon",
    date: "Sep 12, 2026",
    venue: "Innovation Hall, Block C",
    description:
      "Three tracks, thirty-six hours, mentors from industry labs and a ₹2L prize pool for shipped products.",
    image: hackathonImg,
  },
  {
    title: "Neural Networks From Scratch",
    category: "Workshop",
    date: "Aug 22, 2026",
    venue: "AI Lab 204",
    description:
      "Build a working MLP in NumPy, then port it to PyTorch. Laptops required, no prior ML needed.",
    image: workshopImg,
  },
  {
    title: "Cloud Native Bootcamp",
    category: "Bootcamp",
    date: "Aug 05 – Aug 09, 2026",
    venue: "Seminar Hall 1",
    description:
      "Five evenings of containers, Kubernetes, CI/CD and observability with hands-on deployments.",
    image: dashboardImg,
  },
  {
    title: "Careers in Cybersecurity",
    category: "Seminar",
    date: "Jul 28, 2026",
    venue: "Main Auditorium",
    description:
      "Alumni security engineers on red teams, bug bounties and building a credible portfolio.",
    image: seminarImg,
  },
  {
    title: "CodeClash Algorithmic Cup",
    category: "Competition",
    date: "Jul 19, 2026",
    venue: "Programming Lab 3",
    description:
      "Two-hour ICPC-style contest with live leaderboard, editorial session and campus rankings.",
    image: aiImg,
  },
  {
    title: "UI/UX Design Jam",
    category: "Workshop",
    date: "Jul 06, 2026",
    venue: "Design Studio",
    description:
      "From wireframe to prototype in one afternoon — critique-driven, Figma-first, portfolio ready.",
    image: workshopImg,
  },
];

export type GalleryCategory = "Events" | "Hackathons" | "Workshops" | "Team";

export const galleryCategories: GalleryCategory[] = [
  "Events",
  "Hackathons",
  "Workshops",
  "Team",
];

export const gallery = [
  { src: hackathonImg, caption: "HackSTIC 2.0 final hours", category: "Hackathons" as GalleryCategory, span: "tall" },
  { src: workshopImg, caption: "Neural nets workshop", category: "Workshops" as GalleryCategory, span: "short" },
  { src: seminarImg, caption: "Cybersecurity seminar", category: "Events" as GalleryCategory, span: "short" },
  { src: aiImg, caption: "AI research showcase", category: "Events" as GalleryCategory, span: "tall" },
  { src: dashboardImg, caption: "Cloud bootcamp demos", category: "Workshops" as GalleryCategory, span: "short" },
  { src: hackathonImg, caption: "Core team night shift", category: "Team" as GalleryCategory, span: "short" },
  { src: workshopImg, caption: "Open source Saturday", category: "Workshops" as GalleryCategory, span: "tall" },
  { src: seminarImg, caption: "Annual tech fest", category: "Events" as GalleryCategory, span: "short" },
  { src: aiImg, caption: "Winning team, HackSTIC", category: "Hackathons" as GalleryCategory, span: "short" },
];

export const projects = [
  {
    title: "CampusPulse",
    description:
      "Real-time campus analytics dashboard tracking event attendance, club growth and lab utilisation.",
    stack: ["React", "TypeScript", "Node", "PostgreSQL"],
    image: dashboardImg,
    github: "https://github.com/stic/campuspulse",
    demo: "https://campuspulse.stic.edu",
  },
  {
    title: "LectureLens",
    description:
      "Transformer-based lecture summariser that turns recordings into searchable notes and flashcards.",
    stack: ["Python", "PyTorch", "FastAPI"],
    image: aiImg,
    github: "https://github.com/stic/lecturelens",
    demo: "https://lecturelens.stic.edu",
  },
  {
    title: "SafeNet Scanner",
    description:
      "Automated web vulnerability scanner used by the security team for internal campus audits.",
    stack: ["Go", "Docker", "Redis"],
    image: seminarImg,
    github: "https://github.com/stic/safenet",
    demo: "https://safenet.stic.edu",
  },
  {
    title: "HackDesk",
    description:
      "Hackathon operations platform: team formation, judging rubrics, live scoring and submissions.",
    stack: ["Next.js", "Supabase", "Tailwind"],
    image: hackathonImg,
    github: "https://github.com/stic/hackdesk",
    demo: "https://hackdesk.stic.edu",
  },
  {
    title: "LabQueue",
    description:
      "Mobile-first slot booking for the robotics and fabrication labs with hardware inventory tracking.",
    stack: ["Flutter", "Firebase"],
    image: workshopImg,
    github: "https://github.com/stic/labqueue",
    demo: "https://labqueue.stic.edu",
  },
  {
    title: "OpenSyllabus",
    description:
      "Community-maintained roadmap of curated resources for every CS course on campus.",
    stack: ["Astro", "MDX", "Cloudflare"],
    image: dashboardImg,
    github: "https://github.com/stic/opensyllabus",
    demo: "https://opensyllabus.stic.edu",
  },
];

export const resources = [
  {
    title: "DSA Roadmap 2026",
    type: "Roadmap",
    description: "Twelve-week structured path from arrays to graphs with 300 curated problems.",
    link: "#",
  },
  {
    title: "Machine Learning Starter Kit",
    type: "Notebook Pack",
    description: "Colab notebooks covering regression, CNNs and transformers with campus datasets.",
    link: "#",
  },
  {
    title: "Cloud & DevOps Handbook",
    type: "Guide",
    description: "Docker, Kubernetes and CI/CD reference written by the STIC cloud team.",
    link: "#",
  },
  {
    title: "Interview Prep Vault",
    type: "Archive",
    description: "Question banks and alumni experiences from 40+ product and research interviews.",
    link: "#",
  },
  {
    title: "Design Systems Primer",
    type: "Guide",
    description: "Tokens, typography and accessibility fundamentals for student product teams.",
    link: "#",
  },
  {
    title: "Open Source Onboarding",
    type: "Playbook",
    description: "How to pick an issue, write a good PR and land your first upstream contribution.",
    link: "#",
  },
];

export const blogs = [
  {
    title: "How we ran a 36-hour hackathon for 300 students",
    author: "Meera Nair",
    date: "Jul 14, 2026",
    readTime: "8 min",
    tag: "Community",
    excerpt:
      "Logistics, mentor rotas, judging rubrics and the spreadsheet that nearly broke us — a full retrospective.",
  },
  {
    title: "Fine-tuning small language models on a student budget",
    author: "Ananya Verma",
    date: "Jun 30, 2026",
    readTime: "11 min",
    tag: "AI/ML",
    excerpt:
      "LoRA, quantisation and colab-only training runs that still beat the baseline on our campus QA set.",
  },
  {
    title: "Shipping our first Kubernetes cluster on campus",
    author: "Yash Kulkarni",
    date: "Jun 12, 2026",
    readTime: "9 min",
    tag: "Cloud",
    excerpt:
      "What we learned wiring up ingress, secrets and observability for student projects in production.",
  },
  {
    title: "A practical guide to your first CTF",
    author: "Nikhil Bose",
    date: "May 28, 2026",
    readTime: "6 min",
    tag: "Security",
    excerpt:
      "Tooling, categories and the mindset shift that took our team from last place to the top 20.",
  },
];

export const sponsors = [
  { name: "Northwind Cloud", tier: "Platinum" },
  { name: "Kernel Labs", tier: "Platinum" },
  { name: "Vertex AI Systems", tier: "Gold" },
  { name: "ByteForge", tier: "Gold" },
  { name: "Helix Security", tier: "Silver" },
  { name: "OpenGrid", tier: "Silver" },
  { name: "Nimbus Data", tier: "Silver" },
  { name: "Quantum Reply", tier: "Community" },
];

export const faqs = [
  {
    q: "Who can join STIC?",
    a: "Any enrolled student, from any branch or year. Curiosity is the only prerequisite — we run beginner tracks every semester.",
  },
  {
    q: "Is there a membership fee?",
    a: "Core membership is free. Some multi-day bootcamps carry a small materials fee, always announced upfront.",
  },
  {
    q: "How do I join a technical team?",
    a: "Fill the join form, pick up to two interest areas, then attend the onboarding sprint held at the start of each semester.",
  },
  {
    q: "Can companies collaborate with the club?",
    a: "Yes — we host sponsored workshops, hiring sessions and research collaborations. Reach out via the sponsorship form.",
  },
  {
    q: "Do you support first-year students with no experience?",
    a: "Absolutely. Our Foundations track starts from the terminal and Git, and every member gets a senior buddy.",
  },
];