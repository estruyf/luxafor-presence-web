const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const fetch = require('node-fetch');

const API_URL = "https://api.luxafor.com/webhook/v1/actions/solid_color";

const app = express();
app.use(express.static(path.join(__dirname, 'build')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/setColor', async (req, res) => {
  let body = req.body || null;
  if (!body) {
    return res.status(404).send('nok');;
  }

  const result = await fetch(API_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(body)
  });

  if (result && result.ok) {
    return res.status(200).send('ok');
  }

  return res.status(404).send('nok');
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(process.env.PORT || 8080);