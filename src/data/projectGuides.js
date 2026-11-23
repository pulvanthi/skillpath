// Build guides for each practice project.
// Steps are written as "Title | what to do". setup lines starting with "$" are commands.

const g = (summary, level, time, skills, tools, where, setup, steps) => ({
  summary,
  level,
  time,
  skills,
  tools,
  where,
  setup,
  steps: steps.map((s) => {
    const [title, detail] = s.split(" | ");
    return { title, detail };
  }),
});

const VSCODE = "On your own computer, using VS Code as the editor.";
const NODE_SETUP = [
  "Install Node.js (LTS) from nodejs.org and VS Code from code.visualstudio.com",
  "Open VS Code, then open the terminal with Ctrl + `",
];

export const projectGuides = {
  frontend: {
    "Personal Portfolio Website": g(
      "A multi-section website about you: intro, skills, projects and contact. Employers often look at this first.",
      "Beginner", "4 to 6 hours",
      ["HTML structure", "CSS layout", "Responsive design"],
      ["VS Code", "Live Server extension", "Chrome DevTools", "GitHub Pages (to publish)"],
      VSCODE,
      [...NODE_SETUP.slice(1), "Create a folder named portfolio, open it in VS Code", "Create index.html and style.css", "Install the Live Server extension, right-click index.html and choose Open with Live Server"],
      [
        "Plan the sections | Sketch on paper: header, about, skills, projects, contact, footer.",
        "Write the HTML | Build each section with semantic tags (header, main, section, footer).",
        "Style it with CSS | Add colours, fonts and spacing. Use Flexbox for the navbar and Grid for project cards.",
        "Make it responsive | Add a media query so the layout works on phones.",
        "Publish it | Push to GitHub and turn on GitHub Pages to get a live link.",
      ]
    ),
    "Responsive Landing Page": g(
      "A one-page website for a product or service that convinces visitors to sign up, built to look good on every screen.",
      "Beginner", "4 to 6 hours",
      ["Flexbox and Grid", "Media queries", "Buttons and forms"],
      ["VS Code", "Live Server", "Chrome DevTools device toolbar", "Google Fonts"],
      VSCODE,
      ["Create a folder landing-page with index.html and style.css", "Open with Live Server", "Press F12 and click the device icon to test phone sizes"],
      [
        "Choose an idea | Pick a fictional product (a fitness app, a coffee shop).",
        "Build the hero section | Big headline, short text and a call-to-action button.",
        "Add features and testimonials | Use a 3-column Grid that becomes 1 column on phones.",
        "Add a signup form | Email input and a submit button.",
        "Test on different sizes | Fix anything that breaks at phone and tablet widths.",
      ]
    ),
    "React Task Manager": g(
      "A to-do app where you add, complete and delete tasks. Your first real React project.",
      "Intermediate", "6 to 8 hours",
      ["Components", "useState", "Lists and keys", "localStorage"],
      ["Node.js", "Vite", "VS Code", "React DevTools"],
      VSCODE,
      [...NODE_SETUP, "$ npm create vite@latest task-manager -- --template react", "$ cd task-manager", "$ npm install", "$ npm run dev", "Open the link shown (http://localhost:5173)"],
      [
        "Plan components | App, TaskForm, TaskList, TaskItem.",
        "Add tasks | Keep a tasks array in state and add new ones from a form.",
        "Complete and delete | Toggle a done flag and remove tasks by id.",
        "Save data | Store tasks in localStorage so they stay after refresh.",
        "Polish and deploy | Add filters (all, active, done), style it, and deploy to Vercel or Netlify.",
      ]
    ),
  },

  backend: {
    "REST API for Tasks": g(
      "A server with endpoints to create, read, update and delete tasks. This is the backbone of most apps.",
      "Beginner", "5 to 7 hours",
      ["Express routes", "HTTP methods", "JSON", "Status codes"],
      ["Node.js", "Express", "Postman", "Nodemon"],
      VSCODE,
      [...NODE_SETUP, "$ mkdir tasks-api && cd tasks-api", "$ npm init -y", "$ npm install express", "$ npm install -D nodemon", "Create index.js and run with: npx nodemon index.js"],
      [
        "Start a server | Create an Express app listening on port 3000 and test it in the browser.",
        "GET endpoints | Return all tasks and one task by id from an array.",
        "POST endpoint | Add a task from the JSON request body.",
        "PUT and DELETE | Update and remove tasks and return correct status codes.",
        "Test with Postman | Send each request and check responses, including errors.",
      ]
    ),
    "User Authentication API": g(
      "An API where users can register and log in securely, and only logged-in users can see protected data.",
      "Intermediate", "8 to 10 hours",
      ["Password hashing", "JWT", "Middleware", "Validation"],
      ["Node.js", "Express", "bcrypt", "jsonwebtoken", "Postman"],
      VSCODE,
      [...NODE_SETUP, "$ mkdir auth-api && cd auth-api", "$ npm init -y", "$ npm install express bcrypt jsonwebtoken dotenv", "Create a .env file for your secret key (never share it)"],
      [
        "Register endpoint | Validate input, hash the password with bcrypt and store the user.",
        "Login endpoint | Compare passwords and return a JWT token.",
        "Auth middleware | Check the token on each protected request.",
        "Protected route | Add a /profile route only logged-in users can open.",
        "Test everything | Try wrong passwords, missing tokens and expired tokens in Postman.",
      ]
    ),
    "Blog Backend": g(
      "The server side of a blog: posts, authors and comments stored in a database.",
      "Intermediate", "8 to 10 hours",
      ["Database design", "CRUD", "Relationships", "Pagination"],
      ["Node.js", "Express", "PostgreSQL or MongoDB", "Postman"],
      VSCODE,
      [...NODE_SETUP, "Install PostgreSQL (or create a free MongoDB Atlas database)", "$ mkdir blog-backend && cd blog-backend", "$ npm init -y", "$ npm install express pg dotenv"],
      [
        "Design the data | Tables or collections: users, posts, comments.",
        "Posts CRUD | Create, list, edit and delete posts.",
        "Comments | Link comments to posts and fetch them with the post.",
        "Search and pagination | Add ?page= and ?search= to the list endpoint.",
        "Protect and test | Only the author can edit; test in Postman.",
      ]
    ),
  },

  "full-stack": {
    "Full Stack Notes App": g(
      "A notes app with a React frontend, an Express API and a database, with users saving their own notes.",
      "Intermediate", "10 to 14 hours",
      ["React", "Express API", "Database", "Connecting both sides"],
      ["Node.js", "React with Vite", "Express", "MongoDB or PostgreSQL", "Postman"],
      VSCODE,
      [...NODE_SETUP, "$ mkdir notes-app && cd notes-app", "Create two folders: client (React) and server (Express)", "$ npm create vite@latest client -- --template react", "In server: npm init -y and npm install express cors dotenv"],
      [
        "Build the API first | Notes CRUD endpoints tested in Postman.",
        "Create the database | Store notes with title, text and timestamps.",
        "Build the React UI | A notes list, a form and delete buttons.",
        "Connect frontend to backend | Use fetch, and enable CORS on the server.",
        "Deploy | Frontend on Vercel and backend on Render.",
      ]
    ),
    "Job Portal": g(
      "A website where companies post jobs and candidates browse and apply.",
      "Advanced", "15 to 20 hours",
      ["Roles and auth", "Search and filters", "Relational data", "Forms"],
      ["React", "Node.js and Express", "PostgreSQL", "Postman"],
      VSCODE,
      ["Use the same client and server folder setup as the Notes App", "Install PostgreSQL and a GUI such as pgAdmin"],
      [
        "Plan roles | Candidate and employer, with different pages.",
        "Auth | Register and log in with JWT.",
        "Jobs | Employers create jobs; everyone can list and search them.",
        "Applications | Candidates apply; employers see applicants.",
        "Polish | Filters, validation, error messages and deployment.",
      ]
    ),
    "Student Management System": g(
      "An app to manage students, courses and marks, with admin and student views.",
      "Intermediate", "12 to 16 hours",
      ["CRUD", "Tables and forms", "Authentication", "Validation"],
      ["React", "Node.js and Express", "MySQL or PostgreSQL"],
      VSCODE,
      ["Use the client and server folder setup", "Create the database and tables for students, courses and marks"],
      [
        "Design the database | Students, courses and marks tables with keys.",
        "Student CRUD API | Add, view, edit and delete students.",
        "Admin UI | A table with search and an add/edit form.",
        "Marks and reports | Enter marks and show a summary per student.",
        "Login and deploy | Separate admin and student access, then publish.",
      ]
    ),
  },

  javascript: {
    Calculator: g(
      "A working calculator in the browser with buttons for numbers and operations.",
      "Beginner", "3 to 4 hours",
      ["DOM", "Events", "Functions"],
      ["VS Code", "Live Server", "Browser console"],
      VSCODE,
      ["Create calculator.html, style.css and script.js", "Open with Live Server"],
      [
        "Build the layout | HTML buttons in a Grid and a display area.",
        "Handle button clicks | Add event listeners and update the display.",
        "Do the math | Write functions for add, subtract, multiply and divide.",
        "Handle edge cases | Divide by zero, decimals and the clear button.",
        "Add keyboard support | Listen for keydown events.",
      ]
    ),
    "Quiz Application": g(
      "A quiz with multiple-choice questions, a score and a result screen.",
      "Beginner", "4 to 6 hours",
      ["Arrays and objects", "DOM", "Events"],
      ["VS Code", "Live Server"],
      VSCODE,
      ["Create quiz.html, style.css and script.js", "Open with Live Server"],
      [
        "Store questions | An array of objects with question, options and answer.",
        "Show one question | Render it and its options on the page.",
        "Check the answer | Highlight right or wrong and update the score.",
        "Next and finish | Move through questions and show the final score.",
        "Extras | Add a timer and save the best score in localStorage.",
      ]
    ),
    "Weather Dashboard": g(
      "Search a city and see the current weather and forecast using a public API.",
      "Intermediate", "5 to 7 hours",
      ["fetch", "async and await", "JSON", "Error handling"],
      ["VS Code", "Open-Meteo API (free, no key) or OpenWeatherMap", "Browser DevTools Network tab"],
      VSCODE,
      ["Create index.html, style.css and app.js", "Choose a free weather API and read its docs"],
      [
        "Build the search UI | An input, a button and a results area.",
        "Fetch data | Call the API with fetch and log the response.",
        "Show the weather | Display temperature, condition and an icon.",
        "Handle errors | City not found, no internet, loading state.",
        "Save recent searches | Use localStorage.",
      ]
    ),
  },

  react: {
    "Expense Tracker": g(
      "Add income and expenses, see the balance and a list of transactions.",
      "Beginner", "5 to 7 hours",
      ["useState", "Props", "Lists", "Forms"],
      ["Node.js", "Vite", "VS Code", "React DevTools"],
      VSCODE,
      [...NODE_SETUP, "$ npm create vite@latest expense-tracker -- --template react", "$ cd expense-tracker", "$ npm install", "$ npm run dev"],
      [
        "Plan components | Balance, TransactionForm, TransactionList.",
        "Add transactions | Store them in state with amount, text and type.",
        "Calculate totals | Show balance, income and expense.",
        "Delete and save | Remove items and keep data in localStorage.",
        "Style and deploy | Colour income green and expense red, then deploy.",
      ]
    ),
    "Movie Search App": g(
      "Search movies by name and show posters and details from a movie API.",
      "Intermediate", "6 to 8 hours",
      ["useEffect", "API calls", "Loading and error states", "Debounce"],
      ["Node.js", "Vite", "OMDb or TMDB API (free key)", "VS Code"],
      VSCODE,
      [...NODE_SETUP, "$ npm create vite@latest movie-search -- --template react", "Get a free API key from omdbapi.com or themoviedb.org", "Store it in a .env file as VITE_API_KEY"],
      [
        "Search box | A controlled input holding the search text.",
        "Fetch movies | Call the API when the user searches.",
        "Show results | A responsive grid of movie cards.",
        "Handle states | Loading spinner, no results and errors.",
        "Details page | Use React Router to open a movie.",
      ]
    ),
    "E-commerce UI": g(
      "A shopping website front end: product grid, product page and cart.",
      "Intermediate", "10 to 14 hours",
      ["React Router", "Context or Redux", "Reusable components", "Responsive design"],
      ["Node.js", "Vite", "React Router", "Fake Store API (free)"],
      VSCODE,
      [...NODE_SETUP, "$ npm create vite@latest shop-ui -- --template react", "$ npm install react-router-dom"],
      [
        "Product list | Fetch products from fakestoreapi.com and show cards.",
        "Product page | Route /product/:id with details.",
        "Cart | Add, remove and change quantity using context.",
        "Checkout form | Validate inputs and show an order summary.",
        "Polish | Filters, search, responsive layout and deploy.",
      ]
    ),
  },

  nextjs: {
    "Personal Blog": g(
      "A fast blog with a home page and one page per post, built with the App Router.",
      "Intermediate", "6 to 8 hours",
      ["App Router", "Dynamic routes", "Server components", "Layouts"],
      ["Node.js", "Next.js", "VS Code", "Vercel"],
      VSCODE,
      [...NODE_SETUP, "$ npx create-next-app@latest my-blog", "$ cd my-blog", "$ npm run dev", "Open http://localhost:3000"],
      [
        "Layout | Create a shared navbar and footer in layout.js.",
        "Posts data | Start with a simple array or markdown files.",
        "Home page | List posts with links.",
        "Post page | Create app/posts/[slug]/page.js.",
        "Deploy | Push to GitHub and import into Vercel.",
      ]
    ),
    "Product Catalog": g(
      "A catalog of products with search, categories and product detail pages.",
      "Intermediate", "8 to 10 hours",
      ["Fetching data", "Dynamic routes", "Search params", "next/image"],
      ["Node.js", "Next.js", "Fake Store API", "Vercel"],
      VSCODE,
      [...NODE_SETUP, "$ npx create-next-app@latest catalog", "$ cd catalog", "$ npm run dev"],
      [
        "Fetch products | Load data in a server component.",
        "Product grid | Cards using the Image component.",
        "Product details | Dynamic route /products/[id].",
        "Search and filter | Use query strings like ?category=.",
        "Deploy | Publish on Vercel.",
      ]
    ),
    "Learning Dashboard": g(
      "A dashboard that shows courses, progress and stats, with a sidebar layout.",
      "Advanced", "10 to 14 hours",
      ["Nested layouts", "Client components", "Charts", "State"],
      ["Node.js", "Next.js", "Recharts or Chart.js", "Tailwind CSS"],
      VSCODE,
      [...NODE_SETUP, "$ npx create-next-app@latest learning-dashboard", "$ npm install recharts"],
      [
        "Dashboard layout | Sidebar and top bar shared by all pages.",
        "Overview page | Stat cards for courses, hours and streak.",
        "Charts | Show weekly progress with a chart (client component).",
        "Courses page | List courses with progress bars.",
        "Deploy | Publish on Vercel.",
      ]
    ),
  },

  java: {
    "Bank Account Management System": g(
      "A console program to create accounts, deposit, withdraw and view balances.",
      "Beginner", "5 to 7 hours",
      ["Classes and objects", "Encapsulation", "Exceptions", "ArrayList"],
      ["JDK 17+", "IntelliJ IDEA Community or VS Code with Java extension"],
      "On your computer using IntelliJ IDEA (recommended for Java).",
      ["Install JDK from adoptium.net", "Install IntelliJ IDEA Community Edition", "Create a new Java project named BankSystem"],
      [
        "Design classes | Account with accountNumber, holder and balance.",
        "Deposit and withdraw | Add methods; throw an exception for insufficient balance.",
        "Store accounts | Keep them in an ArrayList.",
        "Menu | A Scanner-based loop with choices.",
        "Save to file | Write and read account data from a file.",
      ]
    ),
    "Library Management System": g(
      "Manage books and members: add books, issue and return them.",
      "Intermediate", "8 to 10 hours",
      ["OOP", "Collections", "File handling", "Menus"],
      ["JDK 17+", "IntelliJ IDEA"],
      "On your computer using IntelliJ IDEA.",
      ["Create a Java project named LibrarySystem"],
      [
        "Classes | Book, Member and Library.",
        "Add and search books | Use ArrayList and HashMap.",
        "Issue and return | Track who has which book and due dates.",
        "Menu interface | Console choices for every action.",
        "Persist data | Save to a file; optionally use JDBC later.",
      ]
    ),
    "Employee Management System": g(
      "Store employee records, update salaries and generate simple reports.",
      "Intermediate", "8 to 10 hours",
      ["Inheritance", "Polymorphism", "Streams", "JDBC (optional)"],
      ["JDK 17+", "IntelliJ IDEA", "MySQL (optional)"],
      "On your computer using IntelliJ IDEA.",
      ["Create a Java project named EmployeeSystem", "Optional: install MySQL and add the JDBC driver"],
      [
        "Employee classes | Base Employee, with Manager and Developer subclasses.",
        "CRUD operations | Add, view, update and delete employees.",
        "Reports | Use streams to sort and filter by salary.",
        "Store data | In a file first, then in MySQL with JDBC.",
        "Error handling | Validate input and handle exceptions.",
      ]
    ),
  },

  python: {
    "Password Generator": g(
      "A tool that creates strong random passwords with chosen length and character types.",
      "Beginner", "2 to 3 hours",
      ["random and secrets modules", "Strings", "Functions", "input()"],
      ["Python 3", "VS Code with Python extension"],
      VSCODE,
      ["Install Python from python.org (tick Add to PATH)", "Create password_gen.py in VS Code", "Run with: python password_gen.py"],
      [
        "Ask for options | Length and whether to include numbers and symbols.",
        "Build the character set | Combine string.ascii_letters, digits and punctuation.",
        "Generate | Use secrets.choice in a loop.",
        "Check strength | Ensure at least one of each chosen type.",
        "Extras | Copy to clipboard or build a small GUI with Tkinter.",
      ]
    ),
    "Expense Tracker": g(
      "A command-line tool to record expenses by category and see totals.",
      "Beginner", "4 to 5 hours",
      ["Lists and dictionaries", "File handling", "JSON", "Functions"],
      ["Python 3", "VS Code"],
      VSCODE,
      ["Create expense_tracker.py", "Run with: python expense_tracker.py"],
      [
        "Menu | Add expense, view all, view totals, quit.",
        "Add expenses | Store amount, category and date in a dictionary.",
        "Save data | Write to expenses.json and load on start.",
        "Totals | Group and sum by category.",
        "Extras | Monthly report and a chart with matplotlib.",
      ]
    ),
    "File Organizer": g(
      "A script that sorts messy folders by moving files into folders by type.",
      "Beginner", "3 to 4 hours",
      ["os and pathlib", "shutil", "Dictionaries", "Automation"],
      ["Python 3", "VS Code"],
      VSCODE,
      ["Create a test folder with some mixed files (copies only, not your real files)", "Create organizer.py"],
      [
        "Define file types | A dictionary mapping extensions to folder names.",
        "List files | Loop through the folder with pathlib.",
        "Move files | Create folders and use shutil.move.",
        "Be safe | Skip duplicates and print what you did.",
        "Extras | Add a command-line argument for the folder path.",
      ]
    ),
  },

  "c-programming": {
    "Student Record System": g(
      "A console program to add, view, search and delete student records.",
      "Beginner", "5 to 7 hours",
      ["Structures", "Arrays", "File handling", "Functions"],
      ["GCC compiler", "Code::Blocks or VS Code"],
      "On your computer using Code::Blocks, or VS Code with MinGW (Windows) / GCC (Mac, Linux).",
      ["Windows: install MinGW or use Code::Blocks with built-in compiler", "Create student.c", "Compile: gcc student.c -o student", "Run: ./student (or student.exe)"],
      [
        "Define a struct | Student with roll number, name and marks.",
        "Menu | A do-while loop with a switch.",
        "Add and view | Store students in an array.",
        "Search and delete | By roll number.",
        "Save to file | Use fopen, fprintf and fscanf.",
      ]
    ),
    "Simple Calculator": g(
      "A console calculator that handles basic operations in a loop.",
      "Beginner", "2 to 3 hours",
      ["Input and output", "switch", "Functions", "Loops"],
      ["GCC compiler", "Code::Blocks or VS Code"],
      "On your computer using Code::Blocks or VS Code with GCC.",
      ["Create calc.c", "Compile: gcc calc.c -o calc", "Run it"],
      [
        "Read input | Two numbers and an operator with scanf.",
        "Use a switch | Handle +, -, *, /.",
        "Write functions | One function per operation.",
        "Handle errors | Division by zero and invalid operator.",
        "Loop | Ask whether to calculate again.",
      ]
    ),
    "Contact Management System": g(
      "Store names and phone numbers, with search, edit and delete, saved to a file.",
      "Intermediate", "6 to 8 hours",
      ["Structures", "File handling", "Strings", "Dynamic memory"],
      ["GCC compiler", "Code::Blocks or VS Code"],
      "On your computer using Code::Blocks or VS Code with GCC.",
      ["Create contacts.c", "Compile: gcc contacts.c -o contacts"],
      [
        "Struct design | Contact with name, phone and email.",
        "Add and list | Save to a binary or text file.",
        "Search | By name using strcmp or strstr.",
        "Edit and delete | Rewrite the file after changes.",
        "Tidy up | Validate input and free any dynamic memory.",
      ]
    ),
  },

  cpp: {
    "Banking Console App": g(
      "A banking app with accounts, deposits, withdrawals and transaction history.",
      "Intermediate", "6 to 8 hours",
      ["Classes", "Inheritance", "vector", "File I/O"],
      ["g++ compiler", "Code::Blocks or VS Code"],
      "On your computer using Code::Blocks or VS Code with g++.",
      ["Install a compiler (MinGW on Windows)", "Create bank.cpp", "Compile: g++ bank.cpp -o bank", "Run it"],
      [
        "Classes | Account with Savings and Current subclasses.",
        "Core actions | Deposit, withdraw and check balance.",
        "Store accounts | Use a vector and a menu loop.",
        "History | Record each transaction.",
        "Save to file | Use ofstream and ifstream.",
      ]
    ),
    "Inventory System": g(
      "Track products, stock levels and low-stock warnings.",
      "Intermediate", "6 to 8 hours",
      ["STL map and vector", "Classes", "Sorting", "File I/O"],
      ["g++ compiler", "VS Code"],
      "On your computer using VS Code with g++.",
      ["Create inventory.cpp", "Compile: g++ inventory.cpp -o inventory"],
      [
        "Item class | Name, id, quantity and price.",
        "Store items | Use a map keyed by id.",
        "Update stock | Add and remove quantity.",
        "Reports | Sort by name or price; warn on low stock.",
        "Save data | Read and write a file.",
      ]
    ),
    "Student Database": g(
      "A program to store students and their grades and search or sort them.",
      "Intermediate", "5 to 7 hours",
      ["Classes", "vector", "Algorithms (sort, find)", "File I/O"],
      ["g++ compiler", "VS Code"],
      "On your computer using VS Code with g++.",
      ["Create students.cpp", "Compile: g++ students.cpp -o students"],
      [
        "Student class | Name, roll number and marks.",
        "Add and view | Store in a vector.",
        "Search | By roll number or name.",
        "Sort | By marks using std::sort.",
        "Save to file | Persist between runs.",
      ]
    ),
  },

  dsa: {
    "Sorting Visualizer": g(
      "A web app that animates sorting algorithms so you can see how they work.",
      "Intermediate", "8 to 10 hours",
      ["Sorting algorithms", "Animation", "DOM or React", "Time complexity"],
      ["VS Code", "Vite and React (or plain JavaScript)"],
      VSCODE,
      [...NODE_SETUP, "$ npm create vite@latest sort-visualizer -- --template react", "$ npm install", "$ npm run dev"],
      [
        "Draw the bars | Generate a random array and render bars of different heights.",
        "Bubble sort | Implement it and record each swap.",
        "Animate | Play the swaps with a small delay.",
        "More algorithms | Add selection, insertion, merge and quick sort.",
        "Controls | Speed slider, array size and a reset button.",
      ]
    ),
    "Pathfinding Visualizer": g(
      "A grid where you place walls and watch BFS or Dijkstra find the shortest path.",
      "Advanced", "10 to 14 hours",
      ["Graphs", "BFS and DFS", "Dijkstra", "Animation"],
      ["VS Code", "Vite and React"],
      VSCODE,
      [...NODE_SETUP, "$ npm create vite@latest path-visualizer -- --template react"],
      [
        "Build the grid | Cells with start, end and wall states.",
        "Draw walls | Click and drag to toggle walls.",
        "BFS | Implement it and record the visit order.",
        "Animate | Show visited cells and then the path.",
        "Add algorithms | Dijkstra or A*, plus a reset button.",
      ]
    ),
    "DSA Problem Tracker": g(
      "An app to track the problems you solved, topics, difficulty and revision dates.",
      "Intermediate", "6 to 8 hours",
      ["Arrays and objects", "Sorting and filtering", "localStorage", "Hash maps"],
      ["VS Code", "Vite and React"],
      VSCODE,
      [...NODE_SETUP, "$ npm create vite@latest dsa-tracker -- --template react"],
      [
        "Data model | Problem with title, link, topic, difficulty and status.",
        "Add form | Create problems and store them.",
        "Table | Show, filter by topic and sort by difficulty.",
        "Progress | Count solved per topic with a chart.",
        "Revision | Mark problems to revisit.",
      ]
    ),
  },

  sql: {
    "Library Database": g(
      "Design and query a database for books, members and borrowing records.",
      "Beginner", "4 to 6 hours",
      ["CREATE TABLE", "Keys", "JOIN", "GROUP BY"],
      ["MySQL Workbench or PostgreSQL with pgAdmin", "DB Fiddle or SQLite (no install)"],
      "Easiest start: an online tool like db-fiddle.com or sqliteonline.com. Later move to MySQL or PostgreSQL on your computer.",
      ["Open sqliteonline.com or install MySQL Workbench", "Create a new database named library"],
      [
        "Design tables | books, members and loans with primary and foreign keys.",
        "Create tables | Write CREATE TABLE statements.",
        "Insert data | Add 10 or more rows to each table.",
        "Write queries | Books borrowed per member, overdue loans, most popular books.",
        "Improve | Add indexes and constraints.",
      ]
    ),
    "Employee Database": g(
      "A company database with employees, departments and salaries, plus reporting queries.",
      "Beginner", "4 to 6 hours",
      ["Relationships", "JOIN", "Aggregates", "Subqueries"],
      ["MySQL Workbench or pgAdmin", "sqliteonline.com"],
      "Online SQL tool to start, or MySQL / PostgreSQL on your computer.",
      ["Create a database named company"],
      [
        "Design tables | employees, departments and optional projects.",
        "Create and fill | Insert sample data.",
        "Reports | Average salary per department, top 5 earners.",
        "Subqueries | Employees earning above the department average.",
        "Window functions | Rank employees by salary within a department.",
      ]
    ),
    "Online Store Database": g(
      "A database for customers, products, orders and order items, like a real shop.",
      "Intermediate", "6 to 8 hours",
      ["Normalization", "Many-to-many tables", "JOIN", "Transactions"],
      ["PostgreSQL with pgAdmin or MySQL Workbench", "dbdiagram.io (to draw the design)"],
      "On your computer using PostgreSQL or MySQL; draw the design first on dbdiagram.io.",
      ["Draw the schema on dbdiagram.io", "Install PostgreSQL and pgAdmin"],
      [
        "Design | customers, products, orders, order_items.",
        "Create tables | Add keys and constraints.",
        "Insert sample data | Customers, products and orders.",
        "Queries | Revenue per product, best customers, monthly sales.",
        "Transactions | Place an order and update stock safely.",
      ]
    ),
  },

  "data-analytics": {
    "Sales Analysis Dashboard": g(
      "Analyse sales data and present trends, best products and regions in a dashboard.",
      "Intermediate", "6 to 8 hours",
      ["Data cleaning", "Pivot tables or Pandas", "Charts", "Dashboards"],
      ["Excel or Power BI", "Python and Jupyter (optional)", "Kaggle datasets"],
      "On your computer with Excel or Power BI Desktop; or Google Colab online for Python.",
      ["Download a free sales dataset from kaggle.com", "Open it in Excel, Power BI or Google Colab"],
      [
        "Understand the data | Look at columns and check for blanks or duplicates.",
        "Clean it | Fix formats, remove duplicates and handle missing values.",
        "Analyse | Sales by month, product and region.",
        "Build charts | A line chart for trend and bar charts for top items.",
        "Tell the story | Add 3 clear insights and recommendations.",
      ]
    ),
    "Student Performance Analysis": g(
      "Explore what affects student marks, such as attendance and study time.",
      "Beginner", "5 to 6 hours",
      ["Pandas", "Averages and correlation", "Charts", "Insights"],
      ["Python", "Jupyter or Google Colab", "Pandas", "Matplotlib"],
      "Google Colab in your browser (no install) or Jupyter on your computer.",
      ["Open colab.research.google.com", "Upload a student performance CSV from Kaggle"],
      [
        "Load the data | pd.read_csv and look at the first rows.",
        "Clean | Handle missing values and wrong types.",
        "Explore | Averages by group; correlations.",
        "Visualise | Histograms and scatter plots.",
        "Conclude | Summarise the main factors.",
      ]
    ),
    "Customer Data Report": g(
      "A report that segments customers and highlights who buys most and who might leave.",
      "Intermediate", "6 to 8 hours",
      ["SQL or Pandas", "Grouping", "Segmentation", "Reporting"],
      ["Excel or Power BI", "SQL or Python"],
      "On your computer with Excel or Power BI, or Google Colab for Python.",
      ["Find a customer dataset on Kaggle", "Open it in your tool of choice"],
      [
        "Clean the data | Remove duplicates and fix dates.",
        "Key numbers | Customers, revenue and average order value.",
        "Segment | Group by spend or frequency.",
        "Visualise | Charts per segment.",
        "Write the report | One page of insights and next steps.",
      ]
    ),
  },

  "ai-ml": {
    "House Price Prediction": g(
      "Train a model that predicts house prices from size, rooms and location.",
      "Beginner", "5 to 7 hours",
      ["Regression", "Pandas", "scikit-learn", "Model evaluation"],
      ["Python", "Google Colab or Jupyter", "scikit-learn", "Kaggle dataset"],
      "Google Colab in your browser, no installation needed.",
      ["Open colab.research.google.com", "Download a house prices dataset from Kaggle and upload it"],
      [
        "Load and explore | Look at columns, missing values and ranges.",
        "Prepare data | Handle blanks and encode text columns.",
        "Split | train_test_split into train and test sets.",
        "Train | LinearRegression, then try RandomForestRegressor.",
        "Evaluate | Use MAE and R-squared and compare models.",
      ]
    ),
    "Spam Message Classifier": g(
      "A model that tells whether a message is spam or not.",
      "Beginner", "5 to 7 hours",
      ["Text processing", "TF-IDF", "Classification", "Precision and recall"],
      ["Python", "Google Colab", "scikit-learn", "SMS Spam dataset"],
      "Google Colab in your browser.",
      ["Open Google Colab", "Download the SMS Spam Collection dataset from Kaggle or UCI"],
      [
        "Load the data | Messages and labels.",
        "Clean text | Lowercase and remove punctuation.",
        "Vectorise | Use TfidfVectorizer.",
        "Train | MultinomialNB or LogisticRegression.",
        "Test your own messages | Predict on new text and check precision and recall.",
      ]
    ),
    "Student Score Prediction": g(
      "Predict a student's score from study hours and other factors.",
      "Beginner", "4 to 5 hours",
      ["Linear regression", "Visualisation", "Train and test", "Metrics"],
      ["Python", "Google Colab", "scikit-learn", "Matplotlib"],
      "Google Colab in your browser.",
      ["Open Google Colab", "Use a Student Scores dataset from Kaggle"],
      [
        "Plot the data | Scatter plot of hours versus score.",
        "Split | Train and test sets.",
        "Train | Fit a LinearRegression model.",
        "Evaluate | MAE and R-squared.",
        "Predict | Try your own input values.",
      ]
    ),
  },

  cloud: {
    "Host a Static Website": g(
      "Put a simple HTML website online using cloud storage.",
      "Beginner", "2 to 3 hours",
      ["Object storage", "Permissions", "DNS basics"],
      ["AWS S3 (free tier), Azure Storage or Google Cloud Storage", "A simple HTML page"],
      "In your cloud provider's web console. You need a free account.",
      ["Create a free AWS, Azure or Google Cloud account", "Set a billing alert so you never get surprise charges", "Prepare a simple index.html"],
      [
        "Create a bucket | A storage space with a unique name.",
        "Upload files | index.html and any images.",
        "Enable website hosting | Set index.html as the main page.",
        "Set permissions | Allow public read access to the website files only.",
        "Open the URL | Test it, then clean up to avoid charges.",
      ]
    ),
    "Cloud File Storage Demo": g(
      "A small app that uploads and downloads files to cloud storage.",
      "Intermediate", "5 to 7 hours",
      ["Object storage", "IAM", "SDK usage", "Security"],
      ["AWS S3 and boto3 (Python) or Azure Blob SDK", "VS Code"],
      "On your computer, connecting to the cloud with credentials.",
      ["Create a storage bucket", "Create an IAM user with only storage permissions", "$ pip install boto3", "Configure your credentials with the cloud CLI"],
      [
        "Create the bucket | Private by default.",
        "Upload a file | Use the SDK from your script.",
        "List and download | Show stored files and fetch one.",
        "Secure it | Use least-privilege permissions and never commit keys.",
        "Clean up | Delete test files and the bucket.",
      ]
    ),
    "Deploy a Web Application": g(
      "Take a small web app and run it live on a cloud service.",
      "Intermediate", "5 to 8 hours",
      ["Hosting", "Environment variables", "Logs", "Domains"],
      ["Render, Railway, AWS Elastic Beanstalk or Azure App Service", "GitHub"],
      "Your code on GitHub, deployed from your cloud provider's dashboard.",
      ["Push your app to GitHub", "Create a free account on Render or your cloud provider"],
      [
        "Prepare the app | Add a start script and read the port from the environment.",
        "Connect GitHub | Link the repository in the dashboard.",
        "Set environment variables | Add secrets in the dashboard, not in code.",
        "Deploy | Watch the build logs and fix errors.",
        "Test | Open the live URL and check logs and monitoring.",
      ]
    ),
  },

  devops: {
    "Dockerize a Web App": g(
      "Package a web app into a Docker image and run it in a container.",
      "Beginner", "3 to 5 hours",
      ["Dockerfile", "Images and containers", "Ports", "Docker Compose"],
      ["Docker Desktop", "A small Node or Python app", "VS Code"],
      "On your computer with Docker Desktop installed.",
      ["Install Docker Desktop", "Check it works: docker --version", "Have a simple app ready (for example an Express server)"],
      [
        "Write a Dockerfile | Base image, copy files, install dependencies and run command.",
        "Build | docker build -t myapp .",
        "Run | docker run -p 3000:3000 myapp and open the browser.",
        "Add Compose | A docker-compose.yml with the app and a database.",
        "Push to Docker Hub | Tag and push your image.",
      ]
    ),
    "CI/CD Pipeline Demo": g(
      "Automatically test and build your code every time you push to GitHub.",
      "Intermediate", "4 to 6 hours",
      ["GitHub Actions", "YAML", "Automated tests", "Build steps"],
      ["GitHub", "GitHub Actions", "A small project with tests"],
      "In your GitHub repository (Actions tab).",
      ["Create a GitHub repo with a small app and a test", "Create the folder .github/workflows"],
      [
        "Write a workflow | A YAML file that runs on every push.",
        "Install and test | Steps to checkout, install dependencies and run tests.",
        "Break something | Push a failing test and see the red cross.",
        "Add a build step | Build the app or Docker image.",
        "Add a badge | Show status in your README.",
      ]
    ),
    "Automated Deployment": g(
      "Deploy your app automatically after tests pass.",
      "Advanced", "6 to 8 hours",
      ["CI/CD", "Secrets", "Deployment targets", "Rollbacks"],
      ["GitHub Actions", "Render, Vercel or a cloud VM", "Docker"],
      "GitHub plus a hosting service or a small cloud server.",
      ["Complete the CI/CD demo first", "Create an account on your hosting service and get a deploy token"],
      [
        "Store secrets | Add tokens in GitHub Secrets.",
        "Deploy job | Add a step that deploys when tests pass on main.",
        "Environments | Separate staging and production.",
        "Verify | Add a health-check step after deploy.",
        "Rollback plan | Learn how to return to the previous version.",
      ]
    ),
  },

  cybersecurity: {
    "Password Strength Checker": g(
      "A tool that rates how strong a password is and gives tips to improve it.",
      "Beginner", "3 to 4 hours",
      ["Pattern checks", "Entropy idea", "Common password lists", "Safe handling"],
      ["Python or JavaScript", "VS Code"],
      VSCODE,
      ["Create checker.py (or a small HTML page)", "Download a list of common passwords for checking"],
      [
        "Check length | Short passwords are weak.",
        "Check variety | Upper, lower, numbers and symbols.",
        "Check common passwords | Compare against a list.",
        "Give a score | Weak, medium or strong with advice.",
        "Never store passwords | Do not log or save what users type.",
      ]
    ),
    "Security Awareness Guide": g(
      "A clear guide or website that teaches people to avoid phishing, scams and weak passwords.",
      "Beginner", "4 to 5 hours",
      ["Common threats", "Writing clearly", "Design", "Awareness"],
      ["Canva or Google Docs", "Or a simple HTML website"],
      "Any tool: a document, slides, or a simple website.",
      ["Choose your audience (students, family, small business)", "Collect 5 real examples of scams"],
      [
        "List threats | Phishing, malware, weak passwords, public Wi-Fi.",
        "Explain simply | Use plain language and examples.",
        "Add checklists | What to do and what not to do.",
        "Design it | Clear headings, icons and short sections.",
        "Test it | Ask a friend to read it and give feedback.",
      ]
    ),
    "Log Monitoring Dashboard": g(
      "A dashboard that reads log files and highlights suspicious activity such as repeated failed logins.",
      "Intermediate", "6 to 8 hours",
      ["Log parsing", "Pattern detection", "Charts", "Alerting"],
      ["Python", "Pandas", "Streamlit or a simple web page", "Sample log files"],
      VSCODE,
      ["Install Python", "$ pip install pandas streamlit", "Download or generate a sample access.log or auth.log"],
      [
        "Read logs | Parse each line into time, IP and event.",
        "Find issues | Count failed logins per IP.",
        "Detect patterns | Flag IPs above a threshold.",
        "Dashboard | Show charts and a table with Streamlit.",
        "Alerts | Print or email when a rule is triggered.",
      ]
    ),
  },

  "ui-ux": {
    "Mobile App Wireframe": g(
      "Low-fidelity wireframes for the main screens of a mobile app.",
      "Beginner", "3 to 5 hours",
      ["Wireframing", "User flows", "Layout", "Figma basics"],
      ["Figma (free)", "Pen and paper"],
      "In Figma on figma.com (browser, free account).",
      ["Create a free Figma account", "Start a new design file and choose a phone frame"],
      [
        "Pick an app idea | A food delivery or study app.",
        "List key screens | Home, details, cart or profile.",
        "Sketch on paper | Quick boxes for each screen.",
        "Wireframe in Figma | Simple shapes and labels.",
        "Link the screens | Show the main flow with arrows.",
      ]
    ),
    "Learning Dashboard Design": g(
      "A polished design of a dashboard that shows courses, progress and stats.",
      "Intermediate", "6 to 8 hours",
      ["Visual hierarchy", "Colour and type", "Components", "Layout grids"],
      ["Figma", "Coolors", "Google Fonts"],
      "In Figma (browser or desktop app).",
      ["Open Figma and create a desktop frame (1440 wide)", "Pick a colour palette on coolors.co"],
      [
        "Research | Look at 3 dashboards you like.",
        "Structure | Sidebar, header and content cards.",
        "Style | Colours, fonts, spacing and icons.",
        "Create components | Cards, buttons and progress bars.",
        "Review | Check contrast and readability, and ask for feedback.",
      ]
    ),
    "E-commerce Prototype": g(
      "A clickable prototype of a shopping flow from browsing to checkout.",
      "Intermediate", "8 to 10 hours",
      ["Prototyping", "User flows", "Usability testing", "Components"],
      ["Figma", "Maze or friends for testing"],
      "In Figma using the Prototype tab.",
      ["Open Figma and start a mobile or desktop design"],
      [
        "Define the flow | Home, product, cart, checkout and confirmation.",
        "Design the screens | Consistent styles and components.",
        "Connect them | Use the Prototype tab to link buttons to screens.",
        "Test | Ask 3 people to complete a purchase and watch where they struggle.",
        "Improve | Fix issues and share the link.",
      ]
    ),
  },
};
