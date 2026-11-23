// One quiz per learning path, built from the path's own course content.
//
// Question N of a path belongs to lesson N of that path (see data/pathQuizData.js), so every
// question carries the module and lesson it tests. A quiz can only ask about its own course.
import { learningPaths } from "./learningPaths.js";
import { courseContent } from "./courseContent.js";
import { pathQuizData } from "./pathQuizData.js";

// Score needed to pass a quiz, as a percentage.
export const PASS_MARK = 70;

// The path's lessons in course order, each with the module it belongs to.
function lessonsOf(slug) {
  const lessons = [];
  (courseContent[slug]?.modules || []).forEach((module) => {
    module.lessons.forEach((lesson) => {
      lessons.push({
        module: module.title,
        lesson: typeof lesson === "string" ? lesson : lesson.title,
      });
    });
  });
  return lessons;
}

export const quizQuestions = {};
export const quizzes = [];

learningPaths.forEach((path) => {
  const rows = pathQuizData[path.slug];
  if (!rows) return;
  const lessons = lessonsOf(path.slug);

  quizQuestions[path.slug] = rows.map((row, index) => {
    const [question, ...rest] = row;
    const explanation = rest.pop();
    return {
      question,
      options: rest, // the correct answer is always written first in the data file
      answer: 0, // the quiz page shuffles the options on every attempt
      explanation,
      module: lessons[index]?.module,
      lesson: lessons[index]?.lesson,
    };
  });

  quizzes.push({
    id: path.slug,
    slug: path.slug,
    title: `${path.title} Quiz`,
    description: `Questions from every lesson in the ${path.title} learning path.`,
    level: path.level,
    modules: new Set(lessons.map((item) => item.module)).size,
    lessons: lessons.length,
  });
});
