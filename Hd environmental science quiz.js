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
        question:"What is the primary greenhouse gas responsible for global warming?",
        options:  ["Oxygen", "Carbon Dioxide", "Methane", "Nitrous Oxide"],
        correct:  "Carbon Dioxide"
    },
    {
        id: "1",
        question: "Which of the following is a non-renewable resource?",
        options:  ["Solar energy", "Wind energy", "Coal", "Geothermal energy"],
        correct:"Coal"
    },
    {
        id: "2",
        question:   "What is the main cause of ocean acidification?",
        options:  ["Increased sulfur emissions", "Increased carbon dioxide in the atmosphere", "Overfishing", "Plastic pollution"],
        correct:  "Increased carbon dioxide in the atmosphere"
    },
    {
        id: "3",
        question: "Which ecosystem is known for having the highest biodiversity?",
        options:   ["Desert", "Tundra", "Tropical Rainforest", "Savannah"],
        correct: "Tropical Rainforest"
    },
    {
        id: "4",
        question: "Which of the following is an example of a primary pollutant?",
        options:  ["Ozone", "Carbon monoxide", "Smog", "Acid rain"],
        correct:  "Carbon monoxide"
    },
    {
        id: "5",
        question: "What does the term 'biodiversity' refer to?",
        options:  ["The variety of ecosystems in a region", "The variety of genes in an ecosystem", "The variety of species in an ecosystem", "The variety of food chains in an ecosystem"],
        correct: "The variety of species in an ecosystem"
    },
    {
        id: "6",
        question: "Which international agreement aims to reduce carbon emissions and limit global warming?",
        options:  ["Kyoto Protocol", "Paris Agreement", "Montreal Protocol", "Copenhagen Accord"],
        correct: "Paris Agreement"
    },
    {
        id: "7",
        question:"Which of the following is NOT a consequence of deforestation?",
        options:  ["Loss of biodiversity", "Increased carbon sequestration", "Soil erosion", "Disruption of water cycles"],
        correct:"Increased carbon sequestration"
    },
    {
        id: "8",
        question:  "What is the largest source of freshwater on Earth?",
        options: ["Rivers", "Lakes", "Glaciers and ice caps", "Underground aquifers"],
        correct:  "Glaciers and ice caps"
    },
    {
        id: "9",
        question: "What is the term used for the process by which plants convert sunlight into chemical energy?",
        options: ["Respiration", "Transpiration", "Photosynthesis", "Fermentation"],
        correct: "Photosynthesis"
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