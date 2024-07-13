'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var index = require('../../../node_modules/graphql-tag/lib/index.cjs');
var ms = require('ms');
var getFetchPolicyForKey = require('../../utils/getFetchPolicyForKey.cjs');
var typesAndHooks = require('./__generated__/types-and-hooks.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var ms__default = /*#__PURE__*/_interopDefaultLegacy(ms);

var _templateObject;
index["default"](_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  query Convert($toCurrency: Currency!) {\n    convert(\n      fromAmount: { currency: USD, value: 1.0 }\n      toCurrency: $toCurrency\n    ) {\n      id\n      value\n      currency\n    }\n  }\n"])));
function useLocalCurrencyConversionRate(localCurrency, skip) {
  var _data$convert;
  var _useConvertQuery = typesAndHooks.useConvertQuery({
      variables: {
        toCurrency: localCurrency
      },
      fetchPolicy: getFetchPolicyForKey.getFetchPolicyForKey("convert-".concat(localCurrency), ms__default["default"]("5m")),
      skip: skip
    }),
    data = _useConvertQuery.data,
    loading = _useConvertQuery.loading;
  return {
    data: data === null || data === void 0 || (_data$convert = data.convert) === null || _data$convert === void 0 ? void 0 : _data$convert.value,
    isLoading: loading
  };
}

exports.useLocalCurrencyConversionRate = useLocalCurrencyConversionRate;
