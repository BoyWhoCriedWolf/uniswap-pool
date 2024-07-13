'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var types = require('./types.cjs');

var connectionMetaKey = "connection_meta";
function getPersistedConnectionMeta() {
  try {
    var value = localStorage.getItem(connectionMetaKey);
    if (value) {
      var raw = JSON.parse(value);
      var connectionType = types.toConnectionType(raw.type);
      if (connectionType) {
        return {
          type: connectionType,
          address: raw.address,
          ENSName: raw.ENSName
        };
      }
    }
  } catch (e) {
    console.warn(e);
  }
  return;
}
function deletePersistedConnectionMeta() {
  localStorage.removeItem(connectionMetaKey);
}

exports.connectionMetaKey = connectionMetaKey;
exports.deletePersistedConnectionMeta = deletePersistedConnectionMeta;
exports.getPersistedConnectionMeta = getPersistedConnectionMeta;
