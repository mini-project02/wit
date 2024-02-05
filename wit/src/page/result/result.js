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

//--------oz 홈페이지 가기 ------------
const togooz = document.getElementById('togooz')

togooz.addEventListener('click', function () {
  window.open('https://ozcodingschool.com/', '_blank')
})
//--------oz 홈페이지 가기 ------------

//-------- 홈 가기 ------------

const togohome = document.getElementById('togohome')

togohome.addEventListener('click', function () {
  window.location.href = 'page/index.html'
  localStorage.clear()
})

//-------- 홈 가기 ------------

//------연습데이터--------------
const currentTime = new Date()
const test = [
  {
    name: '강주원',
    subject: 'programming',
    level: 1,
    hp: 5,
    endTime: new Date(currentTime.getTime() + 5 * 60 * 1000),
    startTime: new Date(),
    isSuccess: true,
    correct: 9,
  },
  {
    name: '장요한',
    subject: 'programming',
    level: 2,
    hp: 0,
    endTime: new Date() + 3000,
    startTime: new Date(),
    isSuccess: false,
    correct: 3,
  },
  {
    name: '박사민',
    subject: 'programming',
    level: 2,
    hp: 1,
    endTime: new Date() + 3000,
    startTime: new Date(),
    isSuccess: true,
    correct: 10,
  },
]

//------연습데이터--------------

//------체력 0 -------------
let j = 0
const testfalse = test[j].isSuccess
console.log(testfalse)
if (testfalse == false) {
  const time = document.getElementById('time')

  const startTime = new Date(test[j].startTime)
  const endTime = new Date(test[j].endTime)

  const timeDifference = endTime - startTime
  const minutes = Math.floor(timeDifference / (1000 * 60))
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000)

  const testtime = document.createElement('p')
  testtime.innerHTML = `${minutes}분 ${seconds}초`
  time.appendChild(testtime)

  const correctquiz = document.getElementById('correctquiz')

  const icon = document.createElement('p')
  icon.innerText = `${test[j].correct} 개 `
  correctquiz.appendChild(icon)

  const username = document.getElementById('username')

  const getname = document.createElement('p')
  getname.innerText = `${test[j].name} 님의 점수는?`
  username.appendChild(getname)

  const mainscore = document.getElementById('mainscore')

  const insertmainscore = document.createElement('p')
  insertmainscore.innerText = `실패`
  mainscore.appendChild(insertmainscore)
} else {
  //------체력 0 -------------

  //------------남은체력(하트) 가져오기---------------
  const lefthp = document.getElementById('lefthp')
  const recordhp = test[j].hp

  if (recordhp === 5) {
    heartcount(5)
  } else if (recordhp === 4) {
    heartcount(4)
  } else if (recordhp === 3) {
    heartcount(3)
  } else if (recordhp === 2) {
    heartcount(2)
  } else if (recordhp === 1) {
    heartcount(1)
  } else {
  }
  function heartcount(count) {
    for (let i = 0; i < count; i++) {
      const leftheart = document.createElement('p')
      leftheart.innerHTML = '❤️'
      lefthp.appendChild(leftheart)
    }
  }

  //------------남은체력(하트) 가져오기---------------

  //---------------맞은 문제수 표시----------------------

  const correctquiz = document.getElementById('correctquiz')

  const icon = document.createElement('p')
  icon.innerText = `${test[j].correct} 개 `
  correctquiz.appendChild(icon)

  //---------------맞은 문제수 표시----------------------

  //---------------경과시간 표시----------------------
  const time = document.getElementById('time')

  const startTime = new Date(test[j].startTime)
  const endTime = new Date(test[j].endTime)

  const timeDifference = endTime - startTime
  const minutes = Math.floor(timeDifference / (1000 * 60))
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000)

  const testtime = document.createElement('p')
  testtime.innerHTML = `${minutes}분 ${seconds}초`
  time.appendChild(testtime)

  //---------------경과시간 표시----------------------

  //-----------------이름 가져오기 ---------------------
  const username = document.getElementById('username')

  const getname = document.createElement('p')
  getname.innerText = `${test[j].name} 님의 점수는?`
  username.appendChild(getname)
  //-----------------이름 가져오기 ---------------------

  //------------------총점수-------------------
  const mainscore = document.getElementById('mainscore')

  const insertmainscore = document.createElement('p')
  plusscore = 0
  if (minutes < 1) {
    plusscore += 100
  }
  insertmainscore.innerText = `${test[j].hp * test[j].correct + plusscore}  점`
  mainscore.appendChild(insertmainscore)
  //------------------총점수-------------------

  //--------------링크 공유하기-----------------
  function clip() {
    var url = ''
    var textarea = document.createElement('textarea')
    document.body.appendChild(textarea)
    url = window.document.location.href
    textarea.value = url
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)
    alert('URL이 복사되었습니다.')
  }

  //--------------링크 공유하기-----------------
}
