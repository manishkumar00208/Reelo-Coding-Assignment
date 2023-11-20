const fs = require('fs');

// Load the question store
const questionStore = JSON.parse(fs.readFileSync('questionStore.json', 'utf-8'));

// Function to generate a question paper
function generateQuestionPaper(totalMarks, difficultyDistribution) {
  const questionPaper = [];
  
  // Calculate the number of questions for each difficulty level
  const easyCount = Math.round(totalMarks * (difficultyDistribution.easy / 100));
  const mediumCount = Math.round(totalMarks * (difficultyDistribution.medium / 100));
  const hardCount = Math.round(totalMarks * (difficultyDistribution.hard / 100));

  // Filter questions based on difficulty
  const easyQuestions = questionStore.filter(question => question.difficulty === 'Easy');
  const mediumQuestions = questionStore.filter(question => question.difficulty === 'Medium');
  const hardQuestions = questionStore.filter(question => question.difficulty === 'Hard');

  // Randomly select questions from each difficulty level
  function getRandomQuestions(questions, count) {
    const selectedQuestions = [];
    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * questions.length);
      selectedQuestions.push(questions[randomIndex]);
      questions.splice(randomIndex, 1);
    }
    return selectedQuestions;
  }

  // Generate the question paper
  questionPaper.push(...getRandomQuestions(easyQuestions, easyCount));
  questionPaper.push(...getRandomQuestions(mediumQuestions, mediumCount));
  questionPaper.push(...getRandomQuestions(hardQuestions, hardCount));

  return questionPaper;
}

// Sample Assumption Example
const totalMarks = 100;
const difficultyDistribution = {
  easy: 20,
  medium: 50,
  hard: 30
};

const generatedQuestionPaper = generateQuestionPaper(totalMarks, difficultyDistribution);
console.log('Generated Question Paper:', generatedQuestionPaper);
