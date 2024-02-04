async function getQuizs() {
  return fetch('../../data.json')
    .then((response) => response.json())
    .then((json) => json.map((ele) => ele.subject))
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

      quizBtn.style.backgroundColor = `rgba(${randomColor},70%)`
      quizBtnContainer.appendChild(quizBtn)
    })
  })
}

function getRandomColor() {
  const components = Array.from({ length: 3 }, () => Math.floor(Math.random() * 256))
  const maxIndex = components.indexOf(Math.max(...components))
  components[maxIndex] = 255

  return components.join(', ')
}

createBtn()
