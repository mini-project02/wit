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
    this.clickEvent()
  }

  async fetchData() {
    // subject에 맞는 quizs 데이터 가져오기
    const { subject } = this.#player
    const res = await (await fetch('./data.json')).json()
    const quizs = res.filter((data) => data.subject === subject).map((data) => data.quizs)
    this.#quizData = quizs[0]
    this.render()
  }

  clickEvent() {
    const $quizField = document.querySelector('.quiz-form')
    const $quizInput = document.querySelector('.quiz-input')

    console.log($quizField)
    $quizField.addEventListener('submit', (e) => {
      e.preventDefault()
      const answer = this.#quizData[this.#player.level]?.answer.trim().toLowerCase()
      clearInterval(this.#interval)
      if (answer === $quizInput.value.toLowerCase()) {
        console.log('정답')
        this.nextStep()
        // 정답
      } else {
        this.nextStep()
        // 오답, 체력 줄어듬, 정답 보여주면서 다음 문제
      }
    })
  }

  nextStep() {
    const $quizInput = document.querySelector('.quiz-input')
    const $answer = document.querySelector('.answer')

    if (this.#player.level === this.#quizData.length - 1) {
      console.log('게임쎗')
      $answer.innerText = this.#quizData[this.#player.level].answer
      return
    }

    $answer.innerText = this.#quizData[this.#player.level].answer
    setTimeout(() => {
      this.#player.level += 1
      this.#timer = 10
      $quizInput.value = ''
      $answer.innerText = ''

      this.render()
    }, 2000)
  }

  render() {
    // target에 이미지 보여주기
    const $timer = document.querySelector('.timer')
    const { level } = this.#player
    const quizData = this.#quizData

    this.#target.style.backgroundImage = `url('${quizData[level].img}')`

    this.#interval = setInterval(() => {
      this.#timer--
      $timer.innerText = this.#timer
      if (this.#timer === 0) {
        clearInterval(this.#interval)
        this.nextStep()
        // 시간초과 다음 단계
      }
    }, 1000)
  }
}

export default Quiz
