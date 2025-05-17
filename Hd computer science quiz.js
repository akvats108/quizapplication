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
        question: "Which of the following is the fastest sorting algorithm in terms of time complexity?",
        options:  ["Bubble Sort", "Merge Sort", "Quick Sort", "Insertion Sort"],
        correct:  "Quick Sort"
    },
    {
        id: "1",
        question: "What does 'DNS' stand for in networking?",
        options: ["Domain Network Server", "Domain Name System", "Direct Network System", "Dynamic Name Server"],
        correct:  "Domain Name System"
    },
    {
        id: "2",
        question:  "Which of the following is NOT a type of machine learning?",
        options:   ["Supervised Learning", "Unsupervised Learning", "Reinforcement Learning", "Parallel Learning"],
        correct:  "Parallel Learning"
    },
    {
        id: "3",
        question: "What is the time complexity of searching for an element in a balanced binary search tree?",
        options:["O(n)", "O(log n)", "O(n^2)", "O(1)"],
        correct:    "O(log n)"
    },
    {
        id: "4",
        question:   "What does 'HTML' stand for?",
        options:  ["Hyper Transfer Markup Language", "Hyper Text Markup Language", "High Text Markup Language", "Hyperlink Text Markup Language"],
        correct:  "Hyper Text Markup Language"
    },
    {
        id: "5",
        question:"Which of the following is the most commonly used algorithm for finding the shortest path in a graph?",
        options: ["Dijkstra's Algorithm", "Bellman-Ford Algorithm", "Floyd-Warshall Algorithm", "A* Algorithm"],
        correct:   "Dijkstra's Algorithm"
    },
    {
        id: "6",
        question:  "What is the primary advantage of using a HashMap over an array?",
        options:["Faster lookups for large datasets", "Consumes less memory", "Faster sorting", "No need for indexing"],
        correct: "Faster lookups for large datasets"
    },
    {
        id: "7",
        question: "What is the worst-case time complexity of the QuickSort algorithm?",
        options:   ["O(n)", "O(n log n)", "O(log n)", "O(n^2)"],
        correct:"O(n^2)"
    },
    {
        id: "8",
        question: "Which of the following is NOT a valid data structure?",
        options:   ["Array", "HashSet", "HashMap", "QueueStack"],
        correct:"QueueStack"
    },
    {
        id: "9",
        question: "Which of these sorting algorithms is not stable?",
        options:  ["Bubble Sort", "Merge Sort", "Quick Sort", "Insertion Sort"],
        correct: "Quick Sort"
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