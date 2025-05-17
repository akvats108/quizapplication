//References
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;

//Questions and Options array

const quizArray = [
    {
        id: "0",
        question:"What is the powerhouse of the cell?",
        options:  ["Nucleus", "Mitochondria", "Endoplasmic Reticulum", "Golgi Apparatus"],
        correct:  "Mitochondria"
    },
    {
        id: "1",
        question: "Which organ system is responsible for transporting oxygen throughout the body?",
        options:  ["Digestive system", "Circulatory system", "Respiratory system", "Nervous system"],
        correct: "Circulatory system"
    },
    {
        id: "2",
        question:  "What molecule carries genetic information in cells?",
        options:   ["RNA", "DNA", "Protein", "Carbohydrate"],
        correct: "DNA"
    },
    {
        id: "3",
        question:  "Which of the following is not a function of the lymphatic system?",
        options: ["Transporting lymph", "Defending against disease", "Regulating body temperature", "Absorbing fats"],
        correct:    "Regulating body temperature"
    },
    {
        id: "4",
        question: "What is the primary function of white blood cells?",
        options:  ["Oxygen transport", "Fighting infections", "Nutrient absorption", "Muscle contraction"],
        correct:  "Fighting infections"
    },
    {
        id: "5",
        question: "Which of the following enzymes is involved in the breakdown of starch?",
        options: ["Amylase", "Lipase", "Pepsin", "Lactase"],
        correct:    "Amylase"
    },
    {
        id: "6",
        question:   "Which phase of mitosis involves the lining up of chromosomes at the cell's equator?",
        options:["Prophase", "Metaphase", "Anaphase", "Telophase"],
        correct:  "Metaphase"
    },
    {
        id: "7",
        question: "What is the name of the process by which plants make their own food using sunlight?",
        options:  ["Respiration", "Transpiration", "Photosynthesis", "Fermentation"],
        correct:"Photosynthesis"
    },
    {
        id: "8",
        question:  "Which molecule is considered the energy currency of the cell?",
        options:  ["ATP", "Glucose", "NADPH", "FADH2"],
        correct: "ATP"
    },
    {
        id: "9",
        question: "Which of the following is not a part of the human brain?",
        options: ["Cerebellum", "Medulla Oblongata", "Pituitary gland", "Thyroid gland"],
        correct:  "Thyroid gland"
    },
];

//Restart Quiz
restart.addEventListener("click", () => {
    initial();
    displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
});

//Next Button
nextBtn.addEventListener(
    "click",
    (displayNext = () => {
        //increment questionCount
        questionCount += 1;
        //if last question
        if (questionCount == quizArray.length) {
            //hide question container and display score
            displayContainer.classList.add("hide");
            scoreContainer.classList.remove("hide");
            //user score
            userScore.innerHTML =
                "Your score is " + scoreCount + " out of " + questionCount;
        }
        else {
            //display questionCount
            countOfQuestion.innerHTML =
                questionCount + 1 + " of " + quizArray.length + " Question";
            //display quiz
            quizDisplay(questionCount);
            count = 11;
            clearInterval(countdown);
            timerDisplay();
        }
    })
);

//Timer
const timerDisplay = () => {
    countdown = setInterval(() => {
        count--;
        timeLeft.innerHTML = `${count}s`;
        if (count == 0) {
            clearInterval(countdown);
            displayNext();
        }
    }, 1000);
};

//Display quiz
const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container-mid");
    //Hide other cards
    quizCards.forEach((card) => {
        card.classList.add("hide");
    });
    //display current question card
    quizCards[questionCount].classList.remove("hide");
};

//Quiz Creation
function quizCreator() {
    //randomly sort questions
    quizArray.sort(() => Math.random() - 0.5);
    //generate quiz
    for (let i of quizArray) {
        //randomly sort options
        i.options.sort(() => Math.random() - 0.5);
        //quiz card creation
        let div = document.createElement("div");
        div.classList.add("container-mid", "hide");
        //question number
        countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
        //question
        let question_DIV = document.createElement("p");
        question_DIV.classList.add("question");
        question_DIV.innerHTML = i.question;
        div.appendChild(question_DIV);
        //options
        div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
        quizContainer.appendChild(div);
    }
}

//Checker Function to check if option is correct or not
function checker(userOption) {
    let userSolution = userOption.innerText;
    let question =
        document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");

    //if user clicked answer == correct option stored in object
    if (userSolution === quizArray[questionCount].correct) {
        userOption.classList.add("correct");
        scoreCount++;
    } else {
        userOption.classList.add("incorrect");
        //For marking the correct option
        options.forEach((element) => {
            if (element.innerText == quizArray[questionCount].correct) {
                element.classList.add("correct");
            }
        });
    }

    //clear interval(stop timer)
    clearInterval(countdown);
    //disable all options
    options.forEach((element) => {
        element.disabled = true;
    });
}

//initial setup
function initial() {
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    count = 11;
    clearInterval(countdown);
    timerDisplay();
    quizCreator();
    quizDisplay(questionCount);
}

//when user click on start button
startButton.addEventListener("click", () => {
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    initial();
});

//hide quiz and display start screen
window.onload = () => {
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
};