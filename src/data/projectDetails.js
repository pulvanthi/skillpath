// Extra content for the project details page, keyed by project id.
// The number of milestones matches `milestones` in projects.js.
const projectDetails = {
  1: {
    goal: "A multi-section personal website that introduces you, shows your work and lets visitors contact you.",
    features: ["Responsive navigation bar", "About and skills sections", "Project gallery", "Contact form"],
    steps: [
      { title: "Plan the pages", text: "Sketch the sections: Home, About, Projects, Contact. Decide colours and fonts." },
      { title: "Build the HTML structure", text: "Use semantic tags: header, nav, main, section and footer." },
      { title: "Style with CSS", text: "Add layout with Flexbox or Grid, spacing and a colour theme." },
      { title: "Make it responsive and publish", text: "Add media queries, test on a phone, then deploy to GitHub Pages or Netlify." },
    ],
    tips: ["Start with the mobile layout first.", "Use real photos and project links, not placeholders."],
  },
  2: {
    goal: "A to-do app where you can add, complete and delete tasks, and your list is still there after a refresh.",
    features: ["Add and delete tasks", "Mark tasks as done", "Filter: all, active, completed", "Saved in Local Storage"],
    steps: [
      { title: "Set up the React project", text: "Create the app with Vite and clear the starter code." },
      { title: "Show a list of tasks", text: "Keep tasks in useState and render them with map and keys." },
      { title: "Add, complete and delete", text: "Write the handler functions and pass them down as props." },
      { title: "Add filters", text: "Store the selected filter in state and filter the list before rendering." },
      { title: "Save to Local Storage", text: "Load tasks on start and save them with useEffect whenever they change." },
    ],
    tips: ["Give every task a unique id.", "Never change state directly; create a new array."],
  },
  3: {
    goal: "A weather app that fetches live data from a public API and shows the forecast for a city you search.",
    features: ["Search by city", "Current temperature and conditions", "Loading and error states", "5-day forecast"],
    steps: [
      { title: "Choose a weather API", text: "Create a free key with a service such as OpenWeatherMap and read its docs." },
      { title: "Build the search form", text: "Create an input and a button that stores the city name." },
      { title: "Fetch the data", text: "Use fetch with async/await and read the JSON response." },
      { title: "Display the weather", text: "Show temperature, humidity, wind and an icon in a card." },
      { title: "Handle loading and errors", text: "Show a loading message and a friendly error for unknown cities." },
      { title: "Add the forecast and polish", text: "List the next days, style the app and hide your API key in an environment variable." },
    ],
    tips: ["Never commit your API key to GitHub.", "Test with a city that does not exist."],
  },
  4: {
    goal: "A multiple-choice quiz that asks questions one at a time and shows your score at the end.",
    features: ["Question and options", "Next and Previous buttons", "Score at the end", "Restart option"],
    steps: [
      { title: "Create the questions data", text: "Write an array of objects with question, options and the correct answer." },
      { title: "Show one question at a time", text: "Track the current question number with state." },
      { title: "Record the answers", text: "Highlight the selected option and store it in state." },
      { title: "Show the result and restart", text: "Calculate the score, show it, and add a Retake button." },
    ],
    tips: ["Keep the questions in a separate file.", "Disable Next until an option is chosen if you want strict answers."],
  },
  5: {
    goal: "An app that records income and expenses, groups them by category and shows your balance.",
    features: ["Add income and expenses", "Category totals", "Current balance", "Saved in Local Storage"],
    steps: [
      { title: "Design the data", text: "Decide the fields: title, amount, type, category and date." },
      { title: "Build the transaction form", text: "Create controlled inputs with validation for the amount." },
      { title: "List transactions", text: "Render the list and add a delete button." },
      { title: "Calculate totals", text: "Use reduce to compute income, expenses and balance." },
      { title: "Persist and polish", text: "Save to Local Storage and add a chart or category summary." },
    ],
    tips: ["Store amounts as numbers, not strings.", "Format money with toLocaleString."],
  },
  6: {
    goal: "A dashboard that tracks your learning activity with cards, progress bars and recent activity.",
    features: ["Stat cards", "Progress bars per course", "Recent activity list", "Responsive layout"],
    steps: [
      { title: "Plan the layout", text: "Sketch a sidebar, a top bar and a grid of cards." },
      { title: "Build the layout with CSS Grid", text: "Create the page shell and make it responsive." },
      { title: "Create reusable components", text: "Make a StatCard and a ProgressBar component that take props." },
      { title: "Add the data", text: "Use an array of courses and calculate percentages." },
      { title: "Add interaction", text: "Add filters or a date range and keep their state." },
      { title: "Polish and deploy", text: "Check mobile sizes, tidy the styles and publish the app." },
    ],
    tips: ["Build small components first, then combine them.", "Use CSS variables for your colours."],
  },
};

export default projectDetails;
