'use strict';

const SUFFIXES = ['', 'k', 'M', 'B', 'T', 'Q'];
const round = require('./round');

class HumanizePipe {

  constructor() {
    this.transform = this.transform.bind(this);
  }


  transform(number, precision) {
    if (precision === undefined) precision = 1;
    if (!number) return '0';
    if (number > -1 && number < 1) return this._stringify(number, precision);

    let suffixIndex = this._suffixIndex(number);
    let value = number / Math.pow(1000, suffixIndex);

    return this._stringify(value, precision) + SUFFIXES[suffixIndex];
  }


  _suffixIndex(number) {
    return Math.floor(Math.log(Math.abs(number)) / Math.log(1000));
  }



  _stringify(num, precision) {
    return round(num, precision).toString();
  }

}

module.exports = new HumanizePipe().transform;
