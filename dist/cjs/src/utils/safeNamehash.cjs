'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var hash = require('@ethersproject/hash');

function safeNamehash(name) {
  if (name === undefined) return undefined;
  try {
    return hash.namehash(name);
  } catch (error) {
    console.debug(error);
    return undefined;
  }
}

exports.safeNamehash = safeNamehash;
