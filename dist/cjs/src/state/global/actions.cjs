'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var toolkit = require('@reduxjs/toolkit');

// fired once when the app reloads but before the app renders
// allows any updates to be applied to store data loaded from localStorage
var updateVersion = toolkit.createAction("global/updateVersion");

exports.updateVersion = updateVersion;
