'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var index$1 = require('../../../node_modules/@lingui/react/dist/index.cjs');
var core = require('@web3-react/core');
var index$2 = require('../Settings/index.cjs');
var reactFeather = require('react-feather');
require('react-router-dom');
var rebass = require('rebass');
var hooks = require('../../state/hooks.cjs');
var actions = require('../../state/mint/actions.cjs');
var actions$1 = require('../../state/mint/v3/actions.cjs');
var styled = require('styled-components');
require('../../theme/components/index.cjs');
var styles = require('../../theme/styles.cjs');
var index = require('../Row/index.cjs');
var text = require('../../theme/components/text.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6;
var Tabs = styled__default["default"].div(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  ", ";\n  align-items: center;\n  border-radius: 3rem;\n  justify-content: space-evenly;\n"])), styles.flexRowNoWrap);
var StyledLink = styled__default["default"].a(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  flex: ", ";\n  display: flex;\n  align-items: center;\n  cursor: pointer;\n\n  ", ";\n"])), function (_ref) {
  var flex = _ref.flex;
  return flex !== null && flex !== void 0 ? flex : "none";
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.deprecated_mediaWidth.deprecated_upToMedium(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral__default["default"](["\n    flex: none;\n    margin-right: 10px;\n  "])));
});
styled__default["default"](text.ThemedText.SubHeaderLarge)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral__default["default"](["\n  position: absolute;\n  left: 50%;\n  transform: translateX(-50%);\n"])));
var StyledArrowLeft = styled__default["default"](reactFeather.ArrowLeft)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral__default["default"](["\n  color: ", ";\n"])), function (_ref3) {
  var theme = _ref3.theme;
  return theme.neutral1;
});
var AddRemoveTitleText = styled__default["default"](text.ThemedText.SubHeaderLarge)(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral__default["default"](["\n  flex: 1;\n  margin: auto;\n"])));
function AddRemoveTabs(_ref5) {
  var adding = _ref5.adding,
    creating = _ref5.creating,
    autoSlippage = _ref5.autoSlippage,
    onBack = _ref5.onBack,
    children = _ref5.children;
  var _useWeb3React = core.useWeb3React(),
    chainId = _useWeb3React.chainId;
  var theme = styled.useTheme();
  // reset states on back
  var dispatch = hooks.useAppDispatch();
  // const location = useLocation();

  // detect if back should redirect to v3 or v2 pool page
  // const poolLink = location.pathname.includes("add/v2")
  //   ? "/pools/v2"
  //   : "/pools" + (positionID ? `/${positionID.toString()}` : "");

  return /*#__PURE__*/React__default["default"].createElement(Tabs, null, /*#__PURE__*/React__default["default"].createElement(index.RowBetween, {
    style: {
      padding: "1rem 1rem 0 1rem"
    },
    align: "center"
  }, /*#__PURE__*/React__default["default"].createElement(StyledLink
  // to={poolLink}
  , {
    onClick: function onClick() {
      if (adding) {
        // not 100% sure both of these are needed
        dispatch(actions.resetMintState());
        dispatch(actions$1.resetMintState());
      }
      onBack === null || onBack === void 0 || onBack();
    },
    flex: children ? "1" : undefined
  }, /*#__PURE__*/React__default["default"].createElement(StyledArrowLeft, {
    stroke: theme.neutral2
  })), /*#__PURE__*/React__default["default"].createElement(AddRemoveTitleText, {
    textAlign: children ? "start" : "center"
  }, creating ? /*#__PURE__*/React__default["default"].createElement(index$1.Trans, {
    id: "ma87bD",
    message: "Create a pair"
  }) : adding ? /*#__PURE__*/React__default["default"].createElement(index$1.Trans, {
    id: "E6MqGy",
    message: "Add liquidity"
  }) : /*#__PURE__*/React__default["default"].createElement(index$1.Trans, {
    id: "cJtosk",
    message: "Remove liquidity"
  })), children && /*#__PURE__*/React__default["default"].createElement(rebass.Box, {
    style: {
      marginRight: ".5rem"
    }
  }, children), /*#__PURE__*/React__default["default"].createElement(index$2, {
    autoSlippage: autoSlippage,
    chainId: chainId,
    showRoutingSettings: false
  })));
}

exports.AddRemoveTabs = AddRemoveTabs;
