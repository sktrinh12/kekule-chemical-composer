const express = require('express')
const request = require('request')
const cors = require('cors')

// CORS Proxy server

const app = express()

const corsOptions = {
  origin: (origin, callback) => {
    callback(null, true)
  },
}
const rootUrl =
  'https://pipelinepilot.kinnate.com:9923/protocols/anon/Web%20Services/Kinnate/'

// one endpoint
app.get('/', cors(corsOptions), (req, res) => {
  let smilesString = req.query.smiles
  let endpoint = req.query.endpoint
  if (!req.query.smiles || !req.query.endpoint) {
    return res.status(400).send({ error: 'Missing required query parameters' })
  }
  const url = [
    rootUrl,
    endpoint,
    '?$streamdata=*&$format=text&smiles=',
    smilesString,
    '&$timeout=1000000999',
  ].join('')
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
