export type Course = {
  slug: string;
  name: string;
  duration: string;
  skills: string[];
  projects: string[];
  certificate: string;
  careers: string[];
  eyebrow: string;
};

export const courses: Course[] = [
  {
    slug: "python-development",
    name: "Python Development",
    eyebrow: "MOD-01",
    duration: "1–3 months",
    skills: ["Core & OOP Python", "Data structures", "REST APIs with FastAPI", "Testing & packaging"],
    projects: ["Inventory management CLI", "Weather data API service"],
    certificate: "Python Development Internship Certificate",
    careers: ["Backend Developer", "Automation Engineer", "Python Developer"],
  },
  {
    slug: "java-development",
    name: "Java Development",
    eyebrow: "MOD-02",
    duration: "1–3 months",
    skills: ["Core Java & OOP", "Spring Boot", "JDBC & Hibernate", "Microservices basics"],
    projects: ["Library management system", "Spring Boot task tracker API"],
    certificate: "Java Development Internship Certificate",
    careers: ["Java Developer", "Backend Engineer", "Software Engineer"],
  },
  {
    slug: "full-stack-development",
    name: "Full Stack Development",
    eyebrow: "MOD-03",
    duration: "1–3 months",
    skills: ["React & Next.js", "Node.js & Express", "MongoDB/SQL", "Authentication & deployment"],
    projects: ["E-commerce storefront", "Real-time chat application"],
    certificate: "Full Stack Development Internship Certificate",
    careers: ["Full Stack Developer", "Frontend Engineer", "Product Engineer"],
  },
  {
    slug: "data-analytics",
    name: "Data Analytics",
    eyebrow: "MOD-04",
    duration: "1–3 months",
    skills: ["Excel & SQL", "Python for data analysis", "Power BI/Tableau", "Statistics fundamentals"],
    projects: ["Sales performance dashboard", "Customer churn analysis"],
    certificate: "Data Analytics Internship Certificate",
    careers: ["Data Analyst", "Business Analyst", "Reporting Analyst"],
  },
  {
    slug: "ai-machine-learning",
    name: "AI & Machine Learning",
    eyebrow: "MOD-05",
    duration: "1–3 months",
    skills: ["Python & NumPy/Pandas", "Supervised & unsupervised learning", "Neural networks basics", "Model deployment"],
    projects: ["Image classification model", "Price prediction pipeline"],
    certificate: "AI & ML Internship Certificate",
    careers: ["ML Engineer", "AI Intern", "Data Scientist"],
  },
  {
    slug: "aws-cloud",
    name: "AWS Cloud",
    eyebrow: "MOD-06",
    duration: "1–3 months",
    skills: ["EC2, S3, IAM", "VPC networking", "Lambda & serverless", "CloudWatch monitoring"],
    projects: ["Static site on S3 + CloudFront", "Serverless URL shortener"],
    certificate: "AWS Cloud Internship Certificate",
    careers: ["Cloud Engineer", "AWS Support Engineer", "Cloud Intern"],
  },
  {
    slug: "azure-cloud",
    name: "Azure Cloud",
    eyebrow: "MOD-07",
    duration: "1–3 months",
    skills: ["Azure VMs & storage", "Azure AD basics", "Azure Functions", "Monitoring & cost management"],
    projects: ["Azure-hosted web app", "Serverless notification function"],
    certificate: "Azure Cloud Internship Certificate",
    careers: ["Cloud Support Associate", "Azure Administrator (Jr.)", "Cloud Intern"],
  },
  {
    slug: "devops",
    name: "DevOps",
    eyebrow: "MOD-08",
    duration: "1–3 months",
    skills: ["Docker & Kubernetes", "CI/CD pipelines", "Terraform & Ansible", "Prometheus & Grafana"],
    projects: ["Containerized CI/CD pipeline", "IaC-provisioned cloud environment"],
    certificate: "DevOps Internship Certificate",
    careers: ["DevOps Engineer", "Site Reliability Intern", "Cloud Ops Engineer"],
  },
  {
    slug: "cybersecurity",
    name: "Cybersecurity",
    eyebrow: "MOD-09",
    duration: "1–3 months",
    skills: ["Network security fundamentals", "Vulnerability assessment", "SIEM basics", "Security best practices"],
    projects: ["Network vulnerability scan report", "Security hardening checklist tool"],
    certificate: "Cybersecurity Internship Certificate",
    careers: ["SOC Analyst (Jr.)", "Security Intern", "IT Security Associate"],
  },
  {
    slug: "digital-marketing",
    name: "Digital Marketing",
    eyebrow: "MOD-10",
    duration: "1–3 months",
    skills: ["SEO & content strategy", "Social media marketing", "Google Ads & Analytics", "Email marketing"],
    projects: ["SEO audit for a live site", "30-day social campaign plan"],
    certificate: "Digital Marketing Internship Certificate",
    careers: ["Digital Marketing Associate", "SEO Executive", "Social Media Executive"],
  },
];

export const testimonials = [
  { name: "Aarav Mehta", role: "Full Stack Development, 2025 batch", quote: "The weekly assignments kept me accountable and the mentor reviews caught things I'd have missed on my own. I shipped my first real project in week 4." },
  { name: "Sneha Reddy", role: "AWS Cloud, 2025 batch", quote: "Went in knowing almost no cloud and came out having deployed a real serverless app. The letter of recommendation helped with my placement interviews." },
  { name: "Karthik Iyer", role: "DevOps, 2024 batch", quote: "Live industry projects instead of toy exercises made the difference. I use the CI/CD pipeline I built here as a portfolio piece today." },
  { name: "Priya Nair", role: "Data Analytics, 2025 batch", quote: "Clear structure, real datasets, and a mentor who actually answered questions the same day. Consistency prize was a nice bonus for showing up every week." },
];

export const faqs = [
  { q: "Who can apply for the internship?", a: "Any current student or recent graduate in a relevant discipline can apply. We accept applicants across degrees and years, as long as you're ready to commit to the weekly schedule." },
  { q: "Is the internship online or offline?", a: "Fully online. Live sessions, assignments, and project reviews all happen remotely, so you can join from anywhere." },
  { q: "What is the internship duration?", a: "You can choose a 1, 2, or 3-month track depending on your availability and goals." },
  { q: "What do I get at the end of the program?", a: "An internship completion certificate, and — based on performance — a Top Performer award, a Letter of Recommendation, and a consistency prize." },
  { q: "Is there a registration fee?", a: "There is currently no payment required to register." },
  { q: "Do I need prior experience?", a: "No. Each track starts from fundamentals and builds up through weekly assignments and hands-on sessions." },
  { q: "Will I work on real projects?", a: "Yes — every track includes live industry-style projects with structured reviews, not isolated practice exercises." },
  { q: "How do I track my application status?", a: "Once you register, our team reviews applications and updates your status. You'll be notified by email at each stage." },
];
