async function getQuizs() {
  return fetch('../../data.json')
    .then((response) => response.json())
    .then((json) => json.map((ele) => ele.subject))
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
      const quizBtnText = document.createElement('h1')
      const randomColor = getRandomColor()

      quizBtnText.innerText = `${ele}`
      quizBtn.classList.add('quiz-button')
      quizBtn.appendChild(quizBtnText)

      quizBtn.style.backgroundColor = `rgba(${randomColor},40%)`

      quizBtn.addEventListener('click', clickQuizBtn)
      quizBtnContainer.appendChild(quizBtn)
    })
  })
}

function getRandomColor() {
  const components = Array.from({ length: 3 }, () => Math.floor(Math.random() * 255))
  const maxIndex = components.indexOf(Math.max(...components))
  components[maxIndex] = 255

  return components.join(', ')
}

createBtn()

function clickQuizBtn(event) {
  const player = JSON.parse(localStorage.getItem('player'))
  const subject = event.target.innerText
  const startTime = new Date()

  player.subject = subject
  player.startTime = startTime

  localStorage.setItem('player', JSON.stringify(player))
  //   location.href = '../quiz/quiz.html'
}
