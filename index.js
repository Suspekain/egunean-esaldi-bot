const Twit = require('twit')

const T = new Twit({
  consumer_key:         'gH8c6mEqJFWYtrsSX4kNIL5FI',
  consumer_secret:      'Izx7gHyWOgc2cDJvhgKRQkDQyv525uUiWupeMoJcdmLWKVzudv',
  access_token:         '1466771736054149120-MW6LGaD9XveBbFM8zkXZzfuKeKFgHQ',
  access_token_secret:  'WBIFCbSetSocSkRSYPiLP2vsrUi29gxru0s5vinTlL5KJ',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  strictSSL:            true,     // optional - requires SSL certificates to be valid.
})

// Retorna un número aleatorio entre min (incluido) y max (excluido)
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

'use strict';

const fs = require('fs')
const config = require('./esalditegia.json')

fs.readFile('./esalditegia.json', 'utf8', (err, esalditegiaJSON) => {
    if (err) {
        console.log("File read failed:", err)
        return
    }
    let esalditegia = JSON.parse(esalditegiaJSON)

    const ausa = getRandomInt(0, esalditegia.esaldiak.length)
    let gaurkoEsaldia = esalditegia.esaldiak[ausa]

    if (gaurkoEsaldia.Erabilgarri) {
      gaurkoEsaldia.Erabilgarri = false
      console.log(gaurkoEsaldia.Esaldia);
      T.post('statuses/update', { status: gaurkoEsaldia.Esaldia }, function(err, data, response) {
        console.log(data.text)
      })
    } else {
      console.log("errepikatua");
    }
    console.log(esalditegia.esaldiak[0].Erabilgarri)

    const eguneraketaJSON = JSON.stringify(esalditegia, null, 2)
    fs.writeFile('./esalditegia.json', eguneraketaJSON, (err) => {
        if (err) console.log('Error writing file:', err)
    })
})
