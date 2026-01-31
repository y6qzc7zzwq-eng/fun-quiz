// Все котики
const results = {
    flowers: { name: "Романтичный пирожок 🌸", img: "images/flowers.jpeg", score: 0 },
    newyear: { name: "Праздничная булочка 🎄", img: "images/newyear.jpeg", score: 0 },
    flash: { name: "Серьезный хлебушек 💡", img: "images/flash.jpeg", score: 0 },
    desknap: { name: "Усталый офисный пирожок 💤", img: "images/desknap.jpeg", score: 0 },
    barista: { name: "Кот-бариста ☕", img: "images/barista.jpeg", score: 0 },
    yoga: { name: "Гибкая булочка 🧘‍♂️", img: "images/yoga.jpeg", score: 0 },
    tiny: { name: "Мини-пирожок 🐾", img: "images/tiny.jpeg", score: 0 }
};

// Вопросы
const questions = [
    {
        question: "Как ты себя чувствуешь?",
        answers: [
            { text: "Романтично", scores: { flowers: 1, newyear: 1 } },
            { text: "Энергично", scores: { barista: 1, yoga: 1 } },
            { text: "Хочу спать", scores: { desknap: 1, tiny: 1 } },
            { text: "Серьезно", scores: { flash: 1 } }
        ]
    },
    {
        question: "Где бы хотел провести день?",
        answers: [
            { text: "С цветами", scores: { flowers: 1 } },
            { text: "Под елкой", scores: { newyear: 1 } },
            { text: "На работе / за компьютером", scores: { desknap: 1 } },
            { text: "На коврике для йоги", scores: { yoga: 1 } },
            { text: "Рядом с кофемашиной", scores: { barista: 1 } },
            { text: "Всё равно маленький", scores: { tiny: 1 } },
            { text: "Серьезно и ярко", scores: { flash: 1 } }
        ]
    },
    // Контрольный вопрос, чтобы выбрать одного победителя при равных очках
    {
        question: "Выбираем финального котика, какой вам ближе?",
        answers: [
            { text: "Романтичный", scores: { flowers: 1 } },
            { text: "Праздничный", scores: { newyear: 1 } },
            { text: "Серьезный", scores: { flash: 1 } },
            { text: "Усталый", scores: { desknap: 1 } },
            { text: "Бариста", scores: { barista: 1 } },
            { text: "Гибкий", scores: { yoga: 1 } },
            { text: "Мини", scores: { tiny: 1 } }
        ]
    }
];

let currentQuestion = 0;
const quizDiv = document.getElementById("quiz");
const resultDiv = document.getElementById("result");
const resultName = document.getElementById("result-name");
const resultImg = document.getElementById("result-img");
const restartBtn = document.getElementById("restart");

function showQuestion() {
    quizDiv.innerHTML = "";
    const q = questions[currentQuestion];
    const h2 = document.createElement("h2");
    h2.textContent = q.question;
    quizDiv.appendChild(h2);

    q.answers.forEach(answer => {
        const btn = document.createElement("button");
        btn.textContent = answer.text;
        btn.onclick = () => {
            // Добавляем очки
            for (let key in answer.scores) {
                results[key].score += answer.scores[key];
            }
            currentQuestion++;
            if (currentQuestion < questions.length) {
                showQuestion();
            } else {
                showResult();
            }
        };
        quizDiv.appendChild(btn);
    });
}

function showResult() {
    // Находим максимальные очки
    let maxScore = Math.max(...Object.values(results).map(r => r.score));
    let winners = Object.values(results).filter(r => r.score === maxScore);

    // Если несколько — используем контрольный вопрос (последний)
    let winner;
    if (winners.length > 1) {
        // Последний вопрос распределяет очки — берём победителя из него
        const lastQuestion = questions[questions.length -1];
        winner = winners.find(r => 
            lastQuestion.answers.some(a => a.scores[r.name.split(" ")[0].toLowerCase()])
        );
        if (!winner) winner = winners[0]; // на всякий случай
    } else {
        winner = winners[0];
    }

    quizDiv.classList.add("hidden");
    resultName.textContent = winner.name;
    resultImg.src = winner.img;
    resultDiv.classList.remove("hidden");
}

restartBtn.onclick = () => {
    for (let key in results) results[key].score = 0;
    currentQuestion = 0;
    resultDiv.classList.add("hidden");
    quizDiv.classList.remove("hidden");
    showQuestion();
}

// Старт теста
showQuestion();
