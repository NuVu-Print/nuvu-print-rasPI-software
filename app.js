#!/usr/bin/env node
const fs = require('fs')
const SerialPort = require('serialport')
const _ = require('lodash')
const every = require('every-time-mirror')
const package = require('./package.json')

let lines = []
let lineReader = require('readline').createInterface({
  input: require('fs').createReadStream(process.argv[2])
})
lineReader.on('line', (line) => {
  if(line.charAt(0) !== ';' && line) {
    lines.push(line.split(';'[0]))
  }
})

SerialPort.list((err, ports) => {
  let chosenPort = ports[0].comName
  _.forEach(ports, (port) => {
    if(~_.lowerCase(port.manufacturer).indexOf('ultimachine')) chosenPort = port
  })
  let printer = new SerialPort.SerialPort(chosenPort.comName, {
    baudrate: 115200,
    parser: SerialPort.parsers.readline('\n')
  })

  printer.on('open', () => {

    const socket = require('socket.io-client')('ws://localhost:2001')
    socket.on('connect', () => {
      console.log(chosenPort)
      socket.emit('selfID', {
        type: 'printer',
        comName: chosenPort.comName,
        manufacturer: chosenPort.manufacturer,
        serialNumber: chosenPort.serialNumber,
        version: package.version
      })
    })

    let started = false
    let currCommand = 0
    printer.on('data', (data) => {
      console.log(data)
      if(started === true && currCommand < lines.length) {
        if(data === 'ok') {
          Gsend(printer, lines[currCommand])
          currCommand++
        }
      }
      if(data === 'start') {
        console.log('WE GOOD TO GO')
        setTimeout(() => {
          Gsend(printer, lines[0])
        }, 500)
        currCommand++
        started = true
      }
    })
  })
})

let Gsend = (printer, command) => {
  printer.write(command + '\n')
  console.log('SEND: ' + command)
}
