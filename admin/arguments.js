const minimist = require('minimist');

const Args = minimist(process.argv.slice(2));

const ArgsProto = {

  getParams: function () {

    const params = {};
    for (const key in this) {
      if (this.hasOwnProperty(key)) {
        params[key] = this[key];
      }
    }
    delete params._;
    return params;

  }

};

const Arguments = Object.create(ArgsProto);
Object.assign(Arguments, Args);

Arguments._ = Arguments._[0];

module.exports = Arguments;

