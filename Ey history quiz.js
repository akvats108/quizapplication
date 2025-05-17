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
        question: "Who was the first president of the United States?",
        options: ["A) George Washington", "B) Thomas Jefferson", "C) Abraham Lincoln", "D) John Adams"],
        correct: "A) George Washington",
    },
    {
        id: "1",
        question: "What year did the Titanic sink?",
        options:["A) 1912", "B) 1920", "C) 1905", "D) 1898"],
        correct: "A) 1912",
    },
    {
        id: "2",
        question: "Who was the first man to walk on the moon?",
        options: ["A) Buzz Aldrin", "B) Neil Armstrong", "C) Yuri Gagarin", "D) Michael Collins"],
        correct: "B) Neil Armstrong",
    },
    {
        id: "3",
        question: "Which country did the United States gain independence from in 1776?",
        options: ["A) France", "B) Spain", "C) Great Britain", "D) Germany"],
        correct: "C) Great Britain",
    },
    {
        id: "4",
        question: "In which year did World War I begin?",
        options:["A) 1914", "B) 1912", "C) 1916", "D) 1918"],
        correct: "A) 1914",
    },
    {
        id: "5",
        question: "Who wrote the Declaration of Independence?",
        options:["A) George Washington", "B) Benjamin Franklin", "C) John Adams", "D) Thomas Jefferson"],
        correct:  "D) Thomas Jefferson"
    },
    {
        id: "6",
        question: "Which civilization built the pyramids in Egypt?",
        options:["A) Greeks", "B) Romans", "C) Egyptians", "D) Sumerians"],
        correct: "C) Egyptians",
    },
    {
        id: "7",
        question: "What was the name of the ship that brought the Pilgrims to America in 1620?",
        options:["A) Mayflower", "B) Nina", "C) Santa Maria", "D) Titanic"],
        correct: "A) Mayflower",
    },
    {
        id: "8",
        question: "Who was the famous queen of ancient Egypt?",
        options: ["A) Cleopatra", "B) Nefertiti", "C) Hatshepsut", "D) Isis"],
        correct: "A) Cleopatra",
    },
    {
        id: "9",
        question: "Which war was fought between the North and South regions of the United States?",
        options:["A) World War I", "B) Civil War", "C) Revolutionary War", "D) Spanish-American War"],
        correct: "B) Civil War",
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