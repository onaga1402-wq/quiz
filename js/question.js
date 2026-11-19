export default class Question {
  constructor(quiz, indexQuestion) {
    this.quiz = quiz
    this.indexQuestion = indexQuestion
    this.question = quiz.questions[indexQuestion]
    this.correctAnswer = this.question.correct_answer
    this.wrongAnswers = this.question.incorrect_answers
    this.answers = this.shuffel()
  }


  shuffel() {

    const answersArr = [this.correctAnswer, ...this.wrongAnswers]
    for (let index = answersArr.length - 1; index > 0; index--) {

      const randomIndex = Math.floor(Math.random() * (index + 1));

      [answersArr[index], answersArr[randomIndex]] = [answersArr[randomIndex], answersArr[index]]

    }

    return answersArr
  }

displayQuestion() {
    const questionCard = document.querySelector('.question-card')

    questionCard.querySelector('.xp-value').innerHTML =
      `Question ${this.indexQuestion + 1}/${this.quiz.questions.length}`

    const progress = ((this.indexQuestion + 1) / this.quiz.questions.length) * 100
    questionCard.querySelector('.xp-bar-fill').style.width = `${progress}%`

    questionCard.querySelector('div.category span').innerHTML = this.question.category
    questionCard.querySelector('div.difficulty span').innerHTML = this.question.difficulty
    questionCard.querySelector('div.counter span').innerHTML =
      `${this.indexQuestion + 1}/${this.quiz.questions.length}`

    questionCard.querySelector('.question-text').innerHTML = this.question.question

    questionCard.querySelector('.answers-grid').innerHTML = this.answers
      .map((ans, index) => `
        <button class="answer-btn" data-answer="${ans}">
          <span class="answer-key">${String.fromCharCode(65 + index)}</span>
          <span class="answer-text">${ans}</span>
        </button>`)
      .join('')

    questionCard.querySelectorAll('.answer-btn').forEach((btn) => (
      btn.addEventListener("click", (e) => {
        this.checkAnswer(e.target)
      })
    ))
  }

  checkAnswer(btn) { 
    const answer = btn.dataset.answer
    if (answer === this.correctAnswer) {
      btn.classList.add('correct')
      this.quiz.score++
    } else {
      btn.classList.add('wrong')
      document.querySelectorAll('.answer-btn').forEach((b) => {
        if (b.dataset.answer === this.correctAnswer) {
          b.classList.add('correct')
        }
      })
    }
  setTimeout(()=>{
    this.quiz.goToNextQuestion()
  }, 1000)
  
  }
    
}

