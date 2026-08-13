// Auto-generated from the internship curriculum content.
// Weeks with full detail show the complete weekly breakdown in the admin panel;
// weeks without detail yet show just the topic until they're written up.

export type WeekDetail = {
  intro: string;
  learn: string[];
  approach: string;
  keepInMind: string[];
  task: string[];
  taskSubmission: string[];
  activityScenario: string;
  activity: string[];
  activitySubmission: string[];
  aiTask: string[];
};

export type Week = {
  number: number;
  topic: string;
  detail?: WeekDetail;
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
        number: 1,
        topic: "Python Fundamentals & Environment Setup",
        detail: {
          intro: "This week, you'll begin with Python Fundamentals & Environment Setup. A solid grip on Python's core syntax and tooling is the foundation for everything else in this track \u2014 from scripting to building full APIs later on.",
          learn: ["Introduction to Python & the Python ecosystem", "Installing Python and setting up VS Code / PyCharm", "Variables, data types & type conversion", "Operators and expressions", "Input/output and string formatting", "Conditional statements (if/elif/else)", "Loops \u2014 for and while", "Lists, tuples, sets & dictionaries", "Working with the Python REPL", "Using pip and installing packages", "Reading Python documentation effectively"],
          approach: "Focus on building a strong understanding of Python fundamentals rather than simply completing the tasks. Spend time practicing syntax, experimenting in the REPL, and understanding why each concept is used. Hands-on practice, curiosity, and consistency will help you gain confidence and prepare you for the more advanced Python topics covered in the upcoming weeks.",
          keepInMind: ["Practice every concept instead of just reading about it.", "Understand the purpose of each construct before moving forward.", "Maintain notes for future reference.", "Verify AI-generated answers through practical implementation.", "Complete all activities before the submission deadline."],
          task: ["Install Python 3 and a code editor (VS Code recommended).", "Write a script using variables, data types, and type conversion.", "Practice conditional statements with at least 3 examples.", "Practice for and while loops with at least 3 examples.", "Create and manipulate lists, tuples, sets, and dictionaries.", "Write a simple program that takes user input and processes it.", "Install a package using pip and use it in a script.", "Prepare a short PDF explaining: variables & data types, conditionals, loops, and Python collections."],
          taskSubmission: ["PDF Report (2\u20134 pages)", "Screenshot of Python installation", "Screenshot of your scripts running", "Screenshot of pip package installation"],
          activityScenario: "Imagine you've joined a company as a Junior Python Developer. Your manager asks you to build a simple command-line tool to manage a small inventory of items.",
          activity: ["Create a Python script named inventory.py.", "Use a dictionary to store item names and quantities.", "Implement functions to add an item, remove an item, and update quantity.", "Implement a function to display the full inventory.", "Add input validation (e.g. reject negative quantities).", "Use loops to allow repeated actions until the user exits.", "Document each function with a short docstring."],
          activitySubmission: ["inventory.py source file", "Screenshot of the tool running with sample data", "Screenshot of input validation working", "Short implementation summary (4\u20135 lines)"],
          aiTask: ["Ask AI to explain Python data types in simple terms.", "Generate a cheat sheet for 15 commonly used Python built-in functions.", "Ask AI to explain the difference between lists, tuples, sets, and dictionaries.", "Ask AI to explain how Python's for loop works under the hood.", "Generate a small debugging scenario and try solving it.", "Verify the AI-generated code by executing it yourself."],
        },
      },
      {
        number: 2,
        topic: "Data Structures & Control Flow",
      },
      {
        number: 3,
        topic: "Functions, Modules & Error Handling",
      },
      {
        number: 4,
        topic: "Object-Oriented Programming in Python",
      },
      {
        number: 5,
        topic: "File Handling & Working with APIs",
      },
      {
        number: 6,
        topic: "Databases with Python \u2014 SQLite Fundamentals",
      },
      {
        number: 7,
        topic: "Virtual Environments & Package Management",
      },
      {
        number: 8,
        topic: "Introduction to FastAPI",
      },
      {
        number: 9,
        topic: "Building REST APIs with FastAPI",
      },
      {
        number: 10,
        topic: "Testing & Debugging in Python",
      },
      {
        number: 11,
        topic: "Packaging & Deployment Basics",
      },
      {
        number: 12,
        topic: "Capstone Project \u2014 Build & Deploy a Python API",
      },
    ],
  },
  {
    slug: "java-development",
    name: "Java Development",
    weeks: [
      {
        number: 1,
        topic: "Java Fundamentals & Environment Setup",
        detail: {
          intro: "This week, you'll begin with Java Fundamentals & Environment Setup. Mastering core Java syntax and the JDK toolchain is the first step toward building the Spring Boot applications you'll work on later in this track.",
          learn: ["Introduction to Java & the JVM", "Installing JDK and setting up IntelliJ IDEA / Eclipse", "Variables, data types & type casting", "Operators and expressions", "Conditional statements (if/else, switch)", "Loops \u2014 for, while, do-while", "Arrays in Java", "Methods and method overloading", "Introduction to classes and objects", "Compiling and running Java programs (javac/java)", "Reading Java documentation (Javadoc)"],
          approach: "Focus on building a strong understanding of Java fundamentals rather than simply completing the tasks. Spend time practicing syntax, compiling programs from the command line, and understanding why each concept matters. Hands-on practice, curiosity, and consistency will prepare you for the OOP and Spring Boot topics covered in later weeks.",
          keepInMind: ["Practice every concept instead of just reading about it.", "Understand the purpose of each construct before moving forward.", "Maintain notes for future reference.", "Verify AI-generated answers through practical implementation.", "Complete all activities before the submission deadline."],
          task: ["Install JDK and an IDE (IntelliJ IDEA recommended).", "Write a program using variables, data types, and type casting.", "Practice conditional statements with at least 3 examples.", "Practice for, while, and do-while loops with examples.", "Create and manipulate arrays (1D and 2D).", "Write methods with parameters and return values, including an overloaded method.", "Compile and run a program from the command line using javac and java.", "Prepare a short PDF explaining: data types, conditionals, loops, arrays, and methods."],
          taskSubmission: ["PDF Report (2\u20134 pages)", "Screenshot of JDK installation and java -version", "Screenshot of your programs running", "Screenshot of command-line compilation"],
          activityScenario: "Imagine you've joined a company as a Junior Java Developer. Your manager asks you to build a simple command-line grade calculator for a small school.",
          activity: ["Create a Java class named GradeCalculator.", "Accept student names and marks for 5 subjects via input.", "Calculate total, average, and letter grade using conditionals.", "Store results for multiple students using an array or ArrayList.", "Implement a method to display a formatted report for all students.", "Add input validation (e.g. marks between 0\u2013100).", "Document each method with a short comment."],
          activitySubmission: ["GradeCalculator.java source file", "Screenshot of the program running with sample data", "Screenshot of input validation working", "Short implementation summary (4\u20135 lines)"],
          aiTask: ["Ask AI to explain the JVM, JDK, and JRE in simple terms.", "Generate a cheat sheet for 15 commonly used Java syntax patterns.", "Ask AI to explain method overloading with examples.", "Ask AI to explain arrays vs ArrayList in Java.", "Generate a small debugging scenario and try solving it.", "Verify the AI-generated code by compiling and running it yourself."],
        },
      },
      {
        number: 2,
        topic: "OOP Concepts in Java",
      },
      {
        number: 3,
        topic: "Collections Framework & Generics",
      },
      {
        number: 4,
        topic: "Exception Handling & File I/O",
      },
      {
        number: 5,
        topic: "Multithreading Basics",
      },
      {
        number: 6,
        topic: "JDBC & Database Connectivity",
      },
      {
        number: 7,
        topic: "Introduction to Spring Framework",
      },
      {
        number: 8,
        topic: "Spring Boot Fundamentals",
      },
      {
        number: 9,
        topic: "Building REST APIs with Spring Boot",
      },
      {
        number: 10,
        topic: "Spring Data JPA & Hibernate",
      },
      {
        number: 11,
        topic: "Testing with JUnit & Debugging",
      },
      {
        number: 12,
        topic: "Capstone Project \u2014 Spring Boot Task Tracker API",
      },
    ],
  },
  {
    slug: "full-stack-development",
    name: "Full Stack Development",
    weeks: [
      {
        number: 1,
        topic: "HTML, CSS & Responsive Design Fundamentals",
        detail: {
          intro: "This week, you'll begin with HTML, CSS & Responsive Design Fundamentals. A strong grip on structuring and styling web pages is the foundation for everything you'll build with JavaScript, React, and Next.js in the weeks ahead.",
          learn: ["Introduction to how the web works (HTTP, browsers, DOM)", "HTML document structure & semantic tags", "Forms and input elements", "CSS selectors, specificity & the box model", "Flexbox layout", "CSS Grid layout", "Responsive design & media queries", "Typography and color fundamentals", "Using browser DevTools to inspect and debug", "Basic accessibility (alt text, labels, semantic HTML)", "Version control basics with Git"],
          approach: "Focus on building a strong understanding of how HTML and CSS work together rather than simply completing the tasks. Spend time inspecting real websites in DevTools, experimenting with layouts, and understanding why each approach is used. Hands-on practice, curiosity, and consistency will prepare you for JavaScript and React in the upcoming weeks.",
          keepInMind: ["Practice every concept instead of just reading about it.", "Understand the purpose of each construct before moving forward.", "Maintain notes for future reference.", "Verify AI-generated answers through practical implementation.", "Complete all activities before the submission deadline."],
          task: ["Set up a code editor (VS Code) and install the Live Server extension.", "Build a semantic HTML page with header, nav, main, and footer.", "Create a contact form with proper labels and input types.", "Style the page using Flexbox for the navigation.", "Build a card layout using CSS Grid.", "Make the page responsive using media queries (mobile, tablet, desktop).", "Use DevTools to inspect and adjust styles live.", "Prepare a short PDF explaining: semantic HTML, the box model, Flexbox vs Grid, and responsive design."],
          taskSubmission: ["PDF Report (2\u20134 pages)", "Screenshot of the completed page (desktop view)", "Screenshot of the completed page (mobile view)", "Screenshot of DevTools inspection"],
          activityScenario: "Imagine you've joined a company as a Junior Frontend Developer. Your manager asks you to build a responsive landing page for a new product launch.",
          activity: ["Create a landing page with a hero section, features section, and footer.", "Use semantic HTML throughout the page.", "Implement a responsive navigation bar (with a mobile menu layout).", "Use Flexbox and/or Grid for the features section layout.", "Ensure the page adapts correctly across mobile, tablet, and desktop widths.", "Add hover states to buttons and links.", "Document each section's layout approach."],
          activitySubmission: ["HTML/CSS source files", "Screenshot of the page across 3 screen sizes", "Screenshot of hover states", "Short implementation summary (4\u20135 lines)"],
          aiTask: ["Ask AI to explain the CSS box model in simple terms.", "Generate a cheat sheet for 15 commonly used Flexbox and Grid properties.", "Ask AI to explain semantic HTML and why it matters.", "Ask AI to explain how media queries work.", "Generate a small responsive-layout troubleshooting scenario and try solving it.", "Verify the AI-generated CSS by testing it in the browser yourself."],
        },
      },
      {
        number: 2,
        topic: "JavaScript Fundamentals & DOM Manipulation",
      },
      {
        number: 3,
        topic: "Introduction to React",
      },
      {
        number: 4,
        topic: "React Components, Props & State",
      },
      {
        number: 5,
        topic: "React Hooks & Routing",
      },
      {
        number: 6,
        topic: "Introduction to Next.js",
      },
      {
        number: 7,
        topic: "Node.js & Express Fundamentals",
      },
      {
        number: 8,
        topic: "Building REST APIs with Express",
      },
      {
        number: 9,
        topic: "Databases \u2014 MongoDB & SQL Integration",
      },
      {
        number: 10,
        topic: "Authentication & Authorization",
      },
      {
        number: 11,
        topic: "Deployment & CI/CD Basics",
      },
      {
        number: 12,
        topic: "Capstone Project \u2014 Full Stack E-Commerce Storefront",
      },
    ],
  },
  {
    slug: "data-analytics",
    name: "Data Analytics",
    weeks: [
      {
        number: 1,
        topic: "Excel Fundamentals & Data Cleaning",
        detail: {
          intro: "This week, you'll begin with Excel Fundamentals & Data Cleaning. Being able to clean and structure raw data is the first skill every analyst needs, before moving on to SQL, Python, and BI tools later in this track.",
          learn: ["Introduction to data analytics as a discipline", "Excel interface, sheets, and basic navigation", "Data types and formatting in Excel", "Sorting and filtering data", "Removing duplicates and handling blanks", "Text functions (TRIM, CONCATENATE, LEFT/RIGHT/MID)", "Logical functions (IF, IFS, AND, OR)", "Lookup functions (VLOOKUP, XLOOKUP)", "Pivot tables \u2014 basics", "Basic charts for data exploration", "Data validation rules"],
          approach: "Focus on building a strong understanding of clean, structured data rather than simply completing the tasks. Spend time exploring messy real-world-style datasets, experimenting with functions, and understanding why clean data matters for every step that follows. Hands-on practice, curiosity, and consistency will prepare you for SQL and Python in the upcoming weeks.",
          keepInMind: ["Practice every function instead of just reading about it.", "Understand the purpose of each cleaning step before moving forward.", "Maintain notes for future reference.", "Verify AI-generated answers through practical implementation.", "Complete all activities before the submission deadline."],
          task: ["Download or create a sample dataset with duplicates, blanks, and inconsistent formatting.", "Clean the dataset \u2014 remove duplicates, handle blanks, standardize text.", "Apply text functions to standardize names/addresses.", "Use IF and lookup functions to categorize and enrich the data.", "Build a pivot table summarizing key metrics.", "Create a basic chart visualizing the summary.", "Add data validation to at least one column.", "Prepare a short PDF explaining: data cleaning steps, functions used, and pivot table insights."],
          taskSubmission: ["PDF Report (2\u20134 pages)", "Cleaned Excel file", "Screenshot of the pivot table", "Screenshot of the chart"],
          activityScenario: "Imagine you've joined a company as a Junior Data Analyst. Your manager hands you a messy sales export and asks you to clean it and produce a first-look summary.",
          activity: ["Import the raw sales data into Excel.", "Identify and fix at least 5 categories of data quality issues.", "Standardize date and currency formats.", "Use VLOOKUP/XLOOKUP to map product IDs to product names from a reference sheet.", "Build a pivot table showing sales by region and by product category.", "Create a chart highlighting the top-performing category.", "Write a short summary of key findings."],
          activitySubmission: ["Cleaned Excel workbook", "Screenshot of the pivot table and chart", "Screenshot of before/after data quality", "Short implementation summary (4\u20135 lines)"],
          aiTask: ["Ask AI to explain when to use VLOOKUP vs XLOOKUP.", "Generate a cheat sheet for 15 commonly used Excel functions for analysts.", "Ask AI to explain pivot tables in simple terms.", "Ask AI to suggest data-cleaning checks for a new dataset.", "Generate a small data-cleaning scenario and try solving it.", "Verify the AI-generated formulas by testing them in Excel yourself."],
        },
      },
      {
        number: 2,
        topic: "SQL Fundamentals for Analytics",
      },
      {
        number: 3,
        topic: "Advanced SQL \u2014 Joins & Aggregations",
      },
      {
        number: 4,
        topic: "Python for Data Analysis \u2014 NumPy & Pandas",
      },
      {
        number: 5,
        topic: "Data Visualization with Matplotlib & Seaborn",
      },
      {
        number: 6,
        topic: "Statistics Fundamentals for Analysts",
      },
      {
        number: 7,
        topic: "Introduction to Power BI",
      },
      {
        number: 8,
        topic: "Building Interactive Dashboards",
      },
      {
        number: 9,
        topic: "Introduction to Tableau",
      },
      {
        number: 10,
        topic: "Exploratory Data Analysis Techniques",
      },
      {
        number: 11,
        topic: "Reporting & Storytelling with Data",
      },
      {
        number: 12,
        topic: "Capstone Project \u2014 Sales Performance Dashboard",
      },
    ],
  },
  {
    slug: "ai-machine-learning",
    name: "AI & Machine Learning",
    weeks: [
      {
        number: 1,
        topic: "Python for AI/ML \u2014 NumPy & Pandas Refresher",
        detail: {
          intro: "This week, you'll begin with a Python for AI/ML refresher focused on NumPy and Pandas. These two libraries are the backbone of nearly every machine learning workflow you'll build in this track.",
          learn: ["Introduction to the AI/ML landscape and workflow", "NumPy arrays \u2014 creation, indexing & slicing", "NumPy vectorized operations & broadcasting", "Pandas Series and DataFrames", "Reading and writing CSV data with Pandas", "Filtering, sorting & grouping data in Pandas", "Handling missing data", "Merging and joining DataFrames", "Basic descriptive statistics with Pandas", "Plotting basics with Matplotlib", "Setting up a Jupyter Notebook environment"],
          approach: "Focus on building a strong, hands-on comfort with NumPy and Pandas rather than simply completing the tasks. Spend time exploring real datasets, experimenting with transformations, and understanding why each operation is used. Hands-on practice, curiosity, and consistency will prepare you for the machine learning algorithms covered in the upcoming weeks.",
          keepInMind: ["Practice every operation instead of just reading about it.", "Understand the purpose of each transformation before moving forward.", "Maintain notes for future reference.", "Verify AI-generated answers through practical implementation.", "Complete all activities before the submission deadline."],
          task: ["Set up Python, Jupyter Notebook, NumPy, and Pandas.", "Create and manipulate NumPy arrays (indexing, slicing, reshaping).", "Load a CSV dataset into a Pandas DataFrame.", "Filter, sort, and group the dataset by at least 2 different criteria.", "Identify and handle missing values in the dataset.", "Compute descriptive statistics (mean, median, std) for key columns.", "Create at least 2 basic plots (histogram, bar chart) with Matplotlib.", "Prepare a short PDF explaining: NumPy arrays, Pandas DataFrames, and your key findings."],
          taskSubmission: ["PDF Report (2\u20134 pages)", "Jupyter Notebook (.ipynb) file", "Screenshot of your NumPy/Pandas outputs", "Screenshot of your plots"],
          activityScenario: "Imagine you've joined a company as a Junior ML Engineer. Your manager asks you to explore a public dataset and produce a first-pass exploratory analysis before any modeling begins.",
          activity: ["Choose a small public dataset (e.g. Titanic, Iris, or similar).", "Load it into a Pandas DataFrame and inspect its structure.", "Clean missing or inconsistent values.", "Compute summary statistics for numeric columns.", "Group and compare at least one categorical breakdown (e.g. survival rate by class).", "Visualize at least 2 relationships with Matplotlib.", "Write a short summary of your initial observations."],
          activitySubmission: ["Jupyter Notebook (.ipynb) file", "Screenshot of your DataFrame summary", "Screenshot of your visualizations", "Short implementation summary (4\u20135 lines)"],
          aiTask: ["Ask AI to explain NumPy broadcasting in simple terms.", "Generate a cheat sheet for 15 commonly used Pandas operations.", "Ask AI to explain the difference between a Series and a DataFrame.", "Ask AI to explain strategies for handling missing data.", "Generate a small data-exploration scenario and try solving it.", "Verify the AI-generated code by running it in your notebook yourself."],
        },
      },
      {
        number: 2,
        topic: "Data Preprocessing & Feature Engineering",
      },
      {
        number: 3,
        topic: "Introduction to Machine Learning & Supervised Learning",
      },
      {
        number: 4,
        topic: "Regression Algorithms",
      },
      {
        number: 5,
        topic: "Classification Algorithms",
      },
      {
        number: 6,
        topic: "Unsupervised Learning \u2014 Clustering",
      },
      {
        number: 7,
        topic: "Model Evaluation & Hyperparameter Tuning",
      },
      {
        number: 8,
        topic: "Introduction to Neural Networks",
      },
      {
        number: 9,
        topic: "Deep Learning with TensorFlow/Keras Basics",
      },
      {
        number: 10,
        topic: "Introduction to NLP & Computer Vision",
      },
      {
        number: 11,
        topic: "Model Deployment Basics",
      },
      {
        number: 12,
        topic: "Capstone Project \u2014 Image Classification Model",
      },
    ],
  },
  {
    slug: "aws-cloud",
    name: "AWS Cloud",
    weeks: [
      {
        number: 1,
        topic: "Cloud Computing Fundamentals & AWS Account Setup",
        detail: {
          intro: "This week, you'll begin with Cloud Computing Fundamentals & AWS Account Setup. Understanding core cloud concepts and getting comfortable in the AWS Console is the first step before diving into EC2, S3, and the rest of the AWS ecosystem.",
          learn: ["What is cloud computing \u2014 IaaS, PaaS, SaaS", "AWS global infrastructure \u2014 regions & availability zones", "Creating and securing an AWS Free Tier account", "AWS Management Console overview", "Introduction to AWS IAM (users, roles, policies) at a basic level", "Introduction to core AWS services (EC2, S3, RDS, Lambda) at a glance", "AWS pricing basics & the Free Tier", "Setting a billing alert", "Introduction to the AWS CLI", "Basic cloud security principles"],
          approach: "Focus on building a strong understanding of core cloud concepts rather than simply clicking through the console. Spend time exploring the AWS Console, understanding why each service exists, and being deliberate about security from day one. Hands-on practice, curiosity, and consistency will prepare you for the deeper AWS services covered in the upcoming weeks.",
          keepInMind: ["Practice every step instead of just reading about it.", "Understand the purpose of each service before moving forward.", "Maintain notes for future reference.", "Verify AI-generated answers through practical implementation.", "Complete all activities before the submission deadline.", "Always set a billing alert before exploring paid services."],
          task: ["Create an AWS Free Tier account (or use an existing one safely).", "Explore the AWS Console and locate 5 core services.", "Set up a billing alert for a low threshold (e.g. $1).", "Create an IAM user with limited permissions (avoid using the root account for daily work).", "Install and configure the AWS CLI with your IAM user credentials.", "Run basic AWS CLI commands to list your account's regions.", "Prepare a short PDF explaining: cloud service models, AWS regions/AZs, and IAM basics."],
          taskSubmission: ["PDF Report (2\u20134 pages)", "Screenshot of your billing alert configuration", "Screenshot of your IAM user setup", "Screenshot of AWS CLI configured and working"],
          activityScenario: "Imagine you've joined a company as a Junior Cloud Engineer. Your manager asks you to set up a secure baseline AWS environment before any infrastructure work begins.",
          activity: ["Create an IAM group with an appropriate policy for a junior engineer role.", "Add your IAM user to that group.", "Enable MFA on your AWS account.", "Review the IAM Credential Report.", "Document the security setup and reasoning behind each decision.", "Verify the AWS CLI can authenticate using your IAM user (not root)."],
          activitySubmission: ["Screenshot of IAM group and policy", "Screenshot of MFA enabled", "Screenshot of the Credential Report", "Short implementation summary (4\u20135 lines)"],
          aiTask: ["Ask AI to explain IaaS vs PaaS vs SaaS in simple terms.", "Generate a cheat sheet for 15 commonly used AWS CLI commands.", "Ask AI to explain IAM users, groups, roles, and policies.", "Ask AI to explain AWS regions vs availability zones.", "Generate a small AWS security-misconfiguration scenario and try identifying the fix.", "Verify the AI-generated CLI commands by running them in your own account."],
        },
      },
      {
        number: 2,
        topic: "IAM \u2014 Identity & Access Management",
      },
      {
        number: 3,
        topic: "EC2 \u2014 Virtual Servers in the Cloud",
      },
      {
        number: 4,
        topic: "S3 \u2014 Storage Fundamentals",
      },
      {
        number: 5,
        topic: "VPC & Networking Basics",
      },
      {
        number: 6,
        topic: "RDS \u2014 Managed Databases",
      },
      {
        number: 7,
        topic: "Introduction to Lambda & Serverless Computing",
      },
      {
        number: 8,
        topic: "API Gateway & Serverless APIs",
      },
      {
        number: 9,
        topic: "CloudWatch \u2014 Monitoring & Logging",
      },
      {
        number: 10,
        topic: "Load Balancing & Auto Scaling",
      },
      {
        number: 11,
        topic: "AWS CLI & Infrastructure Basics",
      },
      {
        number: 12,
        topic: "Capstone Project \u2014 Serverless URL Shortener",
      },
    ],
  },
  {
    slug: "azure-cloud",
    name: "Azure Cloud",
    weeks: [
      {
        number: 1,
        topic: "Cloud Computing Fundamentals & Azure Account Setup",
        detail: {
          intro: "This week, you'll begin with Cloud Computing Fundamentals & Azure Account Setup. Understanding core cloud concepts and getting comfortable in the Azure Portal is the first step before diving into VMs, Storage, and the rest of the Azure ecosystem.",
          learn: ["What is cloud computing \u2014 IaaS, PaaS, SaaS", "Azure global infrastructure \u2014 regions & resource groups", "Creating and securing an Azure Free account", "Azure Portal overview", "Introduction to Azure Active Directory (Azure AD) at a basic level", "Introduction to core Azure services (VMs, Storage, SQL Database) at a glance", "Azure pricing basics & the Free account", "Setting a budget alert", "Introduction to the Azure CLI", "Basic cloud security principles"],
          approach: "Focus on building a strong understanding of core cloud concepts rather than simply clicking through the portal. Spend time exploring the Azure Portal, understanding why each service exists, and being deliberate about security from day one. Hands-on practice, curiosity, and consistency will prepare you for the deeper Azure services covered in the upcoming weeks.",
          keepInMind: ["Practice every step instead of just reading about it.", "Understand the purpose of each service before moving forward.", "Maintain notes for future reference.", "Verify AI-generated answers through practical implementation.", "Complete all activities before the submission deadline.", "Always set a budget alert before exploring paid services."],
          task: ["Create an Azure Free account (or use an existing one safely).", "Explore the Azure Portal and locate 5 core services.", "Create a Resource Group for your internship work.", "Set up a budget alert for a low threshold.", "Create a limited-permission user via Azure AD (avoid using the owner account for daily work).", "Install and configure the Azure CLI, and log in with az login.", "Prepare a short PDF explaining: cloud service models, Azure regions/resource groups, and Azure AD basics."],
          taskSubmission: ["PDF Report (2\u20134 pages)", "Screenshot of your budget alert configuration", "Screenshot of your Resource Group", "Screenshot of Azure CLI configured and working"],
          activityScenario: "Imagine you've joined a company as a Junior Cloud Engineer. Your manager asks you to set up a secure baseline Azure environment before any infrastructure work begins.",
          activity: ["Create a Resource Group named DevOps-Baseline (or similar).", "Assign an appropriate role (e.g. Contributor) to your working user, scoped to that Resource Group only.", "Enable MFA on your Azure account.", "Review the Azure AD sign-in logs.", "Document the security setup and reasoning behind each decision.", "Verify the Azure CLI can authenticate and list resources in your Resource Group."],
          activitySubmission: ["Screenshot of the Resource Group and role assignment", "Screenshot of MFA enabled", "Screenshot of Azure AD sign-in logs", "Short implementation summary (4\u20135 lines)"],
          aiTask: ["Ask AI to explain IaaS vs PaaS vs SaaS in simple terms.", "Generate a cheat sheet for 15 commonly used Azure CLI commands.", "Ask AI to explain Azure AD users, roles, and role-based access control (RBAC).", "Ask AI to explain Azure regions vs resource groups.", "Generate a small Azure security-misconfiguration scenario and try identifying the fix.", "Verify the AI-generated CLI commands by running them in your own account."],
        },
      },
      {
        number: 2,
        topic: "Azure Active Directory & IAM Basics",
      },
      {
        number: 3,
        topic: "Azure Virtual Machines",
      },
      {
        number: 4,
        topic: "Azure Storage Fundamentals",
      },
      {
        number: 5,
        topic: "Azure Virtual Networks",
      },
      {
        number: 6,
        topic: "Azure SQL Database",
      },
      {
        number: 7,
        topic: "Introduction to Azure Functions",
      },
      {
        number: 8,
        topic: "Building Serverless Apps with Azure Functions",
      },
      {
        number: 9,
        topic: "Azure Monitor & Logging",
      },
      {
        number: 10,
        topic: "Azure App Service \u2014 Web App Hosting",
      },
      {
        number: 11,
        topic: "Cost Management & Azure CLI",
      },
      {
        number: 12,
        topic: "Capstone Project \u2014 Azure-Hosted Web App",
      },
    ],
  },
  {
    slug: "devops",
    name: "DevOps",
    weeks: [
      {
        number: 1,
        topic: "Linux Fundamentals, Linux Administration & Networking Basics",
        detail: {
          intro: "This week, you'll begin with Linux Fundamentals, Linux Administration & Networking Basics. Mastering Linux is the first step toward managing servers, automating workflows, and building modern DevOps infrastructure.",
          learn: ["Introduction to Linux & Open Source", "Linux File System Hierarchy (FHS)", "Ubuntu Installation (VirtualBox/VMware/WSL)", "File & Directory Management", "File Permissions & Ownership", "Users & Groups Management", "Linux Package Management", "Process Management", "Environment Variables", "Basic Networking Concepts", "SSH Fundamentals", "Common Linux Commands"],
          approach: "Focus on building a strong understanding of Linux fundamentals rather than simply completing the tasks. Spend time practicing commands, exploring the Linux environment, and understanding why each concept is important. Hands-on practice, curiosity, and consistency will help you gain confidence and prepare you for the advanced DevOps tools covered in the upcoming weeks.",
          keepInMind: ["Practice every command instead of just reading about it.", "Understand the purpose of each concept before moving forward.", "Maintain notes for future reference.", "Verify AI-generated answers through practical implementation.", "Complete all activities before the submission deadline."],
          task: ["Install Ubuntu using VirtualBox, VMware, or WSL.", "Explore the Linux File System.", "Create and manage users and groups.", "Practice file and directory management.", "Configure file permissions and ownership.", "Install and update packages using the package manager.", "Monitor running processes.", "Configure environment variables.", "Practice networking commands such as hostname, hostnamectl, ip addr, ping, ifconfig.", "Connect to a system using SSH (if available).", "Prepare a short PDF explaining: Linux Fundamentals, Linux File System, Users & Groups, File Permissions, Package Management, Environment Variables, Basic Networking, SSH, and 20 Common Linux Commands."],
          taskSubmission: ["PDF Report (2\u20134 pages)", "Screenshot of Ubuntu Installation", "Screenshot of Linux Terminal", "Screenshot of Users & Groups", "Screenshot of File Permissions", "Screenshot of Networking Commands"],
          activityScenario: "Imagine you have joined a company as a Junior DevOps Engineer. Your manager asks you to prepare a Linux server for a new development team by configuring users, directories, permissions, and basic networking.",
          activity: ["Create a DevOps directory.", "Inside it, create: Projects, Scripts, Logs, Backup.", "Create sample files inside each folder.", "Create two Linux users and one group named developers.", "Add both users to the developers group.", "Assign appropriate file permissions.", "Configure your system hostname.", "Verify internet connectivity using the ping command.", "Display your IP address and system information.", "Compress the DevOps directory into a ZIP or TAR file.", "Document each step performed."],
          activitySubmission: ["ZIP/TAR file of the DevOps directory", "Screenshot of Directory Structure", "Screenshot of Users & Groups", "Screenshot of File Permissions", "Screenshot of Network Connectivity", "Short implementation summary (4\u20135 lines)"],
          aiTask: ["Ask AI to explain Linux administration in simple terms.", "Generate a cheat sheet for 20 commonly used Linux commands.", "Ask AI to explain Linux users, groups, and file permissions.", "Ask AI to explain SSH and its role in DevOps.", "Generate a Linux troubleshooting scenario and try solving it.", "Verify the AI-generated commands by executing them in your Linux environment."],
        },
      },
      {
        number: 2,
        topic: "Shell Scripting & Automation Basics",
      },
      {
        number: 3,
        topic: "Git & GitHub for DevOps",
      },
      {
        number: 4,
        topic: "Docker Fundamentals & Containerization",
      },
      {
        number: 5,
        topic: "Docker Compose & Multi-Container Applications",
      },
      {
        number: 6,
        topic: "Introduction to Kubernetes",
      },
      {
        number: 7,
        topic: "Kubernetes Deployments, Services & Scaling",
      },
      {
        number: 8,
        topic: "CI/CD with Jenkins",
      },
      {
        number: 9,
        topic: "Infrastructure as Code with Terraform",
      },
      {
        number: 10,
        topic: "Configuration Management with Ansible",
      },
      {
        number: 11,
        topic: "Monitoring with Prometheus & Grafana",
      },
      {
        number: 12,
        topic: "Capstone Project \u2014 End-to-End CI/CD Pipeline",
      },
    ],
  },
  {
    slug: "cybersecurity",
    name: "Cybersecurity",
    weeks: [
      {
        number: 1,
        topic: "Networking Fundamentals for Security",
        detail: {
          intro: "This week, you'll begin with Networking Fundamentals for Security. Understanding how networks actually work is essential before you can assess how they get attacked, defended, and monitored in the weeks ahead.",
          learn: ["Introduction to cybersecurity as a discipline", "The OSI model and TCP/IP model", "IP addressing & subnetting basics", "Common protocols \u2014 HTTP/HTTPS, DNS, DHCP", "TCP vs UDP", "Ports and common services", "Firewalls \u2014 basic concepts", "Introduction to packet capture (Wireshark)", "Common network attack types at a conceptual level", "Basic Linux commands for network diagnostics"],
          approach: "Focus on building a strong understanding of how networks function rather than simply completing the tasks. Spend time exploring real traffic with Wireshark, understanding why each protocol exists, and building the mental model that everything in security later builds on. Hands-on practice, curiosity, and consistency will prepare you for the security topics covered in the upcoming weeks.",
          keepInMind: ["Practice every concept instead of just reading about it.", "Understand the purpose of each protocol before moving forward.", "Maintain notes for future reference.", "Verify AI-generated answers through practical implementation.", "Complete all activities before the submission deadline.", "Only test tools like Wireshark and Nmap on your own systems/network."],
          task: ["Install Wireshark on your machine.", "Capture and inspect basic HTTP and DNS traffic on your own network.", "Identify the source/destination IPs and ports in at least 5 captured packets.", "Practice basic network diagnostic commands (ping, traceroute, netstat).", "Research and summarize the differences between TCP and UDP.", "Research and summarize the purpose of a firewall.", "Prepare a short PDF explaining: OSI model, TCP/IP model, common protocols, and your Wireshark findings."],
          taskSubmission: ["PDF Report (2\u20134 pages)", "Screenshot of Wireshark capture", "Screenshot of network diagnostic commands", "Screenshot of packet detail inspection"],
          activityScenario: "Imagine you've joined a company as a Junior Security Analyst. Your manager asks you to document the network traffic pattern of a simple web request as a baseline exercise.",
          activity: ["Start a Wireshark capture on your own machine.", "Visit a website of your choice and observe the traffic.", "Identify the DNS lookup for the site.", "Identify the TCP handshake for the connection.", "Identify the HTTP/HTTPS request and response.", "Stop the capture and export the relevant packets.", "Document the full request lifecycle in your own words."],
          activitySubmission: ["Exported packet capture file", "Screenshot of the DNS lookup", "Screenshot of the TCP handshake", "Short implementation summary (4\u20135 lines)"],
          aiTask: ["Ask AI to explain the OSI model in simple terms.", "Generate a cheat sheet for 15 commonly used networking terms.", "Ask AI to explain how a TCP handshake works.", "Ask AI to explain the difference between a firewall and an IDS.", "Generate a small network-troubleshooting scenario and try solving it.", "Verify the AI-generated explanations against what you observed in Wireshark."],
        },
      },
      {
        number: 2,
        topic: "Operating System Security Basics (Linux & Windows)",
      },
      {
        number: 3,
        topic: "Introduction to Cryptography",
      },
      {
        number: 4,
        topic: "Web Application Security Fundamentals (OWASP Top 10)",
      },
      {
        number: 5,
        topic: "Vulnerability Assessment Basics",
      },
      {
        number: 6,
        topic: "Introduction to Penetration Testing Concepts",
      },
      {
        number: 7,
        topic: "Network Security Tools (Nmap & Wireshark Basics)",
      },
      {
        number: 8,
        topic: "Introduction to SIEM & Security Monitoring",
      },
      {
        number: 9,
        topic: "Security Hardening Best Practices",
      },
      {
        number: 10,
        topic: "Incident Response Fundamentals",
      },
      {
        number: 11,
        topic: "Security Compliance & Documentation",
      },
      {
        number: 12,
        topic: "Capstone Project \u2014 Security Hardening Checklist Tool",
      },
    ],
  },
  {
    slug: "digital-marketing",
    name: "Digital Marketing",
    weeks: [
      {
        number: 1,
        topic: "Digital Marketing Fundamentals & Strategy",
        detail: {
          intro: "This week, you'll begin with Digital Marketing Fundamentals & Strategy. Understanding the full marketing funnel and how channels fit together is the foundation for the SEO, social, and paid-ads skills you'll build in the weeks ahead.",
          learn: ["Introduction to digital marketing & its channels", "The marketing funnel (awareness, consideration, conversion)", "Understanding target audiences & buyer personas", "Introduction to SEO, content, social, email, and paid channels", "Setting SMART marketing goals", "Introduction to Google Analytics", "Understanding KPIs & metrics that matter", "Competitor research basics", "Introduction to marketing tools (Canva, Google Trends, etc.)", "Basics of brand voice & positioning"],
          approach: "Focus on building a strong understanding of marketing strategy rather than simply completing the tasks. Spend time researching real brands, understanding why certain channels work for certain audiences, and building a strategic mindset. Hands-on practice, curiosity, and consistency will prepare you for the SEO and paid-ads skills covered in the upcoming weeks.",
          keepInMind: ["Practice every exercise instead of just reading about it.", "Understand the purpose of each channel before moving forward.", "Maintain notes for future reference.", "Verify AI-generated answers through practical implementation.", "Complete all activities before the submission deadline."],
          task: ["Choose a small business or brand as your case study for the internship.", "Map out its current marketing channels (website, social, etc.).", "Define 2 buyer personas for this business.", "Set 3 SMART marketing goals for the business.", "Create a basic Google Analytics account and explore the interface.", "Identify 3 direct competitors and note their marketing approach.", "Prepare a short PDF explaining: the marketing funnel, your buyer personas, and your SMART goals."],
          taskSubmission: ["PDF Report (2\u20134 pages)", "Screenshot of your buyer persona document", "Screenshot of Google Analytics setup", "Screenshot of your competitor research notes"],
          activityScenario: "Imagine you've joined a company as a Junior Digital Marketing Executive. Your manager asks you to put together a first-draft marketing strategy brief for a new product launch.",
          activity: ["Choose a fictional or real product to plan a launch for.", "Define the target audience and 1 primary buyer persona.", "Select 3 marketing channels best suited to reach that audience.", "Draft 3 SMART goals for the launch.", "Outline a simple 2-week content plan across the chosen channels.", "Identify 2 metrics you'd track to measure success.", "Document your reasoning for each channel and goal choice."],
          activitySubmission: ["Strategy brief document", "Screenshot or export of your 2-week content plan", "Screenshot of your channel selection rationale", "Short implementation summary (4\u20135 lines)"],
          aiTask: ["Ask AI to explain the marketing funnel in simple terms.", "Generate a cheat sheet for 15 common digital marketing KPIs.", "Ask AI to explain how to build a buyer persona.", "Ask AI to explain SMART goals with examples.", "Generate a small marketing-strategy scenario and try solving it.", "Verify the AI-generated strategy against real examples from brands you follow."],
        },
      },
      {
        number: 2,
        topic: "SEO Fundamentals \u2014 On-Page & Off-Page",
      },
      {
        number: 3,
        topic: "Content Marketing & Content Strategy",
      },
      {
        number: 4,
        topic: "Social Media Marketing Fundamentals",
      },
      {
        number: 5,
        topic: "Google Ads Fundamentals",
      },
      {
        number: 6,
        topic: "Google Analytics & Tracking",
      },
      {
        number: 7,
        topic: "Email Marketing Fundamentals",
      },
      {
        number: 8,
        topic: "Social Media Campaign Planning",
      },
      {
        number: 9,
        topic: "Paid Social Advertising (Meta Ads)",
      },
      {
        number: 10,
        topic: "Marketing Analytics & Reporting",
      },
      {
        number: 11,
        topic: "Brand Building & Marketing Funnels",
      },
      {
        number: 12,
        topic: "Capstone Project \u2014 SEO Audit + 30-Day Social Campaign Plan",
      },
    ],
  },
];