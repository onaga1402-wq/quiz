import Quiz from "./quiz.js"

const quizOptions = document.getElementById('quizOptions')
const playerName = document.getElementById('playerName')
const categoryMenu= document.getElementById('categoryMenu')
const difficultyOptions = document.getElementById('difficultyOptions')
const questionsNumber = document.getElementById('questionsNumber')
const startQuizBtn = document.getElementById('startQuiz')

function isValidateQuestionsNumber() {
    let isVaild=true
    if (questionsNumber.value == 0 || questionsNumber.value >50) {
       isVaild = false 
    }
    return isVaild
}

startQuizBtn.addEventListener('click',()=>{
    const isVaild = isValidateQuestionsNumber ()
    if (!isVaild) {
        document.querySelector('.form-error').classList.remove('hidden')
        return;
    }
    let player = playerName.value || 'player'
    const quiz= new Quiz (player , difficultyOptions.value , categoryMenu.value, questionsNumber.value)

    quiz.startQuiz()
})