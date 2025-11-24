// Quiz state
let quizData = null;
let currentQuestionIndex = 0;
let userAnswers = [];
let score = 0;

// DOM elements
const uploadSection = document.getElementById('upload-section');
const quizSection = document.getElementById('quiz-section');
const resultsSection = document.getElementById('results-section');
const fileInput = document.getElementById('file-input');
const loadSampleBtn = document.getElementById('load-sample-btn');
const questionText = document.getElementById('question-text');
const choicesContainer = document.getElementById('choices-container');
const nextBtn = document.getElementById('next-btn');
const submitBtn = document.getElementById('submit-btn');
const progressFill = document.getElementById('progress-fill');
const progressText = document.getElementById('progress-text');
const scoreText = document.getElementById('score-text');
const percentageText = document.getElementById('percentage-text');
const mistakesList = document.getElementById('mistakes-list');
const restartBtn = document.getElementById('restart-btn');

// Sample quiz data
const sampleQuiz = {
    "title": "General Knowledge Quiz",
    "questions": [
        {
            "question": "What is the capital of France?",
            "choices": ["London", "Berlin", "Paris", "Madrid"],
            "correctAnswer": 2
        },
        {
            "question": "Which planet is known as the Red Planet?",
            "choices": ["Venus", "Mars", "Jupiter", "Saturn"],
            "correctAnswer": 1
        },
        {
            "question": "What is 2 + 2?",
            "choices": ["3", "4", "5", "6"],
            "correctAnswer": 1
        },
        {
            "question": "Who painted the Mona Lisa?",
            "choices": ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
            "correctAnswer": 2
        },
        {
            "question": "What is the largest ocean on Earth?",
            "choices": ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
            "correctAnswer": 3
        },
        {
            "question": "Which programming language is known as the 'language of the web'?",
            "choices": ["Python", "JavaScript", "Java", "C++"],
            "correctAnswer": 1
        },
        {
            "question": "What year did World War II end?",
            "choices": ["1943", "1944", "1945", "1946"],
            "correctAnswer": 2
        },
        {
            "question": "What is the chemical symbol for gold?",
            "choices": ["Go", "Gd", "Au", "Ag"],
            "correctAnswer": 2
        },
        {
            "question": "Which country is home to the kangaroo?",
            "choices": ["New Zealand", "Australia", "South Africa", "Brazil"],
            "correctAnswer": 1
        },
        {
            "question": "What is the smallest prime number?",
            "choices": ["0", "1", "2", "3"],
            "correctAnswer": 2
        }
    ]
};

// Event listeners
fileInput.addEventListener('change', handleFileUpload);
loadSampleBtn.addEventListener('click', loadSampleQuiz);
nextBtn.addEventListener('click', nextQuestion);
submitBtn.addEventListener('click', submitQuiz);
restartBtn.addEventListener('click', restartQuiz);

// Handle file upload
function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            if (validateQuizData(data)) {
                quizData = data;
                startQuiz();
            } else {
                alert('Invalid quiz format. Please ensure your JSON file has a "questions" array where each question has: question text, choices array, and correctAnswer index.');
            }
        } catch (error) {
            alert('Invalid JSON file format. Please check your file and try again.');
        }
    };
    reader.readAsText(file);
}

// Load sample quiz
function loadSampleQuiz() {
    quizData = sampleQuiz;
    startQuiz();
}

// Validate quiz data structure
function validateQuizData(data) {
    if (!data.questions || !Array.isArray(data.questions)) {
        return false;
    }
    
    for (let question of data.questions) {
        if (!question.question || !question.choices || !Array.isArray(question.choices)) {
            return false;
        }
        if (typeof question.correctAnswer !== 'number') {
            return false;
        }
        if (question.correctAnswer < 0 || question.correctAnswer >= question.choices.length) {
            return false;
        }
    }
    
    return true;
}

// Start the quiz
function startQuiz() {
    currentQuestionIndex = 0;
    userAnswers = [];
    score = 0;
    
    uploadSection.classList.add('hidden');
    quizSection.classList.remove('hidden');
    resultsSection.classList.add('hidden');
    
    displayQuestion();
}

// Display current question
function displayQuestion() {
    const question = quizData.questions[currentQuestionIndex];
    
    questionText.textContent = question.question;
    choicesContainer.innerHTML = '';
    
    question.choices.forEach((choice, index) => {
        const choiceElement = document.createElement('div');
        choiceElement.classList.add('choice');
        choiceElement.textContent = choice;
        choiceElement.dataset.index = index;
        choiceElement.addEventListener('click', selectChoice);
        choicesContainer.appendChild(choiceElement);
    });
    
    updateProgress();
    nextBtn.classList.add('hidden');
    submitBtn.classList.add('hidden');
}

