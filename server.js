const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser')
const electron = require('electron')

const app = express();
const port = process.env.PORT || 3000
const _ = require('lodash')

app.use(bodyParser.json());
app.use(express.static(__dirname + '/'))
app.use('/', express.static(__dirname + '/'))
app.set('json spaces', 2);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html')
})

app.listen(port, function(error) {
  if (error) throw error
    console.log('Express server listening on port', port)
})

// electron.app.on('ready', function() {
//   var main = new electron.BrowserWindow()
//   main.maximize()
//   main.webContents.openDevTools()
//   main.loadURL('http://localhost:3000/')
//   main.on('closed', electron.app.quit)
// })

