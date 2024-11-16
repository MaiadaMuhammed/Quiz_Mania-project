const questions = [
    {
      question: "What is the capital of France?",
      answers: ["Paris", "London", "Berlin", "Madrid"],
      correct: 0,
      hint: "It's known as the city of love.",
    },
    {
      question: "What is 5 + 3?",
      answers: ["5", "8", "12", "15"],
      correct: 1,
      hint: "It's a single-digit number.",
    },
    {
      question: "Which planet is known as the Red Planet?",
      answers: ["Earth", "Venus", "Mars", "Jupiter"],
      correct: 2,
      hint: "It's named after the Roman god of war.",
    },
  ];
  
  let currentQuestionIndex = 0;
  let score = 0;
  let timeLeft = 15;
  let timerInterval;
  let hintsUsed = 0;
  
  const questionElement = document.getElementById("question");
  const answerButtons = document.querySelectorAll(".answer");
  const nextButton = document.getElementById("next-btn");
  const scoreElement = document.getElementById("score");
  const timerElement = document.getElementById("time");
  const hintButton = document.getElementById("hint-btn");
  const leaderboardElement = document.getElementById("top-scores");
  
  function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    answerButtons.forEach((button, index) => {
      button.textContent = currentQuestion.answers[index];
      button.onclick = () => checkAnswer(index);
    });
    resetTimer();
  }
  
  function checkAnswer(selected) {
    const correctAnswer = questions[currentQuestionIndex].correct;
    if (selected === correctAnswer) {
      score++;
      scoreElement.textContent = `Score: ${score}`;
    }
    answerButtons.forEach((button) => (button.disabled = true));
    clearInterval(timerInterval);
  }
  
  function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      answerButtons.forEach((button) => (button.disabled = false));
      showQuestion();
    } else {
      endQuiz();
    }
  }
  
  function resetTimer() {
    timeLeft = 15;
    timerElement.textContent = timeLeft;
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      timeLeft--;
      timerElement.textContent = timeLeft;
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        alert("Time's up!");
        answerButtons.forEach((button) => (button.disabled = true));
      }
    }, 1000);
  }
  
  function useHint() {
    const currentQuestion = questions[currentQuestionIndex];
    alert(`Hint: ${currentQuestion.hint}`);
    hintsUsed++;
    hintButton.disabled = true;
  }
  
  function endQuiz() {
    clearInterval(timerInterval);
    questionElement.textContent = `Quiz Finished! Your score is ${score}/${questions.length}.`;
    document.getElementById("answers").style.display = "none";
    nextButton.style.display = "none";
    hintButton.style.display = "none";
    updateLeaderboard();
  }
  
  function updateLeaderboard() {
    const li = document.createElement("li");
    li.textContent = `Score: ${score}, Hints Used: ${hintsUsed}`;
    leaderboardElement.appendChild(li);
  }
  
  hintButton.addEventListener("click", useHint);
  nextButton.addEventListener("click", nextQuestion);
  
  showQuestion();
  