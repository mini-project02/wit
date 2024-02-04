function getUserNickname() {
  const loginInput = document.getElementById('login-input')
  const player = {
    name: loginInput.value,
    subject: '',
    startTime: '',
  }

  localStorage.setItem('player', JSON.stringify(player))
  location.href = 'quiz_home/quiz_home.html'
}

//이름바꿈
