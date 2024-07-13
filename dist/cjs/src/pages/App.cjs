'use strict';

var React = require('react');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var analyticsEvents = require('@uniswap/analytics-events');
var core = require('@web3-react/core');
var index$1 = require('../analytics/index.cjs');
var index$2 = require('../components/ErrorBoundary/index.cjs');
var LoadingSpinner = require('../components/Icons/LoadingSpinner.cjs');
var index$4 = require('../components/Modal/index.cjs');
var Tabs = require('../components/Tabs/Tabs.cjs');
var index = require('../featureFlags/index.cjs');
var uniswapXDefault = require('../featureFlags/flags/uniswapXDefault.cjs');
var index$5 = require('../nft/pages/profile/index.cjs');
var types = require('../state/routing/types.cjs');
var hooks = require('../state/user/hooks.cjs');
var statsigReact = require('statsig-react');
var colors = require('../theme/colors.cjs');
var DarkModeQueryParamReader = require('../theme/components/DarkModeQueryParamReader.cjs');
var ThemeToggle = require('../theme/components/ThemeToggle.cjs');
var index$3 = require('../tracing/index.cjs');
var env = require('../utils/env.cjs');
var webVitals = require('web-vitals');
var AppBody = require('./AppBody.cjs');
var index$7 = require('./Pool/index.cjs');
var index$6 = require('./Swap/index.cjs');
var analytics = require('@uniswap/analytics');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespaceDefaultOnly (e) { return Object.freeze({ __proto__: null, 'default': e }); }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);
var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var AppChrome = /*#__PURE__*/React.lazy(function () {
  return Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespaceDefaultOnly(require('./AppChrome.cjs')); });
});

// const HeaderWrapper = styled.div<{
//   transparent?: boolean;
//   bannerIsVisible?: boolean;
//   scrollY: number;
// }>`
//   ${flexRowNoWrap};
//   background-color: ${({ theme, transparent }) =>
//     !transparent && theme.surface1};
//   border-bottom: ${({ theme, transparent }) =>
//     !transparent && `1px solid ${theme.surface3}`};
//   width: 100%;
//   justify-content: space-between;
//   position: fixed;
//   top: ${({ bannerIsVisible }) =>
//     bannerIsVisible ? Math.max(UK_BANNER_HEIGHT - scrollY, 0) : 0}px;
//   z-index: ${Z_INDEX.dropdown};

//   @media only screen and (max-width: ${({ theme }) =>
//       `${theme.breakpoint.md}px`}) {
//     top: ${({ bannerIsVisible }) =>
//       bannerIsVisible ? Math.max(UK_BANNER_HEIGHT_MD - scrollY, 0) : 0}px;
//   }

//   @media only screen and (max-width: ${({ theme }) =>
//       `${theme.breakpoint.sm}px`}) {
//     top: ${({ bannerIsVisible }) =>
//       bannerIsVisible ? Math.max(UK_BANNER_HEIGHT_SM - scrollY, 0) : 0}px;
//   }
// `;

