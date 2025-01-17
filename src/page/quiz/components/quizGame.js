import Player from './player.js'
import Toast from './toast.js'

class Quiz {
  #player
  #target
  #timer
  #interval
  #quizData
  #progress

  constructor(target, name, subject) {
    this.#player = new Player(name, subject)
    this.#target = target
    this.#timer = 10
    this.#interval = 0
    this.#quizData = []
    this.#progress = true

    this.fetchData()
    this.submitEvent()
    this.homeClickEvent()
  }

  async fetchData() {
    const subject = this.#player.getSubject()
    const res = await (await fetch('/src/database/data.json')).json()
    const quizs = res.filter((data) => data.subject === subject).map((data) => data.quizs)
    this.#quizData = quizs[0]
    this.render()
  }

  homeClickEvent() {
    const homBtn = document.querySelector('.homeBtn')
    homBtn.addEventListener('click', (e) => {
      let result = confirm('퀴즈를 포기하고 홈으로 돌아가시겠습니까?')

      if (result) {
        let player = JSON.parse(localStorage.getItem('player'))
        player = {
          name: player.name,
        }
        localStorage.setItem('player', JSON.stringify(player))

        window.location.href = '/src/page/quiz_home/quiz_home.html'
      }
    })
  }

  submitEvent() {
    const $quizForm = document.querySelector('.quiz-form')
    $quizForm.addEventListener('submit', (e) => this.formEvent(e))
  }

  formEvent(e) {
    e.preventDefault()
    if (this.#progress) {
      const $correctSound = document.querySelector('.correct-sound')
      const $wrongSound = document.querySelector('.wrong-sound')
      const $quizInput = document.querySelector('.quiz-input')
      const answer = this.#quizData[this.#player.getLevel()]?.answer.trim().toLowerCase()
      clearInterval(this.#interval)

      if (answer === $quizInput.value.toLowerCase()) {
        new Toast('correct', 'green').render()
        $correctSound.volume = 0.3
        $correctSound.play()
        this.#player.correctAnswer()
        this.nextStep()
      } else {
        new Toast('wrong', 'red').render()
        $wrongSound.volume = 0.3
        $wrongSound.play()
        this.#player.reduceHp()
        this.nextStep()
        this.heartBroken()
      }

      this.#progress = false
    }
  }

  nextStep() {
    const $quizInput = document.querySelector('.quiz-input')
    const $timer = document.querySelector('.current-timer')

    this.#player.checkClear(this.#quizData.length)

    if (this.#player.endGame(this.#quizData.length)) {
      this.createHeart()
      this.answer()
      this.#player.goResultPage()
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

  showFirstWord() {
    const $answerDivs = document.querySelectorAll('.quiz-answer > div')
    const answer = this.#quizData[this.#player.getLevel()].answer.trim().split('')
    const randomWord = Math.floor(Math.random() * $answerDivs.length)

    if ($answerDivs.length !== 1) $answerDivs[randomWord].innerText = answer[randomWord]
  }

  createHeart() {
    const hpField = document.querySelector('.hp-field')
    hpField.innerHTML = ''
    for (let i = 0; i < this.#player.getHp(); i++) {
      hpField.innerHTML += `<div><img src="/src/images/red-heart-svgrepo-com.svg" alt="heart" /></div>`
    }
  }

  heartBroken() {
    const hpField = document.querySelector('.hp-field')
    const broken = document.querySelector('.hp-field>div>img')
    if (broken) {
      hpField.classList.add('heartBroken')
      broken.src = '/src/images/broken-heart-svgrepo-com.svg'
      setTimeout(() => {
        hpField.classList.remove('heartBroken')
      }, 1000)
    }
  }

  render() {
    const $timer = document.querySelector('.current-timer')
    const $wrongSound = document.querySelector('.wrong-sound')
    const quizData = this.#quizData
    this.#progress = true

    this.#target.style.backgroundImage = `url('${quizData[this.#player.getLevel()].img}')`
    this.createHint(quizData[this.#player.getLevel()]?.answer.length)
    this.createHeart()

    this.#interval = setInterval(() => {
      this.#timer--
      $timer.style.width = `${this.#timer * 10}%`
      if (this.#timer === quizData.length / 2) {
        $timer.style.backgroundColor = 'red'
        this.showFirstWord()
      }

      if (this.#timer === -1) {
        this.#progress = false
        clearInterval(this.#interval)
        new Toast('timeover', 'orange').render()
        $wrongSound.volume = 0.3
        $wrongSound.play()

        this.#player.reduceHp()
        this.nextStep()
        this.heartBroken()
      }
    }, 1000)
  }
}

export default Quiz
