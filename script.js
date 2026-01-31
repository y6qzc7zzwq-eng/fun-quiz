const startBtn = document.getElementById('startBtn');
const restartBtn = document.getElementById('restartBtn');
const welcomeDiv = document.getElementById('welcome');
const quizDiv = document.getElementById('quiz');
const resultDiv = document.getElementById('result');
const questionEl = document.getElementById('question');
const answersEl = document.getElementById('answers');
const resultNameEl = document.getElementById('resultName');
const resultImageEl = document.getElementById('resultImage');

// Список котиков
const cats = {
    flowers: { name: "Котик с цветами", img: "images/flowers.jpeg" },
    newyear: { name: "Новогодний котик", img: "images/newyear.jpeg" },
    flashlights: { name: "Котик со вспышками", img: "images/flashlights.jpeg" },
    desktop: { name: "Котик на рабочем столе", img: "images/desktop.jpeg" },
    coffeemachine: { name: "Котик-бариста", img: "images/coffeemachine.jpeg" },
    yogamat: { name: "Котик на коврике для йоги", img: "images/yogamat.jpeg" },
    tiny: { name: "Маленький котик «клопикс»", img: "images/tiny.jpeg" }
};

// Вопросы
const questions = [
    {
        question: "Что тебе больше нравится?",
        answers: [
            { text: "Цветы 🌸", points: ["flowers"] },
            { text: "Новый год 🎄", points: ["newyear"] },
            { text: "Спать на столе 😴", points: ["desktop"] },
            { text: "Кофе ☕", points: ["coffeemachine"] },
            { text: "Йога 🧘‍♀️", points: ["yogamat"] },
            { text: "Маленькие милые вещи 🐾", points: ["tiny"] },
            { text: "Свет и блеск ✨", points: ["flashlights"] }
        ]
    },
    {
        question: "Как проводишь свободное время?",
        answers: [
            { text: "Садоводство", points: ["flowers"] },
            { text: "Праздную все события", points: ["newyear"] },
            { text: "Сон и отдых", points: ["desktop"] },
            { text: "Готовлю и пью кофе", points: ["coffeemachine"] },
            { text: "Занимаюсь йогой", points: ["yogamat"] },
            { text: "Люблю маленькие милые вещи", points: ["tiny"] },
            { text: "Играю с огнями и светом", points: ["flashlights"] }
        ]
    },
    {
        question: "Какой напиток выберешь?",
        answers: [
            { text: "Чай с цветами", points: ["flowers"] },
            { text: "Шампанское на Новый год", points: ["newyear"] },
            { text: "Воду на столе рядом с ноутом", points: ["desktop"] },
            { text: "Капучино или латте", points: ["coffeemachine"] },
            { text: "Травяной чай после йоги", points: ["yogamat"] },
            { text: "Молоко", points: ["tiny"] },
            { text: "Энергетический напиток", points: ["flashlights"] }
        ]
    },
    {
        question: "Выбери настроение:",
        answers: [
            { text: "Романтичное", points: ["flowers"] },
            { text: "Веселое праздничное", points: ["newyear"] },
            { text: "Уютное и сонное", points: ["desktop"] },
            { text: "Активное и бодрое", points: ["coffeemachine"] },
            { text: "Спокойное и медитативное", points: ["yogamat"] },
            { text: "Милое и забавное", points: ["tiny"] },
            { text: "Энергичное и яркое", points: ["flashlights"] }
        ]
    },
    {
        question: "Твой идеальный день?",
        answers: [
            { text: "Прогулка в саду", points: ["flowers"] },
            { text: "Праздники с друзьями", points: ["newyear"] },
            { text: "Сон и чтение", points: ["desktop"] },
            { text: "Кофейня и книги", points: ["coffeemachine"] },
            { text: "Йога и медитация", points: ["yogamat"] },
            { text: "Игра с маленькими питомцами", points: ["tiny"] },
            { text: "Ночной город с огнями", points: ["flashlights"] }
        ]
    }
];

// Контрольный вопрос
const tieBreaker = {
    question: "Выбери одно из этих настроений:",
    answers: [
        { text: "Романтичное 🌸", points: ["flowers"] },
        { text: "Праздничное 🎄", points: ["newyear"] },
        { text: "Сонное 😴", points: ["desktop"] },
        { text: "Энергичное ☕", points: ["coffeemachine"] },
        { text: "Спокойное 🧘‍♀️", points: ["yogamat"] },
        { text: "Маленькое и милое 🐾", points: ["tiny"] },
        { text: "Яркое и вспышки ✨", points: ["flashlights"] }
    ]
};

let scores = {};
let currentQuestion = 0;

startBtn.addEventListener('click', startQuiz);
restartBtn.addEventListener('click', restartQuiz);

function startQuiz() {
    welcomeDiv.classList.add('hidden');
    quizDiv.classList.remove('hidden');
    currentQuestion = 0;
    scores = {};
    showQuestion();
}

function showQuestion() {
    let q;
    if (currentQuestion < questions.length) {
        q = questions[currentQuestion];
    } else {
        // Проверка на ничью
        const maxScore = Math.max(...Object.values(scores));
        const topCats = Object.keys(scores).filter(cat => scores[cat] === maxScore);
        if (topCats.length > 1) {
            q = tieBreaker;
        } else {
            showResult();
            return;
        }
    }

    questionEl.textContent = q.question;
    answersEl.innerHTML = '';
    q.answers.forEach(answer => {
        const btn = document.createElement('button');
        btn.textContent = answer.text;
        btn.addEventListener('click', () => selectAnswer(answer.points));
        answersEl.appendChild(btn);
    });
}

function selectAnswer(points) {
    points.forEach(cat => {
        scores[cat] = (scores[cat] || 0) + 1;
    });
    currentQuestion++;
    showQuestion();
}

function showResult() {
    quizDiv.classList.add('hidden');
    resultDiv.classList.remove('hidden');

    const maxScore = Math.max(...Object.values(scores));
    const topCats = Object.keys(scores).filter(cat => scores[cat] === maxScore);
    const winner = topCats[0]; // Победитель
    resultNameEl.textContent = cats[winner].name;
    resultImageEl.src = cats[winner].img;
}

function restartQuiz() {
    resultDiv.classList.add('hidden');
    welcomeDiv.classList.remove('hidden');
}
