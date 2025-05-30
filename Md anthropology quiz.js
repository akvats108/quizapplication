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
        question: "What is the study of human societies and cultures called?",
        options:["Biology", "Anthropology", "Sociology", "Psychology"],
        correct:"Anthropology"
    },
    {
        id: "1",
        question: "Which of the following is a subfield of anthropology?",
        options: [" Clinical Psychology", "Archaeology", "Astronomy", "Genetics"],
        correct: "Archaeology"
    },
    {
        id: "2",
        question:"Who is considered the father of modern anthropology?",
        options:["Charles Darwin", "Franz Boas", "Sigmund Freud", "Max Weber"],
        correct: "Franz Boas"
    },
    {
        id: "3",
        question: "Which is a method commonly used in cultural anthropology?",
        options:["Participant observation", "DNA analysis", "Fossil analysis", "Radiocarbon dating"],
        correct:  "Participant observation"
    },
    {
        id: "4",
        question:  "What does linguistic anthropology study?",
        options: ["Human evolution", "Language and its social uses", "Ancient artifacts", "Human migration patterns"],
        correct: "Language and its social uses"
    },
    {
        id: "5",
        question: "Which of the following is a key focus in biological anthropology?",
        options:["Human languages", "Fossils and evolutionary biology", "Social structures", "Religion"],
        correct:  "Fossils and evolutionary biology"
    },
    {
        id: "6",
        question: "What is ethnocentrism?",
        options:  ["The study of human culture", "Viewing one's own culture as superior to others", "The process of human evolution", "A type of economic system"],
        correct: "Viewing one's own culture as superior to others"
    },
    {
        id: "7",
        question:  "Which method is often used in archaeology to analyze artifacts?",
        options:["Carbon dating", "Surveying", "Genetic sequencing", "Behavioral observation"],
        correct: "Carbon dating"
    },
    {
        id: "8",
        question:  "Which of the following is a characteristic of a 'foraging' society?",
        options: ["Reliance on agriculture", "Permanent settlements", "Hunting and gathering", "Advanced technology"],
        correct:  "Hunting and gathering"
    },
    {
        id: "9",
        question: "What is the primary goal of anthropology?",
        options:  ["To study human behavior and societies", "To preserve ancient civilizations", "To understand the human brain", "To improve technology"],
        correct:  "To study human behavior and societies"
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