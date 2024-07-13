import { createAction } from '@reduxjs/toolkit';

const fetchTokenList = {
  pending: createAction("lists/fetchTokenList/pending"),
  fulfilled: createAction("lists/fetchTokenList/fulfilled"),
  rejected: createAction("lists/fetchTokenList/rejected")
};
// add and remove from list options
const addList = createAction("lists/addList");
const removeList = createAction("lists/removeList");

// versioning
const acceptListUpdate = createAction("lists/acceptListUpdate");

export { acceptListUpdate, addList, fetchTokenList, removeList };
