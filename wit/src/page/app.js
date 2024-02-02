function getUserNickname() {
  const loginInput = document.getElementById('login-input')
  const player = {
    name: loginInput.value,
    subject: '',
    startTime: '',
  }

  console.log(loginInput.value)
  localStorage.setItem('player', JSON.stringify(player))
  console.log('Before Redirect')
  location.href = 'quiz_home.html'
  console.log('After Redirect')
}

function createQuizBtn() {
  const quizs = []
}
//이름바꿈
