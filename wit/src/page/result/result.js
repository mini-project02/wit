const playerJSON = window.localStorage.getItem('player')
const player = JSON.parse(playerJSON)
//------체력 0 -------------

const testfalse = player.isSuccess
if (testfalse == false) {
  const time = document.getElementById('time')

  const startTime = new Date(player.startTime)
  const endTime = new Date(player.endTime)

  const timeDifference = endTime - startTime
  const minutes = Math.floor(timeDifference / (1000 * 60))
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000)

  const testtime = document.createElement('p')
  testtime.innerHTML = `${minutes}분 ${seconds}초`
  time.appendChild(testtime)

  const correctquiz = document.getElementById('correctquiz')

  const icon = document.createElement('p')
  icon.innerText = `${player.correct} 개 `
  correctquiz.appendChild(icon)

  const username = document.getElementById('username')

  const getname = document.createElement('p')
  getname.innerText = `${player.name} 님의 점수는?`
  username.appendChild(getname)

  const mainscore = document.getElementById('mainscore')

  const insertmainscore = document.createElement('p')
  insertmainscore.innerText = `실패`
  mainscore.appendChild(insertmainscore)

  const commend = document.getElementById('commend')

  const commendtext = document.createElement('p')
  commendtext.innerText = '좀 더 노력하세요!'
  commend.appendChild(commendtext)
} else {
  //------체력 0 -------------

  //------------남은체력(하트) 가져오기---------------
  const lefthp = document.getElementById('lefthp')
  const recordhp = player.hp

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
  const commend = document.getElementById('commend')

  const commendtext = document.createElement('p')
  commendtext.innerText = '참 잘했어요!'
  commend.appendChild(commendtext)

  //---------------맞은 문제수 표시----------------------

  const correctquiz = document.getElementById('correctquiz')

  const icon = document.createElement('p')
  icon.innerText = `${player.correct} 개 `
  correctquiz.appendChild(icon)

  //---------------맞은 문제수 표시----------------------

  //---------------경과시간 표시----------------------
  const time = document.getElementById('time')

  const startTime = new Date(player.startTime)
  const endTime = new Date(player.endTime)

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
  getname.innerText = `${player.name} 님의 점수는?`
  username.appendChild(getname)
  //-----------------이름 가져오기 ---------------------

  //------------------총점수-------------------
  const mainscore = document.getElementById('mainscore')

  const insertmainscore = document.createElement('p')
  plusscore = 0
  if (minutes < 1) {
    plusscore += 100
  }
  insertmainscore.innerText = `${player.hp * player.correct + plusscore}  점`
  mainscore.appendChild(insertmainscore)
  //------------------총점수-------------------
}
//--------oz 홈페이지 가기 ------------
const togooz = document.getElementById('togooz')

togooz.addEventListener('click', function () {
  window.open('https://ozcodingschool.com/', '_blank')
})
//--------oz 홈페이지 가기 ------------

//-------- 홈 가기 ------------

const togohome = document.getElementById('togohome')

togohome.addEventListener('click', function () {
  window.location.href = '/wit/src/page/index.html'
  localStorage.clear()
})

//-------- 홈 가기 ------------
//--------------링크 공유하기-----------------
// function clip() {
//   var url = ''
//   var textarea = document.createElement('textarea')
//   document.body.appendChild(textarea)
//   url = window.document.location.href
//   textarea.value = url
//   textarea.select()
//   document.execCommand('copy')
//   document.body.removeChild(textarea)
//   alert('URL이 복사되었습니다.')
// }

//--------------링크 공유하기-----------------
