#!/usr/bin/env node
const fs = require('fs')
const SerialPort = require("serialport")
const _ = require('lodash')
const every = require('every-time-mirror')

SerialPort.list((err, ports) => {
  let printerPort = ports[0].comName
  _.forEach(ports, (port) => {
    if(~_.lowerCase(port.manufacturer).indexOf('ultimachine')) printerPort = port.comName
  })
  let printer = new SerialPort.SerialPort(printerPort, {
    baudrate: 115200,
    parser: SerialPort.parsers.readline('\n')
  })

  printer.on('open', () => {
    printer.on('data', (data) => {
      if(data === 'start') {
        sendGcode('teensy')
      }
    })
  })
})



// let serialPort = new SerialPort("//file location", {
//   baudrate: 250000
// });

function sendGcode(file) {
  let gcodefile = file + ".gcode";
  let lineReader = require('readline').createInterface({
    input: require('fs').createReadStream(gcodefile)
  })
}
