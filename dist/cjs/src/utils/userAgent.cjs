'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var uaParserJs = require('ua-parser-js');

var parser = new uaParserJs.UAParser(window.navigator.userAgent);
var _parser$getDevice = parser.getDevice(),
  type = _parser$getDevice.type;
var _parser$getBrowser = parser.getBrowser(),
  name = _parser$getBrowser.name;
var isMobile = type === "mobile" || type === "tablet";
var platform = parser.getOS().name;
var isIOS = platform === "iOS";
var isNonIOSPhone = !isIOS && type === "mobile";
var isMobileSafari = isMobile && isIOS && (name === null || name === void 0 ? void 0 : name.toLowerCase().includes("safari"));

exports.isIOS = isIOS;
exports.isMobile = isMobile;
exports.isMobileSafari = isMobileSafari;
exports.isNonIOSPhone = isNonIOSPhone;
