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
        question: "What is the basic problem addressed by economics?",
        options:["Scarcity and choice", "Government spending", "Unemployment", "Global trade"],
        correct: "Scarcity and choice"
    },
    {
        id: "1",
        question: "Which of the following is a fundamental characteristic of a market economy?",
        options: ["Centralized decision-making", "Private property rights", "Government control of resources", "Price controls on goods"],
        correct: "Private property rights"
    },
    {
        id: "2",
        question:"What does GDP stand for?",
        options:  ["Gross Domestic Product", "Gross Domestic Price", "General Domestic Product", "Gross Direct Product"],
        correct:"Gross Domestic Product"
    },
    {
        id: "3",
        question:  "Which economic theory advocates government intervention to stabilize the economy?",
        options:["Classical economics", "Keynesian economics", "Monetarism", "Supply-side economics"],
        correct:  "Keynesian economics"
    },
    {
        id: "4",
        question:  "What is the law of demand?",
        options: ["As price rises, demand rises", "As price rises, demand falls", "Demand remains constant regardless of price", "Price does not affect demand"],
        correct: "As price rises, demand falls"
    },
    {
        id: "5",
        question:"What is inflation?",
        options: ["A decrease in the overall price level", "An increase in the money supply", "A rise in the general price level", "A decrease in unemployment"],
        correct:  "A rise in the general price level"
    },
    {
        id: "6",
        question: "What does the term 'opportunity cost' refer to?",
        options: ["The cost of missed opportunities", "The next best alternative foregone when a decision is made", "The cost of production", "The cost of doing business"],
        correct:  "The next best alternative foregone when a decision is made"
    },
    {
        id: "7",
        question:"Which of the following is a primary goal of fiscal policy?",
        options: ["Reducing government debt", "Controlling inflation", "Managing unemployment", "All of the above"],
        correct: "All of the above"
    },
    {
        id: "8",
        question:  "What is a monopoly?",
        options: ["South Africa", "Australia", "New Zealand", "Philippines"],
        correct:  "Australia"
    },
    {
        id: "9",
        question: "Which desert is the largest hot desert in the world?",
        options:  ["A market with many small sellers", "A market dominated by a single seller", "A market with multiple competitors", "A market with few barriers to entry"],
        correct: "A market dominated by a single seller"
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