const Twit = require('twit')

const T = new Twit({
  consumer_key:         '0LRgWilk74bPU7qXpckESgxLi',
  consumer_secret:      'vBJDADUlSh16QBj3o4ILoxTrGvmPni9Ce1vaLOzJPz6QUblE0Z',
  access_token:         '1466771736054149120-YZqu6FoIWGvkS3fuPP39geVef3qA2R',
  access_token_secret:  'GQQvP8ls9JiV7uOzoXLHXIBqAU2DSTrADjKH03RLXRLMd',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  strictSSL:            true,     // optional - requires SSL certificates to be valid.
})

// Retorna un número aleatorio entre min (incluido) y max (excluido)
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

'use strict';

const fs = require('fs');
const editJsonFile = require("edit-json-file");

let rawdata = fs.readFileSync('esalditegia.json');
let esalditegia = JSON.parse(rawdata);

const ausa = getRandomInt(0, esalditegia.esaldiak.length)
let gaurkoEsaldia = esalditegia.esaldiak[ausa]

if (gaurkoEsaldia.Erabilgarri) {
  console.log(gaurkoEsaldia.Esaldia);
  esalditegia.esaldiak[ausa].Erabilgarri = false;

  let update = editJsonFile(`${__dirname}/esalditegia.json`);
  update.set(JSON.stringify(esalditegia));
  update.save();
  update = editJsonFile(`${__dirname}/esalditegia.json`, {
    autosave: true
  })
} else {
  console.log("Kopiati");
}

//T.post('statuses/update', { status: 'hello world!' }, function(err, data, response) {
//  console.log(data)
//})
