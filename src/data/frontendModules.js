
const frontendModules = [
  {
    id: 1,
    title: "HTML Fundamentals",
    level: "Beginner",
    duration: "5 hours",
    overview: "Learn how to structure web pages using HTML.",
    prerequisites: "No previous programming experience required.",
    objectives: [
      "Understand HTML and how browsers render pages.",
      "Create structured HTML documents.",
      "Use headings, paragraphs, links and images.",
      "Understand HTML elements and attributes."
    ],
    topics: [
      "Introduction to HTML",
      "HTML document structure",
      "Elements and attributes",
      "Headings and paragraphs",
      "Links and images",
      "Lists and tables",
      "HTML comments",
      "Block and inline elements"
    ],
    exercises: [
      "Create a personal introduction webpage.",
      "Create a webpage with images and links.",
      "Build a timetable using an HTML table."
    ],
    project: "Create a personal profile webpage.",
    resources: [
      {
        title: "MDN HTML Guide",
        url: "https://developer.mozilla.org/en-US/docs/Web/HTML"
      },
      {
        title: "W3Schools HTML",
        url: "https://www.w3schools.com/html/"
      }
    ]
  },
  {
    id: 2,
    title: "HTML Forms and Semantic HTML",
    level: "Beginner",
    duration: "5 hours",
    overview: "Build accessible forms and meaningful page structures.",
    prerequisites: "HTML Fundamentals",
    objectives: [
      "Create HTML forms.",
      "Understand different input types.",
      "Use form validation.",
      "Structure pages using semantic elements."
    ],
    topics: [
      "Form element",
      "Input types",
      "Labels and placeholders",
      "Radio buttons and checkboxes",
      "Select and textarea",
      "Form validation",
      "Header, nav, main and footer",
      "Semantic HTML"
    ],
    exercises: [
      "Create a student registration form.",
      "Build a login form with required fields.",
      "Create a semantic blog layout."
    ],
    project: "Build a complete registration form.",
    resources: [
      {
        title: "MDN HTML Forms",
        url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms"
      }
    ]
  },
  {
    id: 3,
    title: "Advanced HTML",
    level: "Intermediate",
    duration: "4 hours",
    overview: "Explore accessibility, metadata and advanced HTML features.",
    prerequisites: "HTML Fundamentals and Forms",
    objectives: [
      "Improve accessibility.",
      "Understand metadata and SEO basics.",
      "Embed media in webpages.",
      "Understand iframe and web components."
    ],
    topics: [
      "HTML metadata",
      "SEO-friendly HTML",
      "ARIA basics",
      "Accessibility",
      "Audio and video",
      "Iframes",
      "Picture and source elements",
      "HTML entities"
    ],
    exercises: [
      "Add metadata to a webpage.",
      "Embed audio and video.",
      "Improve a page using semantic accessibility."
    ],
    project: "Build an accessible article webpage.",
    resources: [
      {
        title: "MDN HTML Reference",
        url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference"
      },
      {
        title: "Web Accessibility",
        url: "https://www.w3.org/WAI/fundamentals/accessibility-intro/"
      }
    ]
  },
  {
    id: 4,
    title: "CSS Fundamentals",
    level: "Beginner",
    duration: "6 hours",
    overview: "Learn to style HTML elements and create attractive webpages.",
    prerequisites: "Basic HTML",
    objectives: [
      "Understand CSS syntax.",
      "Apply styles using selectors.",
      "Work with colors and typography.",
      "Understand the CSS box model."
    ],
    topics: [
      "Introduction to CSS",
      "Inline, internal and external CSS",
      "CSS selectors",
      "Colors and backgrounds",
      "Fonts and typography",
      "Borders and shadows",
      "Margin and padding",
      "Box model"
    ],
    exercises: [
      "Style a personal profile webpage.",
      "Create attractive buttons and cards.",
      "Design a simple navigation bar."
    ],
    project: "Build a styled personal portfolio.",
    resources: [
      {
        title: "MDN CSS",
        url: "https://developer.mozilla.org/en-US/docs/Web/CSS"
      },
      {
        title: "W3Schools CSS",
        url: "https://www.w3schools.com/css/"
      }
    ]
  },
  {
    id: 5,
    title: "CSS Layout",
    level: "Beginner",
    duration: "6 hours",
    overview: "Learn to arrange website elements using modern CSS layouts.",
    prerequisites: "CSS Fundamentals",
    objectives: [
      "Understand normal document flow.",
      "Use Flexbox for one-dimensional layouts.",
      "Use Grid for two-dimensional layouts.",
      "Position elements correctly."
    ],
    topics: [
      "Display property",
      "Position property",
      "Static, relative and absolute positioning",
      "Fixed and sticky positioning",
      "Flexbox",
      "CSS Grid",
      "Gap and alignment",
      "Z-index"
    ],
    exercises: [
      "Create a Flexbox navigation bar.",
      "Build a card layout using Grid.",
      "Create a two-column dashboard."
    ],
    project: "Build a responsive dashboard layout.",
    resources: [
      {
        title: "MDN CSS Layout",
        url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout"
      },
      {
        title: "Flexbox Guide",
        url: "https://css-tricks.com/snippets/css/a-guide-to-flexbox/"
      },
      {
        title: "Grid Guide",
        url: "https://css-tricks.com/snippets/css/complete-guide-grid/"
      }
    ]
  },
  {
    id: 6,
    title: "Responsive Web Design",
    level: "Intermediate",
    duration: "5 hours",
    overview: "Create websites that work across mobile, tablet and desktop screens.",
    prerequisites: "CSS Layout",
    objectives: [
      "Understand responsive design principles.",
      "Use media queries.",
      "Design mobile-first interfaces.",
      "Create responsive images and layouts."
    ],
    topics: [
      "Responsive design principles",
      "Viewport meta tag",
      "Media queries",
      "Breakpoints",
      "Mobile-first design",
      "Fluid layouts",
      "Responsive images",
      "Responsive navigation"
    ],
    exercises: [
      "Make a desktop page mobile-friendly.",
      "Create a responsive navigation menu.",
      "Build a responsive image gallery."
    ],
    project: "Build a responsive business website.",
    resources: [
      {
        title: "MDN Responsive Design",
        url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design"
      }
    ]
  },
  {
    id: 7,
    title: "Advanced CSS",
    level: "Intermediate",
    duration: "5 hours",
    overview: "Create polished interfaces with modern CSS effects and techniques.",
    prerequisites: "CSS Layout and Responsive Design",
    objectives: [
      "Create CSS animations.",
      "Use transitions and transforms.",
      "Understand pseudo-classes and pseudo-elements.",
      "Organize reusable CSS."
    ],
    topics: [
      "Pseudo-classes",
      "Pseudo-elements",
      "CSS transitions",
      "CSS transforms",
      "Keyframe animations",
      "CSS variables",
      "Specificity",
      "CSS architecture"
    ],
    exercises: [
      "Create animated buttons.",
      "Build a card hover effect.",
      "Create a loading animation."
    ],
    project: "Build an animated landing page.",
    resources: [
      {
        title: "MDN CSS Animations",
        url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animations"
      }
    ]
  },
  {
    id: 8,
    title: "CSS Frameworks",
    level: "Intermediate",
    duration: "5 hours",
    overview: "Use popular CSS frameworks to develop interfaces efficiently.",
    prerequisites: "CSS Fundamentals and Layout",
    objectives: [
      "Understand CSS frameworks.",
      "Use Bootstrap components.",
      "Understand Tailwind utility classes.",
      "Customize framework styles."
    ],
    topics: [
      "Introduction to CSS frameworks",
      "Bootstrap grid",
      "Bootstrap components",
      "Tailwind CSS setup",
      "Utility classes",
      "Responsive utilities",
      "Custom themes"
    ],
    exercises: [
      "Build a Bootstrap navbar.",
      "Create a Tailwind card layout.",
      "Compare a layout built with plain CSS and Tailwind."
    ],
    project: "Build a responsive product landing page.",
    resources: [
      {
        title: "Bootstrap Documentation",
        url: "https://getbootstrap.com/docs/",
      },
      {
        title: "Tailwind CSS Documentation",
        url: "https://tailwindcss.com/docs"
      }
    ]
  },
  {
    id: 9,
    title: "JavaScript Fundamentals",
    level: "Beginner",
    duration: "7 hours",
    overview: "Learn programming fundamentals using JavaScript.",
    prerequisites: "Basic HTML and CSS",
    objectives: [
      "Understand JavaScript execution.",
      "Declare variables and data types.",
      "Use operators and conditions.",
      "Write loops."
    ],
    topics: [
      "Introduction to JavaScript",
      "Variables: let, const and var",
      "Primitive data types",
      "Type conversion",
      "Operators",
      "If, else and switch",
      "For and while loops",
      "Truthy and falsy values"
    ],
    exercises: [
      "Check whether a number is even or odd.",
      "Find the largest of three numbers.",
      "Create a multiplication table."
    ],
    project: "Build a basic calculator.",
    resources: [
      {
        title: "MDN JavaScript",
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript"
      },
      {
        title: "JavaScript.info",
        url: "https://javascript.info/"
      }
    ]
  },
  {
    id: 10,
    title: "JavaScript Functions",
    level: "Beginner",
    duration: "5 hours",
    overview: "Write reusable JavaScript code using functions and understand scope.",
    prerequisites: "JavaScript Fundamentals",
    objectives: [
      "Create reusable functions.",
      "Understand parameters and return values.",
      "Learn function scope and closures.",
      "Use callbacks."
    ],
    topics: [
      "Function declarations",
      "Function expressions",
      "Parameters and arguments",
      "Return values",
      "Arrow functions",
      "Scope",
      "Closures",
      "Callbacks and recursion"
    ],
    exercises: [
      "Create a function to calculate factorial.",
      "Write a function to reverse a string.",
      "Create a reusable temperature converter."
    ],
    project: "Build a reusable utility functions library.",
    resources: [
      {
        title: "MDN Functions",
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions"
      }
    ]
  },
  {
    id: 11,
    title: "Arrays and Objects",
    level: "Intermediate",
    duration: "6 hours",
    overview: "Store, access and manipulate collections of data.",
    prerequisites: "JavaScript Functions",
    objectives: [
      "Create and manipulate arrays.",
      "Understand objects and properties.",
      "Use common array methods.",
      "Work with destructuring and spread syntax."
    ],
    topics: [
      "Array creation and access",
      "push, pop, shift and unshift",
      "map and filter",
      "reduce and find",
      "Sorting and searching",
      "Objects and nested objects",
      "Destructuring",
      "Spread and rest operators"
    ],
    exercises: [
      "Find the largest number in an array.",
      "Filter students by marks.",
      "Calculate the average of an array."
    ],
    project: "Build a student marks management application.",
    resources: [
      {
        title: "MDN JavaScript Guide",
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
      }
    ]
  },
  {
    id: 12,
    title: "DOM Manipulation",
    level: "Intermediate",
    duration: "6 hours",
    overview: "Connect JavaScript with HTML to create interactive web pages.",
    prerequisites: "JavaScript Fundamentals and Functions",
    objectives: [
      "Understand the DOM tree.",
      "Select and update elements.",
      "Handle browser events.",
      "Create dynamic HTML elements."
    ],
    topics: [
      "DOM introduction",
      "getElementById",
      "querySelector",
      "Changing text and styles",
      "Creating and removing elements",
      "Event listeners",
      "Event bubbling",
      "Form events"
    ],
    exercises: [
      "Create a dynamic to-do list.",
      "Build a show and hide password feature.",
      "Validate a registration form."
    ],
    project: "Build an interactive task manager.",
    resources: [
      {
        title: "MDN DOM",
        url: "https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model"
      }
    ]
  },
  {
    id: 13,
    title: "Modern JavaScript ES6+",
    level: "Intermediate",
    duration: "6 hours",
    overview: "Learn modern JavaScript syntax and language features.",
    prerequisites: "JavaScript Fundamentals, Functions and Objects",
    objectives: [
      "Use modern JavaScript syntax.",
      "Understand classes and modules.",
      "Write cleaner code.",
      "Handle errors effectively."
    ],
    topics: [
      "ES6 introduction",
      "Template literals",
      "Destructuring",
      "Spread and rest",
      "Default parameters",
      "Classes and inheritance",
      "Import and export",
      "Try and catch"
    ],
    exercises: [
      "Convert functions into arrow functions.",
      "Split code into JavaScript modules.",
      "Create a class for managing products."
    ],
    project: "Build a shopping cart using modern JavaScript.",
    resources: [
      {
        title: "MDN JavaScript Guide",
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
      }
    ]
  },
  {
    id: 14,
    title: "Asynchronous JavaScript",
    level: "Intermediate",
    duration: "6 hours",
    overview: "Retrieve external data and work with asynchronous operations.",
    prerequisites: "Modern JavaScript and Functions",
    objectives: [
      "Understand synchronous and asynchronous code.",
      "Work with promises.",
      "Use async and await.",
      "Fetch data from APIs."
    ],
    topics: [
      "Call stack and event loop",
      "Callbacks",
      "Promises",
      "Promise chaining",
      "Async and await",
      "Fetch API",
      "JSON",
      "Error handling"
    ],
    exercises: [
      "Fetch random user information.",
      "Display API data on a webpage.",
      "Handle loading and error states."
    ],
    project: "Build a weather application using a public API.",
    resources: [
      {
        title: "MDN Asynchronous JavaScript",
        url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Async_JS"
      }
    ]
  },
  {
    id: 15,
    title: "Git and GitHub",
    level: "Beginner",
    duration: "4 hours",
    overview: "Learn version control and collaborate on frontend projects.",
    prerequisites: "Basic computer knowledge",
    objectives: [
      "Understand version control.",
      "Create Git repositories.",
      "Manage commits and branches.",
      "Collaborate using GitHub."
    ],
    topics: [
      "Introduction to Git",
      "git init and clone",
      "git add and commit",
      "git push and pull",
      "Branches and merging",
      "Pull requests",
      "Merge conflicts",
      "README files"
    ],
    exercises: [
      "Create a GitHub repository.",
      "Push a frontend project.",
      "Create a feature branch and merge it."
    ],
    project: "Publish your portfolio source code on GitHub.",
    resources: [
      {
        title: "Git Documentation",
        url: "https://git-scm.com/doc"
      },
      {
        title: "GitHub Skills",
        url: "https://skills.github.com/"
      }
    ]
  },
  {
    id: 16,
    title: "React Fundamentals",
    level: "Intermediate",
    duration: "8 hours",
    overview: "Build component-based user interfaces using React.",
    prerequisites: "JavaScript ES6+, HTML and CSS",
    objectives: [
      "Understand React and component architecture.",
      "Write JSX.",
      "Pass data using props.",
      "Manage state and events."
    ],
    topics: [
      "Introduction to React",
      "Project setup with Vite",
      "JSX",
      "Functional components",
      "Props",
      "useState",
      "Event handling",
      "Conditional rendering",
      "Lists and keys"
    ],
    exercises: [
      "Create reusable profile cards.",
      "Build a counter with useState.",
      "Create a dynamic product list."
    ],
    project: "Build a task management application.",
    resources: [
      {
        title: "React Documentation",
        url: "https://react.dev/learn"
      }
    ]
  },
  {
    id: 17,
    title: "Advanced React",
    level: "Advanced",
    duration: "8 hours",
    overview: "Learn advanced React patterns and manage complex application state.",
    prerequisites: "React Fundamentals",
    objectives: [
      "Use built-in React hooks.",
      "Create custom hooks.",
      "Share application state.",
      "Improve component performance."
    ],
    topics: [
      "useEffect",
      "useRef",
      "useMemo",
      "useCallback",
      "useContext",
      "Custom hooks",
      "Context API",
      "Component optimization",
      "Error boundaries"
    ],
    exercises: [
      "Create a custom useFetch hook.",
      "Build a theme switcher using Context.",
      "Optimize a searchable product list."
    ],
    project: "Build a multi-page learning dashboard.",
    resources: [
      {
        title: "React Hooks",
        url: "https://react.dev/reference/react"
      }
    ]
  },
  {
    id: 18,
    title: "React Router and State Management",
    level: "Advanced",
    duration: "6 hours",
    overview: "Build multi-page React applications and manage shared state.",
    prerequisites: "React Fundamentals and Advanced React",
    objectives: [
      "Implement client-side routing.",
      "Create nested routes.",
      "Understand global state.",
      "Protect application routes."
    ],
    topics: [
      "React Router setup",
      "BrowserRouter and Routes",
      "Route parameters",
      "Nested routes",
      "Navigation and redirects",
      "Protected routes",
      "Context API",
      "Zustand and Redux basics"
    ],
    exercises: [
      "Create a multi-page website.",
      "Build a protected dashboard route.",
      "Share cart state between components."
    ],
    project: "Build a multi-page e-commerce frontend.",
    resources: [
      {
        title: "React Router",
        url: "https://reactrouter.com/"
      },
      {
        title: "Zustand",
        url: "https://zustand.docs.pmnd.rs/"
      }
    ]
  },
  {
    id: 19,
    title: "API Integration",
    level: "Advanced",
    duration: "6 hours",
    overview: "Connect frontend applications to backend services and REST APIs.",
    prerequisites: "React and Asynchronous JavaScript",
    objectives: [
      "Understand REST API concepts.",
      "Perform CRUD operations.",
      "Handle API responses and errors.",
      "Implement frontend authentication flows."
    ],
    topics: [
      "HTTP methods",
      "REST API fundamentals",
      "GET, POST, PUT and DELETE",
      "Fetch and Axios",
      "JSON responses",
      "Loading and error states",
      "Authentication basics",
      "Environment variables"
    ],
    exercises: [
      "Fetch and display API data.",
      "Create a CRUD interface.",
      "Implement a login form connected to an API."
    ],
    project: "Build a product management dashboard.",
    resources: [
      {
        title: "MDN HTTP",
        url: "https://developer.mozilla.org/en-US/docs/Web/HTTP"
      },
      {
        title: "JSONPlaceholder",
        url: "https://jsonplaceholder.typicode.com/"
      }
    ]
  },
  {
    id: 20,
    title: "Testing and Deployment",
    level: "Advanced",
    duration: "6 hours",
    overview: "Test frontend applications and publish them for real users.",
    prerequisites: "React and GitHub",
    objectives: [
      "Understand frontend testing.",
      "Write component tests.",
      "Prepare production builds.",
      "Deploy applications."
    ],
    topics: [
      "Testing fundamentals",
      "Vitest",
      "React Testing Library",
      "Component testing",
      "Debugging",
      "Production builds",
      "Vercel deployment",
      "Netlify deployment",
      "Performance and accessibility checks"
    ],
    exercises: [
      "Write tests for a React component.",
      "Test a form submission.",
      "Deploy a project to Vercel."
    ],
    project: "Deploy a complete responsive React portfolio.",
    resources: [
      {
        title: "Vitest",
        url: "https://vitest.dev/"
      },
      {
        title: "React Testing Library",
        url: "https://testing-library.com/docs/react-testing-library/intro/"
      },
      {
        title: "Vercel Documentation",
        url: "https://vercel.com/docs"
      }
    ]
  },
  {
    id: 21,
    title: "PostgreSQL Fundamentals",
    level: "Intermediate",
    duration: "6 hours",
    overview: "Learn to store, query and manage data using the PostgreSQL relational database.",
    prerequisites: "Basic programming knowledge",
    objectives: [
      "Understand relational database concepts.",
      "Create databases, tables and relationships.",
      "Write SQL queries to read and modify data.",
      "Connect a backend application to PostgreSQL."
    ],
    topics: [
      "Introduction to PostgreSQL",
      "Installing PostgreSQL and psql",
      "Data types and tables",
      "Primary and foreign keys",
      "INSERT, UPDATE and DELETE",
      "SELECT, WHERE and ORDER BY",
      "Joins and aggregations",
      "Indexes and transactions"
    ],
    exercises: [
      "Create a students and courses database.",
      "Write queries using joins and GROUP BY.",
      "Connect a Node.js API to PostgreSQL."
    ],
    project: "Design a database for a learning platform.",
    resources: [
      {
        title: "PostgreSQL Documentation",
        url: "https://www.postgresql.org/docs/"
      },
      {
        title: "PostgreSQL Tutorial",
        url: "https://www.postgresqltutorial.com/"
      }
    ]
  }
];

export default frontendModules;
