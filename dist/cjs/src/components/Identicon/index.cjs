'use strict';

var React = require('react');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var jazzicon = require('@metamask/jazzicon');
var useENSAvatar = require('../../hooks/useENSAvatar.cjs');
var styled = require('styled-components');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var jazzicon__default = /*#__PURE__*/_interopDefaultLegacy(jazzicon);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject, _templateObject2;
var StyledIdenticon = styled__default["default"].div(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  height: ", ";\n  width: ", ";\n  border-radius: 50%;\n  background-color: ", ";\n  font-size: initial;\n"])), function (_ref) {
  var iconSize = _ref.iconSize;
  return "".concat(iconSize, "px");
}, function (_ref2) {
  var iconSize = _ref2.iconSize;
  return "".concat(iconSize, "px");
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.surface3;
});
var StyledAvatar = styled__default["default"].img(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  height: inherit;\n  width: inherit;\n  border-radius: inherit;\n"])));
function Identicon(_ref4) {
  var account = _ref4.account,
    size = _ref4.size;
  var _useENSAvatar = useENSAvatar(account !== null && account !== void 0 ? account : undefined),
    avatar = _useENSAvatar.avatar;
  var _useState = React.useState(true),
    _useState2 = _slicedToArray__default["default"](_useState, 2),
    fetchable = _useState2[0],
    setFetchable = _useState2[1];
  var iconSize = size !== null && size !== void 0 ? size : 24;
  var icon = React.useMemo(function () {
    return account && jazzicon__default["default"](iconSize, parseInt(account.slice(2, 10), 16));
  }, [account, iconSize]);
  var iconRef = React.useRef(null);
  React.useLayoutEffect(function () {
    var current = iconRef.current;
    if (icon) {
      current === null || current === void 0 || current.appendChild(icon);
      return function () {
        try {
          current === null || current === void 0 || current.removeChild(icon);
        } catch (e) {
          console.error("Avatar icon not found");
        }
      };
    }
    return;
  }, [icon, iconRef]);
  var handleError = React.useCallback(function () {
    return setFetchable(false);
  }, []);
  return /*#__PURE__*/React__default["default"].createElement(StyledIdenticon, {
    iconSize: iconSize
  }, avatar && fetchable ? /*#__PURE__*/React__default["default"].createElement(StyledAvatar, {
    alt: "avatar",
    src: avatar,
    onError: handleError
  }) : /*#__PURE__*/React__default["default"].createElement("span", {
    ref: iconRef
  }));
}

module.exports = Identicon;
