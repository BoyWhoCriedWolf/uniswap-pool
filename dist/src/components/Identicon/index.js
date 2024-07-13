import React__default, { useState, useMemo, useRef, useLayoutEffect, useCallback } from 'react';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import jazzicon from '@metamask/jazzicon';
import useENSAvatar from '../../hooks/useENSAvatar.js';
import styled from 'styled-components';

var _templateObject, _templateObject2;
var StyledIdenticon = styled.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  height: ", ";\n  width: ", ";\n  border-radius: 50%;\n  background-color: ", ";\n  font-size: initial;\n"])), function (_ref) {
  var iconSize = _ref.iconSize;
  return "".concat(iconSize, "px");
}, function (_ref2) {
  var iconSize = _ref2.iconSize;
  return "".concat(iconSize, "px");
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.surface3;
});
var StyledAvatar = styled.img(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  height: inherit;\n  width: inherit;\n  border-radius: inherit;\n"])));
function Identicon(_ref4) {
  var account = _ref4.account,
    size = _ref4.size;
  var _useENSAvatar = useENSAvatar(account !== null && account !== void 0 ? account : undefined),
    avatar = _useENSAvatar.avatar;
  var _useState = useState(true),
    _useState2 = _slicedToArray(_useState, 2),
    fetchable = _useState2[0],
    setFetchable = _useState2[1];
  var iconSize = size !== null && size !== void 0 ? size : 24;
  var icon = useMemo(function () {
    return account && jazzicon(iconSize, parseInt(account.slice(2, 10), 16));
  }, [account, iconSize]);
  var iconRef = useRef(null);
  useLayoutEffect(function () {
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
  var handleError = useCallback(function () {
    return setFetchable(false);
  }, []);
  return /*#__PURE__*/React__default.createElement(StyledIdenticon, {
    iconSize: iconSize
  }, avatar && fetchable ? /*#__PURE__*/React__default.createElement(StyledAvatar, {
    alt: "avatar",
    src: avatar,
    onError: handleError
  }) : /*#__PURE__*/React__default.createElement("span", {
    ref: iconRef
  }));
}

export { Identicon as default };
