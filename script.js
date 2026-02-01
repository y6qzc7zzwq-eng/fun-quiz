const startBtn = document.getElementById('startBtn');
const restartBtn = document.getElementById('restartBtn');
const startScreen = document.querySelector('.start-screen');
const testWrapper = document.querySelector('.test-wrapper');
const resultScreen = document.querySelector('.result-screen');
const questionContainer = document.getElementById('question-container');
const resultTitle = document.getElementById('result-title');
const resultImage = document.getElementById('result-image');

let currentQuestion = 0;
let scores = {
  flowers: 0,
  newyear: 0,
  flash: 0,
  desknap: 0,
  barista: 0,
  yogamat: 0,
  tiny: 0
};

// Вопросы
const questions = [
  {
    text: "Что тебе нравится делать утром?",
    answers: [
      {text: "Собирать цветы", cats: ["flowers"]},
      {text: "Пить кофе", cats: ["barista"]},
      {text: "Медитировать", cats: ["yogamat"]}
    ]
  },
  {
    text: "Как отмечаешь праздники?",
    answers: [
      {text: "Весело с друзьями", cats: ["newyear"]},
      {text: "Спокойно дома", cats: ["desknap"]},
      {text: "Маленькие радости", cats: ["tiny"]}
    ]
  },
  {
    text: "Что тебя вдохновляет?",
    answers: [
      {text: "Фары в ночи", cats: ["flash"]},
      {text: "Природа и цветы", cats: ["flowers"]},
      {text: "Завтрак с кофе", cats: ["barista"]}
    ]
  },
  {
    text: "Любимый способ провести день?",
    answers: [
      {text: "Сон и отдых", cats: ["desknap"]},
      {text: "Йога и движение", cats: ["yogamat"]},
      {text: "Маленькие радости", cats: ["tiny"]}
    ]
  },
  {
    text: "Что приносит радость?",
    answers: [
      {text: "Новый год и праздники", cats: ["newyear"]},
      {text: "Цветы и прогулки", cats: ["flowers"]},
      {text: "Яркие вспышки", cats: ["flash"]}
    ]
  }
];

// Результаты
const results = {
  flowers: {title: "Котик с цветами", image: "images/flowers.jpeg"},
  newyear: {title: "Новогодний котик", image: "images/newyear.jpeg"},
  flash: {title: "Котик с фарами", image: "images/flash.jpeg"},
  desknap: {title: "Котик спит на столе", image: "images/desknap.jpeg"},
  barista: {title: "Котик-бариста", image: "images/barista.jpeg"},
  yogamat: {title: "Котик на коврике для йоги", image: "images/yogamat.jpeg"},
  tiny: {title: "Маленький котик", image: "images/tiny.jpeg"}
};

startBtn.addEventListener('click', startTest);
restartBtn.addEventListener('click', restartTest);

function startTest() {
  startScreen.classList.add('hidden');
  testWrapper.classList.remove('hidden');
  currentQuestion = 0;
  scores = {flowers:0,newyear:0,flash:0,desknap:0,barista:0,yogamat:0,tiny:0};
  showQuestion();
}

function showQuestion() {
  const q = questions[currentQuestion];
  questionContainer.innerHTML = `<h2>${q.text}</h2>` +
    q.answers.map((a, i) => `<button data-index="${i}">${a.text}</button>`).join('');
  
  questionContainer.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
      const answer = q.answers[btn.dataset.index];
      answer.cats.forEach(cat => scores[cat]++);
      currentQuestion++;
      if(currentQuestion < questions.length){
        showQuestion();
      } else {
        showResult();
      }
    });
  });
}

function showResult() {
  testWrapper.classList.add('hidden');

  let maxScore = Math.max(...Object.values(scores));
  let topCats = Object.keys(scores).filter(c => scores[c] === maxScore);
  let winner = topCats[0]; // можно добавить контрольный вопрос

  resultTitle.textContent = results[winner].title;
  resultImage.src = results[winner].image;
  resultScreen.classList.remove('hidden');
}

function restartTest() {
  resultScreen.classList.add('hidden');
  startScreen.classList.remove('hidden');
}

/* Анимация лапок для бегущего кота */
const frames = document.querySelectorAll('.pixel-cat .frame');
let toggle = true;
setInterval(() => {
  frames.forEach(f => f.style.display = 'none');
  if(toggle) frames[0].style.display = 'inline';
  else frames[1].style.display = 'inline';
  toggle = !toggle;
}, 250);
