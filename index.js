const Twit = require('twit')
const config = require('./config/config') //imports keys

// Retorna un número aleatorio entre min (incluido) y max (excluido)
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

'use strict';

const fs = require('fs')

fs.readFile('./esalditegia.json', 'utf8', (err, esalditegiaJSON) => {
    if (err) {
        console.log("File read failed:", err)
        return
    }
    let esalditegia = JSON.parse(esalditegiaJSON)

    const ausa = getRandomInt(0, esalditegia.esaldiak.length)
    let gaurkoEsaldia = esalditegia.esaldiak[ausa]

    if (gaurkoEsaldia.Erabilgarri) {
      let T = new Twit(config)
      T.post('statuses/update', { status: gaurkoEsaldia.Esaldia }, function(err, data, response) {
        gaurkoEsaldia.Erabilgarri = false
        console.log(data.text)
      })
    } else {
      console.log("errepikatua");
      //beste saiakera vat
    }
    console.log(esalditegia.esaldiak[0].Erabilgarri)

    const eguneraketaJSON = JSON.stringify(esalditegia, null, 2)
    fs.writeFile('./esalditegia.json', eguneraketaJSON, (err) => {
        if (err) console.log('Error writing file:', err)
    })
})
