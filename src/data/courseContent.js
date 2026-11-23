
export const courseContent = {
  frontend: {
    modules: [
      {
        title: "HTML Fundamentals",
        overview: "HTML (HyperText Markup Language) is the skeleton of every web page. It tells the browser what each piece of content is: a heading, a paragraph, an image, a form and so on. Think of it as the structure of a house, built before any painting (CSS) or electricity (JavaScript) is added.",
        outcomes: ["Write a complete HTML page from scratch", "Add headings, links and images", "Build a simple form and use meaningful (semantic) tags"],
        lessons: [
          {
            title: "HTML document structure",
            summary: "Every HTML page follows the same basic skeleton. The browser reads it from top to bottom to understand your page.",
            points: [
              "<!DOCTYPE html> tells the browser this is modern HTML5",
              "<html> wraps the whole page",
              "<head> holds information about the page (title, meta tags) that is not shown on screen",
              "<body> holds everything the visitor actually sees",
            ],
            code: "<!DOCTYPE html>\n<html lang=\"en\">\n  <head>\n    <title>My First Page</title>\n  </head>\n  <body>\n    <p>Hello, world!</p>\n  </body>\n</html>",
            tip: "Save the file as index.html and double-click it to open it in your browser.",
          },
          {
            title: "Headings, links and images",
            summary: "These are the building blocks of most content. Headings organise text, links connect pages, and images make pages visual.",
            points: [
              "<h1> to <h6> are headings; use one <h1> per page for the main title",
              "<p> creates a paragraph",
              "<a href=\"...\"> creates a link to another page or site",
              "<img src=\"...\" alt=\"...\"> shows an image; always write helpful alt text",
            ],
            code: "<h1>My Travel Blog</h1>\n<p>Read about my trip to <a href=\"https://example.com\">Goa</a>.</p>\n<img src=\"beach.jpg\" alt=\"Sunset at the beach\" />",
            tip: "Alt text is read aloud by screen readers and shown if the image fails to load.",
          },
          {
            title: "Forms and semantic HTML",
            summary: "Forms collect input from users. Semantic tags describe the purpose of each part of the page, which helps search engines and screen readers.",
            points: [
              "<form> wraps the inputs and <input> collects data (text, email, password...)",
              "<label> describes an input; connect them with for and id",
              "<button type=\"submit\"> sends the form",
              "Semantic tags like <header>, <nav>, <main>, <section> and <footer> replace many plain <div>s",
            ],
            code: "<form>\n  <label for=\"email\">Email</label>\n  <input type=\"email\" id=\"email\" required />\n  <button type=\"submit\">Subscribe</button>\n</form>",
            tip: "Prefer <main> or <nav> over <div> when they describe the content better.",
          },
        ],
      },
      {
        title: "CSS Fundamentals",
        overview: "CSS (Cascading Style Sheets) controls how your HTML looks: colours, fonts, spacing and layout. If HTML is the skeleton, CSS is the clothing and decoration.",
        outcomes: ["Style any element using selectors", "Build modern layouts with Flexbox and Grid", "Make pages work on phones, tablets and desktops"],
        lessons: [
          {
            title: "Selectors and properties",
            summary: "A selector chooses which elements to style. Properties say what to change, and values say how.",
            points: [
              "Element selector: p { } styles all paragraphs",
              "Class selector: .card { } styles elements with class=\"card\"",
              "ID selector: #logo { } styles one unique element",
              "Each rule looks like property: value;",
            ],
            code: ".card {\n  background: #f5f3ff;\n  color: #1e1b4b;\n  padding: 16px;\n  border-radius: 12px;\n}",
            tip: "Prefer classes for styling; they are reusable and easy to maintain.",
          },
          {
            title: "Flexbox and Grid",
            summary: "Flexbox arranges items in one direction (a row or a column). Grid arranges items in rows and columns together.",
            points: [
              "display: flex puts children side by side",
              "justify-content aligns along the main axis; align-items along the other",
              "display: grid with grid-template-columns creates a table-like layout",
              "Use gap to add space between items",
            ],
            code: ".row {\n  display: flex;\n  justify-content: space-between;\n  gap: 16px;\n}\n.gallery {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n}",
            tip: "Use Flexbox for a navbar or a row of buttons, and Grid for a page layout or card gallery.",
          },
          {
            title: "Responsive design",
            summary: "Responsive design means one website that looks good on every screen size.",
            points: [
              "Add the viewport meta tag in the head so phones scale the page correctly",
              "Use relative units like %, rem and fr instead of fixed pixels",
              "Media queries apply styles only at certain screen widths",
              "Design for mobile first, then enhance for bigger screens",
            ],
            code: ".cards { display: grid; grid-template-columns: 1fr; }\n\n@media (min-width: 768px) {\n  .cards { grid-template-columns: repeat(3, 1fr); }\n}",
            tip: "Press F12 in your browser and use the device toolbar to test different screen sizes.",
          },
        ],
      },
      {
        title: "JavaScript",
        overview: "JavaScript makes your page interactive. It can react to clicks, change content, validate forms and talk to servers. It is the brain of the page.",
        outcomes: ["Store and use data with variables", "Write reusable functions and work with arrays", "Respond to user actions by updating the page"],
        lessons: [
          {
            title: "Variables and data types",
            summary: "A variable is a named box that stores a value so you can use it later.",
            points: [
              "const is for values that will not change, let is for values that will",
              "Common types: string (text), number, boolean (true/false), array, object",
              "Use camelCase names like userName",
              "typeof tells you the type of a value",
            ],
            code: "const name = \"Asha\";\nlet score = 10;\nscore = score + 5;\nconsole.log(name, score); // Asha 15",
            tip: "Start with const; switch to let only when the value needs to change.",
          },
          {
            title: "Functions and arrays",
            summary: "A function is a reusable set of steps. An array is an ordered list of values.",
            points: [
              "Functions take inputs (parameters) and can return a result",
              "Arrow functions are a short form: (a, b) => a + b",
              "Arrays count from zero: list[0] is the first item",
              "map, filter and forEach loop over arrays neatly",
            ],
            code: "const double = (n) => n * 2;\nconst nums = [1, 2, 3];\nconst result = nums.map(double);\nconsole.log(result); // [2, 4, 6]",
            tip: "Give functions clear verb names such as calculateTotal.",
          },
          {
            title: "DOM and events",
            summary: "The DOM is the browser's live model of your page. JavaScript can select elements, change them and listen for user actions called events.",
            points: [
              "document.querySelector(\"#id\") finds an element",
              "element.textContent changes its text",
              "addEventListener(\"click\", fn) runs code when the user clicks",
              "Other common events: input, submit, keydown",
            ],
            code: "const btn = document.querySelector(\"#btn\");\nbtn.addEventListener(\"click\", () => {\n  btn.textContent = \"Clicked!\";\n});",
            tip: "Load your script at the end of body, or use the defer attribute, so the elements exist first.",
          },
        ],
      },
      {
        title: "React Development",
        overview: "React is a JavaScript library for building user interfaces from small reusable pieces called components. It keeps the screen in sync with your data automatically.",
        outcomes: ["Create components using JSX", "Pass data with props and manage changing data with state", "Use hooks and React Router to build multi-page apps"],
        lessons: [
          {
            title: "Components and JSX",
            summary: "A component is a function that returns a piece of UI. JSX lets you write HTML-like code inside JavaScript.",
            points: [
              "Component names start with a capital letter",
              "A component must return a single parent element",
              "Use curly braces {} to insert JavaScript values in JSX",
              "Use className instead of class",
            ],
            code: "function Welcome() {\n  const name = \"Asha\";\n  return <h1 className=\"title\">Hello, {name}!</h1>;\n}",
            tip: "Split big screens into small components, such as Navbar, Card and Footer.",
          },
          {
            title: "Props and state",
            summary: "Props pass data into a component from its parent. State is data inside a component that can change over time.",
            points: [
              "Props are read-only; never modify them",
              "useState returns the current value and a function to update it",
              "Changing state re-renders the component",
              "Data flows down from parent to child",
            ],
            code: "function Counter() {\n  const [count, setCount] = useState(0);\n  return (\n    <button onClick={() => setCount(count + 1)}>\n      Clicked {count} times\n    </button>\n  );\n}",
            tip: "Never change state directly (count++); always use the setter function.",
          },
          {
            title: "Hooks and React Router",
            summary: "Hooks add features to function components. React Router lets one React app show different pages without reloading.",
            points: [
              "useEffect runs code after render, such as fetching data",
              "Only call hooks at the top level of a component",
              "<Route path=\"/about\" element={<About />} /> maps a URL to a component",
              "<Link to=\"/about\"> navigates without a full page reload",
            ],
            code: "useEffect(() => {\n  document.title = `Count: ${count}`;\n}, [count]);",
            tip: "The array at the end of useEffect lists the values that should make it run again.",
          },
        ],
      },
    ],
    resources: [
      { name: "MDN Web Docs", type: "Documentation", url: "https://developer.mozilla.org/en-US/docs/Web", description: "The most trusted reference for HTML, CSS and JavaScript. Great when you want to look up how a tag or property works." },
      { name: "React Documentation", type: "Documentation", url: "https://react.dev/learn", description: "Official, beginner-friendly React guide with small interactive examples you can edit in the page." },
      { name: "JavaScript.info", type: "Tutorial", url: "https://javascript.info/", description: "A clear, step-by-step JavaScript tutorial that goes from the basics to advanced topics." },
      { name: "freeCodeCamp Responsive Web Design", type: "Free Course", url: "https://www.freecodecamp.org/learn/2022/responsive-web-design/", description: "Build small HTML and CSS projects and get certified. Perfect for absolute beginners." },
      { name: "The Odin Project", type: "Free Curriculum", url: "https://www.theodinproject.com/", description: "A full free web development path with readings and projects, in a sensible order." },
      { name: "Flexbox Froggy", type: "Game", url: "https://flexboxfroggy.com/", description: "Learn CSS Flexbox by guiding a frog onto lily pads. Fun and quick." },
      { name: "W3Schools HTML Tutorial", type: "Tutorial", url: "https://www.w3schools.com/html/", description: "Short lessons with a 'Try it Yourself' editor, easy to follow." },
      { name: "web.dev Learn", type: "Guide", url: "https://web.dev/learn", description: "Google's beginner-friendly courses on HTML, CSS and responsive design." },
    ],
    projects: ["Personal Portfolio Website", "Responsive Landing Page", "React Task Manager"],
    quiz: {
      question: "Which HTML element is used to create a hyperlink?",
      options: ["<link>", "<a>", "<href>", "<url>"],
      answer: 1,
    },
  },

  backend: {
    modules: [
      { title: "Backend Fundamentals", lessons: ["Client-server architecture", "HTTP and REST APIs", "JSON and status codes"] },
      { title: "Node.js", lessons: ["Node.js introduction", "Modules and npm", "Asynchronous programming"] },
      { title: "Express.js", lessons: ["Creating an Express server", "Routes and middleware", "Error handling"] },
      { title: "Database and Authentication", lessons: ["Database basics", "CRUD operations", "Authentication and authorization"] },
    ],
    resources: [
      { name: "Node.js Documentation", type: "Documentation", url: "https://nodejs.org/en/learn", description: "Official Node.js learning guides that explain core ideas in simple steps." },
      { name: "Express Documentation", type: "Documentation", url: "https://expressjs.com/", description: "Official Express guide with routing, middleware and error handling examples." },
      { name: "MDN HTTP Guide", type: "Guide", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP", description: "Explains how the web talks: requests, responses, headers and status codes." },
      { name: "freeCodeCamp Back End Development", type: "Free Course", url: "https://www.freecodecamp.org/learn/back-end-development-and-apis/", description: "Hands-on lessons on Node, Express and building APIs, with projects." },
      { name: "roadmap.sh Backend Roadmap", type: "Roadmap", url: "https://roadmap.sh/backend", description: "A visual map of what to learn and in what order. Great for staying on track." },
      { name: "RESTful API Tutorial", type: "Tutorial", url: "https://restfulapi.net/", description: "Plain explanations of REST ideas like resources, methods and status codes." },
      { name: "Postman Learning Center", type: "Guide", url: "https://learning.postman.com/", description: "Learn to test your APIs with Postman, an essential backend tool." },
      { name: "HTTP Cats", type: "Quick Reference", url: "https://http.cat/", description: "HTTP status codes explained with cat pictures. Easy to remember." },
    ],
    projects: ["REST API for Tasks", "User Authentication API", "Blog Backend"],
    quiz: {
      question: "What does REST commonly stand for?",
      options: ["Remote State Transfer", "Representational State Transfer", "Request Server Technology", "Response System Transfer"],
      answer: 1,
    },
  },

  "full-stack": {
    modules: [
      { title: "Frontend Foundations", lessons: ["HTML and CSS", "JavaScript fundamentals", "React components"] },
      { title: "Backend Foundations", lessons: ["Node.js basics", "Express routes", "REST API development"] },
      { title: "Database Integration", lessons: ["Database concepts", "CRUD operations", "Connecting frontend and backend"] },
      { title: "Deployment", lessons: ["Environment variables", "Production builds", "Deploying a full-stack app"] },
    ],
    resources: [
      { name: "React Documentation", type: "Documentation", url: "https://react.dev/learn", description: "Official, beginner-friendly React guide with small interactive examples you can edit in the page." },
      { name: "Node.js Documentation", type: "Documentation", url: "https://nodejs.org/en/learn", description: "Official Node.js learning guides that explain core ideas in simple steps." },
      { name: "PostgreSQL Tutorial", type: "Tutorial", url: "https://www.postgresql.org/docs/current/tutorial.html", description: "Official hands-on introduction to creating tables and running queries." },
      { name: "Full Stack Open", type: "Free Course", url: "https://fullstackopen.com/en/", description: "University of Helsinki's free course on React, Node, databases and testing." },
      { name: "The Odin Project", type: "Free Curriculum", url: "https://www.theodinproject.com/", description: "Project-based full stack path with clear, step-by-step lessons." },
      { name: "roadmap.sh Full Stack Roadmap", type: "Roadmap", url: "https://roadmap.sh/full-stack", description: "See the whole journey from frontend to deployment on one page." },
      { name: "MDN Learn Web Development", type: "Guide", url: "https://developer.mozilla.org/en-US/docs/Learn", description: "Beginner-focused learning area that covers the web from scratch." },
    ],
    projects: ["Full Stack Notes App", "Job Portal", "Student Management System"],
    quiz: {
      question: "Which part of an application usually handles database operations?",
      options: ["Frontend", "Backend", "CSS", "HTML"],
      answer: 1,
    },
  },

  javascript: {
    modules: [
      { title: "JavaScript Basics", lessons: ["Variables and data types", "Operators and conditions", "Loops"] },
      { title: "Functions and Objects", lessons: ["Functions", "Arrays and objects", "Array methods"] },
      { title: "Modern JavaScript", lessons: ["ES6 features", "Promises", "Async and await"] },
      { title: "Browser JavaScript", lessons: ["DOM manipulation", "Events", "Local storage"] },
    ],
    resources: [
      { name: "JavaScript.info", type: "Tutorial", url: "https://javascript.info/", description: "A clear, step-by-step JavaScript tutorial that goes from the basics to advanced topics." },
      { name: "MDN JavaScript Guide", type: "Documentation", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide", description: "A structured JavaScript guide with examples for every language feature." },
      { name: "freeCodeCamp JavaScript Course", type: "Free Course", url: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures-v8/", description: "Learn by typing code in the browser, with small challenges that build up." },
      { name: "Eloquent JavaScript", type: "Free Book", url: "https://eloquentjavascript.net/", description: "A well-loved free book with exercises. Reads like a story." },
      { name: "JavaScript30", type: "Free Course", url: "https://javascript30.com/", description: "30 small projects in 30 days. Learn by building real things." },
      { name: "Exercism JavaScript Track", type: "Practice", url: "https://exercism.org/tracks/javascript", description: "Free coding exercises with feedback from mentors." },
      { name: "W3Schools JavaScript", type: "Tutorial", url: "https://www.w3schools.com/js/", description: "Short examples with an editor, good for quick revision." },
    ],
    projects: ["Calculator", "Quiz Application", "Weather Dashboard"],
    quiz: {
      question: "Which keyword declares a block-scoped variable that can be reassigned?",
      options: ["const", "let", "static", "define"],
      answer: 1,
    },
  },

  react: {
    modules: [
      { title: "React Fundamentals", lessons: ["What is React?", "JSX and components", "Props"] },
      { title: "State and Events", lessons: ["useState", "Handling events", "Conditional rendering"] },
      { title: "React Hooks", lessons: ["useEffect", "useRef", "Custom hooks"] },
      { title: "Routing and Projects", lessons: ["React Router", "API integration", "Project structure"] },
    ],
    resources: [
      { name: "React Learn", type: "Documentation", url: "https://react.dev/learn", description: "Official React tutorial: learn components, state and hooks by building small things." },
      { name: "React Router", type: "Documentation", url: "https://reactrouter.com/", description: "Official docs for adding multiple pages and navigation to a React app." },
      { name: "React Tic-Tac-Toe Tutorial", type: "Tutorial", url: "https://react.dev/learn/tutorial-tic-tac-toe", description: "Build your first React game step by step. The best place to start." },
      { name: "Scrimba Learn React", type: "Free Course", url: "https://scrimba.com/learn/learnreact", description: "Interactive video lessons where you can pause and edit the code." },
      { name: "Full Stack Open", type: "Free Course", url: "https://fullstackopen.com/en/", description: "Deep, practical React learning with exercises." },
      { name: "roadmap.sh React Roadmap", type: "Roadmap", url: "https://roadmap.sh/react", description: "A checklist of React topics so you know what to learn next." },
    ],
    projects: ["Expense Tracker", "Movie Search App", "E-commerce UI"],
    quiz: {
      question: "Which React hook is commonly used to manage component state?",
      options: ["useRoute", "useState", "usePage", "useStyle"],
      answer: 1,
    },
  },

  nextjs: {
    modules: [
      { title: "Next.js Fundamentals", lessons: ["Next.js introduction", "Project setup", "App Router"] },
      { title: "Pages and Layouts", lessons: ["Layouts", "Dynamic routes", "Navigation"] },
      { title: "Data and Rendering", lessons: ["Server components", "Client components", "Fetching data"] },
      { title: "Deployment", lessons: ["Environment variables", "Optimizing applications", "Deployment"] },
    ],
    resources: [
      { name: "Next.js Documentation", type: "Documentation", url: "https://nextjs.org/docs", description: "Official Next.js docs covering routing, rendering and deployment." },
      { name: "React Documentation", type: "Documentation", url: "https://react.dev/learn", description: "Official, beginner-friendly React guide with small interactive examples you can edit in the page." },
      { name: "Next.js Learn Course", type: "Free Course", url: "https://nextjs.org/learn", description: "Official hands-on course where you build a full dashboard app." },
      { name: "Next.js App Router Docs", type: "Documentation", url: "https://nextjs.org/docs/app", description: "Guides for the modern App Router with clear examples." },
      { name: "Vercel Templates", type: "Examples", url: "https://vercel.com/templates", description: "Ready-made starter projects you can study and deploy." },
      { name: "React Tic-Tac-Toe Tutorial", type: "Tutorial", url: "https://react.dev/learn/tutorial-tic-tac-toe", description: "Learn the React basics first; it makes Next.js much easier." },
    ],
    projects: ["Personal Blog", "Product Catalog", "Learning Dashboard"],
    quiz: {
      question: "Which routing system is recommended in modern Next.js projects?",
      options: ["App Router", "PHP Router", "Vue Router", "Express Router"],
      answer: 0,
    },
  },

  java: {
    modules: [
      { title: "Java Fundamentals", lessons: ["Java introduction and setup", "Variables and data types", "Conditions and loops"] },
      { title: "Object-Oriented Programming", lessons: ["Classes and objects", "Inheritance and polymorphism", "Abstraction and encapsulation"] },
      { title: "Collections and Exceptions", lessons: ["Lists and sets", "Maps", "Exception handling"] },
      { title: "Advanced Java and Projects", lessons: ["File handling", "JDBC basics", "Building Java applications"] },
    ],
    resources: [
      { name: "Dev.java", type: "Official Tutorial", url: "https://dev.java/learn/", description: "Official Java learning site from Oracle with beginner tutorials." },
      { name: "Java Documentation", type: "Documentation", url: "https://docs.oracle.com/en/java/", description: "Official Java reference. Use it to look up classes and methods." },
      { name: "Java Programming MOOC", type: "Free Course", url: "https://java-programming.mooc.fi/", description: "University of Helsinki's beginner course with exercises in every chapter." },
      { name: "W3Schools Java Tutorial", type: "Tutorial", url: "https://www.w3schools.com/java/", description: "Short lessons with runnable examples." },
      { name: "Exercism Java Track", type: "Practice", url: "https://exercism.org/tracks/java", description: "Free exercises with mentor feedback." },
      { name: "HackerRank Java", type: "Practice", url: "https://www.hackerrank.com/domains/java", description: "Practise problems from easy to hard." },
      { name: "roadmap.sh Java Roadmap", type: "Roadmap", url: "https://roadmap.sh/java", description: "See what to learn after the basics." },
    ],
    projects: ["Bank Account Management System", "Library Management System", "Employee Management System"],
    quiz: {
      question: "Which keyword is used to create an object in Java?",
      options: ["class", "this", "new", "static"],
      answer: 2,
    },
  },

  python: {
    modules: [
      { title: "Python Basics", lessons: ["Python setup", "Variables and data types", "Conditions and loops"] },
      { title: "Functions and Collections", lessons: ["Functions", "Lists and tuples", "Dictionaries and sets"] },
      { title: "Object-Oriented Python", lessons: ["Classes and objects", "Inheritance", "Exception handling"] },
      { title: "Practical Python", lessons: ["File handling", "Working with libraries", "Building applications"] },
    ],
    resources: [
      { name: "Python Official Tutorial", type: "Documentation", url: "https://docs.python.org/3/tutorial/", description: "The official walkthrough of Python, written for beginners." },
      { name: "Python Beginner Guide", type: "Guide", url: "https://wiki.python.org/moin/BeginnersGuide", description: "A list of beginner-friendly Python guides and tutorials in one place." },
      { name: "Automate the Boring Stuff", type: "Free Book", url: "https://automatetheboringstuff.com/", description: "Learn Python by automating everyday tasks. Very beginner friendly." },
      { name: "freeCodeCamp Scientific Computing with Python", type: "Free Course", url: "https://www.freecodecamp.org/learn/scientific-computing-with-python/", description: "Interactive lessons and projects in the browser." },
      { name: "Exercism Python Track", type: "Practice", url: "https://exercism.org/tracks/python", description: "Free exercises with feedback." },
      { name: "Real Python", type: "Tutorial", url: "https://realpython.com/", description: "Clear, practical articles on almost any Python topic." },
      { name: "W3Schools Python Tutorial", type: "Tutorial", url: "https://www.w3schools.com/python/", description: "Short examples with a built-in editor." },
    ],
    projects: ["Password Generator", "Expense Tracker", "File Organizer"],
    quiz: {
      question: "Which symbol is used for comments in Python?",
      options: ["//", "<!-- -->", "#", "/* */"],
      answer: 2,
    },
  },

  "c-programming": {
    modules: [
      { title: "C Fundamentals", lessons: ["Introduction to C", "Variables and data types", "Input and output"] },
      { title: "Control Structures", lessons: ["Conditions", "Loops", "Functions"] },
      { title: "Arrays and Pointers", lessons: ["Arrays and strings", "Pointers", "Pointer operations"] },
      { title: "Memory and Files", lessons: ["Structures", "Dynamic memory", "File handling"] },
    ],
    resources: [
      { name: "Learn C", type: "Tutorial", url: "https://www.learn-c.org/", description: "Interactive C lessons where you write and run code in the browser." },
      { name: "GNU C Manual", type: "Documentation", url: "https://www.gnu.org/software/gnu-c-manual/", description: "Detailed reference for C language features. Best once you know the basics." },
      { name: "W3Schools C Tutorial", type: "Tutorial", url: "https://www.w3schools.com/c/", description: "Short lessons with a Try-it editor." },
      { name: "Programiz C Programming", type: "Tutorial", url: "https://www.programiz.com/c-programming", description: "Simple explanations with examples and output." },
      { name: "CS50 by Harvard", type: "Free Course", url: "https://cs50.harvard.edu/x/", description: "Famous free course that teaches C and how computers think." },
      { name: "Exercism C Track", type: "Practice", url: "https://exercism.org/tracks/c", description: "Practise C with exercises and mentor feedback." },
    ],
    projects: ["Student Record System", "Simple Calculator", "Contact Management System"],
    quiz: {
      question: "Which function is the usual entry point of a C program?",
      options: ["start()", "main()", "run()", "init()"],
      answer: 1,
    },
  },

  cpp: {
    modules: [
      { title: "C++ Basics", lessons: ["C++ setup", "Variables and operators", "Conditions and loops"] },
      { title: "Object-Oriented Programming", lessons: ["Classes and objects", "Constructors", "Inheritance"] },
      { title: "STL", lessons: ["Vectors", "Maps and sets", "Iterators and algorithms"] },
      { title: "Problem Solving", lessons: ["Pointers", "Memory management", "Practice problems"] },
    ],
    resources: [
      { name: "Learn C++", type: "Tutorial", url: "https://www.learncpp.com/", description: "A very thorough free C++ tutorial that explains every concept slowly." },
      { name: "C++ Reference", type: "Reference", url: "https://en.cppreference.com/w/", description: "Quick lookup for C++ functions, containers and algorithms." },
      { name: "W3Schools C++ Tutorial", type: "Tutorial", url: "https://www.w3schools.com/cpp/", description: "Short lessons with an editor, good for beginners." },
      { name: "Programiz C++ Programming", type: "Tutorial", url: "https://www.programiz.com/cpp-programming", description: "Clear explanations with examples and output." },
      { name: "Exercism C++ Track", type: "Practice", url: "https://exercism.org/tracks/cpp", description: "Free exercises with feedback." },
      { name: "CS50 by Harvard", type: "Free Course", url: "https://cs50.harvard.edu/x/", description: "Builds strong programming fundamentals." },
    ],
    projects: ["Banking Console App", "Inventory System", "Student Database"],
    quiz: {
      question: "Which C++ feature supports defining multiple functions with the same name but different parameters?",
      options: ["Overloading", "Overriding", "Casting", "Iteration"],
      answer: 0,
    },
  },

  dsa: {
    modules: [
      { title: "Problem Solving Basics", lessons: ["Time complexity", "Space complexity", "Basic problem solving"] },
      { title: "Linear Data Structures", lessons: ["Arrays and strings", "Linked lists", "Stacks and queues"] },
      { title: "Non-linear Structures", lessons: ["Trees", "Binary search trees", "Graphs"] },
      { title: "Algorithms", lessons: ["Searching", "Sorting", "Recursion and dynamic programming"] },
    ],
    resources: [
      { name: "VisuAlgo", type: "Visual Learning", url: "https://visualgo.net/en", description: "Animated visualisations that show how data structures and algorithms work step by step." },
      { name: "GeeksforGeeks DSA", type: "Practice", url: "https://www.geeksforgeeks.org/data-structures/", description: "Articles and practice problems for every DSA topic." },
      { name: "NeetCode", type: "Roadmap and Videos", url: "https://neetcode.io/", description: "A curated problem list with clear video explanations." },
      { name: "LeetCode", type: "Practice", url: "https://leetcode.com/", description: "The most popular place to practise coding problems." },
      { name: "Big-O Cheat Sheet", type: "Quick Reference", url: "https://www.bigocheatsheet.com/", description: "Time and space complexity of common algorithms on one page." },
      { name: "USFCA Data Structure Visualizations", type: "Visual Learning", url: "https://www.cs.usfca.edu/~galles/visualization/Algorithms.html", description: "Animated demos of trees, heaps, sorting and more." },
      { name: "CS50 by Harvard", type: "Free Course", url: "https://cs50.harvard.edu/x/", description: "Great foundation before you start problem solving." },
    ],
    projects: ["Sorting Visualizer", "Pathfinding Visualizer", "DSA Problem Tracker"],
    quiz: {
      question: "What is the time complexity of binary search on a sorted array?",
      options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
      answer: 1,
    },
  },

  sql: {
    modules: [
      { title: "Database Fundamentals", lessons: ["Database concepts", "Tables and relationships", "Keys and constraints"] },
      { title: "SQL Queries", lessons: ["SELECT and WHERE", "ORDER BY and GROUP BY", "Joins"] },
      { title: "Database Design", lessons: ["Normalization", "Indexes", "Relationships"] },
      { title: "Advanced SQL", lessons: ["Subqueries", "Views", "Transactions"] },
    ],
    resources: [
      { name: "PostgreSQL Tutorial", type: "Documentation", url: "https://www.postgresql.org/docs/current/tutorial.html", description: "Official hands-on introduction to creating tables and running queries." },
      { name: "SQLBolt", type: "Interactive Tutorial", url: "https://sqlbolt.com/", description: "Short interactive SQL lessons with exercises you can solve in the browser." },
      { name: "W3Schools SQL Tutorial", type: "Tutorial", url: "https://www.w3schools.com/sql/", description: "Short lessons with a Try-it editor to run queries." },
      { name: "SQLZoo", type: "Interactive Tutorial", url: "https://sqlzoo.net/", description: "Practise SQL queries with instant feedback." },
      { name: "SQL Murder Mystery", type: "Game", url: "https://mystery.knightlab.com/", description: "Solve a murder case by writing SQL queries. Fun and memorable." },
      { name: "Mode SQL Tutorial", type: "Tutorial", url: "https://mode.com/sql-tutorial/", description: "Clear lessons from basic to advanced, with real data." },
      { name: "HackerRank SQL", type: "Practice", url: "https://www.hackerrank.com/domains/sql", description: "Practise problems from easy to hard." },
    ],
    projects: ["Library Database", "Employee Database", "Online Store Database"],
    quiz: {
      question: "Which SQL command retrieves data from a table?",
      options: ["INSERT", "UPDATE", "SELECT", "DELETE"],
      answer: 2,
    },
  },

  "data-analytics": {
    modules: [
      { title: "Analytics Fundamentals", lessons: ["Data analytics introduction", "Types of data", "Data collection"] },
      { title: "Excel and Data Cleaning", lessons: ["Excel formulas", "Sorting and filtering", "Data cleaning"] },
      { title: "Python for Analytics", lessons: ["Pandas basics", "DataFrames", "Data visualization"] },
      { title: "Dashboards", lessons: ["Power BI basics", "Charts and reports", "Presenting insights"] },
    ],
    resources: [
      { name: "Pandas Documentation", type: "Documentation", url: "https://pandas.pydata.org/docs/", description: "Official guide to analysing tables of data with Python." },
      { name: "Microsoft Power BI Learning", type: "Learning", url: "https://learn.microsoft.com/en-us/training/powerplatform/power-bi", description: "Free Microsoft training to build reports and dashboards." },
      { name: "Kaggle Learn", type: "Free Courses", url: "https://www.kaggle.com/learn", description: "Short, hands-on courses on Python, Pandas, SQL and data visualisation." },
      { name: "freeCodeCamp Data Analysis with Python", type: "Free Course", url: "https://www.freecodecamp.org/learn/data-analysis-with-python/", description: "Interactive lessons and projects." },
      { name: "Microsoft Excel Help and Training", type: "Guide", url: "https://support.microsoft.com/en-us/excel", description: "Official how-to guides for formulas, charts and pivot tables." },
      { name: "Tableau Free Training Videos", type: "Free Course", url: "https://www.tableau.com/learn/training", description: "Learn to build visual dashboards step by step." },
    ],
    projects: ["Sales Analysis Dashboard", "Student Performance Analysis", "Customer Data Report"],
    quiz: {
      question: "Which Python library is commonly used for tabular data analysis?",
      options: ["Pandas", "Flask", "Django", "Pygame"],
      answer: 0,
    },
  },

  "ai-ml": {
    modules: [
      { title: "AI and ML Fundamentals", lessons: ["Artificial intelligence basics", "Machine learning types", "ML workflow"] },
      { title: "Python for ML", lessons: ["NumPy", "Pandas", "Data preparation"] },
      { title: "Machine Learning Models", lessons: ["Regression", "Classification", "Clustering"] },
      { title: "Model Evaluation", lessons: ["Training and testing", "Evaluation metrics", "Model improvement"] },
    ],
    resources: [
      { name: "Google Machine Learning Crash Course", type: "Free Course", url: "https://developers.google.com/machine-learning/crash-course", description: "Google's free, practical introduction to machine learning with videos and exercises." },
      { name: "Scikit-learn Documentation", type: "Documentation", url: "https://scikit-learn.org/stable/", description: "Official guide and examples for classic machine learning in Python." },
      { name: "Kaggle Intro to Machine Learning", type: "Free Course", url: "https://www.kaggle.com/learn/intro-to-machine-learning", description: "A short, practical course with coding exercises." },
      { name: "Elements of AI", type: "Free Course", url: "https://www.elementsofai.com/", description: "No coding needed. Explains AI ideas in plain language." },
      { name: "3Blue1Brown Neural Networks", type: "Videos", url: "https://www.3blue1brown.com/topics/neural-networks", description: "Beautiful animations that make neural networks easy to understand." },
      { name: "fast.ai Practical Deep Learning", type: "Free Course", url: "https://course.fast.ai/", description: "Learn by building models first, theory later." },
      { name: "Teachable Machine", type: "Interactive Tool", url: "https://teachablemachine.withgoogle.com/", description: "Train a simple model with your webcam in minutes. No code." },
    ],
    projects: ["House Price Prediction", "Spam Message Classifier", "Student Score Prediction"],
    quiz: {
      question: "Which type of machine learning uses labeled training data?",
      options: ["Unsupervised", "Supervised", "Reinforcement only", "Random learning"],
      answer: 1,
    },
  },

  cloud: {
    modules: [
      { title: "Cloud Fundamentals", lessons: ["Cloud computing concepts", "Service models", "Deployment models"] },
      { title: "Cloud Platforms", lessons: ["AWS overview", "Azure overview", "Cloud storage"] },
      { title: "Infrastructure", lessons: ["Virtual machines", "Networking basics", "Identity and access"] },
      { title: "Deployment", lessons: ["Hosting applications", "Monitoring", "Cost and security basics"] },
    ],
    resources: [
      { name: "AWS Skill Builder", type: "Free Learning", url: "https://skillbuilder.aws/", description: "Free AWS courses and labs, starting from cloud basics." },
      { name: "Microsoft Azure Learning", type: "Free Learning", url: "https://learn.microsoft.com/en-us/training/azure/", description: "Free guided learning paths for Azure with hands-on sandboxes." },
      { name: "Google Cloud Skills Boost", type: "Free Labs", url: "https://www.cloudskillsboost.google/", description: "Hands-on labs and learning paths for Google Cloud." },
      { name: "Microsoft AZ-900 Learning Path", type: "Free Course", url: "https://learn.microsoft.com/en-us/training/paths/az-900-describe-cloud-concepts/", description: "Beginner path to understand cloud concepts." },
      { name: "AWS Cloud Practitioner Essentials", type: "Free Course", url: "https://explore.skillbuilder.aws/learn/course/external/view/elearning/134/aws-cloud-practitioner-essentials", description: "A friendly introduction to AWS services and cloud ideas." },
      { name: "roadmap.sh DevOps Roadmap", type: "Roadmap", url: "https://roadmap.sh/devops", description: "See where cloud fits among other skills." },
    ],
    projects: ["Host a Static Website", "Cloud File Storage Demo", "Deploy a Web Application"],
    quiz: {
      question: "Which cloud service model provides virtual machines and networking?",
      options: ["SaaS", "IaaS", "PaaS", "DaaS"],
      answer: 1,
    },
  },

  devops: {
    modules: [
      { title: "DevOps Fundamentals", lessons: ["DevOps culture", "Software delivery lifecycle", "Linux basics"] },
      { title: "Version Control", lessons: ["Git basics", "Branches and merges", "GitHub workflows"] },
      { title: "CI/CD and Containers", lessons: ["CI/CD concepts", "Docker fundamentals", "Container images"] },
      { title: "Automation and Monitoring", lessons: ["Build pipelines", "Deployment automation", "Monitoring basics"] },
    ],
    resources: [
      { name: "Git Documentation", type: "Documentation", url: "https://git-scm.com/doc", description: "Official Git book and reference. The Pro Git book is free to read." },
      { name: "Docker Get Started", type: "Tutorial", url: "https://docs.docker.com/get-started/", description: "Official step-by-step guide to running your first containers." },
      { name: "Jenkins Documentation", type: "Documentation", url: "https://www.jenkins.io/doc/", description: "Official guide to building automated pipelines with Jenkins." },
      { name: "Learn Git Branching", type: "Interactive Tutorial", url: "https://learngitbranching.js.org/", description: "A visual, game-like way to learn Git commands." },
      { name: "GitHub Skills", type: "Free Courses", url: "https://skills.github.com/", description: "Short interactive courses taught inside GitHub itself." },
      { name: "Play with Docker", type: "Free Lab", url: "https://labs.play-with-docker.com/", description: "Try Docker in your browser without installing anything." },
      { name: "Linux Journey", type: "Tutorial", url: "https://linuxjourney.com/", description: "Learn Linux step by step in simple language." },
      { name: "roadmap.sh DevOps Roadmap", type: "Roadmap", url: "https://roadmap.sh/devops", description: "A checklist of everything a DevOps learner should know." },
    ],
    projects: ["Dockerize a Web App", "CI/CD Pipeline Demo", "Automated Deployment"],
    quiz: {
      question: "What is the main purpose of CI/CD?",
      options: ["Manual coding", "Automating integration and delivery", "Designing UI", "Writing database queries"],
      answer: 1,
    },
  },

  cybersecurity: {
    modules: [
      { title: "Security Fundamentals", lessons: ["CIA triad", "Common threats", "Security principles"] },
      { title: "Networking and Linux", lessons: ["Networking basics", "Linux commands", "Network protocols"] },
      { title: "Defensive Security", lessons: ["Access control", "Firewalls", "Security monitoring"] },
      { title: "Security Practice", lessons: ["Risk assessment", "Incident response", "Security awareness"] },
    ],
    resources: [
      { name: "Cisco Networking Basics", type: "Free Course", url: "https://www.netacad.com/", description: "Free Cisco Networking Academy courses on networks and security." },
      { name: "OWASP Top 10", type: "Security Guide", url: "https://owasp.org/www-project-top-ten/", description: "The ten most common web security risks, explained clearly." },
      { name: "TryHackMe", type: "Hands-on Labs", url: "https://tryhackme.com/", description: "Beginner-friendly guided rooms to learn security safely in the browser." },
      { name: "PortSwigger Web Security Academy", type: "Free Course", url: "https://portswigger.net/web-security", description: "Free, well-written lessons with labs on web vulnerabilities." },
      { name: "OWASP Juice Shop", type: "Practice", url: "https://owasp.org/www-project-juice-shop/", description: "A deliberately insecure app to practise finding bugs legally." },
      { name: "Cisco Introduction to Cybersecurity", type: "Free Course", url: "https://www.netacad.com/courses/introduction-to-cybersecurity", description: "A short beginner course on core security ideas." },
    ],
    projects: ["Password Strength Checker", "Security Awareness Guide", "Log Monitoring Dashboard"],
    quiz: {
      question: "What does the CIA triad stand for?",
      options: ["Control, Internet, Access", "Confidentiality, Integrity, Availability", "Cyber, Information, Authentication", "Code, Identity, Authorization"],
      answer: 1,
    },
  },

  "ui-ux": {
    modules: [
      { title: "Design Fundamentals", lessons: ["UI and UX concepts", "Design principles", "Color and typography"] },
      { title: "User Research", lessons: ["User personas", "User journeys", "Research methods"] },
      { title: "Wireframes and Prototypes", lessons: ["Low-fidelity wireframes", "High-fidelity designs", "Prototyping"] },
      { title: "Design Systems", lessons: ["Components", "Consistency", "Usability testing"] },
    ],
    resources: [
      { name: "Figma Learn", type: "Free Learning", url: "https://help.figma.com/hc/en-us", description: "Official Figma tutorials for designing screens and prototypes." },
      { name: "Material Design", type: "Design Guide", url: "https://m3.material.io/", description: "Google's design guidelines with examples of good UI components." },
      { name: "Laws of UX", type: "Quick Reference", url: "https://lawsofux.com/", description: "Simple, illustrated design principles you can apply right away." },
      { name: "Nielsen Norman Group Articles", type: "Articles", url: "https://www.nngroup.com/articles/", description: "Trusted research-based articles on usability." },
      { name: "Coolors", type: "Tool", url: "https://coolors.co/", description: "Generate colour palettes quickly." },
      { name: "Google Fonts", type: "Tool", url: "https://fonts.google.com/", description: "Free fonts and pairing ideas for your designs." },
      { name: "Figma Community", type: "Templates", url: "https://www.figma.com/community", description: "Free templates and UI kits to learn from." },
    ],
    projects: ["Mobile App Wireframe", "Learning Dashboard Design", "E-commerce Prototype"],
    quiz: {
      question: "What is the main purpose of a wireframe?",
      options: ["Write backend code", "Show the basic layout and structure", "Store user data", "Deploy a website"],
      answer: 1,
    },
  },
};
