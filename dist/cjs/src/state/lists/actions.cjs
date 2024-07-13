'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var toolkit = require('@reduxjs/toolkit');

var fetchTokenList = {
  pending: toolkit.createAction("lists/fetchTokenList/pending"),
  fulfilled: toolkit.createAction("lists/fetchTokenList/fulfilled"),
  rejected: toolkit.createAction("lists/fetchTokenList/rejected")
};
// add and remove from list options
var addList = toolkit.createAction("lists/addList");
var removeList = toolkit.createAction("lists/removeList");

// versioning
var acceptListUpdate = toolkit.createAction("lists/acceptListUpdate");

exports.acceptListUpdate = acceptListUpdate;
exports.addList = addList;
exports.fetchTokenList = fetchTokenList;
exports.removeList = removeList;
