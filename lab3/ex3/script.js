const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const launchCounter = async () => {
  let counter = document.forms['initialValue'].elements[0].value
  const spanList = document.querySelectorAll('span')

  while (true) {
    if (counter >= 0) {
      spanList.forEach(span => {
        span.removeChild(span.firstChild)
        span.appendChild(document.createTextNode(String(counter) + ' '))
      })
      counter--
    }
    await sleep(1000)
  }
}