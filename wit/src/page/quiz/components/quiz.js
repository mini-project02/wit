import Player from './player.js'

class Quiz {
  #player
  #target
  #timer
  #interval
  #quizData

  constructor(target, name, subject) {
    this.#player = new Player(name, subject)
    this.#target = target
    this.#timer = 10
    this.#interval = 0
    this.#quizData = []

    this.fetchData()
    this.submitEvent()
  }

  async fetchData() {
    const subject = this.#player.getSubject()
    const res = await (await fetch('./data.json')).json()
    const quizs = res.filter((data) => data.subject === subject).map((data) => data.quizs)
    this.#quizData = quizs[0]
    this.render()
  }

  submitEvent() {
    const $quizForm = document.querySelector('.quiz-form')
    const $quizInput = document.querySelector('.quiz-input')

    $quizForm.addEventListener('submit', (e) => {
      e.preventDefault()
      const answer = this.#quizData[this.#player.getLevel()]?.answer.trim().toLowerCase()
      clearInterval(this.#interval)

      if (answer === $quizInput.value.toLowerCase()) {
        this.nextStep()
      } else {
        this.#player.reduceHp()
        this.nextStep()
        this.heartBroken()
      }
    })
  }

  nextStep() {
    const $quizInput = document.querySelector('.quiz-input')
    const $timer = document.querySelector('.current-timer')

    this.#player.checkClear(this.#quizData.length)

    if (this.#player.endGame(this.#quizData.length)) {
      this.createHeart()
      this.answer()
      return
    }

    this.answer()

    setTimeout(() => {
      this.createHeart()
    }, 1000)

    setTimeout(() => {
      this.#player.levelUp()
      this.#timer = 10
      $quizInput.value = ''
      $timer.style.backgroundColor = '#0075ff'
      $timer.style.width = `100%`

      this.render()
    }, 1500)
  }

  answer() {
    const $answerDivs = document.querySelectorAll('.quiz-answer > div')
    const answer = this.#quizData[this.#player.getLevel()].answer.trim().split('')
    const $input = document
      .querySelector('.quiz-input')
      .value.trim()
      .toLowerCase()
      .split('')

    answer.forEach((char, index) => {
      if ($input.length === $answerDivs.length && $input[index] === char.toLowerCase()) {
        $answerDivs[index].classList.add('green')
      } else {
        $answerDivs[index].classList.add('red')
      }

      $answerDivs[index].innerText = char
    })
  }

  createHint(len) {
    const $quizAnswer = document.querySelector('.quiz-answer')
    $quizAnswer.innerHTML = ''
    for (let i = 0; i < len; i++) {
      const $div = document.createElement('div')
      $quizAnswer.appendChild($div)
    }
  }

  createHeart() {
    const hpField = document.querySelector('.hp-field')
    hpField.innerHTML = ''
    for (let i = 0; i < this.#player.getHp(); i++) {
      hpField.innerHTML += `<div><img src="../../public/red-heart-svgrepo-com.svg" alt="heart" /></div>`
    }
  }

  heartBroken() {
    const hpField = document.querySelector('.hp-field')
    const broken = document.querySelector('.hp-field>div>img')
    if (broken) {
      hpField.classList.add('heartBroken')
      broken.src = '../../public/broken-heart-svgrepo-com.svg'
      setTimeout(() => {
        hpField.classList.remove('heartBroken')
      }, 1000)
    }
  }

  render() {
    const $timer = document.querySelector('.current-timer')
    const quizData = this.#quizData

    this.#target.style.backgroundImage = `url('${quizData[this.#player.getLevel()].img}')`
    this.createHint(quizData[this.#player.getLevel()]?.answer.length)
    this.createHeart()

    this.#interval = setInterval(() => {
      this.#timer--
      $timer.style.width = `${this.#timer * 10}%`
      if (this.#timer === quizData.length / 2) $timer.style.backgroundColor = 'red'

      if (this.#timer === -1) {
        clearInterval(this.#interval)

        this.#player.reduceHp()
        this.nextStep()
        this.heartBroken()
      }
    }, 1000)
  }
}

export default Quiz