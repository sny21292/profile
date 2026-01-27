// Static portfolio data - edit this file to update your projects and skills

export interface Project {
  id: number;
  title: string;
  description: string; // Short description for card
  detailedDescription?: string; // Full detailed description
  keyFeatures?: string[]; // Key technical implementations
  technologies?: string[]; // Technologies used (separate from tags for detailed view)
  impact?: string; // Impact/Results
  imageUrl: string;
  liveLink?: string | null;
  githubLink?: string | null;
  tags: string[];
  category: string;
  featured?: boolean | null;
}

export interface Skill {
  id: number;
  name: string;
  category: string;
  proficiency: number;
  icon?: string | null;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Dating Website & App",
    description: "Full-stack dating platform with real-time messaging, admin panels, and advertiser management system.",
    detailedDescription: "A comprehensive dating website and mobile app featuring custom theme development and seamless app integration. Built with a Laravel backend powering a React-based in-app messaging system, combined with custom PHP, HTML, CSS, and JavaScript for the frontend. The platform includes multiple management interfaces: Admin Panel for overall control, Moderator Panel for content management, and Advertiser Panel for promotional campaigns.",
    keyFeatures: [
      "Real-time messaging system built with React and WebSockets",
      "Multi-tier admin panel architecture (Admin, Moderator, Advertiser)",
      "Custom matching algorithm for user connections",
      "Secure authentication with email verification and 2FA",
      "Advanced content moderation tools and reporting system",
      "Payment integration for premium subscriptions",
      "Mobile-responsive design with PWA capabilities",
    ],
    technologies: ["Laravel", "React", "PHP", "MySQL", "WebSockets", "Redis", "HTML/CSS", "JavaScript"],
    impact: "Successfully serving thousands of active users with real-time messaging capabilities and robust moderation tools ensuring a safe user experience.",
    imageUrl: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80",
    tags: ["React", "Laravel", "PHP", "MySQL"],
    category: "React",
    liveLink: "https://doublelist.com",
    featured: true,
  },
  {
    id: 2,
    title: "Path Social - Instagram Growth Platform",
    description: "Enterprise-grade WordPress platform for organic Instagram growth, serving 24,000+ influencers and brands.",
    detailedDescription: "Enterprise-grade WordPress platform for organic Instagram growth services, serving 24,000+ influencers and brands. Built with custom WordPress theme and extensive custom functionality to handle high-traffic volume and complex user interactions.",
    keyFeatures: [
      "Custom user dashboard for campaign management and analytics tracking",
      "Integrated payment gateway solutions for subscription-based services",
      "API integrations with Instagram for real-time follower tracking and engagement metrics",
      "Custom MySQL database architecture optimized for handling large-scale user data",
      "Advanced targeting algorithm interface for AI-powered audience matching",
      "Secure authentication and user management system",
      "Responsive design with performance optimization for heavy traffic loads",
    ],
    technologies: ["WordPress", "PHP", "MySQL", "Stripe", "PayPal", "RESTful APIs", "Custom Plugin Development"],
    impact: "Platform successfully serves thousands of concurrent users with real-time data synchronization and seamless payment processing, maintaining high performance under enterprise-level traffic conditions.",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    tags: ["WordPress", "PHP", "MySQL", "APIs"],
    category: "WordPress",
    liveLink: "https://pathsocial.com",
    featured: true,
  },
  {
    id: 3,
    title: "SaaS Dashboard",
    description: "Laravel-based analytics dashboard for managing user subscriptions and business metrics.",
    detailedDescription: "A comprehensive Laravel-based dashboard application designed for SaaS businesses to manage user subscriptions, track analytics, and monitor business performance metrics in real-time.",
    keyFeatures: [
      "Real-time analytics with interactive charts and graphs",
      "Subscription management with multiple tier support",
      "User behavior tracking and cohort analysis",
      "Automated billing and invoice generation",
      "Role-based access control for team management",
      "Export functionality for reports (PDF, CSV, Excel)",
    ],
    technologies: ["Laravel", "Vue.js", "Tailwind CSS", "Chart.js", "MySQL", "Redis"],
    impact: "Streamlined subscription management reducing manual work by 70% and providing actionable insights through comprehensive analytics.",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    tags: ["Laravel", "Vue.js", "Tailwind"],
    category: "Laravel",
    featured: true,
  },
  {
    id: 4,
    title: "Portfolio v1",
    description: "Personal portfolio website showcasing projects and skills with modern design.",
    detailedDescription: "My first portfolio website built from scratch using vanilla technologies. Features a clean, minimalist design with smooth animations and responsive layout.",
    keyFeatures: [
      "Custom CSS animations and transitions",
      "Fully responsive design for all devices",
      "Contact form with email integration",
      "Project showcase with filtering",
      "Performance optimized with lazy loading",
    ],
    technologies: ["HTML5", "CSS3", "JavaScript", "GSAP"],
    impact: "Served as my primary portfolio for client acquisition, resulting in multiple freelance opportunities.",
    imageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&q=80",
    tags: ["HTML", "CSS", "JavaScript"],
    category: "Frontend",
    featured: false,
  },
];

export const skills: Skill[] = [
  { id: 1, name: "HTML/CSS", category: "Frontend", proficiency: 95 },
  { id: 2, name: "JavaScript", category: "Frontend", proficiency: 90 },
  { id: 3, name: "React", category: "Frontend", proficiency: 75, icon: "SiReact" },
  { id: 4, name: "Next.js", category: "Frontend", proficiency: 70, icon: "SiNextdotjs" },
  { id: 5, name: "PHP", category: "Backend", proficiency: 85, icon: "SiPhp" },
  { id: 6, name: "Laravel", category: "Backend", proficiency: 80, icon: "SiLaravel" },
  { id: 7, name: "Node.js", category: "Backend", proficiency: 60, icon: "SiNodedotjs" },
  { id: 8, name: "WordPress", category: "CMS", proficiency: 95, icon: "SiWordpress" },
  { id: 9, name: "Shopify", category: "E-commerce", proficiency: 85, icon: "SiShopify" },
];
