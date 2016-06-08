  var fs = require('fs');
  var SerialPort = require("serialport").SerialPort
  var serialPort = new SerialPort("//file location",
  baudrate: 250000
  });
  var state = {
      distmode: true, // true = abs, false = rel
      extruderTemp: 215,
      bedTemp: 85,
      x: 0,
      y: 0,
      z: 0,
      xMin: 000,
      xMax: 400,
      yMin: 000,
      yMax: 500,
      zMin: 000,
      zMax: 800,
      extruderSteps: 0;
  }
  var sent = false;
  var location = -1;
  var elapsedtime = 0;

  SendGcode("teensy");

  function SendGcode(file) {
      var gcodefile = +file + ".gcode";
      var lineReader = require('readline').createInterface({
          input: require('fs').createReadStream(gcodefile)
      })

      elapsedtime = 0;
      lineReader.on('line', function(line) {
          if (sent) {
              console.log(line);
          }
      })
  }
