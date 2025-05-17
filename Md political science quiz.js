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
        question: "What is the primary function of a political party?",
        options:["To influence public policy", "To regulate the economy", "To provide social services", "To promote religious values"],
        correct: "To influence public policy"
    },
    {
        id: "1",
        question: "Which document outlines the foundational principles of the United States government?",
        options: ["The Bill of Rights", "The Magna Carta", "The Declaration of Independence", "The U.S. Constitution"],
        correct: "The U.S. Constitution"
    },
    {
        id: "2",
        question:"What is the term 'separation of powers' referring to?",
        options:  ["The division of governmental powers into three branches", "The separation between church and state", "The distribution of wealth among the population", "The division of power between local and national governments"],
        correct:"The division of governmental powers into three branches"
    },
    {
        id: "3",
        question: "Who is considered the 'father of modern political science'?",
        options: ["John Locke", "Karl Marx", "Max Weber", "Aristotle"],
        correct:  "Aristotle"
    },
    {
        id: "4",
        question:  "Which of the following is a characteristic of a democracy?",
        options:["Authoritarian rule", "Free and fair elections", "Limited civil rights", "State-controlled media"],
        correct: "Free and fair elections"
    },
    {
        id: "5",
        question:"What is a dictatorship?",
        options:  ["A form of government with elected representatives", "A form of government where power is held by a single person or group", "A system where the people rule directly", "A system with multiple political parties"],
        correct:  "A form of government where power is held by a single person or group"
    },
    {
        id: "6",
        question: "Which of the following is a role of the executive branch of government?",
        options: ["Making laws", "Interpreting laws", "Enforcing laws", "Advising on policy"],
        correct:  "Enforcing laws"
    },
    {
        id: "7",
        question:"What does the term 'checks and balances' mean in political systems?",
        options:  ["One branch of government checks the power of another", "Each branch has unlimited power", "The people check government power", "Each state has equal power in decision-making"],
        correct: "One branch of government checks the power of another"
    },
    {
        id: "8",
        question:  "What type of government is characterized by rule by a few individuals or a small group?",
        options: ["Oligarchy", "Democracy", "Monarchy", "Theocracy"],
        correct: "Oligarchy"
    },
    {
        id: "9",
        question: "Which political ideology advocates for the collective ownership of the means of production?",
        options:  ["Socialism", "Liberalism", "Conservatism", "Libertarianism"],
        correct:"Socialism"
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