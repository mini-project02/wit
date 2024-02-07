class Toast {
  #result
  #color
  #svg

  constructor(result, color) {
    this.#result = result
    this.#color = color
    this.addSvg()
  }

  createMessage($target) {
    const $div = document.createElement('div')
    const $span = document.createElement('span')
    let timer = 100

    $div.className = `message ${this.#result}`
    $span.className = 'bar'
    $span.style.backgroundColor = `${this.#color}`

    $div.innerHTML += `${this.#svg} ${this.#result}`
    $div.appendChild($span)

    $target.appendChild($div)

    const interval = setInterval(() => {
      $span.style.width = timer
      timer -= 10
    }, 10)

    setTimeout(() => {
      clearInterval(interval)
      $target.removeChild($div)
    }, 1000)
  }

  render() {
    const $toast = document.querySelector('.toast')
    this.createMessage($toast)
  }

  addSvg() {
    switch (this.#result) {
      case 'correct':
        this.#svg = `<svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="${this.#color}"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>`
        break

      case 'timeover':
        this.#svg = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="${
          this.#color
        }" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
          </svg>
          `
        break

      case 'wrong':
        this.#svg = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="${
          this.#color
        }" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
        `
        break
    }
  }
}

export default Toast
