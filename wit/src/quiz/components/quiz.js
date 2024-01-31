class Quiz {
  #player
  #target
  #timer
  #interval
  #quizData

  constructor(target, name, subject) {
    this.#player = {
      name,
      subject,
      level: 0,
      hp: 100,
    }
    this.#target = target
    this.#timer = 10
    this.#interval = 0
    this.#quizData = []

    this.fetchData()
    this.submitEvent()
  }

  async fetchData() {
    const { subject } = this.#player
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
      const answer = this.#quizData[this.#player.level]?.answer.trim().toLowerCase()
      clearInterval(this.#interval)
      if (answer === $quizInput.value.toLowerCase()) {
        // 정답
        this.nextStep()
      } else {
        // 오답, 체력 줄어듬, 정답 보여주면서 다음 문제
        this.reduceHp()
        this.nextStep()
      }
    })
  }

  nextStep() {
    const $quizInput = document.querySelector('.quiz-input')
    const $timer = document.querySelector('.current-timer')

    if (this.#player.level === this.#quizData.length - 1 || this.#player.hp <= 0) {
      console.log('게임종료 -> result 페이지 이동')
      this.answer()
      return
    }

    this.answer()
    setTimeout(() => {
      this.#player.level += 1
      this.#timer = 10
      $quizInput.value = ''
      $timer.style.backgroundColor = '#0075ff'
      $timer.style.width = `100%`

      this.render()
    }, 1000)
  }

  answer() {
    const $answerDivs = document.querySelectorAll('.quiz-answer > div')
    const answer = this.#quizData[this.#player.level].answer.trim().split('')
    answer.forEach((char, index) => {
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

  reduceHp() {
    this.#player.hp -= 20
    console.log(this.#player.hp)
  }

  render() {
    const $timer = document.querySelector('.current-timer')
    const { level } = this.#player
    const quizData = this.#quizData

    this.#target.style.backgroundImage = `url('${quizData[level].img}')`
    this.createHint(quizData[level]?.answer.length)

    this.#interval = setInterval(() => {
      this.#timer--
      $timer.style.width = `${this.#timer * 10}%`
      if (this.#timer === quizData.length / 2) $timer.style.backgroundColor = 'red'

      if (this.#timer === -1) {
        clearInterval(this.#interval)
        // 시간초과 다음 단계
        console.log('시간초과')
        this.reduceHp()
        this.nextStep()
      }
    }, 1000)
  }
}

export default Quiz
