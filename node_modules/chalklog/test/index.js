var Logger = require('../index');
var log = new Logger('scope');

log.red('red');
log.bgGreen('bgGreen');
log.blue.bgRed.bold('blue+bgRed+bold');
