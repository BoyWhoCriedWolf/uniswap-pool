'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var clsx = require('clsx');
var Box = require('../Box.cjs');
var FilterButton_css = require('./FilterButton.css.cjs');
var icons = require('../icons.cjs');
var common_css = require('../../css/common.css.cjs');
var sprinkles_css = require('../../css/sprinkles.css.cjs');
require('@babel/runtime/helpers/toConsumableArray');
require('uuid');
require('@ethersproject/units');
require('video-extensions');
require('../../../locales/en-US.cjs');
require('numbro');
require('../../utils/pooledAssets.cjs');
var putCommas = require('../../utils/putCommas.cjs');
var roundAndPluralize = require('../../utils/roundAndPluralize.cjs');
require('../../utils/time.cjs');
require('@ethersproject/bignumber');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var clsx__default = /*#__PURE__*/_interopDefaultLegacy(clsx);

var FilterButton = function FilterButton(_ref) {
  var onClick = _ref.onClick,
    isMobile = _ref.isMobile,
    isFiltersExpanded = _ref.isFiltersExpanded,
    _ref$collectionCount = _ref.collectionCount,
    collectionCount = _ref$collectionCount === void 0 ? 0 : _ref$collectionCount;
  var hideResultsCount = window.innerWidth >= sprinkles_css.breakpoints.sm && window.innerWidth < sprinkles_css.breakpoints.md;
  return /*#__PURE__*/React__default["default"].createElement(Box.Box, {
    className: clsx__default["default"](FilterButton_css.filterButton, !isFiltersExpanded && FilterButton_css.filterButtonExpanded),
    display: "flex",
    gap: "8",
    borderRadius: "12",
    fontSize: "16",
    cursor: "pointer",
    position: "relative",
    onClick: onClick,
    padding: "12",
    width: isMobile ? "44" : "auto",
    height: "44",
    whiteSpace: "nowrap",
    "data-testid": "nft-filter"
  }, /*#__PURE__*/React__default["default"].createElement(icons.FilterIcon, null), !isMobile ? /*#__PURE__*/React__default["default"].createElement(Box.Box, {
    className: common_css.buttonTextMedium
  }, " ", !collectionCount || hideResultsCount ? "Filter" : "Filter \u2022 ".concat(putCommas.putCommas(collectionCount), " result").concat(roundAndPluralize.pluralize(collectionCount))) : null);
};

exports.FilterButton = FilterButton;
