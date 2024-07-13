'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var putCommas = function putCommas(value) {
  try {
    if (!value) return value;
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } catch (err) {
    return value;
  }
};

exports.putCommas = putCommas;
