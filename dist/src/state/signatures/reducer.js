import { createSlice } from '@reduxjs/toolkit';

const initialState = {};
const signatureSlice = createSlice({
  name: "signatures",
  initialState,
  reducers: {
    addSignature(signatures, _ref) {
      let {
        payload
      } = _ref;
      if (signatures[payload.offerer]?.[payload.id]) throw Error("Attempted to add existing signature.");
      const accountSignatures = signatures[payload.offerer] ?? {};
      accountSignatures[payload.id] = payload;
      signatures[payload.offerer] = accountSignatures;
    },
    updateSignature(signatures, _ref2) {
      let {
        payload
      } = _ref2;
      if (!signatures[payload.offerer]?.[payload.id]) throw Error("Attempted to update non-existent signature.");
      signatures[payload.offerer][payload.id] = payload;
    },
    removeSignature(signatures, _ref3) {
      let {
        payload
      } = _ref3;
      if (signatures[payload.offerer][payload.id]) delete signatures[payload.offerer][payload.id];
    }
  }
});
const {
  addSignature,
  updateSignature,
  removeSignature
} = signatureSlice.actions;
var signatures = signatureSlice.reducer;

export { addSignature, signatures as default, initialState, removeSignature, updateSignature };
