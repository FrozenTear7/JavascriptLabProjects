let state = 1

const indexMe = () => {
  console.log('gowno')
  const elements = document.querySelectorAll('*')
  let h1Index = 0
  let h2Index = 1

  elements.forEach(header => {
    if (header.nodeName === 'H1') {
      header.removeChild(header.childNodes[0])
      header.appendChild(document.createTextNode(String(++h1Index)))
      h2Index = 1
    } else if (header.nodeName === 'H2') {
      header.removeChild(header.childNodes[0])
      header.appendChild(document.createTextNode(String(h1Index) + '.' + String(h2Index++)))
    }
  })

  if(state === 1)
    state = 0
  else
    state = 1
}
