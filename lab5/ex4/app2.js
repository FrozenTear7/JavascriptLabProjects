const request = require('request')
request('https://api-v3.mojepanstwo.pl/dane/krs_podmioty.json?conditions[krs_podmioty.wojewodztwo_id]=7&limit=1000', (error, response, body) => {

  let parsed = JSON.parse(body)

  parsed.Dataobject.forEach(elem => {
    request('https://api-v3.mojepanstwo.pl/dane/krs_podmioty/' + elem.id + '.json?layers[]=firmy', (error, response, contents) => {
      let companiesData = (JSON.parse(contents))
      if (companiesData.layers.firmy.length > 0) {
        companiesData.layers.firmy.forEach(com => {
          console.log('Udzialowcy')
          console.log(com)
        })
      }
    })
  })

})
