import React__default, { useState, useEffect, useMemo, lazy } from 'react';
import { CustomUserProperties, getBrowser, SharedEventName } from '@uniswap/analytics-events';
import { useWeb3React } from '@web3-react/core';
import { sendInitializationEvent, sendAnalyticsEvent } from '../analytics/index.js';
import ErrorBoundary from '../components/ErrorBoundary/index.js';
import Loader from '../components/Icons/LoadingSpinner.js';
import Modal from '../components/Modal/index.js';
import Tabs from '../components/Tabs/Tabs.js';
import { useFeatureFlagsIsLoaded } from '../featureFlags/index.js';
import { useUniswapXDefaultEnabled } from '../featureFlags/flags/uniswapXDefault.js';
import Profile from '../nft/pages/profile/index.js';
import { RouterPreference } from '../state/routing/types.js';
import { useRouterPreference, useUserOptedOutOfUniswapX } from '../state/user/hooks.js';
import { StatsigProvider } from 'statsig-react';
import { colors } from '../theme/colors.js';
import DarkModeQueryParamReader from '../theme/components/DarkModeQueryParamReader.js';
import { useIsDarkMode } from '../theme/components/ThemeToggle.js';
import { STATSIG_DUMMY_KEY } from '../tracing/index.js';
import { getEnvName } from '../utils/env.js';
import { getCLS, getFCP, getFID, getLCP } from 'web-vitals';
import { BodyWrapper } from './AppBody.js';
import Pool from './Pool/index.js';
import SwapPage from './Swap/index.js';
import { user, getDeviceId } from '@uniswap/analytics';

const AppChrome = /*#__PURE__*/lazy(() => import('./AppChrome.js'));

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
  const isLoaded = useFeatureFlagsIsLoaded();
  // const [, setShouldDisableNFTRoutes] = useAtom(shouldDisableNFTRoutesAtom);

  // const location = useLocation();
  // const { pathname } = location;
  // const currentPage = getCurrentPageFromLocation(pathname);
  // const currentPage = InterfacePageName.POOL_PAGE;
  const isDarkMode = useIsDarkMode();
  const [routerPreference] = useRouterPreference();
  const [isNftProfile, setIsNftProfile] = useState(false);
  // const [isPool, setIsPool] = useState(false);

  // const [scrollY, setScrollY] = useState(0);
  // const scrolledState = scrollY > 0;
  const isUniswapXDefaultEnabled = useUniswapXDefaultEnabled();
  const userOptedOutOfUniswapX = useUserOptedOutOfUniswapX();
  // const routerConfig = useRouterConfig();

  // const originCountry = useAppSelector(
  //   (state: AppState) => state.user.originCountry
  // );
  // const renderUkBannner = Boolean(originCountry) && originCountry === "GB";

  const handleShowNftProfile = () => setIsNftProfile(true);
  const handleCloseNftProfile = () => setIsNftProfile(false);

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

  useEffect(() => {
    // User properties *must* be set before sending corresponding event properties,
    // so that the event contains the correct and up-to-date user properties.
    user.set(CustomUserProperties.USER_AGENT, navigator.userAgent);
    user.set(CustomUserProperties.BROWSER, getBrowser());
    user.set(CustomUserProperties.SCREEN_RESOLUTION_HEIGHT, window.screen.height);
    user.set(CustomUserProperties.SCREEN_RESOLUTION_WIDTH, window.screen.width);
    user.set(CustomUserProperties.GIT_COMMIT_HASH, process.env.REACT_APP_GIT_COMMIT_HASH ?? "unknown");

    // Service Worker analytics
    const isServiceWorkerInstalled = Boolean(window.navigator.serviceWorker?.controller);
    const isServiceWorkerHit = Boolean(window.__isDocumentCached);
    const serviceWorkerProperty = isServiceWorkerInstalled ? isServiceWorkerHit ? "hit" : "miss" : "uninstalled";
    const pageLoadProperties = {
      service_worker: serviceWorkerProperty
    };
    sendInitializationEvent(SharedEventName.APP_LOADED, pageLoadProperties);
    const sendWebVital = metric => _ref => {
      let {
        delta
      } = _ref;
      return sendAnalyticsEvent(SharedEventName.WEB_VITALS, {
        ...pageLoadProperties,
        [metric]: delta
      });
    };
    getCLS(sendWebVital("cumulative_layout_shift"));
    getFCP(sendWebVital("first_contentful_paint_ms"));
    getFID(sendWebVital("first_input_delay_ms"));
    getLCP(sendWebVital("largest_contentful_paint_ms"));
  }, []);
  useEffect(() => {
    user.set(CustomUserProperties.DARK_MODE, isDarkMode);
  }, [isDarkMode]);
  useEffect(() => {
    // If we're not in the transition period to UniswapX opt-out, set the router preference to whatever is specified.
    if (!isUniswapXDefaultEnabled) {
      user.set(CustomUserProperties.ROUTER_PREFERENCE, routerPreference);
      return;
    }

    // In the transition period, override the stored API preference to UniswapX if the user hasn't opted out.
    if (routerPreference === RouterPreference.API && !userOptedOutOfUniswapX) {
      user.set(CustomUserProperties.ROUTER_PREFERENCE, RouterPreference.X);
      return;
    }

    // Otherwise, the user has opted out or their preference is UniswapX/client, so set the preference to whatever is specified.
    user.set(CustomUserProperties.ROUTER_PREFERENCE, routerPreference);
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

  const {
    account
  } = useWeb3React();
  const statsigUser = useMemo(() => ({
    userID: getDeviceId(),
    customIDs: {
      address: account ?? ""
    }
  }), [account]);

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

  return /*#__PURE__*/React__default.createElement(ErrorBoundary, null, /*#__PURE__*/React__default.createElement(DarkModeQueryParamReader, null), /*#__PURE__*/React__default.createElement(StatsigProvider, {
    user: statsigUser
    // TODO: replace with proxy and cycle key
    ,
    sdkKey: STATSIG_DUMMY_KEY,
    waitForInitialization: false,
    options: {
      environment: {
        tier: getEnvName()
      },
      // api: process.env.REACT_APP_STATSIG_PROXY_URL,
      api: "https://api.uniswap.org/v1/statsig-proxy"
    }
  }, /*#__PURE__*/React__default.createElement(BodyWrapper, null, /*#__PURE__*/React__default.createElement(AppChrome, {
    onShowNftProfile: handleShowNftProfile
  }), isLoaded ? /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(Modal, {
    isOpen: isNftProfile,
    onDismiss: handleCloseNftProfile
  }, /*#__PURE__*/React__default.createElement(Profile, null)), /*#__PURE__*/React__default.createElement(Tabs, {
    data: [{
      label: "Trade",
      content: /*#__PURE__*/React__default.createElement(SwapPage, null)
    }, {
      label: "Pool",
      content: /*#__PURE__*/React__default.createElement("div", {
        style: {
          backgroundColor: colors.dark_blue
        }
      }, /*#__PURE__*/React__default.createElement(Pool, null))
    }]
  })) : /*#__PURE__*/React__default.createElement(Loader, null))));
}

export { App as default };
