const express = require('express')
const request = require('request')
const bodyParser = require('body-parser')
const cors = require('cors')

// CORS Proxy server

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const corsOptions = {
  origin: (origin, callback) => {
    callback(null, true)
  },
}
const rootUrl =
  'https://pipelinepilot.kinnate.com:9923/protocols/anon/Web%20Services/Kinnate/STANDALONE_CALCULATED_PROPERTIES_TABLE?$streamdata=*&$format=text&smiles='

// one endpoint
app.get('/', cors(corsOptions), (req, res) => {
  let smilesString = req.query.smiles
  const url = `${rootUrl}${smilesString}&$timeout=1000000`
  console.log(url)
  try {
    req.pipe(request({ rejectUnauthorized: false, url: url })).pipe(res)
  } catch (error) {
    console.error(error)
    res.send(error)
  }
})

const port = process.env.PORT || 5500
app.listen(port, () => {
  console.log(`CORS proxy server listening on port ${port}`)
})
