# chalklog
A logger based on [chalk](https://github.com/chalk/chalk)

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]

### Usage

 `npm i chalklog`

```javascript
var Logger = require('chalklog');
var log = new Logger('scope');

log.red('red');
log.bgGreen('bgGreen');
log.blue.bgRed.bold('blue+bgRed+bold');
```

![](https://cdn.int64ago.org/slhbiuutwwbn5i6raoflxr.png)

### License
[![license][license-image]][license-url]

 [npm-url]: https://npmjs.org/package/chalklog
 [npm-image]: https://img.shields.io/npm/v/chalklog.svg

 [travis-url]: https://travis-ci.org/int64ago/chalklog
 [travis-image]: https://img.shields.io/travis/int64ago/chalklog.svg

 [license-url]: https://github.com/int64ago/chalklog/blob/master/LICENSE
 [license-image]: https://img.shields.io/github/license/int64ago/chalklog.svg