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
        options: ["A) Deforestation", "B) Greenhouse gas emissions", "C) Overfishing", "D) Ozone depletion"],
        correct:  "B) Greenhouse gas emissions",
    },
    {
        id: "1",
        question:"Which of the following is a renewable resource?",
        options: ["A) Coal", "B) Solar energy", "C) Natural gas", "D) Oil"],
        correct:"B) Solar energy",
    },
    {
        id: "2",
        question:  "What is the process of converting waste materials into reusable products called?",
        options: ["A) Recycling", "B) Incineration", "C) Landfilling", "D) Composting"],
        correct:  "A) Recycling",
    },
    {
        id: "3",
        question: "Which gas is primarily responsible for the depletion of the ozone layer?",
        options:  ["A) Carbon dioxide", "B) Methane", "C) Chlorofluorocarbons (CFCs)", "D) Nitrogen oxide"],
        correct:   "C) Chlorofluorocarbons (CFCs)",
    },
    {
        id: "4",
        question:   "What is the term for the variety of life in the world or in a particular habitat?",
        options:["A) Ecosystem", "B) Biodiversity", "C) Pollution", "D) Climate change"],
        correct:  "B) Biodiversity",
    },
    {
        id: "5",
        question: "Which of the following is an example of a nonrenewable resource?",
        options: ["A) Wind energy", "B) Solar power", "C) Coal", "D) Biomass"],
        correct: "C) Coal",
    },
    {
        id: "6",
        question: "What does 'sustainability' mean in environmental science?",
        options:  ["A) Reducing human activity", "B) Meeting current needs without compromising future generations", "C) Eliminating pollution", "D) Increasing the use of fossil fuels"],
        correct: "B) Meeting current needs without compromising future generations",
    },
    {
        id: "7",
        question: "Which of the following is a major source of water pollution?",
        options:  ["A) Industrial waste", "B) Solar energy", "C) Wind energy", "D) Geothermal energy"],
        correct:  "A) Industrial waste",
    },
    {
        id: "8",
        question:"What is the primary purpose of a conservation area?",
        options:["A) To protect natural habitats and species", "B) To promote industrial growth", "C) To create new residential areas", "D) To increase tourism"],
        correct:"A) To protect natural habitats and species",
    },
    {
        id: "9",
        question:"Which type of energy is produced by wind turbines?",
        options:  ["A) Solar energy", "B) Wind energy", "C) Hydroelectric energy", "D) Nuclear energy"],
        correct:  "B) Wind energy",
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