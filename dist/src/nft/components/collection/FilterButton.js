import React__default from 'react';
import clsx from 'clsx';
import { Box } from '../Box.js';
import { filterButton, filterButtonExpanded } from './FilterButton.css.js';
import { FilterIcon } from '../icons.js';
import { buttonTextMedium } from '../../css/common.css.js';
import { breakpoints } from '../../css/sprinkles.css.js';
import '@babel/runtime/helpers/toConsumableArray';
import 'uuid';
import '@ethersproject/units';
import 'video-extensions';
import '../../../locales/en-US.js';
import 'numbro';
import '../../utils/pooledAssets.js';
import { putCommas } from '../../utils/putCommas.js';
import { pluralize } from '../../utils/roundAndPluralize.js';
import '../../utils/time.js';
import '@ethersproject/bignumber';

var FilterButton = function FilterButton(_ref) {
  var onClick = _ref.onClick,
    isMobile = _ref.isMobile,
    isFiltersExpanded = _ref.isFiltersExpanded,
    _ref$collectionCount = _ref.collectionCount,
    collectionCount = _ref$collectionCount === void 0 ? 0 : _ref$collectionCount;
  var hideResultsCount = window.innerWidth >= breakpoints.sm && window.innerWidth < breakpoints.md;
  return /*#__PURE__*/React__default.createElement(Box, {
    className: clsx(filterButton, !isFiltersExpanded && filterButtonExpanded),
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
  }, /*#__PURE__*/React__default.createElement(FilterIcon, null), !isMobile ? /*#__PURE__*/React__default.createElement(Box, {
    className: buttonTextMedium
  }, " ", !collectionCount || hideResultsCount ? "Filter" : "Filter \u2022 ".concat(putCommas(collectionCount), " result").concat(pluralize(collectionCount))) : null);
};

export { FilterButton };
