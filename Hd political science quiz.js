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
        question: "Which political theory advocates for the abolishment of the state and the establishment of a classless society?",
        options:  ["Liberalism", "Anarchism", "Conservatism", "Socialism"],
        correct:   "Anarchism"
    },
    {
        id: "1",
        question:"Which of the following is NOT a principle of democracy?",
        options: ["Free and fair elections", "Freedom of speech", "Rule by a single party", "Protection of individual rights"],
        correct:"Rule by a single party"
    },
    {
        id: "2",
        question:    "The theory of separation of powers was most famously developed by which political philosopher?",
        options:    ["John Locke", "Jean-Jacques Rousseau", "Baron de Montesquieu", "Karl Marx"],
        correct:   "Baron de Montesquieu"
    },
    {
        id: "3",
        question: "Which document served as the foundation for the U.S. Constitution?",
        options:   ["The Magna Carta", "The Articles of Confederation", "The Bill of Rights", "The Federalist Papers"],
        correct: "The Articles of Confederation"
    },
    {
        id: "4",
        question: "What is the term for a government in which power is held by a small group of elites?",
        options: ["Oligarchy", "Republic", "Democracy", "Theocracy"],
        correct: "Oligarchy"
    },
    {
        id: "5",
        question: "Which of the following best describes a parliamentary system of government?",
        options: ["The executive is separate from the legislature", "The head of state is a monarch", "The executive is drawn from and accountable to the legislature", "The head of government holds absolute power"],
        correct:   "The executive is drawn from and accountable to the legislature"
    },
    {
        id: "6",
        question: "Which of these is a primary feature of totalitarian regimes?",
        options: ["Limited political freedoms", "Free elections", "Separation of powers", "Independent judiciary"],
        correct:"Limited political freedoms"
    },
    {
        id: "7",
        question: "Who is known as the 'father of modern liberalism'?",
        options: ["John Locke", "Thomas Hobbes", "Jean-Jacques Rousseau", "David Hume"],
        correct:"John Locke"
    },
    {
        id: "8",
        question:   "What does the concept of 'sovereignty' refer to in political science?",
        options: ["The power of the state to control its own territory", "The ability of a nation to influence global policy", "The right of individuals to participate in politics", "The division of power among different levels of government"],
        correct:  "The power of the state to control its own territory"
    },
    {
        id: "9",
        question:  "Which of the following is an example of a federal system of government?",
        options:  ["United Kingdom", "Germany", "France", "China"],
        correct: "Germany"
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