import Quiz from './components/quiz.js'

const $img = document.querySelector('.img')

// test localstorage data
window.addEventListener('load', () => {
  const data = {
    name: 'jun',
    subject: 'test',
    currentTime: new Date(),
  }
  localStorage.setItem('player', JSON.stringify(data))
})

const { name, subject } = JSON.parse(localStorage.getItem('player'))
const quiz = new Quiz($img, name, subject)
