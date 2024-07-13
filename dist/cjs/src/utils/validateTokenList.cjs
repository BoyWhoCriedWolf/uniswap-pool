'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var _asyncToGenerator = require('@babel/runtime/helpers/asyncToGenerator');
var _regeneratorRuntime = require('@babel/runtime/regenerator');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}

var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var _asyncToGenerator__default = /*#__PURE__*/_interopDefaultLegacy(_asyncToGenerator);
var _regeneratorRuntime__default = /*#__PURE__*/_interopDefaultLegacy(_regeneratorRuntime);

var ValidationSchema = /*#__PURE__*/function (ValidationSchema) {
  ValidationSchema["LIST"] = "list";
  ValidationSchema["TOKENS"] = "tokens";
  return ValidationSchema;
}(ValidationSchema || {});
function getValidationErrors(validate) {
  var _validate$errors$map$, _validate$errors;
  return (_validate$errors$map$ = validate === null || validate === void 0 || (_validate$errors = validate.errors) === null || _validate$errors === void 0 ? void 0 : _validate$errors.map(function (error) {
    return [error.instancePath, error.message].filter(Boolean).join(" ");
  }).join("; ")) !== null && _validate$errors$map$ !== void 0 ? _validate$errors$map$ : "unknown error";
}
function validate(_x, _x2) {
  return _validate.apply(this, arguments);
}
/**
 * Validates an array of tokens.
 * @param json the TokenInfo[] to validate
 */
function _validate() {
  _validate = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee(schema, data) {
    var validatorImport, _yield$Promise$all, _yield$Promise$all2, validatorModule, validator;
    return _regeneratorRuntime__default["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.t0 = schema;
          _context.next = _context.t0 === ValidationSchema.LIST ? 3 : _context.t0 === ValidationSchema.TOKENS ? 7 : 11;
          break;
        case 3:
          _context.next = 5;
          return Promise.resolve().then(function () { return require('./__generated__/validateTokenList.cjs'); });
        case 5:
          validatorImport = _context.sent;
          return _context.abrupt("break", 12);
        case 7:
          _context.next = 9;
          return Promise.resolve().then(function () { return require('./__generated__/validateTokens.cjs'); });
        case 9:
          validatorImport = _context.sent;
          return _context.abrupt("break", 12);
        case 11:
          throw new Error("No validation function specified for token list schema");
        case 12:
          _context.next = 14;
          return Promise.all([Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require('ajv')); }), validatorImport]);
        case 14:
          _yield$Promise$all = _context.sent;
          _yield$Promise$all2 = _slicedToArray__default["default"](_yield$Promise$all, 2);
          validatorModule = _yield$Promise$all2[1];
          validator = validatorModule["default"];
          if (!(validator !== null && validator !== void 0 && validator(data))) {
            _context.next = 20;
            break;
          }
          return _context.abrupt("return", data);
        case 20:
          throw new Error(getValidationErrors(validator));
        case 21:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _validate.apply(this, arguments);
}
function validateTokenList(_x4) {
  return _validateTokenList.apply(this, arguments);
}
function _validateTokenList() {
  _validateTokenList = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee3(json) {
    return _regeneratorRuntime__default["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return validate(ValidationSchema.LIST, json);
        case 3:
          return _context3.abrupt("return", json);
        case 6:
          _context3.prev = 6;
          _context3.t0 = _context3["catch"](0);
          throw new Error("Token list failed validation: ".concat(_context3.t0.message));
        case 9:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 6]]);
  }));
  return _validateTokenList.apply(this, arguments);
}

exports.validateTokenList = validateTokenList;
