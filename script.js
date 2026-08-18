const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbxQNCn0iiwJHWpjHGx7HG_CP2Amp3gEGREHOKc9-vC2Wikg3XvmVeu7GJiiZY-bExLO/exec";

let scoreSubmitted = false;

function submitScoreToSheet() {

    if (scoreSubmitted) {
        return;
    }

    let studentName = document.getElementById("studentName").value.trim();

    if (studentName === "") {
        studentName = "Unknown";
    }

    let total = questions.length;
    let percentage = Math.round((score / total) * 100);

    let data = {
        studentName: studentName,
        quiz: "Animals Quiz",
        score: score,
        total: total,
        percentage: percentage
    };

    fetch(GOOGLE_SHEET_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
            "Content-Type": "text/plain;charset=utf-8"
        },
        body: JSON.stringify(data)
    });

    scoreSubmitted = true;
}
function correctSound() {
    let audio = new AudioContext();
    let oscillator = audio.createOscillator();
    let gain = audio.createGain();

    oscillator.frequency.value = 800;
    oscillator.type = "sine";

    gain.gain.value = 0.2;

    oscillator.connect(gain);
    gain.connect(audio.destination);

    oscillator.start();

    setTimeout(function() {
        oscillator.stop();
    }, 200);
}


function wrongSound() {
    let audio = new AudioContext();
    let oscillator = audio.createOscillator();
    let gain = audio.createGain();

    oscillator.frequency.value = 200;
    oscillator.type = "sawtooth";

    gain.gain.value = 0.15;

    oscillator.connect(gain);
    gain.connect(audio.destination);

    oscillator.start();

    setTimeout(function() {
        oscillator.stop();
    }, 300);
}

let questions = [
    {
        question: "Which animal is this?",
        image: "images/elephant.png",
        options: ["Elephant", "Lion", "Tiger", "Horse"],
        answer: "Elephant"
    },

    {
        question: "Which animal has a big mane?",
        image: "images/lion.png",
        options: ["Dog", "Lion", "Cow", "Cat"],
        answer: "Lion"
    },

    {
        question: "Which animal has black stripes?",
        image: "images/tiger.png",
        options: ["Tiger", "Cat", "Horse", "Dog"],
        answer: "Tiger"
    },

    {
        question: "Which animal says meow?",
        image: "images/cat.png",
        options: ["Cat", "Dog", "Cow", "Lion"],
        answer: "Cat"
    },
    {
    question: "Which animal gives us milk?",
    image: "images/cow.png",
    options: ["Cow", "Lion", "Tiger", "Horse"],
    answer: "Cow"
}
];
let answeredQuestions = [];
answeredQuestions = new Array(questions.length).fill(false);
let score = 0;
let questionNumber = 1;


function checkAnswer(buttonNumber) {

    if (answeredQuestions[questionNumber - 1] === true) {
        return;
    }

    answeredQuestions[questionNumber - 1] = true;

    let currentQuestion = questions[questionNumber - 1];

    let selectedAnswer =
        currentQuestion.options[buttonNumber - 1];

    if (selectedAnswer === currentQuestion.answer) {

        score = score + 1;

        correctSound();

        let result = document.getElementById("result");

result.innerHTML = "✅ 🥳🎉 Correct!";

result.classList.remove("wrong-animation");
result.classList.remove("correct-animation");

void result.offsetWidth;

result.classList.add("correct-animation");

    } else {

        wrongSound();

        let result = document.getElementById("result");

result.innerHTML = "❌ 😅 Try again!";

result.classList.remove("correct-animation");
result.classList.remove("wrong-animation");

void result.offsetWidth;

result.classList.add("wrong-animation");
    }

    document.getElementById("score").innerHTML =
        "Score: " + score;
}
document.getElementById("elephantBtn").onclick = function() {
    checkAnswer(1);
};

document.getElementById("lionBtn").onclick = function() {
    checkAnswer(2);
};

document.getElementById("tigerBtn").onclick = function() {
    checkAnswer(3);
};
document.getElementById("fourthBtn").onclick = function() {
    checkAnswer(4);
};

// Next Question
document.getElementById("nextBtn").onclick = function() {

    if (questionNumber < questions.length) {

        questionNumber = questionNumber + 1;

        showQuestion();

    } else {

        showQuizCompleted();

    }
};


// Previous Question
document.getElementById("prevBtn").onclick = function() {

    if (questionNumber > 1) {

        questionNumber = questionNumber - 1;

        showQuestion();
    }
};


