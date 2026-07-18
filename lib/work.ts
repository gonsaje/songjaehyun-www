export type WorkItem = {
  title: string;
  eyebrow: string;
  summary: string;
  details: string;
  outcomes: string[];
  stack: string[];
  href?: string;
  linkLabel?: string;
};

export const workItems: WorkItem[] = [
  {
    title: "DontSweat.Tech",
    eyebrow: "Independent software practice",
    summary:
      "A software engineering practice for businesses that need to design, build, stabilize, and ship clear working systems.",
    details:
      "I use DontSweat.Tech as the home for hands-on client work across product development, architecture, cloud infrastructure, integrations, performance, and technical leadership.",
    outcomes: [
      "Turn ambiguous business needs into practical delivery plans",
      "Build across frontend, backend, data, and deployment boundaries",
      "Leave clients with clearer systems, ownership, and operating paths",
    ],
    stack: ["Product engineering", "System architecture", "AWS", "Technical leadership"],
    href: "https://dontsweat.tech/",
    linkLabel: "Visit DontSweat.Tech",
  },
  {
    title: "Vye Coconut Water",
    eyebrow: "Client ecommerce launch",
    summary:
      "A modern ecommerce presence for Vye Brands Inc., delivered with the launch infrastructure around it.",
    details:
      "The project connected a polished customer experience with Stripe checkout, transactional email, store-location maps, domain migration, DNS cleanup, and email deliverability. I treated those pieces as one coordinated release instead of separate handoffs.",
    outcomes: [
      "Customer-ready storefront and Stripe-backed checkout",
      "Resend-powered email and Leaflet store-location experiences",
      "A coordinated domain, DNS, and mail migration",
    ],
    stack: ["Next.js", "TypeScript", "Stripe", "Resend", "Leaflet", "Vercel"],
    href: "https://drinkvye.com/",
    linkLabel: "Visit drinkvye.com",
  },
  {
    title: "Farero",
    eyebrow: "Workforce coordination SaaS",
    summary:
      "A multi-organization workforce platform for schedules, timekeeping, reporting, and day-to-day team coordination.",
    details:
      "Farero brings calendar workflows, client and team management, role-aware timesheets, PDF reporting, notifications, and structured quick intake into one operational product. The backend emphasizes tenant boundaries, explicit review flows, and production-minded rollout controls.",
    outcomes: [
      "Multi-team identity and role-aware access boundaries",
      "Timesheet, scheduling, reporting, and client-site workflows",
      "Encrypted intake drafts with review-before-commit behavior",
    ],
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Auth.js", "Resend"],
    href: "https://github.com/gonsaje/farero",
    linkLabel: "View Farero on GitHub",
  },
  {
    title: "Jumun",
    eyebrow: "Wholesale ordering platform",
    summary:
      "A wholesale commerce system with separate retailer, operations, and API applications inside one coordinated product architecture.",
    details:
      "I structured Jumun as independently deployable storefront and admin frontends backed by a Spring Boot modular monolith. Shared design primitives and an OpenAPI-generated client keep the product coherent without coupling every release.",
    outcomes: [
      "Separate retailer and administrative experiences",
      "Domain-oriented Spring Boot API with PostgreSQL and Flyway",
      "Independent AWS delivery paths for frontend and backend workloads",
    ],
    stack: ["Next.js", "Spring Boot", "Java", "PostgreSQL", "S3", "CloudFront", "ECS"],
  },
  {
    title: "Enterprise platform delivery",
    eyebrow: "Migrations, AEM, and reliability",
    summary:
      "Large-scale platform work shaped around content operations, governance, accessibility, security, and release constraints.",
    details:
      "My enterprise work includes moving on-premise platforms toward cloud-native delivery, refactoring more than 40 backend services, building AEM components, and designing cache behavior across Apache, Dispatcher, and CDN layers while keeping releases available and supportable.",
    outcomes: [
      "AEM migrations and reusable component implementation",
      "Cloud delivery and zero-downtime release planning",
      "WCAG-aware frontend work, security hardening, and production support",
    ],
    stack: ["Java", "AEMaaCS", "Spring Boot", "Dispatcher", "Apache", "React", "CI/CD"],
  },
];
