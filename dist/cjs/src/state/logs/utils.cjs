'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * Converts a filter to the corresponding string key
 * @param filter the filter to convert
 */
function filterToKey(filter) {
  var _filter$address, _filter$topics$map$jo, _filter$topics, _filter$fromBlock, _filter$toBlock;
  return "".concat((_filter$address = filter.address) !== null && _filter$address !== void 0 ? _filter$address : "", ":").concat((_filter$topics$map$jo = (_filter$topics = filter.topics) === null || _filter$topics === void 0 || (_filter$topics = _filter$topics.map(function (topic) {
    return topic ? Array.isArray(topic) ? topic.join(";") : topic : "\0";
  })) === null || _filter$topics === void 0 ? void 0 : _filter$topics.join("-")) !== null && _filter$topics$map$jo !== void 0 ? _filter$topics$map$jo : "", ":").concat((_filter$fromBlock = filter.fromBlock) !== null && _filter$fromBlock !== void 0 ? _filter$fromBlock : "", ":").concat((_filter$toBlock = filter.toBlock) !== null && _filter$toBlock !== void 0 ? _filter$toBlock : "");
}

/**
 * Convert a filter key to the corresponding filter
 * @param key key to convert
 */
function keyToFilter(key) {
  var pcs = key.split(":");
  var address = pcs[0];
  var topics = pcs[1].split("-").map(function (topic) {
    if (topic === "\0") return null;
    var parts = topic.split(";");
    if (parts.length === 1) return parts[0];
    return parts;
  });
  var fromBlock = pcs[2];
  var toBlock = pcs[3];
  return {
    address: address.length === 0 ? undefined : address,
    topics: topics,
    fromBlock: fromBlock.length === 0 ? undefined : fromBlock,
    toBlock: toBlock.length === 0 ? undefined : toBlock
  };
}

/**
 * Determines whether a filter is for a historical log that doesn't need to be re-fetched.
 * @param filter The filter to check.
 * @param blockNumber The current block number.
 */
function isHistoricalLog(filter, blockNumber) {
  if (!filter.toBlock) return false;
  var toBlock = filter.toBlock;
  if (typeof toBlock === "string") toBlock = Number.parseInt(toBlock);
  return toBlock <= blockNumber;
}

exports.filterToKey = filterToKey;
exports.isHistoricalLog = isHistoricalLog;
exports.keyToFilter = keyToFilter;
