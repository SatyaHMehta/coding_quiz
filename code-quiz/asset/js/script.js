// All the global variables needed for the following codes
const timerEl = document.querySelector("#timer");
var questionsIndex = 0;
var startBtn = document.querySelector("#start");
var counterEl = document.getElementById("counter");
var score = 0;
var scoreNumEl = document.querySelector("#scoreNum");
scoreNumEl.textContent = score.toString();

var timer;
var answerKey = [1, 2, 3, 2];
var currentQuestionIndex = 0;
var submitEl = document.querySelector("#submit");

// All the questions for the quiz
var questions = [
  {
    q: "Commonly used data types DO NOT include",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: undefined,
  },
  {
    q: "The condition in an if / else statement is enclosed within.",
    choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
    answer: undefined,
  },
  {
    q: "Arrays in Javascript can be used to store.",
    choices: [
      "numbers and strings",
      "other arrays",
      "booleans",
      "all of the above",
    ],
    answer: undefined,
  },
  {
    q: "String values must be enclosed within __ when being assigned to variables.",
    choices: ["commas", "curly brackets", "quotes", "parenthesis"],
    answer: undefined,
  },
];
var timerCount = 10 * questions.length;
// To display the scoreboard at the end.
function scoreBoard() {
  document.getElementById("questions2").setAttribute("class", "hide");
  var highScoreEl = document.querySelector("#score1");
  highScoreEl.textContent = score.toString();
  let restartBtn = document.createElement("button");
  restartBtn.style.marginLeft = "45%";
  restartBtn.style.marginRight = "45%";
  restartBtn.innerHTML = "Restart";
  function reload() {
    reload = location.reload();
  }
  // Event listeners for reload
  restartBtn.addEventListener("click", reload, false);
  highScoreEl.appendChild(restartBtn);
}

//Second to last screen submit butten to record their name.
function submitBtn() {
  submitEl.addEventListener("click", function () {
    document.getElementById("card").removeAttribute("class");
    document.getElementById("submitScreen").setAttribute("class", "hide");
    scoreBoard();
  });
}
submitBtn();
function createUl() {
  const h1El = document.createElement("h1");
  const ulEl = document.createElement("ul");

  h1El.textContent = questions[currentQuestionIndex].q;
  document.getElementById("questions-title").appendChild(h1El);
  document.getElementById("questions-title").appendChild(ulEl);
  var rightOrWrongEl = document.querySelector(".rightOrWrong");

  questions[currentQuestionIndex].choices.forEach((question, index) => {
    const liEl = document.createElement("button");
    ulEl.setAttribute("style", "position: relative; right: 40px");
    liEl.setAttribute("id", "li" + index);
    liEl.setAttribute(
      "style",
      "listStyleType: decimal; backgroundColor: purple; border: solid 2px; padding: 5px; margin: 2px; margin-right: 65%; border-radius: 5px; background-color: rgb(132, 0, 255); color: white;"
    );
    ulEl.appendChild(liEl);
    liEl.textContent = questions[currentQuestionIndex].choices[index];
    console.log(currentQuestionIndex);
    liEl.addEventListener("click", function () {
      if (index === answerKey[currentQuestionIndex] && index < 4) {
        var h3CorrectEl = document.createElement("h3");
        h3CorrectEl.textContent = "Correct!";
        rightOrWrongEl.appendChild(h3CorrectEl);
        score += 10;
        scoreNumEl.textContent = score.toString();
      } else {
        var h3CorrectEl = document.createElement("h3");
        h3CorrectEl.textContent = "";
        h3CorrectEl.textContent = "Wrong!!! you BAAAAAKA!!!";
        rightOrWrongEl.appendChild(h3CorrectEl);
        scoreNumEl.textContent = score.toString();
        counterEl.textContent = (timerCount - 10).toString();
      }
      console.log(index);
      document.getElementById("questions-title").removeChild(ulEl);
      document.getElementById("questions-title").removeChild(h1El);
      if (currentQuestionIndex < 3) {
        currentQuestionIndex++;
        createUl();
      } else {
        document.getElementById("questions2").setAttribute("class", "hide");
        document.getElementById("submitScreen").removeAttribute("class");

        // scoreBoard();
      }
    });
  });
}
// Timer for the quiz.
function startTimer() {
  timer = setInterval(function () {
    timerCount--;
    counterEl.textContent = timerCount.toString();
    if (timerCount === 0) {
      clearInterval(timer);
      counterEl.textContent = "";
    }
  }, 1000);
}

//Start quiz function
startBtn.addEventListener("click", startQuiz);
function startQuiz() {
  var startScreen = document.querySelector("#questions");
  var questionsElement = document.querySelector("#questions2");
  startScreen.setAttribute("class", "hide");
  questionsElement.removeAttribute("class");
  startTimer();
  createUl();
}

var nameInput = document.querySelector("nameInput");
var submitButton = document.querySelector("#submit");
var userNameSpan = document.querySelector("#name");

renderLastRegistered();

function renderLastRegistered() {
  userNameSpan.textContent = localStorage.getItem("name");
}

submitButton.addEventListener("click", function (event) {
  event.preventDefault();

  var name = document.querySelector("#nameInput").value;
  localStorage.setItem("name", name);
  renderLastRegistered();
});
