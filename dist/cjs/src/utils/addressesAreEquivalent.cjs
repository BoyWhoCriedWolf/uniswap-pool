'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function addressesAreEquivalent(a, b) {
  if (!a || !b) return false;
  return a === b || a.toLowerCase() === b.toLowerCase();
}

exports.addressesAreEquivalent = addressesAreEquivalent;
