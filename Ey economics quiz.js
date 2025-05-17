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
        question: "What is the basic economic problem?",
        options:  ["A) Unemployment", "B) Scarcity", "C) Inflation", "D) Pollution"],
        correct:  "B) Scarcity",
    },
    {
        id: "1",
        question: "Which of the following is a factor of production?",
        options:["A) Capital", "B) Money", "C) Stocks", "D) Debt"],
        correct: "A) Capital",
    },
    {
        id: "2",
        question: "What is GDP an acronym for?",
        options: ["A) General Domestic Product", "B) Gross Domestic Product", "C) Global Domestic Product", "D) Global Development Product"],
        correct: "B) Gross Domestic Product",
    },
    {
        id: "3",
        question: "Which of the following is considered a microeconomic issue?",
        options:   ["A) National unemployment rate", "B) Supply and demand for a product", "C) Global inflation rates", "D) Trade balance between countries"],
        correct:  "B) Supply and demand for a product",
    },
    {
        id: "4",
        question:  "Which of these is a type of market structure?",
        options:["A) Monopoly", "B) Fiscal policy", "C) Taxation", "D) Budgeting"],
        correct: "A) Monopoly",
    },
    {
        id: "5",
        question: "Which of the following is an example of a public good?",
        options:["A) Clean air", "B) Private property", "C) Cars", "D) Fast food"],
        correct:  "A) Clean air",
    },
    {
        id: "6",
        question: "What is inflation?",
        options: ["A) A decrease in the price level", "B) An increase in the price level", "C) A type of taxation", "D) The difference between exports and imports"],
        correct:  "B) An increase in the price level",
    },
    {
        id: "7",
        question: "Which of the following is a function of money?",
        options:["A) Store of value", "B) Medium of exchange", "C) Unit of account", "D) All of the above"],
        correct: "D) All of the above",
    },
    {
        id: "8",
        question:"Which of the following best defines 'opportunity cost'?",
        options:["A) The value of the best alternative you give up when making a choice", "B) The amount of money you spend on something", "C) The price of a good or service", "D) The total cost of producing something"],
        correct:"A) The value of the best alternative you give up when making a choice",
    },
    {
        id: "9",
        question:"What is the law of supply?",
        options: ["A) As price decreases, supply decreases", "B) As price increases, supply increases", "C) Supply is always fixed", "D) Supply is independent of price"],
        correct:  "B) As price increases, supply increases"
        ,
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