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
        question: "What is the unit of electric current?",
        options:  ["Volt", "Ampere", "Ohm", "Coulomb"],
        correct: "Ampere"
    },
    {
        id: "1",
        question:  "Which of the following is a scalar quantity?",
        options:   ["Velocity", "Force", "Temperature", "Displacement"],
        correct: "Temperature"
    },
    {
        id: "2",
        question:  "What is the law that states that the total energy of an isolated system remains constant?",
        options: ["Newton's First Law", "Conservation of Energy", "Hooke's Law", "Boyle's Law"],
        correct: "Conservation of Energy"
    },
    {
        id: "3",
        question:  "Which type of wave does not require a medium to travel?",
        options: ["Sound wave", "Mechanical wave", "Electromagnetic wave", "Water wave"],
        correct:   "Electromagnetic wave"
    },
    {
        id: "4",
        question: "In which of the following scenarios does the object have the greatest kinetic energy?",
        options: ["At rest", "At maximum height in projectile motion", "At the lowest point in free fall", "At maximum speed"],
        correct: "At maximum speed"
    },
    {
        id: "5",
        question: "What is the value of the universal gravitational constant (G)?",
        options: ["6.67 × 10^-11 N·m²/kg²", "9.81 m/s²", "3.00 × 10^8 m/s", "1.60 × 10^-19 C"],
        correct:   "6.67 × 10^-11 N·m²/kg²"
    },
    {
        id: "6",
        question: "Which of the following particles has no charge?",
        options: ["Proton", "Neutron", "Electron", "Positron"],
        correct:  "Neutron"
    },
    {
        id: "7",
        question:"What is the relationship between frequency and wavelength of a wave?",
        options: ["Frequency = Wavelength × Speed", "Frequency = Speed / Wavelength", "Frequency = Wavelength × Time", "Frequency = Wavelength × Amplitude"],
        correct:"Frequency = Speed / Wavelength"
    },
    {
        id: "8",
        question:  "What does the second law of thermodynamics state?",
        options: ["Energy cannot be created or destroyed", "Entropy of an isolated system always increases", "Energy is always conserved", "Heat cannot flow from a cold body to a hot body"],
        correct:  "Entropy of an isolated system always increases"
    },
    {
        id: "9",
        question: "What is the effect of a magnetic field on a moving charged particle?",
        options: ["It accelerates the particle", "It decelerates the particle", "It deflects the particle", "It changes the particle's charge"],
        correct: "It deflects the particle"

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