// your JS code here

const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars", "Saturn"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

const questionsElement = document.getElementById("questions");
const submitBtn = document.getElementById("submit");
const scoreElement = document.getElementById("score");

// Load saved progress (sessionStorage) or empty object
let savedProgress = JSON.parse(sessionStorage.getItem("progress")) || {};
let finalScore = localStorage.getItem("score");

// Render questions
function renderQuestions() {
  questionsElement.innerHTML = "";

  questions.forEach((q, i) => {
    const qDiv = document.createElement("div");
    qDiv.innerHTML = `<p>${q.question}</p>`;

    q.choices.forEach((choice) => {
      const label = document.createElement("label");
      const input = document.createElement("input");
      input.type = "radio";
      input.name = `question-${i}`;
      input.value = choice;

      // Restore saved answer
      if (savedProgress[i] === choice) {
        input.checked = true;
      }

      // Save progress on change
      input.addEventListener("change", () => {
        savedProgress[i] = choice;
        sessionStorage.setItem("progress", JSON.stringify(savedProgress));
      });

      label.appendChild(input);
      label.appendChild(document.createTextNode(choice));
      qDiv.appendChild(label);
      qDiv.appendChild(document.createElement("br"));
    });

    questionsElement.appendChild(qDiv);
  });
}

// Calculate score
function calculateScore() {
  let score = 0;
  questions.forEach((q, i) => {
    if (savedProgress[i] === q.answer) {
      score++;
    }
  });
  return score;
}

// Handle submit
submitBtn.addEventListener("click", () => {
  const score = calculateScore();
  scoreElement.textContent = `Your score is ${score} out of ${questions.length}.`;
  localStorage.setItem("score", score);
});

// Initial render
renderQuestions();

// Show last score if exists
if (finalScore !== null) {
  scoreElement.textContent = `Your score is ${finalScore} out of ${questions.length}.`;
}
