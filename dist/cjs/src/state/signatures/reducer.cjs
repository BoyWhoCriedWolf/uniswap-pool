'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var toolkit = require('@reduxjs/toolkit');

var initialState = {};
var signatureSlice = toolkit.createSlice({
  name: "signatures",
  initialState: initialState,
  reducers: {
    addSignature: function addSignature(signatures, _ref) {
      var _signatures$payload$o, _signatures$payload$o2;
      var payload = _ref.payload;
      if ((_signatures$payload$o = signatures[payload.offerer]) !== null && _signatures$payload$o !== void 0 && _signatures$payload$o[payload.id]) throw Error("Attempted to add existing signature.");
      var accountSignatures = (_signatures$payload$o2 = signatures[payload.offerer]) !== null && _signatures$payload$o2 !== void 0 ? _signatures$payload$o2 : {};
      accountSignatures[payload.id] = payload;
      signatures[payload.offerer] = accountSignatures;
    },
    updateSignature: function updateSignature(signatures, _ref2) {
      var _signatures$payload$o3;
      var payload = _ref2.payload;
      if (!((_signatures$payload$o3 = signatures[payload.offerer]) !== null && _signatures$payload$o3 !== void 0 && _signatures$payload$o3[payload.id])) throw Error("Attempted to update non-existent signature.");
      signatures[payload.offerer][payload.id] = payload;
    },
    removeSignature: function removeSignature(signatures, _ref3) {
      var payload = _ref3.payload;
      if (signatures[payload.offerer][payload.id]) delete signatures[payload.offerer][payload.id];
    }
  }
});
var _signatureSlice$actio = signatureSlice.actions,
  addSignature = _signatureSlice$actio.addSignature,
  updateSignature = _signatureSlice$actio.updateSignature;
  _signatureSlice$actio.removeSignature;
var signatures = signatureSlice.reducer;

exports.addSignature = addSignature;
exports["default"] = signatures;
exports.initialState = initialState;
exports.updateSignature = updateSignature;
