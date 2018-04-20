const elements = ['main', 'aside', 'footer']
let setCssHandler

const applyBgColor = (element) => {
  element.style.backgroundColor = 'blue'
}

const applyWidth = (element) => {
  element.style.width = '50%'
}

const applyMargin = (element) => {
  element.style.marginTop = '100px'
}

const applyTextCenter = (element) => {
  element.style.textAlign = 'center'
}

const applyTextIndent = (element) => {
  element.style.textIndent = '200px'
}

const applyOnce = () => {
  const element = document.getElementById(elements[Math.floor(Math.random() * elements.length)])
  switch (Math.floor(Math.random() * 5)) {
    case 0:
      applyBgColor(element)
      break
    case 1:
      applyWidth(element)
      break
    case 2:
      applyMargin(element)
      break
    case 3:
      applyTextCenter(element)
      break
    case 4:
      applyTextIndent(element)
      break
  }
}

const applyRepeat = () => {
  setCssHandler = setInterval(applyOnce, 1000)
}

const stopApply = () => {
  clearInterval(setCssHandler)
}

const myMove = () => {
  const elem = document.getElementById('aside')
  let pos = 0
  const id = setInterval(frame, 5)

  function frame() {
    if (pos === 350) {
      clearInterval(id)
    } else {
      pos++
      elem.style.top = pos + 'px'
      elem.style.left = pos + 'px'
    }
  }
}

const useCss = () => {
  const aside = document.getElementById('aside')
  aside.style.textAlign = 'left'
  aside.style.alignContent = 'right'
  aside.style.width = '50%'
  aside.style.cssFloat = 'right'
  aside.style.position = 'relative'
  aside.style.zIndex = '0'
  aside.className = 'azure border'

  const footer = document.getElementById('footer')
  footer.style.textAlign = 'center'
  footer.style.marginTop = '25px'
  footer.className = 'border'

  const header = document.getElementById('header')
  header.style.textAlign = 'center'
  header.className = 'azure border'

  const main = document.getElementById('main')
  main.style.textAlign = 'center'
  main.style.alignContent = 'left'
  main.style.width = '40%'
  main.style.position = 'relative'
  main.className = 'azure border'

  const nav = document.getElementById('nav')
  nav.style.marginLeft = '25px'
  nav.style.marginRight = '25px'

  const ul = document.getElementById('ul')
  ul.style.textAlign = 'center'
  ul.className = 'border'

  const li_1 = document.getElementById('li_1')
  li_1.style.display = 'inline'
  const li_2 = document.getElementById('li_2')
  li_2.style.display = 'inline'

  const ul2 = document.getElementById('ul2')
  ul2.style.textAlign = 'left'

  //myMove()
}

const eraseCss = () => {
  const aside = document.getElementById('aside')
  aside.style.textAlign = ''
  aside.style.alignContent = ''
  aside.style.width = ''
  aside.style.cssFloat = ''
  aside.style.position = ''
  aside.style.zIndex = ''
  aside.className = ''

  const footer = document.getElementById('footer')
  footer.style.textAlign = ''
  footer.style.marginTop = ''
  footer.className = ''

  const header = document.getElementById('header')
  header.style.textAlign = ''
  header.className = ''

  const main = document.getElementById('main')
  main.style.textAlign = ''
  main.style.alignContent = ''
  main.style.width = ''
  main.style.position = ''
  main.className = ''

  const nav = document.getElementById('nav')
  nav.style.marginLeft = ''
  nav.style.marginRight = ''

  const ul = document.getElementById('ul')
  ul.style.textAlign = ''
  ul.className = ''

  const li_1 = document.getElementById('li_1')
  li_1.style.display = ''
  const li_2 = document.getElementById('li_2')
  li_2.style.display = ''

  const ul2 = document.getElementById('ul2')
  ul2.style.textAlign = ''
}
