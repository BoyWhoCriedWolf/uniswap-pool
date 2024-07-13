import React__default, { useMemo, useState, useEffect, useCallback, useReducer } from 'react';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { ScrollBarStyles } from '../../../../components/Common/index.js';
import { LoadingBubble } from '../../../../components/Tokens/loading.js';
import { AnimatedBox, Box } from '../../Box.js';
import { Column, Row } from '../../Flex.js';
import { XMarkIcon } from '../../icons.js';
import { Checkbox } from '../../layout/Checkbox.js';
import { checkbox } from '../../layout/Checkbox.css.js';
import { Input } from '../../layout/Input.js';
import { subhead } from '../../../css/common.css.js';
import { themeVars } from '../../../css/sprinkles.css.js';
import '../../../hooks/useBag.js';
import '../../../hooks/useCollectionFilters.js';
import { useFiltersExpanded } from '../../../hooks/useFiltersExpanded.js';
import '../../../hooks/useIsCollectionLoading.js';
import { useIsMobile } from '../../../hooks/useIsMobile.js';
import '../../../../hooks/useScreenSize.js';
import '../../../hooks/useNFTList.js';
import '../../../hooks/useProfilePageState.js';
import '../../../hooks/useSellAsset.js';
import '../../../hooks/useSendTransaction.js';
import '../../../hooks/useTransactionResponse.js';
import '@ethersproject/units';
import '@uniswap/sdk-core';
import '../../../../hooks/useUSDPrice.js';
import '../../../../constants/tokens.js';
import 'jsbi';
import '@web3-react/core';
import '../../../../lib/hooks/useCurrencyBalance.js';
import { useWalletCollections } from '../../../hooks/useWalletCollections.js';
import { useSpring, easings } from 'react-spring';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import styled from 'styled-components';
import '../../../../theme/components/index.js';
import { TRANSITION_DURATIONS } from '../../../../theme/styles.js';
import noop from '../../../../utils/noop.js';
import { WALLET_COLLECTIONS_PAGINATION_LIMIT } from './ProfilePage.js';
import { subRowHover } from './ProfilePage.css.js';
import { ThemedText } from '../../../../theme/components/text.js';

