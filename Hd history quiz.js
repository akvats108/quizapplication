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
        question: "Who was the first emperor of China?",
        options:  ["Qin Shi Huang", "Han Wudi", "Liu Bang", "Kangxi"],
        correct: "Qin Shi Huang"
    },
    {
        id: "1",
        question:  "Which event marked the beginning of World War I?",
        options:  ["Assassination of Archduke Franz Ferdinand", "Invasion of Poland", "Treaty of Versailles", "Bombing of Pearl Harbor"],
        correct:"Assassination of Archduke Franz Ferdinand"
    },
    {
        id: "2",
        question:   "Which empire was known for its road systems and was one of the first to establish a postal service?",
        options:  ["Roman Empire", "Persian Empire", "Mongol Empire", "Ottoman Empire"],
        correct:  "Persian Empire"
    },
    {
        id: "3",
        question:  "In which year did the French Revolution begin?",
        options:  ["1776", "1789", "1799", "1812"],
        correct:  "1789"
    },
    {
        id: "4",
        question:"What was the name of the ship that brought the Pilgrims to America in 1620?",
        options: ["The Mayflower", "The Santa Maria", "The Endeavour", "The Golden Hind"],
        correct: "The Mayflower"
    },
    {
        id: "5",
        question: "Who was the leader of the Mongol Empire at its height?",
        options:  ["Kublai Khan", "Genghis Khan", "Tamerlane", "Batu Khan"],
        correct:  "Genghis Khan"
    },
    {
        id: "6",
        question:"Which ancient civilization is credited with the creation of the first written alphabet?",
        options: ["Ancient Egyptians", "Ancient Sumerians", "Phoenicians", "Babylonians"],
        correct: "Phoenicians"
    },
    {
        id: "7",
        question: "Which event occurred in 1969, marking a major achievement in the Space Race?",
        options:["First human spaceflight", "First successful moon landing", "Launch of Sputnik 1", "First orbit of Earth by a satellite"],
        correct:"First successful moon landing"
    },
    {
        id: "8",
        question:  "Which of these leaders was part of the Axis Powers during World War II?",
        options: ["Franklin D. Roosevelt", "Winston Churchill", "Adolf Hitler", "Joseph Stalin"],
        correct:  "Adolf Hitler"
    },
    {
        id: "9",
        question: "Which treaty ended World War I and imposed heavy reparations on Germany?",
        options: ["Treaty of Paris", "Treaty of Versailles", "Treaty of Tordesillas", "Treaty of Brest-Litovsk"],
        correct: "Treaty of Versailles"
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