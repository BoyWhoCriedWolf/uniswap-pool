'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var index = require('../../../node_modules/@lingui/react/dist/index.cjs');
var useLocationLinkProps = require('../../hooks/useLocationLinkProps.cjs');
var styled = require('styled-components');
var index$1 = require('../../theme/components/index.cjs');
var locales = require('../../constants/locales.cjs');
var useActiveLocale = require('../../hooks/useActiveLocale.cjs');
var text = require('../../theme/components/text.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject;
var Container = styled__default["default"](text.ThemedText.DeprecatedSmall)(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  opacity: ", ";\n  :hover {\n    opacity: 1;\n  }\n  margin-top: 1rem !important;\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.opacity.hover;
});
var useTargetLocale = function useTargetLocale(activeLocale) {
  var browserLocale = React.useMemo(function () {
    return useActiveLocale.navigatorLocale();
  }, []);
  if (browserLocale && (browserLocale !== locales.DEFAULT_LOCALE || activeLocale !== locales.DEFAULT_LOCALE)) {
    if (activeLocale === browserLocale) {
      return locales.DEFAULT_LOCALE;
    } else {
      return browserLocale;
    }
  }
  return null;
};
function SwitchLocaleLink() {
  var activeLocale = useActiveLocale.useActiveLocale();
  var targetLocale = useTargetLocale(activeLocale);
  var _useLocationLinkProps = useLocationLinkProps.useLocationLinkProps(),
    to = _useLocationLinkProps.to,
    onClick = _useLocationLinkProps.onClick;
  if (!targetLocale || !to) return null;
  return /*#__PURE__*/React__default["default"].createElement(Container, null, /*#__PURE__*/React__default["default"].createElement(index.Trans, {
    id: "XDBXHf",
    message: "Uniswap available in: <0>{0}</0>",
    values: {
      "0": locales.LOCALE_LABEL[targetLocale]
    },
    components: {
      "0": /*#__PURE__*/React__default["default"].createElement(index$1.StyledInternalLink, {
        onClick: onClick,
        to: to
      })
    }
  }));
}

exports.SwitchLocaleLink = SwitchLocaleLink;
