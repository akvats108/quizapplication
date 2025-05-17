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
        question: "What is the main cause of global warming?",
        options: ["Deforestation", "Greenhouse gas emissions", "Volcanic eruptions", "Ozone layer depletion"],
        correct: "Greenhouse gas emissions"
    },
    {
        id: "1",
        question: "Which of the following is a renewable energy source?",
        options: ["Coal", "Natural gas", "Wind", "Nuclear"],
        correct: "Wind"
    },
    {
        id: "2",
        question:"Which gas is primarily responsible for the greenhouse effect?",
        options:  ["Oxygen", "Carbon dioxide", "Nitrogen", "Methane"],
        correct:"Carbon dioxide"
    },
    {
        id: "3",
        question:  "What does the term 'biodiversity' refer to?",
        options: ["The number of species in an ecosystem", "The genetic diversity of a species", "The variety of life forms in a given area", "The adaptation of species to their environment"],
        correct:   "The variety of life forms in a given area"
    },
    {
        id: "4",
        question:   "Which of these activities contributes most to air pollution?",
        options: ["Planting trees", "Recycling waste", "Burning fossil fuels", "Using electric vehicles"],
        correct: "Burning fossil fuels"
    },
    {
        id: "5",
        question:"What is the primary source of water pollution in oceans?",
        options:  ["Plastic waste", "Oil spills", "Chemical runoff", "All of the above"],
        correct:  "All of the above"
    },
    {
        id: "6",
        question:  "Which of the following is a consequence of deforestation?",
        options: ["Loss of biodiversity", "Increase in oxygen levels", "Soil erosion", "All of the above"],
        correct:  "Loss of biodiversity"
    },
    {
        id: "7",
        question: "What is an example of a non-renewable resource?",
        options:   ["Solar energy", "Wind energy", "Natural gas", "Geothermal energy"],
        correct: "Natural gas"
    },
    {
        id: "8",
        question:   "What does 'sustainable development' focus on?",
        options: ["Economic growth", "Environmental protection", "Social equity", "All of the above"],
        correct: "All of the above"
    },
    {
        id: "9",
        question: "Which of the following is NOT a type of pollution?",
        options:  ["Air pollution", "Water pollution", "Light pollution", "Photosynthesis"],
        correct:"Photosynthesis"
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