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

  const searchInput = document.getElementById('quizhome-header__search-input')
  const quizBtnContainer = document.getElementById('main-quiz-button-container')

  quizBtnContainer.innerHTML = ''

  getQuizs().then((quizs) =>
    quizs.forEach((quiz) => {
      if (quiz.subject.toLowerCase().includes(searchInput.value.toLowerCase())) {
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

  getQuizs().then((quizs) =>
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

async function matchQuizzBtn() {
  const btns = document.querySelectorAll('#main-quiz-button-container button')
  let BtnSubjects = []

  btns.forEach((btn) => {
    BtnSubjects.push(btn.innerText)
  })

  return getQuizs().then((quizs) => {
    let quizsSubject = []
    quizs.forEach((quiz) => {
      quizsSubject[quiz.subject] = quiz
    })
    return BtnSubjects.map((subject) => quizsSubject[subject])
  })
}

async function orderQuizzes(event) {
  const quizBtnContainer = document.getElementById('main-quiz-button-container')
  const matchedQuizzes = await matchQuizzBtn()
  const orderBy = event.value

  quizBtnContainer.innerHTML = ''

  if (orderBy === 'created') {
    matchedQuizzes.sort((a, b) => new Date(b[orderBy]) - new Date(a[orderBy]))
  } else {
    matchedQuizzes.sort((a, b) => b[orderBy] - a[orderBy])
  }

  matchedQuizzes.forEach((quiz) => {
    const quizBtn = document.createElement('button')
    const quizBtnTextBox = document.createElement('div')
    const quizBtnText = document.createElement('h1')
    const quizBtnImg = document.createElement('img')

    quizBtnText.innerText = `${quiz.subject}`
    quizBtn.classList.add('quiz-button')
    quizBtn.appendChild(quizBtnImg)
    quizBtnImg.src = `${quiz.quizs[Math.floor(Math.random() * quiz.quizs.length)].img}`
    quizBtnTextBox.appendChild(quizBtnText)
    quizBtn.appendChild(quizBtnTextBox)

    quizBtn.addEventListener('click', clickQuizBtn)
    console.log(quizBtnContainer)
    quizBtnContainer.appendChild(quizBtn)
  })
}
