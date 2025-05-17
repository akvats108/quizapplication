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
        question: "What does HTML stand for?",
        options:["Hyper Text Markup Language", "Hyper Text Machine Language", "High Text Markup Language", "Hyper Tool Markup Language"],
        correct: "Hyper Text Markup Language"
    },
    {
        id: "1",
        question:"Which of these is a programming language?",
        options: ["HTML", "CSS", "JavaScript", "XML"],
        correct: "JavaScript"
    },
    {
        id: "2",
        question:"What is the main function of the operating system?",
        options: ["Run applications", "Manage hardware and software resources", "Provide a user interface", "Connect to the internet"],
        correct:  "Manage hardware and software resources"
    },
    {
        id: "3",
        question: "Which of these is an example of a primary key in a database?",
        options: ["ID number", "Name", "Age", "Address"],
        correct:   "ID number"
    },
    {
        id: "4",
        question:   "What is the time complexity of binary search in the worst case?",
        options:["O(1)", "O(n)", "O(log n)", "O(n^2)"],
        correct:  "O(log n)"
    },
    {
        id: "5",
        question: "Which protocol is used to send email over the internet?",
        options:  ["FTP", "HTTP", "SMTP", "POP3"],
        correct: "SMTP"
    },
    {
        id: "6",
        question:"Which data structure uses the LIFO principle?",
        options:  ["Queue", "Stack", "Array", "Linked List"],
        correct:   "Stack"
    },
    {
        id: "7",
        question: "Which of the following is an example of an object-oriented programming language?",
        options: ["C", "Java", "Fortran", "Assembly"],
        correct: "Java"
    },
    {
        id: "8",
        question:"What does the acronym CPU stand for?",
        options: ["Central Process Unit", "Central Processing Unit", "Central Processor Unit", "Central Program Unit"],
        correct:"Central Processing Unit"
    },
    {
        id: "9",
        question:  "What is the purpose of DNS in networking?",
        options: ["Translate domain names into IP addresses", "Encrypt network traffic", "Route internet traffic", "Compress data for faster transmission"],
        correct: "Translate domain names into IP addresses"
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