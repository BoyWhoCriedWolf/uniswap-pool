'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var reactRedux = require('react-redux');

var useAppDispatch = function useAppDispatch() {
  return reactRedux.useDispatch();
};
var useAppSelector = reactRedux.useSelector;

exports.useAppDispatch = useAppDispatch;
exports.useAppSelector = useAppSelector;
