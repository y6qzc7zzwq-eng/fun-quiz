const questions = [
  {
    question: "Как ты сегодня проснулась?",
    options: [
      { text: "Бодро и с планами", score: 2 },
      { text: "Нормально, но без восторга", score: 1 },
      { text: "Уже устала", score: 0 }
    ]
  },
  {
    question: "Как идёт день?",
    options: [
      { text: "Я всё контролирую", score: 2 },
      { text: "Как-то идёт", score: 1 },
      { text: "Он идёт меня", score: 0 }
    ]
  },
  {
    question: "Чего хочется больше всего?",
    options: [
      { text: "Сделать ещё дел", score: 2 },
      { text: "Ничего не решать", score: 1 },
      { text: "Плед. Тишина. Чай.", score: 0 }
    ]
  }
];

let current = -1;
let totalScore = 0;

function nextStep() {
  current++;

  if (current < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showQuestion() {
  const q = questions[current];
  const quiz = document.getElementById("quiz");

  quiz.innerHTML = `<h2>${q.question}</h2>`;

  q.options.forEach(option => {
    const div = document.createElement("div");
    div.className = "option";
    div.innerText = option.text;
    div.onclick = () => {
      totalScore += option.score;
      nextStep();
    };
    quiz.appendChild(div);
  });

  document.getElementById("nextBtn").style.display = "none";
}

function showResult() {
  const quiz = document.getElementById("quiz");
  let resultText = "";

  if (totalScore >= 5) {
    resultText = "🧠 Ты сегодня собранный стратег.";
  } else if (totalScore >= 3) {
    resultText = "😵‍💫 Ты держишься, но не перегружай себя.";
  } else {
    resultText = "😴 Тебе нужен отдых.";
  }

  quiz.innerHTML = `<h2>${resultText}</h2>`;
}
