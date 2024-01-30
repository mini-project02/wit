const button = document.getElementById('testbutton')
const stopbutton = document.getElementById('stopbutton')

let startTime

button.addEventListener('click', function () {
  // 기록 시작 시간
  startTime = new Date()
  localStorage.setItem('start_time', startTime.toString())
  console.log('시작 시간:', startTime)
})

stopbutton.addEventListener('click', function () {
  // 현재 시간 기록
  const stopTime = new Date()
  localStorage.setItem('stop_time', stopTime.toString())
  console.log('종료 시간:', stopTime)

  // 시작 시간 불러오기
  const storedStartTime = localStorage.getItem('start_time')
  const startTime = new Date(storedStartTime)
  console.log('시작 시간:', startTime)

  // 두 시간의 차이 계산
  const timeDifference = stopTime - startTime

  // 차이를 분과 초로 변환
  const minutesDifference = Math.floor(timeDifference / (1000 * 60))
  const secondsDifference = Math.floor((timeDifference % (1000 * 60)) / 1000)

  console.log('경과 시간:', minutesDifference, '분', secondsDifference, '초')
})
