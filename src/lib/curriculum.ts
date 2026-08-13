// Domain names + 12-week topic list per track. Used to render the admin
// curriculum library page — actual weekly PDFs live in Google Drive, not here.
// IMPORTANT: `name` must exactly match the Drive subfolder name for each domain,
// since that's how the admin page matches uploaded files to a track.

export type Week = {
  number: number;
  topic: string;
};

export type CurriculumTrack = {
  slug: string;
  name: string;
  weeks: Week[];
};

export const curriculumTracks: CurriculumTrack[] = [
  {
    slug: "python-development",
    name: "Python Development",
    weeks: [
      {
            "number": 1,
            "topic": "Python Fundamentals & Environment Setup"
      },
      {
            "number": 2,
            "topic": "Data Structures & Control Flow"
      },
      {
            "number": 3,
            "topic": "Functions, Modules & Error Handling"
      },
      {
            "number": 4,
            "topic": "Object-Oriented Programming in Python"
      },
      {
            "number": 5,
            "topic": "File Handling & Working with APIs"
      },
      {
            "number": 6,
            "topic": "Databases with Python \u2014 SQLite Fundamentals"
      },
      {
            "number": 7,
            "topic": "Virtual Environments & Package Management"
      },
      {
            "number": 8,
            "topic": "Introduction to FastAPI"
      },
      {
            "number": 9,
            "topic": "Building REST APIs with FastAPI"
      },
      {
            "number": 10,
            "topic": "Testing & Debugging in Python"
      },
      {
            "number": 11,
            "topic": "Packaging & Deployment Basics"
      },
      {
            "number": 12,
            "topic": "Capstone Project \u2014 Build & Deploy a Python API"
      }
],
  },
  {
    slug: "java-development",
    name: "Java Development",
    weeks: [
      {
            "number": 1,
            "topic": "Java Fundamentals & Environment Setup"
      },
      {
            "number": 2,
            "topic": "OOP Concepts in Java"
      },
      {
            "number": 3,
            "topic": "Collections Framework & Generics"
      },
      {
            "number": 4,
            "topic": "Exception Handling & File I/O"
      },
      {
            "number": 5,
            "topic": "Multithreading Basics"
      },
      {
            "number": 6,
            "topic": "JDBC & Database Connectivity"
      },
      {
            "number": 7,
            "topic": "Introduction to Spring Framework"
      },
      {
            "number": 8,
            "topic": "Spring Boot Fundamentals"
      },
      {
            "number": 9,
            "topic": "Building REST APIs with Spring Boot"
      },
      {
            "number": 10,
            "topic": "Spring Data JPA & Hibernate"
      },
      {
            "number": 11,
            "topic": "Testing with JUnit & Debugging"
      },
      {
            "number": 12,
            "topic": "Capstone Project \u2014 Spring Boot Task Tracker API"
      }
],
  },
  {
    slug: "full-stack-development",
    name: "Full Stack Development",
    weeks: [
      {
            "number": 1,
            "topic": "HTML, CSS & Responsive Design Fundamentals"
      },
      {
            "number": 2,
            "topic": "JavaScript Fundamentals & DOM Manipulation"
      },
      {
            "number": 3,
            "topic": "Introduction to React"
      },
      {
            "number": 4,
            "topic": "React Components, Props & State"
      },
      {
            "number": 5,
            "topic": "React Hooks & Routing"
      },
      {
            "number": 6,
            "topic": "Introduction to Next.js"
      },
      {
            "number": 7,
            "topic": "Node.js & Express Fundamentals"
      },
      {
            "number": 8,
            "topic": "Building REST APIs with Express"
      },
      {
            "number": 9,
            "topic": "Databases \u2014 MongoDB & SQL Integration"
      },
      {
            "number": 10,
            "topic": "Authentication & Authorization"
      },
      {
            "number": 11,
            "topic": "Deployment & CI/CD Basics"
      },
      {
            "number": 12,
            "topic": "Capstone Project \u2014 Full Stack E-Commerce Storefront"
      }
],
  },
  {
    slug: "data-analytics",
    name: "Data Analytics",
    weeks: [
      {
            "number": 1,
            "topic": "Excel Fundamentals & Data Cleaning"
      },
      {
            "number": 2,
            "topic": "SQL Fundamentals for Analytics"
      },
      {
            "number": 3,
            "topic": "Advanced SQL \u2014 Joins & Aggregations"
      },
      {
            "number": 4,
            "topic": "Python for Data Analysis \u2014 NumPy & Pandas"
      },
      {
            "number": 5,
            "topic": "Data Visualization with Matplotlib & Seaborn"
      },
      {
            "number": 6,
            "topic": "Statistics Fundamentals for Analysts"
      },
      {
            "number": 7,
            "topic": "Introduction to Power BI"
      },
      {
            "number": 8,
            "topic": "Building Interactive Dashboards"
      },
      {
            "number": 9,
            "topic": "Introduction to Tableau"
      },
      {
            "number": 10,
            "topic": "Exploratory Data Analysis Techniques"
      },
      {
            "number": 11,
            "topic": "Reporting & Storytelling with Data"
      },
      {
            "number": 12,
            "topic": "Capstone Project \u2014 Sales Performance Dashboard"
      }
],
  },
  {
    slug: "ai-machine-learning",
    name: "AI & Machine Learning",
    weeks: [
      {
            "number": 1,
            "topic": "Python for AI/ML \u2014 NumPy & Pandas Refresher"
      },
      {
            "number": 2,
            "topic": "Data Preprocessing & Feature Engineering"
      },
      {
            "number": 3,
            "topic": "Introduction to Machine Learning & Supervised Learning"
      },
      {
            "number": 4,
            "topic": "Regression Algorithms"
      },
      {
            "number": 5,
            "topic": "Classification Algorithms"
      },
      {
            "number": 6,
            "topic": "Unsupervised Learning \u2014 Clustering"
      },
      {
            "number": 7,
            "topic": "Model Evaluation & Hyperparameter Tuning"
      },
      {
            "number": 8,
            "topic": "Introduction to Neural Networks"
      },
      {
            "number": 9,
            "topic": "Deep Learning with TensorFlow/Keras Basics"
      },
      {
            "number": 10,
            "topic": "Introduction to NLP & Computer Vision"
      },
      {
            "number": 11,
            "topic": "Model Deployment Basics"
      },
      {
            "number": 12,
            "topic": "Capstone Project \u2014 Image Classification Model"
      }
],
  },
  {
    slug: "aws-cloud",
    name: "AWS Cloud",
    weeks: [
      {
            "number": 1,
            "topic": "Cloud Computing Fundamentals & AWS Account Setup"
      },
      {
            "number": 2,
            "topic": "IAM \u2014 Identity & Access Management"
      },
      {
            "number": 3,
            "topic": "EC2 \u2014 Virtual Servers in the Cloud"
      },
      {
            "number": 4,
            "topic": "S3 \u2014 Storage Fundamentals"
      },
      {
            "number": 5,
            "topic": "VPC & Networking Basics"
      },
      {
            "number": 6,
            "topic": "RDS \u2014 Managed Databases"
      },
      {
            "number": 7,
            "topic": "Introduction to Lambda & Serverless Computing"
      },
      {
            "number": 8,
            "topic": "API Gateway & Serverless APIs"
      },
      {
            "number": 9,
            "topic": "CloudWatch \u2014 Monitoring & Logging"
      },
      {
            "number": 10,
            "topic": "Load Balancing & Auto Scaling"
      },
      {
            "number": 11,
            "topic": "AWS CLI & Infrastructure Basics"
      },
      {
            "number": 12,
            "topic": "Capstone Project \u2014 Serverless URL Shortener"
      }
],
  },
  {
    slug: "azure-cloud",
    name: "Azure Cloud",
    weeks: [
      {
            "number": 1,
            "topic": "Cloud Computing Fundamentals & Azure Account Setup"
      },
      {
            "number": 2,
            "topic": "Azure Active Directory & IAM Basics"
      },
      {
            "number": 3,
            "topic": "Azure Virtual Machines"
      },
      {
            "number": 4,
            "topic": "Azure Storage Fundamentals"
      },
      {
            "number": 5,
            "topic": "Azure Virtual Networks"
      },
      {
            "number": 6,
            "topic": "Azure SQL Database"
      },
      {
            "number": 7,
            "topic": "Introduction to Azure Functions"
      },
      {
            "number": 8,
            "topic": "Building Serverless Apps with Azure Functions"
      },
      {
            "number": 9,
            "topic": "Azure Monitor & Logging"
      },
      {
            "number": 10,
            "topic": "Azure App Service \u2014 Web App Hosting"
      },
      {
            "number": 11,
            "topic": "Cost Management & Azure CLI"
      },
      {
            "number": 12,
            "topic": "Capstone Project \u2014 Azure-Hosted Web App"
      }
],
  },
  {
    slug: "devops",
    name: "DevOps",
    weeks: [
      {
            "number": 1,
            "topic": "Linux Fundamentals, Linux Administration & Networking Basics"
      },
      {
            "number": 2,
            "topic": "Shell Scripting & Automation Basics"
      },
      {
            "number": 3,
            "topic": "Git & GitHub for DevOps"
      },
      {
            "number": 4,
            "topic": "Docker Fundamentals & Containerization"
      },
      {
            "number": 5,
            "topic": "Docker Compose & Multi-Container Applications"
      },
      {
            "number": 6,
            "topic": "Introduction to Kubernetes"
      },
      {
            "number": 7,
            "topic": "Kubernetes Deployments, Services & Scaling"
      },
      {
            "number": 8,
            "topic": "CI/CD with Jenkins"
      },
      {
            "number": 9,
            "topic": "Infrastructure as Code with Terraform"
      },
      {
            "number": 10,
            "topic": "Configuration Management with Ansible"
      },
      {
            "number": 11,
            "topic": "Monitoring with Prometheus & Grafana"
      },
      {
            "number": 12,
            "topic": "Capstone Project \u2014 End-to-End CI/CD Pipeline"
      }
],
  },
  {
    slug: "cybersecurity",
    name: "Cybersecurity",
    weeks: [
      {
            "number": 1,
            "topic": "Networking Fundamentals for Security"
      },
      {
            "number": 2,
            "topic": "Operating System Security Basics (Linux & Windows)"
      },
      {
            "number": 3,
            "topic": "Introduction to Cryptography"
      },
      {
            "number": 4,
            "topic": "Web Application Security Fundamentals (OWASP Top 10)"
      },
      {
            "number": 5,
            "topic": "Vulnerability Assessment Basics"
      },
      {
            "number": 6,
            "topic": "Introduction to Penetration Testing Concepts"
      },
      {
            "number": 7,
            "topic": "Network Security Tools (Nmap & Wireshark Basics)"
      },
      {
            "number": 8,
            "topic": "Introduction to SIEM & Security Monitoring"
      },
      {
            "number": 9,
            "topic": "Security Hardening Best Practices"
      },
      {
            "number": 10,
            "topic": "Incident Response Fundamentals"
      },
      {
            "number": 11,
            "topic": "Security Compliance & Documentation"
      },
      {
            "number": 12,
            "topic": "Capstone Project \u2014 Security Hardening Checklist Tool"
      }
],
  },
  {
    slug: "digital-marketing",
    name: "Digital Marketing",
    weeks: [
      {
            "number": 1,
            "topic": "Digital Marketing Fundamentals & Strategy"
      },
      {
            "number": 2,
            "topic": "SEO Fundamentals \u2014 On-Page & Off-Page"
      },
      {
            "number": 3,
            "topic": "Content Marketing & Content Strategy"
      },
      {
            "number": 4,
            "topic": "Social Media Marketing Fundamentals"
      },
      {
            "number": 5,
            "topic": "Google Ads Fundamentals"
      },
      {
            "number": 6,
            "topic": "Google Analytics & Tracking"
      },
      {
            "number": 7,
            "topic": "Email Marketing Fundamentals"
      },
      {
            "number": 8,
            "topic": "Social Media Campaign Planning"
      },
      {
            "number": 9,
            "topic": "Paid Social Advertising (Meta Ads)"
      },
      {
            "number": 10,
            "topic": "Marketing Analytics & Reporting"
      },
      {
            "number": 11,
            "topic": "Brand Building & Marketing Funnels"
      },
      {
            "number": 12,
            "topic": "Capstone Project \u2014 SEO Audit + 30-Day Social Campaign Plan"
      }
],
  },
];
