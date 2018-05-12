const fs = require('fs')

fs.readFile('./operations.json', 'utf8', (err, data) => {
  if (err)
    throw err

  let parsedData = (JSON.parse(data))

  parsedData.operations.forEach(op => {
    let result
    switch (op.type) {
      case '+':
        op.val.forEach(val => {
          if (!result)
            result = val
          else
            result += val
        })

        console.log(result)
        break
      case '-':
        op.val.forEach(val => {
          if (!result)
            result = val
          else
            result -= val
        })

        console.log(result)
        break
      case '*':
        op.val.forEach(val => {
          if (!result)
            result = val
          else
            result *= val
        })

        console.log(result)
        break
      case '/':
        op.val.forEach(val => {
          if (!result)
            result = val
          else
            result /= val
        })

        console.log(result)
        break
      default:
        console.log('Damn pass me some real operations for real')
        break
    }
  })
})