// Select a choice
function selectChoice(event) {
    const choices = document.querySelectorAll('.choice');
    choices.forEach(choice => choice.classList.remove('selected'));
    
    event.target.classList.add('selected');
    
    // Show next or submit button
    if (currentQuestionIndex < quizData.questions.length - 1) {
        nextBtn.classList.remove('hidden');
    } else {
        submitBtn.classList.remove('hidden');
    }
}

// Next question
function nextQuestion() {
    const selectedChoice = document.querySelector('.choice.selected');
    if (!selectedChoice) {
        alert('Please select an answer');
        return;
    }
    
    const answerIndex = parseInt(selectedChoice.dataset.index);
    userAnswers.push(answerIndex);
    
    currentQuestionIndex++;
    displayQuestion();
}

// Submit quiz
function submitQuiz() {
    const selectedChoice = document.querySelector('.choice.selected');
    if (!selectedChoice) {
        alert('Please select an answer');
        return;
    }
    
    const answerIndex = parseInt(selectedChoice.dataset.index);
    userAnswers.push(answerIndex);
    
    calculateScore();
    showResults();
}

// Update progress bar
function updateProgress() {
    const progress = ((currentQuestionIndex + 1) / quizData.questions.length) * 100;
    progressFill.style.width = progress + '%';
    progressText.textContent = `Question ${currentQuestionIndex + 1} of ${quizData.questions.length}`;
}

// Calculate score
function calculateScore() {
    score = 0;
    quizData.questions.forEach((question, index) => {
        if (userAnswers[index] === question.correctAnswer) {
            score++;
        }
    });
}

// Show results
function showResults() {
    quizSection.classList.add('hidden');
    resultsSection.classList.remove('hidden');
    
    const totalQuestions = quizData.questions.length;
    const percentage = ((score / totalQuestions) * 100).toFixed(1);
    
    scoreText.textContent = `You scored ${score} out of ${totalQuestions}`;
    percentageText.textContent = `${percentage}%`;
    
    displayMistakes();
}

// Display mistakes
function displayMistakes() {
    mistakesList.innerHTML = '';
    
    let mistakeCount = 0;
    quizData.questions.forEach((question, index) => {
        if (userAnswers[index] !== question.correctAnswer) {
            mistakeCount++;
            const mistakeItem = document.createElement('div');
            mistakeItem.classList.add('mistake-item');
            
            // Create mistake question
            const mistakeQuestion = document.createElement('div');
            mistakeQuestion.classList.add('mistake-question');
            mistakeQuestion.textContent = `Question ${index + 1}: ${question.question}`;
            
            // Create mistake details container
            const mistakeDetails = document.createElement('div');
            mistakeDetails.classList.add('mistake-details');
            
            // Your answer
            const yourAnswerP = document.createElement('p');
            const yourAnswerSpan = document.createElement('span');
            yourAnswerSpan.classList.add('your-answer');
            yourAnswerSpan.textContent = `Your answer: ${question.choices[userAnswers[index]]}`;
            yourAnswerP.appendChild(yourAnswerSpan);
            
            // Correct answer
            const correctAnswerP = document.createElement('p');
            const correctAnswerSpan = document.createElement('span');
            correctAnswerSpan.classList.add('correct-answer');
            correctAnswerSpan.textContent = `Correct answer: ${question.choices[question.correctAnswer]}`;
            correctAnswerP.appendChild(correctAnswerSpan);
            
            mistakeDetails.appendChild(yourAnswerP);
            mistakeDetails.appendChild(correctAnswerP);
            
            mistakeItem.appendChild(mistakeQuestion);
            mistakeItem.appendChild(mistakeDetails);
            
            mistakesList.appendChild(mistakeItem);
        }
    });
    
    if (mistakeCount === 0) {
        const perfectMsg = document.createElement('p');
        perfectMsg.style.textAlign = 'center';
        perfectMsg.style.color = '#4caf50';
        perfectMsg.style.fontWeight = 'bold';
        perfectMsg.textContent = 'Perfect score! No mistakes! 🎉';
        mistakesList.appendChild(perfectMsg);
    }
}

// Restart quiz
function restartQuiz() {
    quizData = null;
    currentQuestionIndex = 0;
    userAnswers = [];
    score = 0;
    
    resultsSection.classList.add('hidden');
    uploadSection.classList.remove('hidden');
    
    fileInput.value = '';
}
