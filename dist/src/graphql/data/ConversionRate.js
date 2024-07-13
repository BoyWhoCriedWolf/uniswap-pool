import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import gql from '../../../node_modules/graphql-tag/lib/index.js';
import ms from 'ms';
import { getFetchPolicyForKey } from '../../utils/getFetchPolicyForKey.js';
import { useConvertQuery } from './__generated__/types-and-hooks.js';

var _templateObject;
gql(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  query Convert($toCurrency: Currency!) {\n    convert(\n      fromAmount: { currency: USD, value: 1.0 }\n      toCurrency: $toCurrency\n    ) {\n      id\n      value\n      currency\n    }\n  }\n"])));
function useLocalCurrencyConversionRate(localCurrency, skip) {
  var _data$convert;
  var _useConvertQuery = useConvertQuery({
      variables: {
        toCurrency: localCurrency
      },
      fetchPolicy: getFetchPolicyForKey("convert-".concat(localCurrency), ms("5m")),
      skip: skip
    }),
    data = _useConvertQuery.data,
    loading = _useConvertQuery.loading;
  return {
    data: data === null || data === void 0 || (_data$convert = data.convert) === null || _data$convert === void 0 ? void 0 : _data$convert.value,
    isLoading: loading
  };
}

export { useLocalCurrencyConversionRate };
