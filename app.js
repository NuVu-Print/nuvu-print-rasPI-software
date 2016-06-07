ar fs = require('fs');
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
    extruderSteps: 0
}
var location = -1
var elapsedtime = 0;
var speedXY = 500;
var speedZ = 100;
var speedXY = 50;
speedXY = speedXY / 1
speedZ = speedZ / 1
console.log(speedXY);
console.log(speedZ);

SendGcode()

function SendGcode(file) {
    var gcodefile = "gcode/" + file + ".gcode";
    var lineReader = require('readline').createInterface({
        input: require('fs').createReadStream(gcodefile)
    });

    elapsedtime = 0;
    lineReader.on('line', function(line) {
        var tokens = line.split(" ");
        // console.log(tokens);
        parseGcode(tokens);
        resToken();
    });
    console.log(tokens);
}
