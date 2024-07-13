'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _typeof = require('@babel/runtime/helpers/typeof');
var _createClass = require('@babel/runtime/helpers/createClass');
var _classCallCheck = require('@babel/runtime/helpers/classCallCheck');
var _possibleConstructorReturn = require('@babel/runtime/helpers/possibleConstructorReturn');
var _getPrototypeOf = require('@babel/runtime/helpers/getPrototypeOf');
var _inherits = require('@babel/runtime/helpers/inherits');
var _wrapNativeSuper = require('@babel/runtime/helpers/wrapNativeSuper');
var index = require('../../node_modules/@lingui/core/dist/index.cjs');
var uuid = require('uuid');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _typeof__default = /*#__PURE__*/_interopDefaultLegacy(_typeof);
var _createClass__default = /*#__PURE__*/_interopDefaultLegacy(_createClass);
var _classCallCheck__default = /*#__PURE__*/_interopDefaultLegacy(_classCallCheck);
var _possibleConstructorReturn__default = /*#__PURE__*/_interopDefaultLegacy(_possibleConstructorReturn);
var _getPrototypeOf__default = /*#__PURE__*/_interopDefaultLegacy(_getPrototypeOf);
var _inherits__default = /*#__PURE__*/_interopDefaultLegacy(_inherits);
var _wrapNativeSuper__default = /*#__PURE__*/_interopDefaultLegacy(_wrapNativeSuper);

function _callSuper(_this, derived, args) {
  function isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
      return !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    } catch (e) {
      return false;
    }
  }
  derived = _getPrototypeOf__default["default"](derived);
  return _possibleConstructorReturn__default["default"](_this, isNativeReflectConstruct() ? Reflect.construct(derived, args || [], _getPrototypeOf__default["default"](_this).constructor) : derived.apply(_this, args));
}

// You may throw an instance of this class when the user rejects a request in their wallet.
// The benefit is that you can distinguish this error from other errors using didUserReject().
var UserRejectedRequestError = /*#__PURE__*/function (_Error) {
  function UserRejectedRequestError(message) {
    var _this2;
    _classCallCheck__default["default"](this, UserRejectedRequestError);
    _this2 = _callSuper(this, UserRejectedRequestError, [message]);
    _this2.name = "UserRejectedRequestError";
    return _this2;
  }
  _inherits__default["default"](UserRejectedRequestError, _Error);
  return _createClass__default["default"](UserRejectedRequestError);
}( /*#__PURE__*/_wrapNativeSuper__default["default"](Error));
function toReadableError(errorText, error) {
  if (_typeof__default["default"](error) === "object" && error !== null) {
    var _ref, _e$message;
    var e = error;
    return new Error("".concat(errorText, " \uD83D\uDC7A ").concat((_ref = (_e$message = e.message) !== null && _e$message !== void 0 ? _e$message : e.reason) !== null && _ref !== void 0 ? _ref : "unknown"));
  }
  return new Error("".concat(errorText, " \uD83D\uDC7A ").concat(error));
}
var WrongChainError = /*#__PURE__*/function (_Error2) {
  function WrongChainError() {
    _classCallCheck__default["default"](this, WrongChainError);
    return _callSuper(this, WrongChainError, [index.i18n._(
    /*i18n*/
    {
      id: "WtVaPW",
      message: "Your wallet is connected to the wrong network."
    })]);
  }
  _inherits__default["default"](WrongChainError, _Error2);
  return _createClass__default["default"](WrongChainError);
}( /*#__PURE__*/_wrapNativeSuper__default["default"](Error));
var SignatureExpiredError = /*#__PURE__*/function (_Error3) {
  function SignatureExpiredError() {
    var _this3;
    _classCallCheck__default["default"](this, SignatureExpiredError);
    _this3 = _callSuper(this, SignatureExpiredError, [index.i18n._(
    /*i18n*/
    {
      id: "zZ5POk",
      message: "Your signature has expired."
    })]);
    _this3.name = "SignatureExpiredError";
    _this3._id = "SignatureExpiredError-".concat(uuid.v4());
    return _this3;
  }
  _inherits__default["default"](SignatureExpiredError, _Error3);
  return _createClass__default["default"](SignatureExpiredError, [{
    key: "id",
    get: function get() {
      return this._id;
    }
  }]);
}( /*#__PURE__*/_wrapNativeSuper__default["default"](Error));

exports.SignatureExpiredError = SignatureExpiredError;
exports.UserRejectedRequestError = UserRejectedRequestError;
exports.WrongChainError = WrongChainError;
exports.toReadableError = toReadableError;
