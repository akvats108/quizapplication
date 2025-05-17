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
        question: "What is the primary function of the legislature?",
        options: ["A) Enforcing laws", "B) Creating laws", "C) Interpreting laws", "D) Administering laws"],
        correct:  "B) Creating laws",
    },
    {
        id: "1",
        question: "Who is known as the 'Father of Politics'?",
        options:["A) Plato", "B) Aristotle", "C) Socrates", "D) Confucius"],
        correct:"B) Aristotle",
    },
    {
        id: "2",
        question: "Which of the following is a form of government where citizens elect representatives to make decisions on their behalf?",
        options: ["A) Direct democracy", "B) Oligarchy", "C) Representative democracy", "D) Monarchy"],
        correct: "C) Representative democracy",
    },
    {
        id: "3",
        question: "What is the supreme law of the United States?",
        options:   ["A) The Declaration of Independence", "B) The Bill of Rights", "C) The U.S. Constitution", "D) The Preamble"],
        correct:  "C) The U.S. Constitution",
    },
    {
        id: "4",
        question:  "What is the term length for a U.S. senator?",
        options:["A) 2 years", "B) 4 years", "C) 6 years", "D) 8 years"],
        correct: "C) 6 years",
    },
    {
        id: "5",
        question: "What is the main role of the executive branch in the United States?",
        options: ["A) Making laws", "B) Interpreting laws", "C) Enforcing laws", "D) Approving laws"],
        correct: "C) Enforcing laws",
    },
    {
        id: "6",
        question:  "Who is the head of state in a parliamentary democracy?",
        options: ["A) President", "B) Prime Minister", "C) Monarch", "D) Governor"],
        correct:  "B) Prime Minister"
    },
    {
        id: "7",
        question: "What is the term used for the separation of powers in a democracy?",
        options:["A) Totalitarianism", "B) Federalism", "C) Checks and balances", "D) Authoritarianism"],
        correct: "C) Checks and balances"
,
    },
    {
        id: "8",
        question:"Which of these is an example of a political party?",
        options:["A) Amnesty International", "B) United Nations", "C) Republican Party", "D) World Bank"],
        correct:"C) Republican Party",
    },
    {
        id: "9",
        question:"What is a constitution?",
        options: ["A) A law passed by the parliament", "B) A document outlining the basic laws and principles of a government", "C) A treaty between nations", "D) A declaration of independence"],
        correct:  "B) A document outlining the basic laws and principles of a government",
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