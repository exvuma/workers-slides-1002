var chalk = require('chalk');
var timestamp = require('time-stamp');
var defineProps = Object.defineProperties;

function ChalkLogger(scope) {
  this.enabled = chalk.enabled;
  this.scope = scope || '';
};

var logger = function(log, scope) {
  var time = chalk.grey('[') + timestamp('HH:mm:ss') + chalk.grey('] ');
  var scope = scope ? chalk.grey('[') + chalk.bold(scope) + chalk.grey('] ') : '';
  console.log(time + scope + log);
};

var styles = (function () {
  var ret = {};
  Object.keys(chalk.styles).forEach(function (key) {
    ret[key] = {
      get: function () {
        return build.call(this, this._styles.concat(key));
      }
    };
  });
  return ret;
})();

var proto = defineProps(function() {}, styles);

var build = function(_styles) {
  var builder = function () {
    var fn = chalk;
    builder._styles.forEach(function(_style) {
      fn = fn[_style];
    });
    logger(fn.apply(builder, arguments), builder.scope);
  };
  builder._styles = _styles;
  builder.enabled = this.enabled;
  builder.scope = this.scope;
  builder.__proto__ = proto;
  return builder;
};

function init() {
  var ret = {};
  Object.keys(styles).forEach(function (name) {
    ret[name] = {
      get: function () {
        return build.call(this, [name]);
      }
    };
  });
  return ret;
}

defineProps(ChalkLogger.prototype, init());

module.exports = ChalkLogger;
