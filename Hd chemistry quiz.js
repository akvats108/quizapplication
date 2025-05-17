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
        question: "Which element has the highest ionization energy?",
        options:  ["Helium", "Oxygen", "Neon", "Fluorine"],
        correct: "Helium"
    },
    {
        id: "1",
        question:  "What is the hybridization of the central atom in a methane (CH4) molecule?",
        options:  ["sp", "sp²", "sp³", "d²sp³"],
        correct: "sp³"
    },
    {
        id: "2",
        question:  "Which of the following compounds is an example of a coordination complex?",
        options: ["NaCl", "Fe(CO)₅", "H₂O", "CO₂"],
        correct: "Fe(CO)₅"
    },
    {
        id: "3",
        question:  "What is the pH of a 0.001 M solution of hydrochloric acid (HCl)?",
        options: ["1", "3", "4", "7"],
        correct:   "3"
    },
    {
        id: "4",
        question:"Which of the following is a type of intermolecular force present in water?",
        options: ["London dispersion forces", "Dipole-dipole forces", "Hydrogen bonding", "All of the above"],
        correct: "All of the above"
    },
    {
        id: "5",
        question: "What is the primary product of the reaction between an alkene and bromine in water?",
        options: ["Alcohol", "Alkyl bromide", "Bromohydrin", "Ketone"],
        correct:  "Bromohydrin"
    },
    {
        id: "6",
        question: "What is the molar volume of an ideal gas at standard temperature and pressure (STP)?",
        options: ["22.4 L", "22.4 mL", "1 L", "1 mL"],
        correct:  "22.4 L"
    },
    {
        id: "7",
        question:"What is the relationship between frequency and wavelength of a wave?",
        options: ["Oxygen", "Sodium", "Nitrogen", "Phosphorus"],
        correct: "Sodium"
    },
    {
        id: "8",
        question:  "Which of the following acids is a diprotic acid?",
        options: ["HCl", "H₂SO₄", "HNO₃", "CH₃COOH"],
        correct:  "H₂SO₄"
    },
    {
        id: "9",
        question: "What is the electronic configuration of the element with atomic number 30 (Z = 30)?",
        options: ["[Ar] 3d¹⁰ 4s²", "[Ar] 3d⁸ 4s²", "[Kr] 4d¹⁰ 5s²", "[Ar] 3d⁸ 4s² 4p²"],
        correct:  "[Ar] 3d¹⁰ 4s²"
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