function App() {
  var isLoaded = index.useFeatureFlagsIsLoaded();
  // const [, setShouldDisableNFTRoutes] = useAtom(shouldDisableNFTRoutesAtom);

  // const location = useLocation();
  // const { pathname } = location;
  // const currentPage = getCurrentPageFromLocation(pathname);
  // const currentPage = InterfacePageName.POOL_PAGE;
  var isDarkMode = ThemeToggle.useIsDarkMode();
  var _useRouterPreference = hooks.useRouterPreference(),
    _useRouterPreference2 = _slicedToArray__default["default"](_useRouterPreference, 1),
    routerPreference = _useRouterPreference2[0];
  var _useState = React.useState(false),
    _useState2 = _slicedToArray__default["default"](_useState, 2),
    isNftProfile = _useState2[0],
    setIsNftProfile = _useState2[1];
  // const [isPool, setIsPool] = useState(false);

  // const [scrollY, setScrollY] = useState(0);
  // const scrolledState = scrollY > 0;
  var isUniswapXDefaultEnabled = uniswapXDefault.useUniswapXDefaultEnabled();
  var userOptedOutOfUniswapX = hooks.useUserOptedOutOfUniswapX();
  // const routerConfig = useRouterConfig();

  // const originCountry = useAppSelector(
  //   (state: AppState) => state.user.originCountry
  // );
  // const renderUkBannner = Boolean(originCountry) && originCountry === "GB";

  var handleShowNftProfile = function handleShowNftProfile() {
    return setIsNftProfile(true);
  };
  var handleCloseNftProfile = function handleCloseNftProfile() {
    return setIsNftProfile(false);
  };

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  //   setScrollY(0);
  // }, []);

  // const [searchParams] = useSearchParams();
  // useEffect(() => {
  //   if (searchParams.get("disableNFTs") === "true") {
  //     setShouldDisableNFTRoutes(true);
  //   } else if (searchParams.get("disableNFTs") === "false") {
  //     setShouldDisableNFTRoutes(false);
  //   }
  // }, [searchParams, setShouldDisableNFTRoutes]);

  React.useEffect(function () {
    var _process$env$REACT_AP, _window$navigator$ser;
    // User properties *must* be set before sending corresponding event properties,
    // so that the event contains the correct and up-to-date user properties.
    analytics.user.set(analyticsEvents.CustomUserProperties.USER_AGENT, navigator.userAgent);
    analytics.user.set(analyticsEvents.CustomUserProperties.BROWSER, analyticsEvents.getBrowser());
    analytics.user.set(analyticsEvents.CustomUserProperties.SCREEN_RESOLUTION_HEIGHT, window.screen.height);
    analytics.user.set(analyticsEvents.CustomUserProperties.SCREEN_RESOLUTION_WIDTH, window.screen.width);
    analytics.user.set(analyticsEvents.CustomUserProperties.GIT_COMMIT_HASH, (_process$env$REACT_AP = process.env.REACT_APP_GIT_COMMIT_HASH) !== null && _process$env$REACT_AP !== void 0 ? _process$env$REACT_AP : "unknown");

    // Service Worker analytics
    var isServiceWorkerInstalled = Boolean((_window$navigator$ser = window.navigator.serviceWorker) === null || _window$navigator$ser === void 0 ? void 0 : _window$navigator$ser.controller);
    var isServiceWorkerHit = Boolean(window.__isDocumentCached);
    var serviceWorkerProperty = isServiceWorkerInstalled ? isServiceWorkerHit ? "hit" : "miss" : "uninstalled";
    var pageLoadProperties = {
      service_worker: serviceWorkerProperty
    };
    index$1.sendInitializationEvent(analyticsEvents.SharedEventName.APP_LOADED, pageLoadProperties);
    var sendWebVital = function sendWebVital(metric) {
      return function (_ref) {
        var delta = _ref.delta;
        return index$1.sendAnalyticsEvent(analyticsEvents.SharedEventName.WEB_VITALS, _objectSpread(_objectSpread({}, pageLoadProperties), {}, _defineProperty__default["default"]({}, metric, delta)));
      };
    };
    webVitals.getCLS(sendWebVital("cumulative_layout_shift"));
    webVitals.getFCP(sendWebVital("first_contentful_paint_ms"));
    webVitals.getFID(sendWebVital("first_input_delay_ms"));
    webVitals.getLCP(sendWebVital("largest_contentful_paint_ms"));
  }, []);
  React.useEffect(function () {
    analytics.user.set(analyticsEvents.CustomUserProperties.DARK_MODE, isDarkMode);
  }, [isDarkMode]);
  React.useEffect(function () {
    // If we're not in the transition period to UniswapX opt-out, set the router preference to whatever is specified.
    if (!isUniswapXDefaultEnabled) {
      analytics.user.set(analyticsEvents.CustomUserProperties.ROUTER_PREFERENCE, routerPreference);
      return;
    }

    // In the transition period, override the stored API preference to UniswapX if the user hasn't opted out.
    if (routerPreference === types.RouterPreference.API && !userOptedOutOfUniswapX) {
      analytics.user.set(analyticsEvents.CustomUserProperties.ROUTER_PREFERENCE, types.RouterPreference.X);
      return;
    }

    // Otherwise, the user has opted out or their preference is UniswapX/client, so set the preference to whatever is specified.
    analytics.user.set(analyticsEvents.CustomUserProperties.ROUTER_PREFERENCE, routerPreference);
  }, [routerPreference, isUniswapXDefaultEnabled, userOptedOutOfUniswapX]);

  // useEffect(() => {
  //   const scrollListener = () => {
  //     setScrollY(window.scrollY);
  //   };
  //   window.addEventListener("scroll", scrollListener);
  //   return () => window.removeEventListener("scroll", scrollListener);
  // }, []);

  // const isBagExpanded = useBag((state) => state.bagExpanded);
  // const isHeaderTransparent = !scrolledState && !isBagExpanded;

  var _useWeb3React = core.useWeb3React(),
    account = _useWeb3React.account;
  var statsigUser = React.useMemo(function () {
    return {
      userID: analytics.getDeviceId(),
      customIDs: {
        address: account !== null && account !== void 0 ? account : ""
      }
    };
  }, [account]);

  // redirect address to landing pages until implemented
  // const shouldRedirectToAppInstall = pathname?.startsWith("/address/");
  // useLayoutEffect(() => {
  //   if (shouldRedirectToAppInstall) {
  //     window.location.href = getDownloadAppLink();
  //   }
  // }, [shouldRedirectToAppInstall]);

  // if (shouldRedirectToAppInstall) {
  //   return null;
  // }

  // const blockedPaths = document
  //   .querySelector('meta[property="x:blocked-paths"]')
  //   ?.getAttribute("content")
  //   ?.split(",");
  // const shouldBlockPath = blockedPaths?.includes(pathname) ?? false;
  // if (shouldBlockPath && pathname !== "/swap") {
  //   return <Navigate to="/swap" replace />;
  // }

  return /*#__PURE__*/React__default["default"].createElement(index$2, null, /*#__PURE__*/React__default["default"].createElement(DarkModeQueryParamReader, null), /*#__PURE__*/React__default["default"].createElement(statsigReact.StatsigProvider, {
    user: statsigUser
    // TODO: replace with proxy and cycle key
    ,
    sdkKey: index$3.STATSIG_DUMMY_KEY,
    waitForInitialization: false,
    options: {
      environment: {
        tier: env.getEnvName()
      },
      // api: process.env.REACT_APP_STATSIG_PROXY_URL,
      api: "https://api.uniswap.org/v1/statsig-proxy"
    }
  }, /*#__PURE__*/React__default["default"].createElement(AppBody.BodyWrapper, null, /*#__PURE__*/React__default["default"].createElement(AppChrome, {
    onShowNftProfile: handleShowNftProfile
  }), isLoaded ? /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(index$4["default"], {
    isOpen: isNftProfile,
    onDismiss: handleCloseNftProfile
  }, /*#__PURE__*/React__default["default"].createElement(index$5, null)), /*#__PURE__*/React__default["default"].createElement(Tabs, {
    data: [{
      label: "Trade",
      content: /*#__PURE__*/React__default["default"].createElement(index$6["default"], null)
    }, {
      label: "Pool",
      content: /*#__PURE__*/React__default["default"].createElement("div", {
        style: {
          backgroundColor: colors.colors.dark_blue
        }
      }, /*#__PURE__*/React__default["default"].createElement(index$7, null))
    }]
  })) : /*#__PURE__*/React__default["default"].createElement(LoadingSpinner["default"], null))));
}

module.exports = App;
