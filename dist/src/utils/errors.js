import _typeof from '@babel/runtime/helpers/typeof';
import _createClass from '@babel/runtime/helpers/createClass';
import _classCallCheck from '@babel/runtime/helpers/classCallCheck';
import _possibleConstructorReturn from '@babel/runtime/helpers/possibleConstructorReturn';
import _getPrototypeOf from '@babel/runtime/helpers/getPrototypeOf';
import _inherits from '@babel/runtime/helpers/inherits';
import _wrapNativeSuper from '@babel/runtime/helpers/wrapNativeSuper';
import { i18n } from '../../node_modules/@lingui/core/dist/index.mjs.js';
import { v4 } from 'uuid';

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
  derived = _getPrototypeOf(derived);
  return _possibleConstructorReturn(_this, isNativeReflectConstruct() ? Reflect.construct(derived, args || [], _getPrototypeOf(_this).constructor) : derived.apply(_this, args));
}

// You may throw an instance of this class when the user rejects a request in their wallet.
// The benefit is that you can distinguish this error from other errors using didUserReject().
var UserRejectedRequestError = /*#__PURE__*/function (_Error) {
  function UserRejectedRequestError(message) {
    var _this2;
    _classCallCheck(this, UserRejectedRequestError);
    _this2 = _callSuper(this, UserRejectedRequestError, [message]);
    _this2.name = "UserRejectedRequestError";
    return _this2;
  }
  _inherits(UserRejectedRequestError, _Error);
  return _createClass(UserRejectedRequestError);
}( /*#__PURE__*/_wrapNativeSuper(Error));
function toReadableError(errorText, error) {
  if (_typeof(error) === "object" && error !== null) {
    var _ref, _e$message;
    var e = error;
    return new Error("".concat(errorText, " \uD83D\uDC7A ").concat((_ref = (_e$message = e.message) !== null && _e$message !== void 0 ? _e$message : e.reason) !== null && _ref !== void 0 ? _ref : "unknown"));
  }
  return new Error("".concat(errorText, " \uD83D\uDC7A ").concat(error));
}
var WrongChainError = /*#__PURE__*/function (_Error2) {
  function WrongChainError() {
    _classCallCheck(this, WrongChainError);
    return _callSuper(this, WrongChainError, [i18n._(
    /*i18n*/
    {
      id: "WtVaPW",
      message: "Your wallet is connected to the wrong network."
    })]);
  }
  _inherits(WrongChainError, _Error2);
  return _createClass(WrongChainError);
}( /*#__PURE__*/_wrapNativeSuper(Error));
var SignatureExpiredError = /*#__PURE__*/function (_Error3) {
  function SignatureExpiredError() {
    var _this3;
    _classCallCheck(this, SignatureExpiredError);
    _this3 = _callSuper(this, SignatureExpiredError, [i18n._(
    /*i18n*/
    {
      id: "zZ5POk",
      message: "Your signature has expired."
    })]);
    _this3.name = "SignatureExpiredError";
    _this3._id = "SignatureExpiredError-".concat(v4());
    return _this3;
  }
  _inherits(SignatureExpiredError, _Error3);
  return _createClass(SignatureExpiredError, [{
    key: "id",
    get: function get() {
      return this._id;
    }
  }]);
}( /*#__PURE__*/_wrapNativeSuper(Error));

export { SignatureExpiredError, UserRejectedRequestError, WrongChainError, toReadableError };
