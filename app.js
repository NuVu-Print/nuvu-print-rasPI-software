#!/usr/bin/env node
let fs = require('fs');
let SerialPort = require("serialport").SerialPort
let serialPort = new SerialPort("//file location", {
  baudrate: 250000
});

SendGcode("teensy");

function SendGcode(file) {
  let gcodefile = +file + ".gcode";
  let lineReader = require('readline').createInterface({
    input: require('fs').createReadStream(gcodefile)
  })

  console.log(line)

}
