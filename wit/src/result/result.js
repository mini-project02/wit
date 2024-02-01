// const button = document.getElementById('testbutton')
// const stopbutton = document.getElementById('stopbutton')

// let startTime

// button.addEventListener('click', function () {
//   // 기록 시작 시간
//   startTime = new Date()
//   localStorage.setItem('start_time', startTime.toString()) // tostring을 이용해 객체에서 문자열로 바꿔주기
//   console.log('시작 시간:', startTime)
// })

// stopbutton.addEventListener('click', function () {
//   // 현재 시간 기록
//   const stopTime = new Date()
//   localStorage.setItem('stop_time', stopTime.toString())
//   console.log('종료 시간:', stopTime)

//   // 시작 시간 불러오기
//   const storedStartTime = localStorage.getItem('start_time')
//   const startTime = new Date(storedStartTime) // 불러온 start_time은 문자열 -> 객체로 변환
//   console.log('시작 시간:', startTime)

//   // 두 시간의 차이 계산
//   const timeDifference = stopTime - startTime

//   // 차이를 분과 초로 변환
//   const minutesDifference = Math.floor(timeDifference / (1000 * 60))
//   const secondsDifference = Math.floor((timeDifference % (1000 * 60)) / 1000)

//   console.log('경과 시간:', minutesDifference, '분', secondsDifference, '초')
// })

//링크 공유

// function clip() {
//   var url = '' // <a>태그에서 호출한 함수인 clip 생성
//   var textarea = document.createElement('textarea')
//   //url 변수 생성 후, textarea라는 변수에 textarea의 요소를 생성

//   document.body.appendChild(textarea) //</body> 바로 위에 textarea를 추가(임시 공간이라 위치는 상관 없음)
//   url = window.document.location.href //url에는 현재 주소값을 넣어줌
//   textarea.value = url // textarea 값에 url를 넣어줌
//   textarea.select() //textarea를 설정

//   document.body.removeChild(textarea) //extarea 요소를 없애줌

//   alert('URL이 복사되었습니다.') // 알림창
// }

// const facebook = document.getElementById('facebook')

// function togonaver() {
//   facebook.addEventListener('click', function () {
//     alert('asdfasdfasdf')
//   })
// }

const togooz = document.getElementById('togooz')

togooz.addEventListener('click', function () {
  window.open('https://ozcodingschool.com/', '_blank')
})
