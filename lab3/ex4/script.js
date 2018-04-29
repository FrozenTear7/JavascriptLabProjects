// 0 - left, 1 - up, 2 - right, 3 - down
let keyDown = null
let circleX, circleY
let ctx

const check = (e) => {
  if(e.keyCode < 41 && e.keyCode > 36)
  keyDown = e.keyCode - 36
}

const drawRect = (ctx) => {
  ctx.fillStyle = '#3aee08'
  ctx.fillRect(25, 25, 100, 100)
}

const drawCircle = () => {
  if (keyDown) {
    let x = 0, y = 0
    if (keyDown === 1) {
      x = -5
    } else if (keyDown === 2) {
      y = -5
    } else if (keyDown === 3) {
      x = 5
    } else if (keyDown === 4) {
      y = 5
    }

    ctx.beginPath()
    ctx.arc(circleX + x, circleY + y, 50, 0, 2 * Math.PI)
    circleX += x
    circleY += y
    ctx.stroke()
  }
  window.requestAnimationFrame(drawCircle)
}

const canvasInit = () => {
  let canvas = document.getElementById('game')
  circleX = canvas.width / 2
  circleY = canvas.height / 2
  ctx = canvas.getContext('2d')

  ctx.beginPath()
  ctx.arc(circleX, circleY, 50, 0, 2 * Math.PI)
  ctx.stroke()

  drawRect(ctx)
}

window.onload = canvasInit
window.addEventListener('keydown', check, false)
window.requestAnimationFrame(drawCircle)

