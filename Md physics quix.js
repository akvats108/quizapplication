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
        question:"What is the unit of force?",
        options:["Joule", "Newton", "Watt", "Pascal"],
        correct: "Newton"
    },
    {
        id: "1",
        question:"Which law states that force equals mass times acceleration?",
        options:  ["Newton's First Law", "Newton's Second Law", "Newton's Third Law", "Kepler's Law"],
        correct: "Newton's Second Law"
    },
    {
        id: "2",
        question:"What is the speed of light in a vacuum?",
        options:["300,000 km/s", "150,000 km/s", "500,000 km/s", "1,000,000 km/s"],
        correct: "300,000 km/s"
    },
    {
        id: "3",
        question:"What type of energy is stored in a compressed spring?",
        options: ["Kinetic Energy", "Elastic Potential Energy", "Gravitational Potential Energy", "Chemical Energy"],
        correct:   "Elastic Potential Energy"
    },
    {
        id: "4",
        question:   "What is the force that causes objects to fall towards the Earth?",
        options:["Magnetic Force", "Electrostatic Force", "Gravitational Force", "Frictional Force"],
        correct:  "Gravitational Force"
    },
    {
        id: "5",
        question: "What is the formula for calculating work?",
        options:["Work = Force x Distance", "Work = Mass x Velocity", "Work = Power x Time", "Work = Force x Time"],
        correct:  "Work = Force x Distance"
    },
    {
        id: "6",
        question:  "Which of the following is not a form of energy?",
        options: ["Heat", "Light", "Mass", "Kinetic"],
        correct: "Mass"
    },
    {
        id: "7",
        question:  "In which type of material does light travel the fastest?",
        options: ["Water", "Air", "Glass", "Diamond"],
        correct: "Air"
    },
    {
        id: "8",
        question: "What is the formula for calculating gravitational potential energy?",
        options: ["PE = mgh", "PE = 1/2 mv^2", "PE = Fd", "PE = m/a"],
        correct: "PE = mgh"
    },
    {
        id: "9",
        question:  "What is the SI unit of electric current?",
        options: ["Ampere", "Volt", "Ohm", "Watt"],
        correct:   "Ampere"
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