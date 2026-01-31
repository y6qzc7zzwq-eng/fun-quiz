const quizDiv = document.getElementById("quiz");
const resultDiv = document.getElementById("result");
const resultName = document.getElementById("result-name");
const resultImg = document.getElementById("result-img");
const restartBtn = document.getElementById("restart");

// Минимальные котики для проверки
const results = {
    flowers: { name: "Романтичный пирожок 🌸", img: "images/flowers.jpeg", score: 0 },
    newyear: { name: "Праздничная булочка 🎄", img: "images/newyear.jpeg", score: 0 }
};

// Минимальный вопрос
const questions = [
    {
        question: "Как ты себя чувствуешь?",
        answers: [
            { text: "Романтично", scores: { flowers: 1 } },
            { text: "Празднично", scores: { newyear: 1 } }
        ]
    }
];

let currentQuestion = 0;

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
            for (let key in answer.scores) results[key].score += answer.scores[key];
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
