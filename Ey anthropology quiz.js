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
        question: "What does anthropology study?",
        options: ["A) Human culture and societies", "B) Animal behavior", "C) The study of stars", "D) The Earth's climate"],
        correct: "A) Human culture and societies",
    },
    {
        id: "1",
        question: "Who is known as the father of anthropology?",
        options: ["A) Charles Darwin", "B) Franz Boas", "C) Sigmund Freud", "D) Albert Einstein"],
        correct: "B) Franz Boas",
    },
    {
        id: "2",
        question: " What is the primary focus of cultural anthropology?",
        options: ["A) The evolution of humans", "B) Human societies and cultures", "C) Human genetics", "D) The study of fossils"],
        correct: "B) Human societies and cultures",
    },
    {
        id: "3",
        question: "What is the term for the belief that one’s own culture is",
        options: ["A) Cultural relativism", "B) Ethnocentrism", "C) Cultural diffusion", "D) Symbolic interactionism"],
        correct: "B) Ethnocentrism",
    },
    {
        id: "4",
        question: " What does archaeology primarily study?",
        options: ["A) The evolution of language", "B) The ancient remains of human civilizations", "C) The development of social structures", "D) Human DNA"],
        correct: "B) The ancient remains of human civilizations",
    },
    {
        id: "5",
        question: "Which of the following is a subfield of anthropology?",
        options: ["A) Microbiology", "B) Sociology", "C) Forensic anthropology", "D) Astronomy"],
        correct: "C) Forensic anthropology"
    }, {
        id: "6",
        question: " What is ethnography?",
        options: ["A) The study of fossils", "B) A written account of a culture", "C) The study of human evolution", "D) The study of human genetics"],
        correct: "B) A written account of a culture",
    },
    {
        id: "7",
        question: "What is the name of the early human species that walked upright and is considered one of the ancestors of modern humans?",
        options: ["A) Homo sapiens", "B) Neanderthal", "C) Homo habilis", "D) Australopithecus"],
        correct: "D) Australopithecus",
    },
    {
        id: "8",
        question: "What is the term for the study of human physical characteristics and their evolution?",
        options: ["A) Cultural anthropology", "B) Linguistic anthropology", "C) Physical anthropology", "D) Archaeology"],
        correct: "C) Physical anthropology",
    },
    {
        id: "9",
        question: "What is the major focus of linguistic anthropology?",
        options: ["A) The study of human fossils", "B) The relationship between language and culture", "C) The study of human genetics", "D) The development of early human civilizations"],
        correct: "B) The relationship between language and culture",
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