const questions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        answer: "Paris",
    },
    {
        question: "Which language is used for web development?",
        options: ["Python", "C++", "JavaScript", "Java"],
        answer: "JavaScript",
    },
    {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        answer: "4",
    },
];

let shuffledQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let timer;

function shuffleQuestions() {
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
}

function startTimer() {
    let timeLeft = 30;
    document.getElementById("time").textContent = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("time").textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            nextQuestion();
        }
    }, 1000);
}

function displayQuestion() {
    const questionData = shuffledQuestions[currentQuestionIndex];
    document.getElementById("question").textContent = questionData.question;
    const optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = "";
    questionData.options.forEach((option) => {
        const li = document.createElement("li");
        li.textContent = option;
        li.onclick = () => checkAnswer(option);
        optionsContainer.appendChild(li);
    });
}

function checkAnswer(selectedOption) {
    const correctAnswer = shuffledQuestions[currentQuestionIndex].answer;
    const feedback = document.getElementById("feedback");
    if (selectedOption === correctAnswer) {
        score++;
        feedback.textContent = "Correct!";
    } else {
        feedback.textContent = `Incorrect! The correct answer was ${correctAnswer}.`;
    }
    document.getElementById("score").textContent = score;
    clearInterval(timer);
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < shuffledQuestions.length) {
        displayQuestion();
        startTimer();
        document.getElementById("feedback").textContent = "";
    } else {
        endQuiz();
    }
}

function startQuiz() {
    shuffleQuestions();
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById("score").textContent = score;
    displayQuestion();
    startTimer();
}
function endQuiz() {
    document.getElementById("quiz-section").innerHTML = `
        <p>Quiz Over!</p>
        <button id="restart-button">Restart Quiz</button>
    `;
    document.getElementById("feedback-section").textContent = "";
    document.getElementById("restart-button").addEventListener("click", restartQuiz);
}

function restartQuiz() {
    document.getElementById("quiz-section").innerHTML = `
        <div id="timer">Time Left: <span id="time">30</span> seconds</div>
        <div id="question-container">
            <p id="question"></p>
            <ul id="options"></ul>
        </div>
        <button id="next-button">Next</button>
    `;
    document.getElementById("feedback-section").innerHTML = "<p id=\"feedback\"></p>";
    document.getElementById("next-button").addEventListener("click", nextQuestion);
    startQuiz();
}


document.getElementById("next-button").addEventListener("click", nextQuestion);

startQuiz();
