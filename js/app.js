const questions = [
    {
      id: 1,
      question: "Which keyword is used to declare a variable in JavaScript ?",
      options: ["var", "let", "const", "All of the above"],
      answer: "All of the above"
    },
    {
      id: 2,
      question: "How do you define a function in Python ?",
      options: ["function myFunc()", "def myFunc():", "func myFunc():", "define myFunc()"],
      answer: "def myFunc():"
    },
    {
      id: 3,
      question: "What does HTML stand for ?",
      options: ["HyperText Markup Language", "HyperTransfer Markup Language", "HighText Machine Language", "HyperText Machine Learning"],
      answer: "HyperText Markup Language"
    },
    {
      id: 4,
      question: "Which property is used to change the text color in CSS ?",
      options: ["text-color", "font-color", "color", "text-style"],
      answer: "color"
    },
    {
      id: 5,
      question: "Which SQL statement is used to fetch data from a database ?",
      options: ["GET", "RETRIEVE", "SELECT", "FETCH"],
      answer: "SELECT"
    },
    
];

const questionsContainer = document.querySelector('.questions')
const questionTitle = document.querySelector('.question')
const currentQuestion = document.querySelector('.current')
const totalQuestions = document.querySelector('.total')
const nextBtn = document.querySelector('.next')
const resultBtn = document.querySelector('.result-button')
const closeModalXBtn = document.querySelector('.x-btn')
const closeModalBtn = document.querySelector('.close')
const modal = document.querySelector('.modal')
const modalScreen = document.querySelector('.modal-screen')
const tryAgainBtn = document.querySelector('.continue')






let questionIndex = 0
let selectedAnswer = ""
let score = 0

function showQuestion() {

    questionsContainer.innerHTML = ""

    questionTitle.textContent = questions[questionIndex].question
    currentQuestion.textContent = questionIndex + 1
    totalQuestions.textContent = questions.length

    const answerOptions = questions[questionIndex].options


    answerOptions.forEach((answerOption) => {

        const randomId = `quest-${Math.floor(Math.random() * 9999)}`;

        questionsContainer.insertAdjacentHTML(
            'beforeend',
            `
            <article class="quest"> 
                <input type="radio" name="quest-box" value="${answerOption}" id="${randomId}"/>
                <label for="${randomId}" class="answer-title">${answerOption}</label>
            </article>
    
            `
        )
    })

    addSelectedClass()

}


showQuestion()




function addSelectedClass() {
    const answerBoxes = document.querySelectorAll('.quest')

    answerBoxes.forEach(function (answerBox) {
        answerBox.addEventListener('click', () => {
            const selectedOption = document.querySelector('.selected')
            const inputElement = answerBox.querySelector('input')


            if(selectedOption) {
                selectedOption.classList.remove('selected')
            }

            answerBox.classList.add('selected')
            inputElement.checked = true
            
        })
    })
}



function showNextQuestion() {
    checkAnswer();
    questionIndex++

    if(questionIndex > questions.length - 1) {
        questionIndex = 0
    }

    if(questionIndex === questions.length - 1) {
        nextBtn.style.display = 'none'
    }

    showQuestion()
}



nextBtn.addEventListener('click', showNextQuestion)




function checkAnswer() {

    const question = questions[questionIndex]
    const inputElements = document.querySelectorAll('input')

    inputElements.forEach((inputElement) => {
        if(inputElement.checked && inputElement.value === question.answer) {
            score++
        }
    })

}


function resultHandler() {
    checkAnswer()

    const answeredQuestions = document.querySelector('.answered-questions')
    const totalQuestions = document.querySelector('.total-questions')


    modalScreen.classList.remove('hidden')

    answeredQuestions.textContent = score
    totalQuestions.textContent = questions.length
    showQuestion()
    questionIndex = 0
    nextBtn.style.display = 'block'

    
}



function closeModal() {
    modalScreen.classList.add('hidden')
}



resultBtn.addEventListener('click', resultHandler)
closeModalXBtn.addEventListener('click', closeModal)
closeModalBtn.addEventListener('click', closeModal)
tryAgainBtn.addEventListener('click', closeModal)