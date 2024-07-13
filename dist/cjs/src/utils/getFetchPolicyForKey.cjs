'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var keys = new Map();
var getFetchPolicyForKey = function getFetchPolicyForKey(key, expirationMs) {
  var lastFetchTimestamp = keys.get(key);
  var diffFromNow = lastFetchTimestamp ? Date.now() - lastFetchTimestamp : Number.MAX_SAFE_INTEGER;
  var fetchPolicy = "cache-first";
  if (diffFromNow > expirationMs) {
    keys.set(key, Date.now());
    fetchPolicy = "network-only";
  }
  return fetchPolicy;
};

exports.getFetchPolicyForKey = getFetchPolicyForKey;
