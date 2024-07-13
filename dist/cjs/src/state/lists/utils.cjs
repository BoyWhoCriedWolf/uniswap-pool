'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tokenLists = require('@uniswap/token-lists');

function shouldAcceptVersionUpdate(listUrl, current, update, targetBump) {
  var min = tokenLists.minVersionBump(current.tokens, update.tokens);
  // Automatically update minor/patch as long as bump matches the min update.
  if (targetBump >= min) {
    return true;
  } else {
    console.debug("List at url ".concat(listUrl, " could not automatically update because the version bump was only PATCH/MINOR while the update had breaking changes and should have been MAJOR"));
    return false;
  }
}

exports.shouldAcceptVersionUpdate = shouldAcceptVersionUpdate;
