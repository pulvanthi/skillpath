
const moduleDetails = {
  javascript: [
    {
      id: 1,
      title: "JavaScript Basics",
      level: "Beginner",
      duration: "3 hours",
      lessons: 6,
      overview:
        "Understand JavaScript fundamentals and learn how to write interactive programs for websites.",

      prerequisites: "Basic HTML and CSS knowledge.",

      objectives: [
        "Understand what JavaScript is and how it works.",
        "Learn variables and different data types.",
        "Understand operators and expressions.",
        "Use conditional statements to make decisions.",
        "Write loops to repeat instructions.",
        "Solve basic programming problems."
      ],

      topics: [
        "Introduction to JavaScript",
        "Variables: var, let and const",
        "Data types and type conversion",
        "Operators and expressions",
        "Conditional statements: if, else and switch",
        "Loops: for, while and do-while"
      ],

      practicalTasks: [
        "Create a program to check whether a number is even or odd.",
        "Create a program to calculate the largest of three numbers."
      ],

      project: "Build a simple calculator using JavaScript."
    },

    {
      id: 2,
      title: "Functions and Objects",
      level: "Beginner",
      duration: "4 hours",
      lessons: 6,
      overview:
        "Learn how to organize JavaScript code using reusable functions and objects.",

      prerequisites: "JavaScript Basics.",

      objectives: [
        "Understand function declarations and expressions.",
        "Learn parameters and return values.",
        "Understand arrow functions.",
        "Create and access JavaScript objects.",
        "Work with object properties and methods."
      ],

      topics: [
        "Function declarations",
        "Function expressions",
        "Parameters and return values",
        "Arrow functions",
        "Objects and properties",
        "Object methods and this keyword"
      ],

      practicalTasks: [
        "Create a function to calculate the area of a rectangle.",
        "Create a student object containing name, age and marks."
      ],

      project: "Build a student information management program."
    },

    {
      id: 3,
      title: "Arrays and Strings",
      level: "Beginner",
      duration: "4 hours",
      lessons: 6,
      overview:
        "Learn to store, access, search and manipulate collections of data.",

      prerequisites: "Functions and Objects.",

      objectives: [
        "Create and access arrays.",
        "Use important array methods.",
        "Understand string manipulation.",
        "Search and sort data.",
        "Work with nested arrays."
      ],

      topics: [
        "Creating and accessing arrays",
        "push, pop, shift and unshift",
        "map, filter and reduce",
        "Finding and sorting array elements",
        "String methods",
        "Template literals"
      ],

      practicalTasks: [
        "Find the largest number in an array.",
        "Count vowels in a given string."
      ],

      project: "Build a student marks and grade calculator."
    },

    {
      id: 4,
      title: "DOM Manipulation",
      level: "Intermediate",
      duration: "5 hours",
      lessons: 6,
      overview:
        "Learn how JavaScript interacts with HTML elements to create dynamic web pages.",

      prerequisites: "JavaScript Basics, Functions and Arrays.",

      objectives: [
        "Understand the Document Object Model.",
        "Select HTML elements using JavaScript.",
        "Change text, styles and attributes.",
        "Create and remove HTML elements.",
        "Handle user events."
      ],

      topics: [
        "Introduction to DOM",
        "getElementById and querySelector",
        "Changing text and HTML",
        "Changing CSS styles",
        "Event listeners",
        "Creating and removing elements"
      ],

      practicalTasks: [
        "Create a button that changes the page background.",
        "Build a dynamic list using JavaScript."
      ],

      project: "Build an interactive To-Do List."
    },

    {
      id: 5,
      title: "Modern JavaScript",
      level: "Intermediate",
      duration: "5 hours",
      lessons: 6,
      overview:
        "Explore modern JavaScript features introduced in ES6 and later versions.",

      prerequisites: "JavaScript fundamentals.",

      objectives: [
        "Understand modern JavaScript syntax.",
        "Use destructuring and spread operators.",
        "Work with template literals.",
        "Understand modules and imports.",
        "Write cleaner and reusable code."
      ],

      topics: [
        "ES6 introduction",
        "Let and const",
        "Arrow functions",
        "Template literals",
        "Destructuring",
        "Spread and rest operators",
        "JavaScript modules"
      ],

      practicalTasks: [
        "Convert normal functions into arrow functions.",
        "Use destructuring to extract object properties."
      ],

      project: "Build a personal expense tracker."
    },

    {
      id: 6,
      title: "Asynchronous JavaScript",
      level: "Intermediate",
      duration: "5 hours",
      lessons: 6,
      overview:
        "Understand asynchronous programming and learn how to retrieve data from APIs.",

      prerequisites: "Functions, arrays and modern JavaScript.",

      objectives: [
        "Understand synchronous and asynchronous execution.",
        "Learn callbacks and promises.",
        "Use async and await.",
        "Fetch data from external APIs.",
        "Handle errors using try and catch."
      ],

      topics: [
        "Synchronous vs asynchronous JavaScript",
        "Callbacks",
        "Promises",
        "Promise methods",
        "Async and await",
        "Fetch API and error handling"
      ],

      practicalTasks: [
        "Fetch sample user data from an API.",
        "Display API results on a web page."
      ],

      project: "Build a Weather Application using a public API."
    }
  ]
};

export default moduleDetails;
