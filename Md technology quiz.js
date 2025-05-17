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
        question: "Which company developed the first personal computer?",
        options: ["IBM", "Microsoft", "Apple", "Compaq"],
        correct: "Apple"
    },
    {
        id: "1",
        question: "What does HTTP stand for?",
        options: ["HyperText Transfer Protocol", "High-Tech Transfer Protocol", "Hyper Transfer Text Protocol", "HyperText Technology Protocol"],
        correct: "HyperText Transfer Protocol"
    },
    {
        id: "2",
        question:"Which of these is a programming language?",
        options:   ["HTML", "CSS", "JavaScript", "SQL"],
        correct:"JavaScript"
    },
    {
        id: "3",
        question: "What year was the World Wide Web introduced to the public?",
        options: ["1990", "1995", "2000", "1985"],
        correct:  "1990"
    },
    {
        id: "4",
        question:  "What is the primary function of an operating system?",
        options:["To run applications", "To manage hardware resources", "To design graphics", "To connect to the internet"],
        correct: "To manage hardware resources"
    },
    {
        id: "5",
        question:"Which of these technologies is used to create virtual reality?",
        options: ["Augmented Reality", "Google Glass", "Oculus Rift", "Smartphones"],
        correct:  "Oculus Rift"
    },
    {
        id: "6",
        question:  "What does the acronym 'AI' stand for in technology?",
        options: ["Artificial Intelligence", "Automated Interface", "Advanced Integration", "Adaptive Innovation"],
        correct:  "Artificial Intelligence"
    },
    {
        id: "7",
        question: "Which programming language was created by Guido van Rossum?",
        options:  ["Python", "Java", "Ruby", "C++"],
        correct:  "Python"
    },
    {
        id: "8",
        question:  "Which company developed the Android operating system?",
        options:  ["Apple", "Google", "Microsoft", "Samsung"],
        correct: "Google"
    },
    {
        id: "9",
        question: "What does the term 'cloud computing' refer to?",
        options:  ["Storing data on physical servers", "Processing data using a supercomputer", "Storing and accessing data over the internet", "Creating virtual machines for testing"],
        correct:"Storing and accessing data over the internet"
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