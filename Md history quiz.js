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
        question: "Who was the first President of the United States?",
        options:["George Washington", "Thomas Jefferson", "Abraham Lincoln", "John Adams"],
        correct:"George Washington"
    },
    {
        id: "1",
        question: "In which year did the Titanic sink?",
        options: ["1912", "1905", "1920", "1898"],
        correct: "1912"
    },
    {
        id: "2",
        question:"Who was the leader of the Soviet Union during World War II?",
        options: ["Joseph Stalin", "Vladimir Lenin", "Nikita Khrushchev", "Leon Trotsky"],
        correct:"Joseph Stalin"
    },
    {
        id: "3",
        question: "What event sparked the start of World War I?",
        options:["The assassination of Archduke Franz Ferdinand", "The invasion of Poland", "The bombing of Pearl Harbor", "The attack on Fort Sumter"],
        correct:   "The assassination of Archduke Franz Ferdinand"
    },
    {
        id: "4",
        question:  "Which ancient civilization built the pyramids?",
        options: ["The Romans", "The Greeks", "The Egyptians", "The Babylonians"],
        correct: "The Egyptians"
    },
    {
        id: "5",
        question:"Who discovered the Americas in 1492?",
        options:["Christopher Columbus", "Vasco da Gama", "Marco Polo", "Ferdinand Magellan"],
        correct:   "Christopher Columbus"
    },
    {
        id: "6",
        question:"In which year did the Berlin Wall fall?",
        options: ["1989", "1972", "1995", "1961"],
        correct: "1989"
    },
    {
        id: "7",
        question: "Who was the British Prime Minister during World War II?",
        options: ["Winston Churchill", "Neville Chamberlain", "Margaret Thatcher", "Tony Blair"],
        correct: "Winston Churchill"
    },
    {
        id: "8",
        question:  "The Magna Carta was signed in which country?",
        options: ["France", "England", "Germany", "Italy"],
        correct:  "England"
    },
    {
        id: "9",
        question: "What year did the American Civil War end?",
        options:  ["1865", "1776", "1812", "1850"],
        correct: "1865"
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