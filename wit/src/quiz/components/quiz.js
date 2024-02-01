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
      level: 1,
      hp: 5,
      endTime: 0,
      isSuccess: false,
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
      const answer = this.#quizData[this.#player.level - 1]?.answer.trim().toLowerCase()
      clearInterval(this.#interval)
      if (answer === $quizInput.value.toLowerCase()) {
        // 정답
        this.#player.isSuccess = true
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

    if (this.#player.level === this.#quizData.length || this.#player.hp <= 0) {
      console.log('게임종료 -> result 페이지 이동')
      this.createHeart()
      this.answer()
      this.#player.endTime = new Date()
      console.log(this.#player)
      return
    }

    this.answer()
    this.createHeart()

    setTimeout(() => {
      this.#player.level += 1
      this.#timer = 10
      $quizInput.value = ''
      $timer.style.backgroundColor = '#0075ff'
      $timer.style.width = `100%`

      this.render()
    }, 1500)
  }

  answer() {
    const $answerDivs = document.querySelectorAll('.quiz-answer > div')
    const answer = this.#quizData[this.#player.level - 1].answer.trim().split('')
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
    for (let i = 0; i < this.#player.hp; i++) {
      hpField.innerHTML += `<div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z"
                />
              </svg>
            </div>`
    }
  }

  reduceHp() {
    this.#player.hp -= 1
    console.log(this.#player.hp)
  }

  render() {
    const $timer = document.querySelector('.current-timer')
    const { level } = this.#player
    const quizData = this.#quizData

    this.#target.style.backgroundImage = `url('${quizData[level - 1].img}')`
    this.createHint(quizData[level - 1]?.answer.length)
    this.createHeart()

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
