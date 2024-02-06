async function getQuizs() {
  return fetch('../../data.json')
    .then((response) => response.json())
    .then((json) => json.map((ele) => ele))
}

async function getPlayer() {
  const player = localStorage.getItem(player)
  const parsePlayer = JSON.parse(player)
  console.log(parsePlayer)
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
    console.log(subject)
  } else {
    subject = event.target.parentNode.querySelector('h1').innerText
    console.log(subject)
  }

  player.subject = subject
  player.startTime = startTime

  localStorage.setItem('player', JSON.stringify(player))
  // location.href = '../quiz/quiz.html'
}
