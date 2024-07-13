'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var index = require('../../../../components/Common/index.cjs');
var loading = require('../../../../components/Tokens/loading.cjs');
var Box = require('../../Box.cjs');
var Flex = require('../../Flex.cjs');
var icons = require('../../icons.cjs');
var Checkbox = require('../../layout/Checkbox.cjs');
var Checkbox_css = require('../../layout/Checkbox.css.cjs');
var Input = require('../../layout/Input.cjs');
var common_css = require('../../../css/common.css.cjs');
var sprinkles_css = require('../../../css/sprinkles.css.cjs');
require('../../../hooks/useBag.cjs');
require('../../../hooks/useCollectionFilters.cjs');
var useFiltersExpanded = require('../../../hooks/useFiltersExpanded.cjs');
require('../../../hooks/useIsCollectionLoading.cjs');
var useIsMobile = require('../../../hooks/useIsMobile.cjs');
require('../../../../hooks/useScreenSize.cjs');
require('../../../hooks/useNFTList.cjs');
require('../../../hooks/useProfilePageState.cjs');
require('../../../hooks/useSellAsset.cjs');
require('../../../hooks/useSendTransaction.cjs');
require('../../../hooks/useTransactionResponse.cjs');
require('@ethersproject/units');
require('@uniswap/sdk-core');
require('../../../../hooks/useUSDPrice.cjs');
require('../../../../constants/tokens.cjs');
require('jsbi');
require('@web3-react/core');
require('../../../../lib/hooks/useCurrencyBalance.cjs');
var useWalletCollections = require('../../../hooks/useWalletCollections.cjs');
var reactSpring = require('react-spring');
var AutoSizer = require('react-virtualized-auto-sizer');
var reactWindow = require('react-window');
var InfiniteLoader = require('react-window-infinite-loader');
var styled = require('styled-components');
require('../../../../theme/components/index.cjs');
var styles = require('../../../../theme/styles.cjs');
var noop = require('../../../../utils/noop.cjs');
var ProfilePage = require('./ProfilePage.cjs');
var ProfilePage_css = require('./ProfilePage.css.cjs');
var text = require('../../../../theme/components/text.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);
var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var AutoSizer__default = /*#__PURE__*/_interopDefaultLegacy(AutoSizer);
var InfiniteLoader__default = /*#__PURE__*/_interopDefaultLegacy(InfiniteLoader);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject, _templateObject2, _templateObject3, _templateObject4;
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var COLLECTION_ROW_HEIGHT = 44;
var ItemsContainer = styled__default["default"](Flex.Column)(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  ", "\n  height: 100vh;\n"])), index.ScrollBarStyles);
var LongLoadingBubble = styled__default["default"](loading.LoadingBubble)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  min-height: 15px;\n  width: 75%;\n"])));
var SmallLoadingBubble = styled__default["default"](loading.LoadingBubble)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral__default["default"](["\n  height: 20px;\n  width: 20px;\n  margin-right: 8px;\n"])));
var MobileMenuHeader = styled__default["default"](Flex.Row)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral__default["default"](["\n  justify-content: space-between;\n  padding-bottom: 8px;\n"])));
var LoadingCollectionItem = function LoadingCollectionItem(_ref) {
  var style = _ref.style;
  return /*#__PURE__*/React__default["default"].createElement(Flex.Row, {
    display: "flex",
    justifyContent: "space-between",
    style: style,
    paddingLeft: "12",
    paddingRight: "16"
  }, /*#__PURE__*/React__default["default"].createElement(Flex.Row, {
    display: "flex",
    flex: "1"
  }, /*#__PURE__*/React__default["default"].createElement(SmallLoadingBubble, null), /*#__PURE__*/React__default["default"].createElement(LongLoadingBubble, null)), /*#__PURE__*/React__default["default"].createElement(Box.Box, {
    as: "span",
    borderColor: "surface3",
    className: Checkbox_css.checkbox,
    "aria-hidden": "true"
  }));
};
var FilterSidebar = function FilterSidebar(_ref2) {
  var fetchNextPage = _ref2.fetchNextPage,
    hasNextPage = _ref2.hasNextPage,
    isFetchingNextPage = _ref2.isFetchingNextPage,
    walletCollections = _ref2.walletCollections;
  var collectionFilters = useWalletCollections.useWalletCollections(function (state) {
    return state.collectionFilters;
  });
  var setCollectionFilters = useWalletCollections.useWalletCollections(function (state) {
    return state.setCollectionFilters;
  });
  var _useFiltersExpanded = useFiltersExpanded.useFiltersExpanded(),
    _useFiltersExpanded2 = _slicedToArray__default["default"](_useFiltersExpanded, 2),
    isFiltersExpanded = _useFiltersExpanded2[0],
    setFiltersExpanded = _useFiltersExpanded2[1];
  var isMobile = useIsMobile.useIsMobile();
  var _useSpring = reactSpring.useSpring({
      sidebarX: isFiltersExpanded ? 0 : -360,
      config: {
        duration: styles.TRANSITION_DURATIONS.medium,
        easing: reactSpring.easings.easeOutSine
      }
    }),
    sidebarX = _useSpring.sidebarX;
  var hideSearch = React.useMemo(function () {
    return walletCollections && (walletCollections === null || walletCollections === void 0 ? void 0 : walletCollections.length) >= ProfilePage.WALLET_COLLECTIONS_PAGINATION_LIMIT || isFetchingNextPage;
  }, [walletCollections, isFetchingNextPage]);
  return (
    /*#__PURE__*/
    // @ts-ignore
    React__default["default"].createElement(Box.AnimatedBox, {
      position: {
        sm: "fixed",
        md: "sticky"
      },
      top: {
        sm: "0",
        md: "72"
      },
      left: {
        sm: "0",
        md: "unset"
      },
      width: {
        sm: "full",
        md: "332",
        lg: "332"
      },
      height: {
        sm: "full",
        md: "auto"
      },
      zIndex: {
        sm: "modal",
        md: "auto"
      },
      display: isFiltersExpanded ? "flex" : "none",
      style: {
        transform: isMobile ? undefined : sidebarX.to(function (x) {
          return "translateX(".concat(x, "px)");
        })
      },
      background: "surface2"
    }, /*#__PURE__*/React__default["default"].createElement(Box.Box, {
      paddingTop: {
        sm: "24",
        md: "0"
      },
      paddingLeft: {
        sm: "16",
        md: "0"
      },
      paddingRight: "16",
      width: {
        sm: "full",
        md: "332",
        lg: "332"
      }
    }, isMobile && /*#__PURE__*/React__default["default"].createElement(MobileMenuHeader, null, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.HeadlineSmall, null, "Filter"), /*#__PURE__*/React__default["default"].createElement(icons.XMarkIcon, {
      height: 28,
      width: 28,
      fill: sprinkles_css.themeVars.colors.neutral1,
      onClick: function onClick() {
        return setFiltersExpanded(false);
      }
    })), /*#__PURE__*/React__default["default"].createElement(CollectionSelect, {
      collections: walletCollections,
      collectionFilters: collectionFilters,
      setCollectionFilters: setCollectionFilters,
      fetchNextPage: fetchNextPage,
      hasNextPage: hasNextPage,
      isFetchingNextPage: isFetchingNextPage,
      hideSearch: hideSearch
    })))
  );
};
var CollectionSelect = function CollectionSelect(_ref3) {
  var collections = _ref3.collections,
    collectionFilters = _ref3.collectionFilters,
    setCollectionFilters = _ref3.setCollectionFilters,
    fetchNextPage = _ref3.fetchNextPage,
    hasNextPage = _ref3.hasNextPage,
    isFetchingNextPage = _ref3.isFetchingNextPage,
    hideSearch = _ref3.hideSearch;
  var _useState = React.useState(""),
    _useState2 = _slicedToArray__default["default"](_useState, 2),
    collectionSearchText = _useState2[0],
    setCollectionSearchText = _useState2[1];
  var _useState3 = React.useState(collections),
    _useState4 = _slicedToArray__default["default"](_useState3, 2),
    displayCollections = _useState4[0],
    setDisplayCollections = _useState4[1];
  React.useEffect(function () {
    if (collectionSearchText) {
      var filtered = collections.filter(function (collection) {
        var _collection$name;
        return (_collection$name = collection.name) === null || _collection$name === void 0 ? void 0 : _collection$name.toLowerCase().includes(collectionSearchText.toLowerCase());
      });
      setDisplayCollections(filtered);
    } else {
      setDisplayCollections(collections);
    }
  }, [collectionSearchText, collections]);
  var itemKey = React.useCallback(function (index, data) {
    if (!data) return index;
    var collection = data[index];
    return "".concat(collection.address, "_").concat(index);
  }, []);

  // If there are more items to be loaded then add an extra row to hold a loading indicator.
  var itemCount = hasNextPage ? displayCollections.length + 1 : displayCollections.length;

  // Only load 1 page of items at a time.
  // Pass an empty callback to InfiniteLoader in case it asks us to load more than once.
  var loadMoreItems = isFetchingNextPage ? noop : fetchNextPage;

  // Every row is loaded except for our loading indicator row.
  var isItemLoaded = React.useCallback(function (index) {
    return !hasNextPage || index < displayCollections.length;
  }, [displayCollections.length, hasNextPage]);
  var CollectionFilterRow = React.useCallback(function (_ref4) {
    var index = _ref4.index,
      style = _ref4.style;
    var collection = !!displayCollections && displayCollections[index];
    if (!collection || isFetchingNextPage) {
      return /*#__PURE__*/React__default["default"].createElement(LoadingCollectionItem, {
        style: style,
        key: index
      });
    }
    return /*#__PURE__*/React__default["default"].createElement(CollectionItem, {
      style: style,
      key: itemKey(index, displayCollections),
      collection: displayCollections[index],
      collectionFilters: collectionFilters,
      setCollectionFilters: setCollectionFilters
    });
  }, [displayCollections, isFetchingNextPage, itemKey, collectionFilters, setCollectionFilters]);
  return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(Box.Box, {
    className: common_css.subhead,
    marginTop: "12",
    marginBottom: "16",
    width: "276"
  }, "Collections"), /*#__PURE__*/React__default["default"].createElement(Box.Box, {
    paddingBottom: "12",
    borderRadius: "8"
  }, /*#__PURE__*/React__default["default"].createElement(Flex.Column, {
    as: "ul",
    paddingLeft: "0",
    gap: "10",
    style: {
      maxHeight: "80vh"
    }
  }, !hideSearch && /*#__PURE__*/React__default["default"].createElement(CollectionFilterSearch, {
    collectionSearchText: collectionSearchText,
    setCollectionSearchText: setCollectionSearchText
  }), /*#__PURE__*/React__default["default"].createElement(ItemsContainer, null, /*#__PURE__*/React__default["default"].createElement(AutoSizer__default["default"], {
    disableWidth: true
  }, function (_ref5) {
    var height = _ref5.height;
    return /*#__PURE__*/React__default["default"].createElement(InfiniteLoader__default["default"], {
      isItemLoaded: isItemLoaded,
      itemCount: itemCount,
      loadMoreItems: loadMoreItems
    }, function (_ref6) {
      var onItemsRendered = _ref6.onItemsRendered,
        ref = _ref6.ref;
      return /*#__PURE__*/React__default["default"].createElement(reactWindow.FixedSizeList, {
        height: height,
        width: "100%",
        itemCount: itemCount,
        itemSize: COLLECTION_ROW_HEIGHT,
        onItemsRendered: onItemsRendered,
        itemKey: itemKey,
        ref: ref
      }, CollectionFilterRow);
    });
  })))));
};
var CollectionFilterSearch = function CollectionFilterSearch(_ref7) {
  var collectionSearchText = _ref7.collectionSearchText,
    setCollectionSearchText = _ref7.setCollectionSearchText;
  return /*#__PURE__*/React__default["default"].createElement(Input.Input, {
    placeholder: "Search",
    marginTop: "8",
    marginBottom: "8",
    autoComplete: "off",
    position: "static",
    width: "full",
    value: collectionSearchText,
    onChange: function onChange(e) {
      return setCollectionSearchText(e.currentTarget.value);
    }
  });
};
var CollectionItem = function CollectionItem(_ref8) {
  var collection = _ref8.collection,
    collectionFilters = _ref8.collectionFilters,
    setCollectionFilters = _ref8.setCollectionFilters,
    style = _ref8.style;
  var _useState5 = React.useState(false),
    _useState6 = _slicedToArray__default["default"](_useState5, 2),
    isCheckboxSelected = _useState6[0],
    setCheckboxSelected = _useState6[1];
  var _useReducer = React.useReducer(function (state) {
      return !state;
    }, false),
    _useReducer2 = _slicedToArray__default["default"](_useReducer, 2),
    hovered = _useReducer2[0],
    toggleHovered = _useReducer2[1];
  var isChecked = React.useCallback(function (address) {
    return collectionFilters.some(function (collection) {
      return collection === address;
    });
  }, [collectionFilters]);
  var handleCheckbox = function handleCheckbox() {
    setCheckboxSelected(!isCheckboxSelected);
    setCollectionFilters(collection.address);
  };
  return /*#__PURE__*/React__default["default"].createElement(Flex.Row, {
    maxWidth: "full",
    overflowX: "hidden",
    overflowY: "hidden",
    fontWeight: "book",
    className: ProfilePage_css.subRowHover,
    justifyContent: "space-between",
    cursor: "pointer",
    paddingLeft: "12",
    paddingRight: "16",
    borderRadius: "12",
    style: _objectSpread({
      paddingBottom: "22px",
      paddingTop: "22px"
    }, style),
    maxHeight: "".concat(COLLECTION_ROW_HEIGHT),
    as: "li",
    onMouseEnter: toggleHovered,
    onMouseLeave: toggleHovered,
    onClick: handleCheckbox
  }, /*#__PURE__*/React__default["default"].createElement(Flex.Row, null, /*#__PURE__*/React__default["default"].createElement(Box.Box, {
    as: "img",
    borderRadius: "round",
    width: "20",
    height: "20",
    src: collection.image
  }), /*#__PURE__*/React__default["default"].createElement(Box.Box, {
    as: "span",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
    paddingLeft: "12",
    paddingRight: "14",
    style: {
      minHeight: 15,
      maxWidth: "180px"
    }
  }, collection.name, " ")), /*#__PURE__*/React__default["default"].createElement(Checkbox.Checkbox, {
    checked: isChecked(collection.address),
    hovered: hovered,
    onChange: handleCheckbox
  }, /*#__PURE__*/React__default["default"].createElement(Box.Box, {
    as: "span",
    color: "neutral3",
    marginRight: "12",
    marginLeft: "auto"
  }, collection.count)));
};

exports.FilterSidebar = FilterSidebar;
