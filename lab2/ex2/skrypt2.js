var clients = []
var items = []
var records = []

function parseInputRecord() {
  var newRecord = new Object()
  newRecord['name'] = document.forms['recordAdd'].elements[0].value
  newRecord['surname'] = document.forms['recordAdd'].elements[1].value
  newRecord['item'] = document.forms['recordAdd'].elements[2].value
  newRecord['price'] = document.forms['recordAdd'].elements[3].value
  newRecord['quantity'] = document.forms['recordAdd'].elements[4].value
  newRecord['month'] = document.forms['recordAdd'].elements[5].value
  records.push(newRecord)

  console.log(records)

  for (var i = 0; i < records.length; i++) {
    document.getElementById('records').innerHTML = records[i][0]
  }
}

function parseInputClient() {
  var newClient = new Object()
  newClient['id'] = document.forms['clientAdd'].elements[0].value
  newClient['name'] = document.forms['clientAdd'].elements[1].value
  newClient['surname'] = document.forms['clientAdd'].elements[2].value
  clients.push(newClient)

  console.log(clients)

  for (var i = 0; i < items.length; i++) {
    document.getElementById('items').innerHTML = items.toString()
  }
}

function parseInputItem() {
  var newItem = new Object()
  newItem['name'] = document.forms['itemAdd'].elements[0].value
  items.push(newItem)

  console.log(items)

  for (var i = 0; i < clients.length; i++) {
    document.getElementById('clients').innerHTML = clients.toString()
  }
}

function deleteRecord() {

}
