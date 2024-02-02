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
      console.log('게임종료 -> result 페이지 이동')
      this.#player.endTime = new Date()
      return true
    }

    return false
  }
}

export default Player
