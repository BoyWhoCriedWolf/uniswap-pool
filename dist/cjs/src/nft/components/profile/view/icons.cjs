'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var _extends = require('@babel/runtime/helpers/extends');
var styled = require('styled-components');
var colors = require('../../../../theme/colors.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _extends__default = /*#__PURE__*/_interopDefaultLegacy(_extends);

var useEmptyStateIconColors = function useEmptyStateIconColors() {
  var theme = styled.useTheme();
  var primary = theme.darkMode ? colors.colors.gray150 : colors.colors.gray600;
  var secondary = theme.darkMode ? colors.colors.gray600 : colors.colors.gray300;
  return {
    primary: primary,
    secondary: secondary
  };
};
var EmptyActivityIcon = function EmptyActivityIcon(props) {
  var _useEmptyStateIconCol = useEmptyStateIconColors(),
    primary = _useEmptyStateIconCol.primary,
    secondary = _useEmptyStateIconCol.secondary;
  return /*#__PURE__*/React__default["default"].createElement("svg", _extends__default["default"]({}, props, {
    width: "102",
    height: "94",
    viewBox: "0 0 102 94",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }), /*#__PURE__*/React__default["default"].createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M20.4998 9.00098L5.22859 13.3799C1.51236 14.4455 -0.636389 18.322 0.429224 22.0382L13.6352 68.093C14.7008 71.8092 18.5773 73.958 22.2935 72.8924L56.7921 63H31.4998C25.4246 63 20.4998 58.0752 20.4998 52V9.00098Z",
    fill: secondary
  }), /*#__PURE__*/React__default["default"].createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M31.5 0C27.634 0 24.5 3.13401 24.5 7V52C24.5 55.866 27.634 59 31.5 59H56.7364C60.5936 51.6192 67.8907 46.3207 76.5 45.2321V7C76.5 3.13401 73.366 0 69.5 0H31.5ZM37 19C38.3807 19 39.5 17.8807 39.5 16.5C39.5 15.1193 38.3807 14 37 14C35.6193 14 34.5 15.1193 34.5 16.5C34.5 17.8807 35.6193 19 37 19ZM39.5 29.5C39.5 30.8807 38.3807 32 37 32C35.6193 32 34.5 30.8807 34.5 29.5C34.5 28.1193 35.6193 27 37 27C38.3807 27 39.5 28.1193 39.5 29.5ZM37 45C38.3807 45 39.5 43.8807 39.5 42.5C39.5 41.1193 38.3807 40 37 40C35.6193 40 34.5 41.1193 34.5 42.5C34.5 43.8807 35.6193 45 37 45ZM44.5 16.5C44.5 15.1193 45.6193 14 47 14H64C65.3807 14 66.5 15.1193 66.5 16.5C66.5 17.8807 65.3807 19 64 19H47C45.6193 19 44.5 17.8807 44.5 16.5ZM47 27C45.6193 27 44.5 28.1193 44.5 29.5C44.5 30.8807 45.6193 32 47 32H64C65.3807 32 66.5 30.8807 66.5 29.5C66.5 28.1193 65.3807 27 64 27H47ZM44.5 42.5C44.5 41.1193 45.6193 40 47 40H64C65.3807 40 66.5 41.1193 66.5 42.5C66.5 43.8807 65.3807 45 64 45H47C45.6193 45 44.5 43.8807 44.5 42.5Z",
    fill: secondary
  }), /*#__PURE__*/React__default["default"].createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M79.7939 93.0254C91.9442 93.0254 101.794 83.1757 101.794 71.0254C101.794 58.8751 91.9442 49.0254 79.7939 49.0254C67.6437 49.0254 57.7939 58.8751 57.7939 71.0254C57.7939 83.1757 67.6437 93.0254 79.7939 93.0254ZM88.0433 71.0251L79.7936 62.7754L71.544 71.0251L79.7936 79.2748L88.0433 71.0251Z",
    fill: primary
  }));
};
var EmptyNftsIcon = function EmptyNftsIcon(props) {
  var _useEmptyStateIconCol2 = useEmptyStateIconColors(),
    primary = _useEmptyStateIconCol2.primary;
  return /*#__PURE__*/React__default["default"].createElement("svg", _extends__default["default"]({}, props, {
    width: "116",
    height: "116",
    viewBox: "0 0 116 116",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }), /*#__PURE__*/React__default["default"].createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M106.673 12.4027C110.616 13.5333 112.895 17.6462 111.765 21.5891L97.7533 70.4529C96.8931 73.4525 94.307 75.4896 91.3828 75.7948C91.4046 75.5034 91.4157 75.2091 91.4157 74.9121V27.1674C91.4157 20.7217 86.1904 15.4965 79.7447 15.4965H56.1167L58.7303 6.38172C59.8609 2.43883 63.9738 0.159015 67.9167 1.28962L106.673 12.4027Z",
    fill: primary
  }), /*#__PURE__*/React__default["default"].createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M32 27.7402C32 23.322 35.5817 19.7402 40 19.7402H79.1717C83.59 19.7402 87.1717 23.322 87.1717 27.7402V74.3389C87.1717 78.7572 83.59 82.3389 79.1717 82.3389H40C35.5817 82.3389 32 78.7572 32 74.3389V27.7402ZM57.1717 42.7402C57.1717 46.6062 53.8138 49.7402 49.6717 49.7402C45.5296 49.7402 42.1717 46.6062 42.1717 42.7402C42.1717 38.8742 45.5296 35.7402 49.6717 35.7402C53.8138 35.7402 57.1717 38.8742 57.1717 42.7402ZM36.1717 60.8153C37.2808 58.3975 40.7688 54.8201 45.7381 54.3677C51.977 53.7997 55.3044 57.8295 56.5522 60.0094C59.8797 55.4423 67.0336 46.8724 72.3575 45.9053C77.6814 44.9381 81.7853 48.4574 83.1717 50.338V72.6975C83.1717 75.4825 80.914 77.7402 78.1289 77.7402H41.2144C38.4294 77.7402 36.1717 75.4825 36.1717 72.6975V60.8153Z",
    fill: primary
  }));
};
var EmptyPoolsIcon = function EmptyPoolsIcon(props) {
  var _useEmptyStateIconCol3 = useEmptyStateIconColors(),
    primary = _useEmptyStateIconCol3.primary,
    secondary = _useEmptyStateIconCol3.secondary;
  return /*#__PURE__*/React__default["default"].createElement("svg", _extends__default["default"]({}, props, {
    width: "81",
    height: "97",
    viewBox: "0 0 81 85",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }), /*#__PURE__*/React__default["default"].createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M40.98 44C53.1302 44 62.98 34.1503 62.98 22C62.98 9.84974 53.1302 0 40.98 0C28.8297 0 18.98 9.84974 18.98 22C18.98 34.1503 28.8297 44 40.98 44ZM49.23 22L40.98 13.75L32.73 22L40.98 30.25L49.23 22Z",
    fill: primary
  }), /*#__PURE__*/React__default["default"].createElement("path", {
    d: "M2.5 63.1986C12.9105 63.1986 20.7173 53.0581 20.7173 53.0581C20.7173 53.0581 28.5241 63.1986 38.9346 63.1986C49.3409 63.1986 59.7514 53.0581 59.7514 53.0581C59.7514 53.0581 70.1619 63.1986 77.9687 63.1986M2.5 82.2504C12.9105 82.2504 20.7173 72.1099 20.7173 72.1099C20.7173 72.1099 28.5241 82.2504 38.9346 82.2504C49.3409 82.2504 59.7514 72.1099 59.7514 72.1099C59.7514 72.1099 70.1619 82.2504 77.9687 82.2504",
    stroke: secondary,
    strokeWidth: "5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }));
};
var EmptyTokensIcon = function EmptyTokensIcon(props) {
  var _useEmptyStateIconCol4 = useEmptyStateIconColors(),
    primary = _useEmptyStateIconCol4.primary,
    secondary = _useEmptyStateIconCol4.secondary;
  return /*#__PURE__*/React__default["default"].createElement("svg", _extends__default["default"]({}, props, {
    width: "91",
    height: "80",
    viewBox: "0 0 91 80",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }), /*#__PURE__*/React__default["default"].createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M3 0C1.61929 0 0.5 1.11929 0.5 2.5C0.5 3.88071 1.61929 5 3 5L57 5C58.3807 5.00001 59.5 3.88072 59.5 2.50001C59.5 1.11929 58.3807 5.06009e-06 57 4.93939e-06L3 0ZM7.51953 11.1055H10.5143C13.5091 11.1055 15.0065 12.6029 15.0065 15.5977V18.5924C15.0065 21.5872 13.5091 23.0846 10.5143 23.0846H7.51953C4.52474 23.0846 3.02734 21.5872 3.02734 18.5924V15.5977C3.02734 12.6029 4.52474 11.1055 7.51953 11.1055ZM31.4779 11.1055H28.4831C25.4883 11.1055 23.9909 12.6029 23.9909 15.5977V18.5924C23.9909 21.5872 25.4883 23.0846 28.4831 23.0846H31.4779C34.4726 23.0846 35.97 21.5872 35.97 18.5924V15.5977C35.97 12.6029 34.4726 11.1055 31.4779 11.1055ZM49.4466 11.1055H52.4414C55.4362 11.1055 56.9336 12.6029 56.9336 15.5977V18.5924C56.9336 21.5872 55.4362 23.0846 52.4414 23.0846H49.4466C46.4518 23.0846 44.9544 21.5872 44.9544 18.5924V15.5977C44.9544 12.6029 46.4518 11.1055 49.4466 11.1055ZM10.5143 31.47H7.51953C4.52474 31.47 3.02734 32.9674 3.02734 35.9622V38.957C3.02734 41.9518 4.52474 43.4492 7.51953 43.4492H10.5143C13.5091 43.4492 15.0065 41.9518 15.0065 38.957V35.9622C15.0065 32.9674 13.5091 31.47 10.5143 31.47ZM28.4831 31.47H31.4779C34.4726 31.47 35.97 32.9674 35.97 35.9622V38.957C35.97 41.9518 34.4726 43.4492 31.4779 43.4492H28.4831C25.4883 43.4492 23.9909 41.9518 23.9909 38.957V35.9622C23.9909 32.9674 25.4883 31.47 28.4831 31.47ZM52.4414 31.47H49.4466C46.4518 31.47 44.9544 32.9674 44.9544 35.9622V38.957C44.9544 41.1067 45.726 42.4849 47.2691 43.0915C49.7015 39.5566 52.9858 36.6532 56.8257 34.6779C56.4335 32.5393 54.9721 31.47 52.4414 31.47Z",
    fill: secondary
  }), /*#__PURE__*/React__default["default"].createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M68.7031 79.8125C80.8534 79.8125 90.7031 69.9628 90.7031 57.8125C90.7031 45.6622 80.8534 35.8125 68.7031 35.8125C56.5529 35.8125 46.7031 45.6622 46.7031 57.8125C46.7031 69.9628 56.5529 79.8125 68.7031 79.8125ZM76.9524 57.8122L68.7027 49.5625L60.4531 57.8122L68.7027 66.0619L76.9524 57.8122Z",
    fill: primary
  }));
};

exports.EmptyActivityIcon = EmptyActivityIcon;
exports.EmptyNftsIcon = EmptyNftsIcon;
exports.EmptyPoolsIcon = EmptyPoolsIcon;
exports.EmptyTokensIcon = EmptyTokensIcon;