var _templateObject, _templateObject2, _templateObject3, _templateObject4;
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var COLLECTION_ROW_HEIGHT = 44;
var ItemsContainer = styled(Column)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  ", "\n  height: 100vh;\n"])), ScrollBarStyles);
var LongLoadingBubble = styled(LoadingBubble)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  min-height: 15px;\n  width: 75%;\n"])));
var SmallLoadingBubble = styled(LoadingBubble)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  height: 20px;\n  width: 20px;\n  margin-right: 8px;\n"])));
var MobileMenuHeader = styled(Row)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  justify-content: space-between;\n  padding-bottom: 8px;\n"])));
var LoadingCollectionItem = function LoadingCollectionItem(_ref) {
  var style = _ref.style;
  return /*#__PURE__*/React__default.createElement(Row, {
    display: "flex",
    justifyContent: "space-between",
    style: style,
    paddingLeft: "12",
    paddingRight: "16"
  }, /*#__PURE__*/React__default.createElement(Row, {
    display: "flex",
    flex: "1"
  }, /*#__PURE__*/React__default.createElement(SmallLoadingBubble, null), /*#__PURE__*/React__default.createElement(LongLoadingBubble, null)), /*#__PURE__*/React__default.createElement(Box, {
    as: "span",
    borderColor: "surface3",
    className: checkbox,
    "aria-hidden": "true"
  }));
};
var FilterSidebar = function FilterSidebar(_ref2) {
  var fetchNextPage = _ref2.fetchNextPage,
    hasNextPage = _ref2.hasNextPage,
    isFetchingNextPage = _ref2.isFetchingNextPage,
    walletCollections = _ref2.walletCollections;
  var collectionFilters = useWalletCollections(function (state) {
    return state.collectionFilters;
  });
  var setCollectionFilters = useWalletCollections(function (state) {
    return state.setCollectionFilters;
  });
  var _useFiltersExpanded = useFiltersExpanded(),
    _useFiltersExpanded2 = _slicedToArray(_useFiltersExpanded, 2),
    isFiltersExpanded = _useFiltersExpanded2[0],
    setFiltersExpanded = _useFiltersExpanded2[1];
  var isMobile = useIsMobile();
  var _useSpring = useSpring({
      sidebarX: isFiltersExpanded ? 0 : -360,
      config: {
        duration: TRANSITION_DURATIONS.medium,
        easing: easings.easeOutSine
      }
    }),
    sidebarX = _useSpring.sidebarX;
  var hideSearch = useMemo(function () {
    return walletCollections && (walletCollections === null || walletCollections === void 0 ? void 0 : walletCollections.length) >= WALLET_COLLECTIONS_PAGINATION_LIMIT || isFetchingNextPage;
  }, [walletCollections, isFetchingNextPage]);
  return (
    /*#__PURE__*/
    // @ts-ignore
    React__default.createElement(AnimatedBox, {
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
    }, /*#__PURE__*/React__default.createElement(Box, {
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
    }, isMobile && /*#__PURE__*/React__default.createElement(MobileMenuHeader, null, /*#__PURE__*/React__default.createElement(ThemedText.HeadlineSmall, null, "Filter"), /*#__PURE__*/React__default.createElement(XMarkIcon, {
      height: 28,
      width: 28,
      fill: themeVars.colors.neutral1,
      onClick: function onClick() {
        return setFiltersExpanded(false);
      }
    })), /*#__PURE__*/React__default.createElement(CollectionSelect, {
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
  var _useState = useState(""),
    _useState2 = _slicedToArray(_useState, 2),
    collectionSearchText = _useState2[0],
    setCollectionSearchText = _useState2[1];
  var _useState3 = useState(collections),
    _useState4 = _slicedToArray(_useState3, 2),
    displayCollections = _useState4[0],
    setDisplayCollections = _useState4[1];
  useEffect(function () {
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
  var itemKey = useCallback(function (index, data) {
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
  var isItemLoaded = useCallback(function (index) {
    return !hasNextPage || index < displayCollections.length;
  }, [displayCollections.length, hasNextPage]);
  var CollectionFilterRow = useCallback(function (_ref4) {
    var index = _ref4.index,
      style = _ref4.style;
    var collection = !!displayCollections && displayCollections[index];
    if (!collection || isFetchingNextPage) {
      return /*#__PURE__*/React__default.createElement(LoadingCollectionItem, {
        style: style,
        key: index
      });
    }
    return /*#__PURE__*/React__default.createElement(CollectionItem, {
      style: style,
      key: itemKey(index, displayCollections),
      collection: displayCollections[index],
      collectionFilters: collectionFilters,
      setCollectionFilters: setCollectionFilters
    });
  }, [displayCollections, isFetchingNextPage, itemKey, collectionFilters, setCollectionFilters]);
  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(Box, {
    className: subhead,
    marginTop: "12",
    marginBottom: "16",
    width: "276"
  }, "Collections"), /*#__PURE__*/React__default.createElement(Box, {
    paddingBottom: "12",
    borderRadius: "8"
  }, /*#__PURE__*/React__default.createElement(Column, {
    as: "ul",
    paddingLeft: "0",
    gap: "10",
    style: {
      maxHeight: "80vh"
    }
  }, !hideSearch && /*#__PURE__*/React__default.createElement(CollectionFilterSearch, {
    collectionSearchText: collectionSearchText,
    setCollectionSearchText: setCollectionSearchText
  }), /*#__PURE__*/React__default.createElement(ItemsContainer, null, /*#__PURE__*/React__default.createElement(AutoSizer, {
    disableWidth: true
  }, function (_ref5) {
    var height = _ref5.height;
    return /*#__PURE__*/React__default.createElement(InfiniteLoader, {
      isItemLoaded: isItemLoaded,
      itemCount: itemCount,
      loadMoreItems: loadMoreItems
    }, function (_ref6) {
      var onItemsRendered = _ref6.onItemsRendered,
        ref = _ref6.ref;
      return /*#__PURE__*/React__default.createElement(FixedSizeList, {
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
  return /*#__PURE__*/React__default.createElement(Input, {
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
  var _useState5 = useState(false),
    _useState6 = _slicedToArray(_useState5, 2),
    isCheckboxSelected = _useState6[0],
    setCheckboxSelected = _useState6[1];
  var _useReducer = useReducer(function (state) {
      return !state;
    }, false),
    _useReducer2 = _slicedToArray(_useReducer, 2),
    hovered = _useReducer2[0],
    toggleHovered = _useReducer2[1];
  var isChecked = useCallback(function (address) {
    return collectionFilters.some(function (collection) {
      return collection === address;
    });
  }, [collectionFilters]);
  var handleCheckbox = function handleCheckbox() {
    setCheckboxSelected(!isCheckboxSelected);
    setCollectionFilters(collection.address);
  };
  return /*#__PURE__*/React__default.createElement(Row, {
    maxWidth: "full",
    overflowX: "hidden",
    overflowY: "hidden",
    fontWeight: "book",
    className: subRowHover,
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
  }, /*#__PURE__*/React__default.createElement(Row, null, /*#__PURE__*/React__default.createElement(Box, {
    as: "img",
    borderRadius: "round",
    width: "20",
    height: "20",
    src: collection.image
  }), /*#__PURE__*/React__default.createElement(Box, {
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
  }, collection.name, " ")), /*#__PURE__*/React__default.createElement(Checkbox, {
    checked: isChecked(collection.address),
    hovered: hovered,
    onChange: handleCheckbox
  }, /*#__PURE__*/React__default.createElement(Box, {
    as: "span",
    color: "neutral3",
    marginRight: "12",
    marginLeft: "auto"
  }, collection.count)));
};

export { FilterSidebar };
