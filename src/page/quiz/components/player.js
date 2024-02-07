class Player {
  #player

  constructor(name, subject) {
    this.#player = {
      name,
      subject,
      level: 1,
      hp: 5,
      endTime: 0,
      isSuccess: false,
      correct: 0,
    }
  }

  getSubject() {
    return this.#player.subject
  }

  getLevel() {
    return this.#player.level - 1
  }

  levelUp() {
    this.#player.level += 1
  }

  correctAnswer() {
    this.#player.correct += 1
  }

  getHp() {
    return this.#player.hp
  }

  reduceHp() {
    this.#player.hp -= 1
  }

  checkClear(quizLen) {
    if (this.#player.level === quizLen && this.#player.hp > 0) {
      this.#player.isSuccess = true
    }
  }

  endGame(quizLen) {
    if (this.#player.level === quizLen || this.#player.hp <= 0) {
      this.#player.endTime = new Date()
      return true
    }
    return false
  }

  goResultPage() {
    let player = localStorage.getItem('player')
    player = { ...JSON.parse(player), ...this.#player }
    localStorage.setItem('player', JSON.stringify(player))

    setTimeout(() => {
      window.location.href = '/src/page/result/result.html'
    }, 2000)
  }
}

export default Player
