/**
 * Shared tools used throughout the app
 */
const _ = require('lodash');

function replace(str, match, fn) {
  let [curCharStart, curCharLen] = [0, 0];

  if (str === '') {
    return str;
  } else if (!str || !_.isString(str)) {
    throw new TypeError('First argument to react-string-replace#replaceString must be a string');
  }

  let re = match;

  if (!_.isRegExp(re)) {
    re = new RegExp('(' + _.escapeRegExp(re) + ')', 'gi');
  }

  const result = str.split(re);

  // Apply fn to all odd elements
  for (let i = 1, length = result.length; i < length; i += 2) {
    curCharLen = result[i].length;
    curCharStart += result[i - 1].length;
    result[i] = fn(result[i], i, curCharStart);
    curCharStart += curCharLen;
  }

  return result;
}

export function StringReplace(source, match, fn) {
  if (!Array.isArray(source)) source = [source];

  return _.flatten(source.map(function(x) {
    return _.isString(x) ? replace(x, match, fn) : x;
  }));
};
