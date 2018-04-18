let timeFunInterval, timeFunTimeout, timeFunRequest
let funIntervalHandler, funTimeoutHandler, funRequestHandler = false

const slowOperationsOuch = () => {
  for (let i = 0; i < 100000000; i++) {
    let x = 3
    x = 6.9 * i * 4200000 * 9000000.6
  }
}

const funInterval = () => {
  slowOperationsOuch()
  const newDate = new Date()
  timeFunInterval = newDate.getTime() - timeFunInterval
  console.log('fun interval: ' + timeFunInterval + ' ms')
  console.log('----------------------------------')
  timeFunInterval = newDate.getTime()
}

const funTimeout = () => {
  slowOperationsOuch()
  const newDate = new Date()
  timeFunTimeout = newDate.getTime() - timeFunTimeout
  console.log('fun timeout: ' + timeFunTimeout + ' ms')
  console.log('----------------------------------')
  timeFunTimeout = newDate.getTime()
  funTimeoutHandler = window.setTimeout(funTimeout, 1000)
}

const funRequest = () => {
  slowOperationsOuch()
  const newDate = new Date()
  timeFunRequest = newDate.getTime() - timeFunRequest
  console.log('fun request: ' + timeFunRequest + ' ms')
  console.log('_________________________________')
  timeFunRequest = newDate.getTime()
  if (funRequestHandler)
    window.requestAnimationFrame(funRequest)
}

const launchFunctions = () => {
  const newDate = new Date()
  timeFunInterval = newDate.getTime()
  timeFunRequest = newDate.getTime()
  timeFunTimeout = newDate.getTime()

  funIntervalHandler = setInterval(funInterval, 1000)
  funTimeoutHandler = window.setTimeout(funTimeout, 1000)
  //window.requestAnimationFrame(funRequest)
  funRequestHandler = true
}

const stopFunctions = () => {
  clearInterval(funIntervalHandler)
  window.clearTimeout(funTimeoutHandler)
  funRequestHandler = false
}