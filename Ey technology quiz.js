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
        question: "What does 'HTTP' stand for?",
        options:["A) Hyper Text Transfer Protocol", "B) High Transfer Text Protocol", "C) Hyper Tool Transfer Protocol", "D) Hyperlink Text Transfer Protocol"],
        correct:  "A) Hyper Text Transfer Protocol",
    },
    {
        id: "1",
        question:"Which company developed the iPhone?",
        options: ["A) Microsoft", "B) Samsung", "C) Apple", "D) Google"],
        correct:"C) Apple",
    },
    {
        id: "2",
        question: "What is the primary function of a CPU?",
        options: ["A) To store data", "B) To execute instructions", "C) To display graphics", "D) To manage networks"],
        correct: "B) To execute instructions",
    },
    {
        id: "3",
        question: "Which of the following is an operating system?",
        options:    ["A) Google", "B) Windows", "C) Java", "D) HTML"],
        correct:   "B) Windows",
    },
    {
        id: "4",
        question:   "Which language is primarily used for web development?",
        options:["A) Python", "B) Java", "C) HTML", "D) C++"],
        correct: "C) HTML",
    },
    {
        id: "5",
        question: "What does 'URL' stand for?",
        options: ["A) Universal Resource Locator", "B) Uniform Resource Locator", "C) Universal Retrieval Locator", "D) Uniform Retrieval Locator"],
        correct: "B) Uniform Resource Locator",
    },
    {
        id: "6",
        question: "What is the term used for a network of computers connected to share resources?",
        options: ["A) Cloud", "B) Internet", "C) LAN", "D) VPN"],
        correct: "C) LAN",
    },
    {
        id: "7",
        question: "What does 'Wi-Fi' stand for?",
        options: ["A) Wireless Fidelity", "B) Wide Fidelity", "C) Wireless Frequency", "D) Wide Frequency"],
        correct: "A) Wireless Fidelity",
    },
    {
        id: "8",
        question:"What is the name of the first artificial Earth satellite?",
        options:["A) Apollo 11", "B) Sputnik 1", "C) Hubble", "D) Voyager 1"],
        correct:"B) Sputnik 1",
    },
    {
        id: "9",
        question: "Which company is known for developing the Android operating system?",
        options: ["A) Apple", "B) Google", "C) Microsoft", "D) IBM"],
        correct:  "B) Google"
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