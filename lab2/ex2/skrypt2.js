window.onload = loadData

let idClient = 0
let idProduct = 0

let clients = [
  {id: idClient++, name: 'Billy', surname: 'Bigboy'},
  {id: idClient++, name: 'Szpinack', surname: 'Mister'},
]

let products = [
  {id: idProduct++, name: 'Krakersy Lewiatan Chrup&Fun', price: 1, quantity: 2, month: 2, productClientId: 0},
  {id: idProduct++, name: 'Žatecký Světlý Ležák', price: 1, quantity: 2, month: 2, productClientId: 0},
  {id: idProduct++, name: 'Big Lager', price: 3, quantity: 5, month: 5, productClientId: 0},
  {id: idProduct++, name: 'Okocim MOCNE', price: 4, quantity: 5, month: 4, productClientId: 0},
  {id: idProduct++, name: 'Piwo Tesco Quality', price: 2, quantity: 2, month: 1, productClientId: 1},
]

const monthSum = (products) => {
  let sum = 0
  products.forEach(product => {
    sum += product.price * product.quantity
  })

  return sum
}

const drawChart = (client) => {
  const canvasNode = document.createElement('canvas')
  const context = canvasNode.getContext('2d')
  const width = canvasNode.width = 1000
  const height = canvasNode.height = 200
  const jumpRight = width / 12
  context.translate(0, height)

  let months = []

  for (let i = 1; i <= 12; i++) {
    months = [...months, {
      id: i, quantity: products.filter(product => product.productClientId === client.id
        && product.month === i).length, sum: monthSum(products.filter(product => product.productClientId === client.id
        && product.month === i))
    }]
  }

  let maxSum = 0
  months.forEach(month => {
    if (month.sum > maxSum)
      maxSum = month.sum
  })

  let maxQuantity = 0
  months.forEach(month => {
    if (month.quantity > maxQuantity)
      maxQuantity = month.quantity
  })

  context.scale(1, -1)

  const moveUp = 20

  months.forEach((month, i) => {
    context.fillStyle = '#ffa4ec'
    context.lineWidth = 1
    context.beginPath()
    context.rect(i / jumpRight, moveUp, jumpRight, (month.sum / maxSum) * 0.7 * height)
    context.closePath()
    context.fill()
    context.stroke()
  })


  const lineHeight = maxQuantity === 0 ? height : height / maxQuantity * 0.8

  let prevValue = months[0].quantity * lineHeight + moveUp
  let x = -jumpRight

  months.forEach((month) => {
    context.beginPath()
    context.moveTo(x + jumpRight / 2, prevValue)
    context.lineTo(x + jumpRight + jumpRight / 2, month.quantity * lineHeight + moveUp)
    context.lineWidth = 3
    context.lineCap = 'round'
    context.stroke()

    prevValue = month.quantity * lineHeight + moveUp
    x += jumpRight
  })

  x = -jumpRight
  context.scale(1, -1)

  months.forEach((month) => {
    context.fillStyle = '#3b8cee'
    context.font = '15px serif'
    context.fillText(month.id, x + jumpRight + width / 24, 0)
    context.stroke()
    x += jumpRight
  })

  return canvasNode
}

const loadClients = () => {
  const clientList = document.getElementById('list_clients')
  while (clientList.firstChild) {
    clientList.removeChild(clientList.firstChild)
  }

  clients.forEach((client) => {
    let sum = 0

    products.forEach(product => {
      if (product.productClientId === client.id)
        sum += product.price * product.quantity
    })

    const clientNode = document.createElement('LI')
    const infoNode = document.createTextNode('id: ' + client.id + ', Name: ' + client.name + ', Surname: ' +
      client.surname + ', Sum: ' + sum)

    clientNode.appendChild(infoNode)
    document.getElementById('list_clients').appendChild(clientNode)
    document.getElementById('list_clients').appendChild(drawChart(client))
    document.getElementById('list_clients').appendChild(document.createElement('BR'))
  })
}

const loadProducts = () => {
  const productList = document.getElementById('list_products')
  while (productList.firstChild) {
    productList.removeChild(productList.firstChild)
  }

  products.forEach((product) => {
    const productNode = document.createElement('LI')
    const infoNode = document.createTextNode('id: ' + product.id + ', client id: ' + product.productClientId +
      ', name: ' + product.name + ', price: ' + product.price + ', quantity: ' + product.quantity +
      ', month: ' + product.month)
    productNode.appendChild(infoNode)

    document.getElementById('list_products').appendChild(productNode)
  })
}

const addClient = () => {
  const name = document.forms['form_client_add'].elements[0].value
  const surname = document.forms['form_client_add'].elements[1].value

  clients = [...clients, {id: idClient++, name, surname}]
  loadData()
}

const deleteClient = () => {
  const id = parseInt(document.forms['form_client_delete'].elements[0].value)
  clients = clients.filter(client => client.id !== id)
  products = products.filter(product => product.productClientId !== id)

  loadData()
}

const addProduct = () => {
  const name = document.forms['form_product_add'].elements[0].value
  const price = parseFloat(document.forms['form_product_add'].elements[1].value)
  const quantity = parseInt(document.forms['form_product_add'].elements[2].value)
  const month = parseInt(document.forms['form_product_add'].elements[3].value)
  const productClientId = parseInt(document.forms['form_product_add'].elements[4].value)

  products = [...products, {id: idProduct++, name, price, quantity, month, productClientId}]
  loadData()
}

const deleteProduct = () => {
  const id = parseInt(document.forms['form_product_delete'].elements[0].value)
  products = products.filter(product => product.id !== id)
  loadData()
}

const loadData = () => {
  loadClients()
  loadProducts()
}