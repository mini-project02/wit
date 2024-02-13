function clickMainTitle() {
  window.location.reload()
}

function clickLogoutBtn() {
  localStorage.removeItem('player')

  location.href = '/index.html'
}

async function getQuizs() {
  return fetch('/src/database/data.json')
    .then((response) => response.json())
    .then((json) => json.map((ele) => ele))
}

function createBtn() {
  getQuizs().then((quiz) => {
    quiz.forEach((ele) => {
      const quizBtnContainer = document.getElementById('main-quiz-button-container')
      const quizBtn = document.createElement('button')
      const quizBtnTextBox = document.createElement('div')
      const quizBtnText = document.createElement('h1')
      const quizBtnImg = document.createElement('img')

      quizBtnText.innerText = `${ele.subject}`
      quizBtn.classList.add('quiz-button')
      quizBtn.appendChild(quizBtnImg)
      quizBtnImg.src = `${ele.quizs[Math.floor(Math.random() * ele.quizs.length)].img}`
      quizBtnTextBox.appendChild(quizBtnText)
      quizBtn.appendChild(quizBtnTextBox)

      quizBtn.addEventListener('click', clickQuizBtn)
      quizBtnContainer.appendChild(quizBtn)
    })
  })
}

createBtn()

function clickQuizBtn(event) {
  const player = JSON.parse(localStorage.getItem('player'))
  let subject
  const startTime = new Date()

  if (event.target.parentNode.id == 'main-quiz-button-container') {
    subject = event.target.querySelector('h1').innerText
  } else {
    subject = event.target.parentNode.querySelector('h1').innerText
  }

  player.subject = subject
  player.startTime = startTime

  localStorage.setItem('player', JSON.stringify(player))
  location.href = '/src/page/quiz/quiz.html'
}

function searchQuiz(event) {
  event.preventDefault()

  const searchInputValue = document.getElementById('quizhome-header__search-input')
  const quizBtnContainer = document.getElementById('main-quiz-button-container')

  quizBtnContainer.innerHTML = ''

  const res = getQuizs().then((quizs) =>
    quizs.forEach((quiz) => {
      if (quiz.subject.includes(searchInputValue.value)) {
        const quizBtn = document.createElement('button')
        const quizBtnTextBox = document.createElement('div')
        const quizBtnText = document.createElement('h1')
        const quizBtnImg = document.createElement('img')

        quizBtnText.innerText = `${quiz.subject}`
        quizBtn.classList.add('quiz-button')
        quizBtn.appendChild(quizBtnImg)
        quizBtnImg.src = `${
          quiz.quizs[Math.floor(Math.random() * quiz.quizs.length)].img
        }`
        quizBtnTextBox.appendChild(quizBtnText)
        quizBtn.appendChild(quizBtnTextBox)

        quizBtn.addEventListener('click', clickQuizBtn)
        quizBtnContainer.appendChild(quizBtn)
      }
    }),
  )
}

function selectLanguage(event) {
  const selectLanguage = event.value
  const quizBtnContainer = document.getElementById('main-quiz-button-container')

  quizBtnContainer.innerHTML = ''

  const res = getQuizs().then((quizs) =>
    quizs.forEach((quiz) => {
      if (selectLanguage === 'all') {
        const quizBtn = document.createElement('button')
        const quizBtnTextBox = document.createElement('div')
        const quizBtnText = document.createElement('h1')
        const quizBtnImg = document.createElement('img')

        quizBtnText.innerText = `${quiz.subject}`
        quizBtn.classList.add('quiz-button')
        quizBtn.appendChild(quizBtnImg)
        quizBtnImg.src = `${
          quiz.quizs[Math.floor(Math.random() * quiz.quizs.length)].img
        }`
        quizBtnTextBox.appendChild(quizBtnText)
        quizBtn.appendChild(quizBtnTextBox)

        quizBtn.addEventListener('click', clickQuizBtn)
        quizBtnContainer.appendChild(quizBtn)
      } else if (quiz.language == selectLanguage) {
        const quizBtn = document.createElement('button')
        const quizBtnTextBox = document.createElement('div')
        const quizBtnText = document.createElement('h1')
        const quizBtnImg = document.createElement('img')

        quizBtnText.innerText = `${quiz.subject}`
        quizBtn.classList.add('quiz-button')
        quizBtn.appendChild(quizBtnImg)
        quizBtnImg.src = `${
          quiz.quizs[Math.floor(Math.random() * quiz.quizs.length)].img
        }`
        quizBtnTextBox.appendChild(quizBtnText)
        quizBtn.appendChild(quizBtnTextBox)

        quizBtn.addEventListener('click', clickQuizBtn)
        quizBtnContainer.appendChild(quizBtn)
      }
    }),
  )
}

function orderQuizzes(event) {
  const orderValue = event.value
  const btns = document.querySelectorAll('#main-quiz-button-container button')
}
