'use strict';

var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var sdkCore = require('@uniswap/sdk-core');
var core = require('@web3-react/core');
var useIsNftPage = require('../../hooks/useIsNftPage.cjs');
var React = require('react');
var ThemeToggle = require('./ThemeToggle.cjs');
require('../colors.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);

var initialStyles = {
  width: "200vw",
  height: "200vh",
  transform: "translate(-50vw, -100vh)"
};
var backgroundResetStyles = {
  width: "100vw",
  height: "100vh",
  transform: "unset"
};
var backgroundRadialGradientElement = document.getElementById("background-radial-gradient");
var setBackground = function setBackground(newValues) {
  return Object.entries(newValues).forEach(function (_ref) {
    var _ref2 = _slicedToArray__default["default"](_ref, 2),
      key = _ref2[0],
      value = _ref2[1];
    if (backgroundRadialGradientElement) {
      backgroundRadialGradientElement.style[key] = value;
    }
  });
};
function setDefaultBackground(backgroundRadialGradientElement, darkMode) {
  setBackground(initialStyles);
  var defaultLightGradient = "radial-gradient(100% 100% at 50% 0%, rgba(255, 184, 226, 0) 0%, rgba(255, 255, 255, 0) 100%), #FFFFFF";
  var defaultDarkGradient = "linear-gradient(180deg, #131313 0%, #131313 100%)";
  backgroundRadialGradientElement.style.background = darkMode ? defaultDarkGradient : defaultLightGradient;
}
function RadialGradientByChainUpdater() {
  var _useWeb3React = core.useWeb3React(),
    chainId = _useWeb3React.chainId;
  var _useDarkModeManager = ThemeToggle.useDarkModeManager(),
    _useDarkModeManager2 = _slicedToArray__default["default"](_useDarkModeManager, 1),
    darkMode = _useDarkModeManager2[0];
  var isNftPage = useIsNftPage.useIsNftPage();

  // manage background color
  React.useEffect(function () {
    if (!backgroundRadialGradientElement) {
      return;
    }
    switch (chainId) {
      case sdkCore.ChainId.ARBITRUM_ONE:
      case sdkCore.ChainId.ARBITRUM_GOERLI:
        {
          setBackground(backgroundResetStyles);
          var arbitrumLightGradient = "radial-gradient(100% 100% at 50% 0%, rgba(205, 232, 251, 0) 0%, rgba(252, 243, 249, 0) 49.48%, rgba(255, 255, 255, 0) 100%), #FFFFFF";
          var arbitrumDarkGradient = "radial-gradient(100% 100% at 50% 0%, rgba(10, 41, 75, 0) 0%, rgba(34, 30, 48, 0) 49.48%, rgba(31, 33, 40, 0) 100%), #0D0E0E";
          backgroundRadialGradientElement.style.background = darkMode ? arbitrumDarkGradient : arbitrumLightGradient;
          break;
        }
      case sdkCore.ChainId.OPTIMISM:
      case sdkCore.ChainId.OPTIMISM_GOERLI:
        {
          setBackground(backgroundResetStyles);
          var optimismLightGradient = "radial-gradient(100% 100% at 50% 0%, rgba(255, 251, 242, 0) 0%, rgba(255, 244, 249, 0) 50.52%, rgba(255, 255, 255, 0) 100%), #FFFFFF";
          var optimismDarkGradient = "radial-gradient(100% 100% at 50% 0%, rgba(62, 46, 56, 0) 0%, rgba(44, 31, 45, 0) 50.52%, rgba(31, 33, 40, 0) 100%), #0D0E0E";
          backgroundRadialGradientElement.style.background = darkMode ? optimismDarkGradient : optimismLightGradient;
          break;
        }
      case sdkCore.ChainId.POLYGON:
      case sdkCore.ChainId.POLYGON_MUMBAI:
        {
          setBackground(backgroundResetStyles);
          var polygonLightGradient = "radial-gradient(100% 100% at 50% 0%, rgba(130, 71, 229, 0) 0%, rgba(200, 168, 255, 0.05) 52.6%, rgba(0, 0, 0, 0) 100%), #FFFFFF";
          var polygonDarkGradient = "radial-gradient(100% 100% at 50% 0%, rgba(130, 71, 229, 0) 0%, rgba(200, 168, 255, 0.05) 52.6%, rgba(0, 0, 0, 0) 100%), #0D0E0E";
          backgroundRadialGradientElement.style.background = darkMode ? polygonDarkGradient : polygonLightGradient;
          break;
        }
      case sdkCore.ChainId.CELO:
      case sdkCore.ChainId.CELO_ALFAJORES:
        {
          setBackground(backgroundResetStyles);
          var celoLightGradient = "radial-gradient(100% 100% at 50% 0%, rgba(186, 228, 210, 0) 0%, rgba(252, 243, 249, 0) 49.48%, rgba(255, 255, 255, 0) 100%), #FFFFFF";
          var celoDarkGradient = "radial-gradient(100% 100% at 50% 0%, rgba(20, 49, 37, 0) 0%, rgba(12, 31, 23, 0) 49.48%, rgba(31, 33, 40, 0) 100%, rgba(31, 33, 40, 0) 100%), #0D0E0E";
          backgroundRadialGradientElement.style.background = darkMode ? celoDarkGradient : celoLightGradient;
          break;
        }
      case sdkCore.ChainId.BNB:
        {
          setBackground(backgroundResetStyles);
          var bscLightGradient = "radial-gradient(100% 100% at 50% 0%, rgba(242 , 186, 8, 0) 0%, rgba(238, 182, 6, 0) 50%, rgba(140, 185, 11, 0) 100%), #FFFFFF";
          var bscDarkGradient = "radial-gradient(100% 100% at 50% 0%, rgba(169, 132, 17, 0) 0%, rgba(128, 100, 14, 0) 50%, rgba(140, 185, 11, 0) 100%), #0D0E0E";
          backgroundRadialGradientElement.style.background = darkMode ? bscDarkGradient : bscLightGradient;
          break;
        }
      case sdkCore.ChainId.AVALANCHE:
        {
          setBackground(backgroundResetStyles);
          var avaxLightGradient = "radial-gradient(100% 100% at 50% 0%, rgba(255, 251, 242, 0) 0%, rgba(255, 244, 249, 0.0) 50.52%, rgba(255, 255, 255, 0) 100%), #FFFFFF";
          var avaxDarkGradient = "radial-gradient(100% 100% at 50% 0%, rgba(62, 46, 56, 0) 0%, rgba(44, 31, 45, 0.0) 50.52%, rgba(31, 33, 40, 0) 100%), #0D0E0E";
          backgroundRadialGradientElement.style.background = darkMode ? avaxDarkGradient : avaxLightGradient;
          break;
        }
      case sdkCore.ChainId.BASE:
        {
          setBackground(backgroundResetStyles);
          var baseLightGradient = "radial-gradient(100% 100% at 50% 0%, rgba(0, 82, 255, 0) 0%, rgba(0, 82, 255, 0) 40.0%, rgba(252, 255, 82, 0.00) 100%), rgb(255, 255, 255)";
          var baseDarkGradient = "radial-gradient(100% 100% at 50% 0%, rgba(10, 41, 75, 0) 0%, rgba(0, 82, 255, 0) 40%, rgba(0, 82, 255, 0) 100%), rgb(13, 14, 14)";
          backgroundRadialGradientElement.style.background = darkMode ? baseDarkGradient : baseLightGradient;
          break;
        }
      default:
        {
          setDefaultBackground(backgroundRadialGradientElement, darkMode);
        }
    }
  }, [darkMode, chainId, isNftPage]);
  return null;
}

module.exports = RadialGradientByChainUpdater;
