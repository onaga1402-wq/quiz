import Question from "./question.js"

export default class Quiz {
  constructor(playerName, difficulty, category, numOfQuestions) {
    this.playerName = playerName
    this.category = category
    this.difficulty = difficulty
    this.numOfQuestions = numOfQuestions
    this.score = 0
    this.questions = []
    this.indexCurrentQuestion = 0
  }

  async startQuiz() {
    document.getElementById('quizOptions').classList.add('hidden')
    await this.getQuestionApi()
    this.displayQuestion()
    document.querySelector('.question-card').classList.remove('hidden')

  }

  async getQuestionApi() {
    try {
      const res = await fetch(`https://opentdb.com/api.php?amount=${this.numOfQuestions}&category=${this.category}&difficulty=${this.difficulty}`)
      if (!res.ok) {
        throw new Error('Something went wrong')
      }
      const data = await res.json()
      this.questions = data.results
      console.log(this.questions)
    } catch (error) {
      console.log(error)
    }
  }

  displayQuestion() {
    const question = new Question(this, this.indexCurrentQuestion)
    question.displayQuestion()
  }

  goToNextQuestion() {
    this.indexCurrentQuestion++
    if (this.indexCurrentQuestion >= this.questions.length) {
      if (this.score !== 0) {
        this.storeResultToLocalStorage()
      }
      this.showResult()
    } else {
      this.displayQuestion()
    }

  }
  storeResultToLocalStorage() {
    const accuracy = this.calcAccuracy()
    const obj = { name: this.playerName, accuracy }
    const results = JSON.parse(localStorage.getItem('results')) || []

    if (results.length == 10) {
      if (accuracy > results[results.length - 1]) {
        results[results.length - 1] = obj

      }
    } else {
      results.push(obj)
    }
    localStorage.setItem('results', JSON.stringify(results))
  }
  showResult() {

    document.querySelector('.question-card').classList.add('hidden')
    const resultsCard = document.querySelector('.results-card')
    resultsCard.classList.remove('hidden')

    resultsCard.querySelector('.results-score-display').innerHTML = `${this.score}/${this.questions.length}`

    const accuracy = this.calcAccuracy()
    resultsCard.querySelector('.results-percentage').innerHTML = `${accuracy}% Accuracy`

    const results = this.sortTopTen()
    resultsCard.querySelector('.leaderboard-list').innerHTML = results.map((res, index) => `
           <li class="leaderboard-item silver">
            <span class="leaderboard-rank">#${index + 1}</span>
            <span class="leaderboard-name">${res.name}</span>
            <span class="leaderboard-score">${res.accuracy}%</span>
          </li>`)
    resultsCard.querySelector('.btn-restart').addEventListener('click', () => {
      resultsCard.classList.add('hidden')
      document.getElementById('quizOptions').classList.remove('hidden')
    })
  }
  calcAccuracy() {
    return Math.ceil((this.score * 100) / (this.questions.length))
  }
  sortTopTen() {
    const results = JSON.parse(localStorage.getItem('results'))
    results.sort((a, b) => b.accuracy - a.accuracy)
    return results

  }
}