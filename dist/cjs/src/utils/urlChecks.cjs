'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function hasURL(str) {
  if (!str) return false;
  var pattern = new RegExp("([a-zA-Z0-9]+://)?" +
  // optional protocol
  "([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?" +
  //  optional username:password
  "([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})" +
  // host name and subdomain
  "(:[0-9]+)?(/.*)?" // optional port and path
  );

  return pattern.test(str);
}

exports.hasURL = hasURL;
