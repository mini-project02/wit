import Quiz from './components/quizGame.js'

const $imgBox = document.querySelector('.img-box')

const { name, subject } = JSON.parse(localStorage.getItem('player'))
new Quiz($imgBox, name, subject)
