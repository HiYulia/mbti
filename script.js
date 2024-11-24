let currentQuestion = 0;
let answers = {
  E: 0,
  I: 0,
  S: 0,
  N: 0,
  T: 0,
  F: 0,
  J: 0,
  P: 0,
};

function startTest() {
  document.getElementById("welcome-screen").classList.remove("active");
  document.getElementById("welcome-screen").classList.add("hidden");
  document.getElementById("question-screen").classList.remove("hidden");
  document.getElementById("question-screen").classList.add("active");
  currentQuestion = 0;
  updateProgress();
  showQuestion();
}

function showQuestion() {
  const question = questions[currentQuestion];
  document.getElementById("current-question").textContent = currentQuestion + 1;
  document.getElementById("question-text").textContent = question.question;
  const optionButtons = document.querySelectorAll(".option-button");
  optionButtons[0].textContent = question.options.A;
  optionButtons[1].textContent = question.options.B;
}

function updateProgress() {
  const progressFill = document.getElementById("progress-fill");
  if (progressFill) {
    const progress = (currentQuestion / questions.length) * 100;
    progressFill.style.width = `${progress}%`;
  }
}

function selectOption(option) {
  const question = questions[currentQuestion];
  const dimension = question.dimension;

  if (dimension === "EI") {
    const specialQuestions = [8, 20, 28, 36];
    if (specialQuestions.includes(currentQuestion)) {
      option === "B" ? answers.E++ : answers.I++;
    } else if ([0, 4, 12, 16, 24, 32].includes(currentQuestion)) {
      option === "A" ? answers.E++ : answers.I++;
    }
  } else if (dimension === "SN") {
    const normalSQuestions = [5, 9, 25, 29, 37];
    const reverseSQuestions = [1, 13, 17, 21, 33];

    if (normalSQuestions.includes(currentQuestion)) {
      option === "A" ? answers.S++ : answers.N++;
    } else if (reverseSQuestions.includes(currentQuestion)) {
      option === "B" ? answers.S++ : answers.N++;
    }
  } else if (dimension === "TF") {
    const normalTQuestions = [2, 6, 22, 30, 34, 38];
    const reverseTQuestions = [10, 14, 18, 26];

    if (normalTQuestions.includes(currentQuestion)) {
      option === "A" ? answers.T++ : answers.F++;
    } else if (reverseTQuestions.includes(currentQuestion)) {
      option === "B" ? answers.T++ : answers.F++;
    }
  } else if (dimension === "JP") {
    const normalJQuestions = [11, 19, 23, 31, 35, 39];
    const reverseJQuestions = [3, 7, 15, 27];

    if (normalJQuestions.includes(currentQuestion)) {
      option === "A" ? answers.J++ : answers.P++;
    } else if (reverseJQuestions.includes(currentQuestion)) {
      option === "B" ? answers.J++ : answers.P++;
    }
  }

  currentQuestion++;

  if (currentQuestion < questions.length) {
    updateProgress();
    showQuestion();
  } else if (currentQuestion === questions.length) {
    updateProgress();
    calculateAndShowResult();
  }

  console.log(`Current Question: ${currentQuestion}`);
  console.log("Answers:", answers);
}

function calculateType() {
  let type = "";

  const totalE = answers.E;
  const totalI = answers.I;
  const totalS = answers.S;
  const totalN = answers.N;
  const totalT = answers.T;
  const totalF = answers.F;
  const totalJ = answers.J;
  const totalP = answers.P;

  if (
    totalE + totalI === 0 ||
    totalS + totalN === 0 ||
    totalT + totalF === 0 ||
    totalJ + totalP === 0
  ) {
    return null;
  }

  type += totalE > totalI ? "E" : "I";
  type += totalS > totalN ? "S" : "N";
  type += totalT > totalF ? "T" : "F";
  type += totalJ > totalP ? "J" : "P";

  return type;
}

function calculateAndShowResult() {
  const type = calculateType();

  if (!type) {
    alert("测试未完成，请确保回答所有问题。");
    return;
  }

  document.getElementById("question-screen").classList.add("hidden");
  document.getElementById("result-screen").classList.remove("hidden");

  document.getElementById("result-type").textContent = type;
  document.getElementById("type-description").textContent =
    typeDescriptions[type];

  const dimensionScores = `
    外向(E) ${answers.E} : ${answers.I} 内向(I)
    感觉(S) ${answers.S} : ${answers.N} 直觉(N)
    思维(T) ${answers.T} : ${answers.F} 情感(F)
    判断(J) ${answers.J} : ${answers.P} 知觉(P)
  `;

  const scoreElement = document.getElementById("dimension-scores");
  if (scoreElement) {
    scoreElement.textContent = dimensionScores;
  }
}

function restartTest() {
  currentQuestion = 0;
  answers = {
    E: 0,
    I: 0,
    S: 0,
    N: 0,
    T: 0,
    F: 0,
    J: 0,
    P: 0,
  };

  document.getElementById("result-screen").classList.add("hidden");
  document.getElementById("welcome-screen").classList.remove("hidden");
  document.getElementById("welcome-screen").classList.add("active");
}

document.addEventListener("DOMContentLoaded", function () {
  const welcomeScreen = document.getElementById("welcome-screen");

  if (welcomeScreen.classList.contains("active")) {
    const question = questions[0];
    document.getElementById("question-text").textContent = question.question;
    const optionButtons = document.querySelectorAll(".option-button");
    optionButtons[0].textContent = question.options.A;
    optionButtons[1].textContent = question.options.B;
  }
});
