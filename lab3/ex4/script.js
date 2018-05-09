let canvas = document.getElementById('game')
let ctx = canvas.getContext('2d')

// 0 - left, 1 - up, 2 - right, 3 - down
let keyDown = null
let width, height
let circleX, circleY
let points = 0
let timer = 20
let globalTimer = 60
let curTime = new Date, curGlobalTime = new Date
let gameMode = 1
let newNick
let scores = [{nick: 'xd', score: 100}, {nick: 'szpenus', score: 200}]

let rectArr = []


const check = (e) => {
  if (e.keyCode < 41 && e.keyCode > 36)
    keyDown = e.keyCode - 36
}

const checkPoints = () => {
  rectArr.forEach(rect => {
    if (circleX <= rect.x + 50 && circleX >= rect.x && circleY <= rect.y + 50 && circleY >= rect.y && !rect.touched) {
      let audio = new Audio('gachi1.mp3')
      audio.play()
      const tmpId = rect.id
      points += timer
      rectArr.map(rect => {
        if (rect.id === tmpId)
          rect.touched = true
      })
    }
  })
}

const HUD = () => {
  checkPoints()

  document.getElementById('score').innerHTML = points
  document.getElementById('time').innerHTML = globalTimer
  document.getElementById('timer').innerHTML = timer
}

const drawCircle = () => {
  if (keyDown) {
    let x = 0, y = 0
    if (keyDown === 1) {
      x = -5 * gameMode
    } else if (keyDown === 2) {
      y = -5 * gameMode
    } else if (keyDown === 3) {
      x = 5 * gameMode
    } else if (keyDown === 4) {
      y = 5 * gameMode
    }

    ctx.beginPath()
    let newX = circleX + x, newY = circleY + y

    if (newX < 0)
      newX = width
    if (newX > width)
      newX = 0
    if (newY < 0)
      newY = height
    if (newY > height)
      newY = 0

    ctx.arc(newX, newY, 20, 0, 2 * Math.PI)
    circleX = newX
    circleY = newY
    ctx.stroke()
  }
}

const dateDiff = (date1, date2) => {
  return date1.getTime() - date2.getTime()
}

const animateCanvas = () => {
  ctx.clearRect(0, 0, width, height)

  if (timer === 20) {
    timer = 20
    for (let i = 0; i < 5 * gameMode; i++) {
      const rectX = Math.floor(Math.random() * width - 50), rectY = Math.floor(Math.random() * height - 50)
      rectArr[i] = {id: i, x: rectX, y: rectY, touched: false}
    }
    timer--
  }

  drawCircle()

  for (let i = 0; i < 5 * gameMode; i++) {
    if (rectArr[i]) {
      if (!rectArr[i].touched) {
        if (timer > 0)
          ctx.fillStyle = '#3aee08'
        else
          ctx.fillStyle = '#ee000d'
      } else
        ctx.fillStyle = '#000000'

      ctx.fillRect(rectArr[i].x, rectArr[i].y, 50, 50)
    }
  }

  HUD()

  const newTime = new Date
  if (dateDiff(newTime, curGlobalTime) > 1000) {
    globalTimer--
    curGlobalTime = newTime
  }

  if (dateDiff(newTime, curTime) > 1000 / gameMode) {
    timer--
    curTime = newTime
  }

  if (timer === -5)
    timer = 20

  if (globalTimer === 20 && gameMode !== 3)
    gameMode = 3
  else if (globalTimer === 40 && gameMode !== 2)
    gameMode = 2

  if (globalTimer >= 0)
    window.requestAnimationFrame(animateCanvas)
  else {
    scores = [...scores, {nick: newNick, score: points}]
    scores = scores.sort((a, b) => b.score - a.score)

    for (let i = 0; i < 3; i++) {
      if (scores[i]) {
        document.getElementById(`best${i + 1}name`).innerHTML = scores[i].nick
        document.getElementById(`best${i + 1}score`).innerHTML = scores[i].score
      }
    }
  }
}

const canvasInit = () => {
  console.log('xd')
  let canvas = document.getElementById('game')
  ctx = canvas.getContext('2d')
  console.log('xd')
}

const startGame = () => {
  points = 0
  timer = 20
  globalTimer = 60
  curTime = new Date
  curGlobalTime = new Date
  gameMode = 1
  newNick = document.forms['launchGame'].elements[0].value

  width = canvas.width
  height = canvas.height
  circleX = canvas.width / 2
  circleY = canvas.height / 2

  scores = scores.sort((a, b) => b.score - a.score)

  for (let i = 0; i < 3; i++) {
    if (scores[i]) {
      document.getElementById(`best${i + 1}name`).innerHTML = scores[i].nick
      document.getElementById(`best${i + 1}score`).innerHTML = scores[i].score
    }
  }

  window.requestAnimationFrame(animateCanvas)
}

//window.onload = canvasInit
window.addEventListener('keydown', check, false)
window.requestAnimationFrame(drawCircle)

