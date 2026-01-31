// Элементы страницы
const startBtn = document.getElementById('startBtn');
const restartBtn = document.getElementById('restartBtn');
const welcomeDiv = document.getElementById('welcome');
const quizDiv = document.getElementById('quiz');
const resultDiv = document.getElementById('result');
const questionEl = document.getElementById('question');
const answersEl = document.getElementById('answers');
const resultNameEl = document.getElementById('resultName');
const resultImageEl = document.getElementById('resultImage');

// Котики с путями к твоим файлам
const cats = {
    flowers: { name: "Котик с цветами", img: "./images/desknap.jpeg" },
    newyear: { name: "Новогодний котик", img: "./images/newyear.jpeg" },
    flashlights: { name: "Котик со вспышками", img: "./images/flash.jpeg" },
    desktop: { name: "Котик на рабочем столе", img: "./images/desknap.jpeg" },
    coffeemachine: { name: "Котик-бариста", img: "./images/barista.jpeg" },
    yogamat: { name: "Котик на коврике для йоги", img: "./images/barista.jpeg" }, // если йога отдельный файл, поменяй
    tiny: { name: "Маленький котик «клопикс»", img: "./images/tiny.jpeg" }
};

// Новый набор вопросов: 4 вопроса, 4 варианта каждый
const questions = [
    {
        question: "Какой твой идеальный завтрак?",
        answers: [
            { text: "Латте и круассан ☕🥐", points: ["coffeemachine"] },
            { text: "Зелёный смузи и йога 🧘‍♀️", points: ["yogamat"] },
            { text: "Солнечные цветы на подоконнике 🌸", points: ["flowers"] },
            { text: "Ничего, хочу ещё поспать 😴", points: ["desktop"] }
        ]
    },
    {
        question: "Твой любимый стиль в соцсетях?",
        answers: [
            { text: "Праздничные сторис с гирляндами 🎄", points: ["newyear"] },
            { text: "Яркие фото с огнями и вспышками ✨", points: ["flashlights"] },
            { text: "Минимализм и уютные кадры 🐾", points: ["tiny"] },
            { text: "Кофейные flatlay и рецепты ☕", points: ["coffeemachine"] }
        ]
    },
    {
        question: "В выходной день ты предпочитаешь:",
        answers: [
            { text: "Медитация и йога 🧘‍♀️", points: ["yogamat"] },
            { text: "Прогулка среди цветов и природы 🌸", points: ["flowers"] },
            { text: "Сон и ленивый день 😴", points: ["desktop"] },
            { text: "Весёлые праздники и вечеринки 🎄", points: ["newyear"] }
        ]
    },
    {
        question: "Какое настроение описывает тебя лучше всего?",
        answers: [
            { text: "Энергичное и яркое ✨", points: ["flashlights"] },
            { text: "Маленькое и милое 🐾", points: ["tiny"] },
            { text: "Кофейное и продуктивное ☕", points: ["coffeemachine"] },
            { text: "Романтичное и цветочное 🌸", points: ["flowers"] }
        ]
    }
];

// Контрольный вопрос при ничье
const tieBreaker = {
    question: "Выбери одно настроение, которое больше всего подходит тебе:",
    answers: [
        { text: "Энергичное и яркое ✨", points: ["flashlights"] },
        { text: "Маленькое и милое 🐾", points: ["tiny"] },
        { text: "Кофейное и продуктивное ☕", points: ["coffeemachine"] },
        { text: "Романтичное и цветочное 🌸", points: ["flowers"] },
        { text: "Сонное и уютное 😴", points: ["desktop"] },
        { text: "Праздничное 🎄", points: ["newyear"] },
        { text: "Йога и медитация 🧘‍♀️", points: ["yogamat"] }
    ]
};

// Инициализация
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
    const winner = topCats[0];
    resultNameEl.textContent = cats[winner].name;
    resultImageEl.src = cats[winner].img;
}

function restartQuiz() {
    resultDiv.classList.add('hidden');
    welcomeDiv.classList.remove('hidden');
}
