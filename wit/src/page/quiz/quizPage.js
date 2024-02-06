import Quiz from './components/quiz.js'

const $imgBox = document.querySelector('.img-box')

// window.addEventListener('load', () => {
//   const data = {
//     name: 'jun',
//     subject: 'programming',
//     startTime: new Date(),
//   }
//   localStorage.setItem('player', JSON.stringify(data))
// })

const { name, subject } = JSON.parse(localStorage.getItem('player'))
const quiz = new Quiz($imgBox, name, subject)
