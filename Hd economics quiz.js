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
        question:  "What is the term for the total value of goods and services produced by a country's economy in a year?",
        options:  ["Gross Domestic Product (GDP)", "Consumer Price Index (CPI)", "Net National Product (NNP)", "Gross National Income (GNI)"],
        correct:  "Gross Domestic Product (GDP)"
    },
    {
        id: "1",
        question:"Which of the following is NOT a factor of production?",
        options: ["Land", "Labor", "Capital", "Profit"],
        correct: "Profit"
    },
    {
        id: "2",
        question:   "What does the Laffer Curve illustrate?",
        options:   ["The relationship between tax rates and government revenue", "The relationship between interest rates and inflation", "The relationship between supply and demand", "The relationship between income and wealth distribution"],
        correct:  "The relationship between tax rates and government revenue"
    },
    {
        id: "3",
        question: "Which economic theory advocates for government intervention to stabilize the economy?",
        options:  ["Classical economics", "Monetarism", "Keynesian economics", "Austrian economics"],
        correct: "Keynesian economics"
    },
    {
        id: "4",
        question: "Which of the following is an example of a negative externality?",
        options: ["Pollution from a factory", "Education funding", "Healthcare spending", "Public transportation"],
        correct:  "Pollution from a factory"
    },
    {
        id: "5",
        question:  "Which term describes the situation when a country can produce a good at a lower opportunity cost than another country?",
        options: ["Absolute advantage", "Comparative advantage", "Opportunity cost", "Economies of scale"],
        correct:  "Comparative advantage"
    },
    {
        id: "6",
        question:  "What is the primary goal of monetary policy?",
        options: ["To control inflation", "To increase government spending", "To redistribute wealth", "To reduce unemployment"],
        correct: "To control inflation"
    },
    {
        id: "7",
        question: "Which of the following is a characteristic of a perfectly competitive market?",
        options:["Large number of buyers and sellers", "Differentiated products", "Barriers to entry", "Single seller"],
        correct:"Large number of buyers and sellers"
    },
    {
        id: "8",
        question:   "What does the term 'inflation' refer to?",
        options:["The increase in prices over time", "The decrease in the value of money", "The reduction in unemployment", "The increase in wages"],
        correct: "The increase in prices over time"
    },
    {
        id: "9",
        question: "Which of the following is an example of a public good?",
        options:  ["National defense", "Tennis courts", "Private schools", "Healthcare services"],
        correct: "National defense"
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