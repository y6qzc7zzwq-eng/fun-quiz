const quizDiv = document.getElementById("quiz");
const resultDiv = document.getElementById("result");
const resultName = document.getElementById("result-name");
const resultImg = document.getElementById("result-img");
const restartBtn = document.getElementById("restart");

const results = {
    flowers: { name: "Романтичный пирожок 🌸", img: "images/flowers.jpeg", score: 0 },
    newyear: { name: "Праздничная булочка 🎄", img: "images/newyear.jpeg", score: 0 }
};

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
    let maxScore = Math.max(...Object.values(results).map(r => r.score));
    let winner = Object.values(results).find(r => r.score === maxScore);

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

// Запуск теста
quizDiv.classList.remove("hidden");
showQuestion();