// Show question
function showQuestion() {

    let currentQuestion = questions[questionNumber - 1];

    document.getElementById("question").innerHTML =
        currentQuestion.question;

    document.getElementById("questionNumber").innerHTML =
        "Question " + questionNumber + " of " + questions.length;

    document.getElementById("animalImage").src =
        currentQuestion.image;

    document.getElementById("elephantBtn").innerHTML =
        currentQuestion.options[0];

    document.getElementById("lionBtn").innerHTML =
        currentQuestion.options[1];

    document.getElementById("tigerBtn").innerHTML =
        currentQuestion.options[2];
	document.getElementById("fourthBtn").innerHTML =
    currentQuestion.options[3];

    document.getElementById("result").innerHTML = "";

    document.getElementById("score").innerHTML =
        "Score: " + score;
    let progress =
    (questionNumber / questions.length) * 100;

    document.getElementById("progressBar").style.width =
    progress + "%";
}
function showQuizCompleted() {
	submitScoreToSheet();
    document.getElementById("score").style.display = "none";
    let result = document.getElementById("result");

result.innerHTML =
        "🎉 Quiz Completed! 🎉<br><br>" +
        "⭐ Your Score ⭐<br><br>" +
        score + " / " + questions.length;

result.classList.remove("completed-animation");

void result.offsetWidth;

result.classList.add("completed-animation");

    document.getElementById("question").style.display = "none";
document.getElementById("animalImage").style.display = "none";

document.getElementById("elephantBtn").style.display = "none";
document.getElementById("lionBtn").style.display = "none";
document.getElementById("tigerBtn").style.display = "none";
document.getElementById("fourthBtn").style.display = "none";

document.getElementById("progressContainer").style.display = "none";

    document.getElementById("questionNumber").innerHTML =
        "🎉 Quiz Completed!";

    document.getElementById("animalImage").style.display =
        "none";

    document.getElementById("elephantBtn").style.display =
        "none";

    document.getElementById("lionBtn").style.display =
        "none";

    document.getElementById("tigerBtn").style.display =
        "none";

    document.getElementById("fourthBtn").style.display =
        "none";

    let message = "";

if (score === questions.length) {
    message = "🏆 Excellent! Perfect Score! Amazing! 🎉";
}
else if (score >= questions.length * 0.75) {
    message = "🌟 Great Job! 😊";
}
else if (score >= questions.length * 0.5) {
    message = "👍 Good Try! Keep Learning!";
}
else {
    message = "💪 Keep Practicing! You Can Do It!";
}

document.getElementById("result").innerHTML =
    "Your Score<br><br>" +
    "⭐ " + score + " / " + questions.length + " ⭐" +
    "<br><br>" +
    message;

    document.getElementById("nextBtn").style.display =
        "none";

    document.getElementById("prevBtn").style.display =
        "none";

    document.getElementById("restartBtn").style.display =
    "inline-block";
}
document.getElementById("restartBtn").onclick = function() {
   scoreSubmitted = false;
    score = 0;
    questionNumber = 1;

    answeredQuestions =
        new Array(questions.length).fill(false);

    document.getElementById("animalImage").style.display =
        "block";

    document.getElementById("elephantBtn").style.display =
        "inline-block";

    document.getElementById("lionBtn").style.display =
        "inline-block";

    document.getElementById("tigerBtn").style.display =
        "inline-block";

    document.getElementById("fourthBtn").style.display =
        "inline-block";

    document.getElementById("nextBtn").style.display =
        "inline-block";

    document.getElementById("prevBtn").style.display =
        "inline-block";

    document.getElementById("restartBtn").style.display =
        "none";
    document.getElementById("question").style.display = "flex";
document.getElementById("animalImage").style.display = "block";

document.getElementById("elephantBtn").style.display = "inline-block";
document.getElementById("lionBtn").style.display = "inline-block";
document.getElementById("tigerBtn").style.display = "inline-block";
document.getElementById("fourthBtn").style.display = "inline-block";

document.getElementById("progressContainer").style.display = "block";
document.getElementById("score").style.display = "block";
    showQuestion();
};
// ================================
// PAID STUDENT ACCESS CHECK
// ================================

const startQuizBtn = document.getElementById("startQuizBtn");

startQuizBtn.onclick = function () {

    const studentName =
        document.getElementById("studentName").value.trim();

    const studentEmail =
        document.getElementById("studentEmail").value.trim();

    const accessMessage =
        document.getElementById("accessMessage");

    if (studentName === "") {
        accessMessage.innerHTML =
            "⚠️ Please enter your name.";
        return;
    }

    if (studentEmail === "") {
        accessMessage.innerHTML =
            "⚠️ Please enter your email ID.";
        return;
    }

    accessMessage.innerHTML =
        "⏳ Checking your access...";

    const url =
        GOOGLE_SHEET_URL +
        "?email=" +
        encodeURIComponent(studentEmail) +
        "&name=" +
        encodeURIComponent(studentName);

    fetch(url)
        .then(response => response.json())
        .then(data => {

            if (data.allowed === true) {

                accessMessage.innerHTML =
                    "✅ Welcome " + data.studentName + "!";

                document.getElementById("accessSection").style.display =
                    "none";

                document.getElementById("quizSection").style.display =
                    "block";

                // Start the quiz
                questionNumber = 1;
                score = 0;

                answeredQuestions =
                    new Array(questions.length).fill(false);

                showQuestion();

            } else {

                accessMessage.innerHTML =
                    "❌ " + data.message;

            }

        })
        .catch(error => {

            console.error(error);

            accessMessage.innerHTML =
                "❌ Unable to check access. Please try again.";

        });
};
