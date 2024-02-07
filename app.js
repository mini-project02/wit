function getUserNickname() {
  const loginInput = document.getElementById('login-input')
  const player = {
    name: loginInput.value,
    subject: '',
    startTime: '',
  }

  localStorage.setItem('player', JSON.stringify(player))
  location.href = '/src/page/quiz_home/quiz_home.html'
}
