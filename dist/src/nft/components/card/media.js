import React__default, { useState, useRef, useEffect } from 'react';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { Trans } from '../../../../node_modules/@lingui/react/dist/index.mjs.js';
import Row from '../../../components/Row/index.js';
import { getHeightFromAspectRatio, getMediaAspectRatio, handleUniformAspectRatio } from './utils.js';
import { UniformAspectRatios } from '../../types/collection/index.js';
import { Pause, Play } from 'react-feather';
import styled from 'styled-components';
import { BREAKPOINTS } from '../../../theme/index.js';
import { colors } from '../../../theme/colors.js';
import '../../../theme/components/index.js';
import { ThemedText } from '../../../theme/components/text.js';

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9;
var StyledImageContainer = styled.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  position: relative;\n  pointer-events: auto;\n  &:hover {\n    opacity: ", ";\n  }\n  cursor: ", ";\n"])), function (_ref) {
  var isDisabled = _ref.isDisabled,
    theme = _ref.theme;
  return isDisabled ? theme.opacity.disabled : theme.opacity.enabled;
}, function (_ref2) {
  var isDisabled = _ref2.isDisabled;
  return isDisabled ? "default" : "pointer";
});
var MediaContainer = function MediaContainer(_ref3) {
  var isDisabled = _ref3.isDisabled,
    children = _ref3.children;
  return /*#__PURE__*/React__default.createElement(StyledImageContainer, {
    isDisabled: isDisabled
  }, children);
};
var StyledMediaContainer = styled(Row)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  overflow: hidden;\n  border-top-left-radius: 12px;\n  border-top-right-radius: 12px;\n"])));
var StyledImage = styled.img(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  width: 100%;\n  aspect-ratio: ", ";\n  transition: ", ";\n  will-change: transform;\n  object-fit: contain;\n  visibility: ", ";\n  background: ", ";\n"])), function (_ref4) {
  var $aspectRatio = _ref4.$aspectRatio;
  return $aspectRatio;
}, function (_ref5) {
  var theme = _ref5.theme;
  return "".concat(theme.transition.duration.medium, " ").concat(theme.transition.timing.ease, " transform");
}, function (_ref6) {
  var $hidden = _ref6.$hidden;
  return $hidden ? "hidden" : "visible";
}, function (_ref7) {
  var theme = _ref7.theme,
    imageLoading = _ref7.imageLoading;
  return imageLoading && "linear-gradient(270deg, ".concat(theme.surface3, " 0%, ").concat(theme.surface1, " 100%)");
});
var NftImage = function NftImage(_ref8) {
  var src = _ref8.src,
    _ref8$uniformAspectRa = _ref8.uniformAspectRatio,
    uniformAspectRatio = _ref8$uniformAspectRa === void 0 ? UniformAspectRatios.square : _ref8$uniformAspectRa,
    setUniformAspectRatio = _ref8.setUniformAspectRatio,
    renderedHeight = _ref8.renderedHeight,
    setRenderedHeight = _ref8.setRenderedHeight;
  var _useState = useState(!src),
    _useState2 = _slicedToArray(_useState, 2),
    noContent = _useState2[0],
    setNoContent = _useState2[1];
  var _useState3 = useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    loaded = _useState4[0],
    setLoaded = _useState4[1];
  if (noContent) {
    return /*#__PURE__*/React__default.createElement(NoContentContainer, {
      height: getHeightFromAspectRatio(uniformAspectRatio, renderedHeight)
    });
  }
  return /*#__PURE__*/React__default.createElement(StyledMediaContainer, null, /*#__PURE__*/React__default.createElement(StyledImage, {
    src: src,
    $aspectRatio: getMediaAspectRatio(uniformAspectRatio, setUniformAspectRatio),
    imageLoading: !loaded,
    draggable: false,
    onError: function onError() {
      return setNoContent(true);
    },
    onLoad: function onLoad(e) {
      handleUniformAspectRatio(uniformAspectRatio, e, setUniformAspectRatio, renderedHeight, setRenderedHeight);
      setLoaded(true);
    }
  }));
};
var PlaybackButton = styled.div(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  display: ", ";\n  color: ", ";\n  position: absolute;\n  height: 40px;\n  width: 40px;\n  z-index: 1;\n  margin-left: calc(100% - 50px);\n  transform: translateY(-76px);\n\n  @media screen and (max-width: ", "px) {\n    display: block;\n  }\n\n  ", ":hover & {\n    display: block;\n  }\n"])), function (_ref9) {
  var pauseButton = _ref9.pauseButton;
  return pauseButton ? "block" : "none";
}, function (_ref10) {
  var theme = _ref10.theme;
  return theme.accent1;
}, BREAKPOINTS.sm, StyledImageContainer);
var StyledVideo = styled.video(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n  width: 100%;\n  aspect-ratio: ", ";\n"])), function (_ref11) {
  var $aspectRatio = _ref11.$aspectRatio;
  return $aspectRatio;
});
var StyledInnerMediaContainer = styled(Row)(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n  position: absolute;\n  left: 0px;\n  top: 0px;\n"])));
var StyledAudio = styled.audio(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["\n  width: 100%;\n  height: 100%;\n"])));
var NftPlayableMedia = function NftPlayableMedia(_ref12) {
  var isAudio = _ref12.isAudio,
    src = _ref12.src,
    mediaSrc = _ref12.mediaSrc,
    tokenId = _ref12.tokenId,
    _ref12$uniformAspectR = _ref12.uniformAspectRatio,
    uniformAspectRatio = _ref12$uniformAspectR === void 0 ? UniformAspectRatios.square : _ref12$uniformAspectR,
    setUniformAspectRatio = _ref12.setUniformAspectRatio,
    renderedHeight = _ref12.renderedHeight,
    setRenderedHeight = _ref12.setRenderedHeight,
    shouldPlay = _ref12.shouldPlay,
    setCurrentTokenPlayingMedia = _ref12.setCurrentTokenPlayingMedia;
  var mediaRef = useRef(null);
  var _useState5 = useState(!src),
    _useState6 = _slicedToArray(_useState5, 2),
    noContent = _useState6[0],
    setNoContent = _useState6[1];
  var _useState7 = useState(false),
    _useState8 = _slicedToArray(_useState7, 2),
    imageLoaded = _useState8[0],
    setImageLoaded = _useState8[1];
  useEffect(function () {
    if (shouldPlay && mediaRef.current) {
      mediaRef.current.play();
    } else if (!shouldPlay && mediaRef.current) {
      mediaRef.current.pause();
    }
  }, [shouldPlay]);
  if (noContent) {
    return /*#__PURE__*/React__default.createElement(NoContentContainer, {
      height: getHeightFromAspectRatio(uniformAspectRatio, renderedHeight)
    });
  }
  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(StyledMediaContainer, null, /*#__PURE__*/React__default.createElement(StyledImage, {
    src: src,
    $aspectRatio: getMediaAspectRatio(uniformAspectRatio, setUniformAspectRatio),
    imageLoading: !imageLoaded,
    draggable: false,
    onError: function onError() {
      return setNoContent(true);
    },
    onLoad: function onLoad(e) {
      handleUniformAspectRatio(uniformAspectRatio, e, setUniformAspectRatio, renderedHeight, setRenderedHeight);
      setImageLoaded(true);
    },
    $hidden: shouldPlay && !isAudio
  })), shouldPlay ? /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(PlaybackButton, {
    pauseButton: true
  }, /*#__PURE__*/React__default.createElement(Pause, {
    size: "24px",
    onClick: function onClick(e) {
      e.preventDefault();
      e.stopPropagation();
      setCurrentTokenPlayingMedia(undefined);
    }
  })), /*#__PURE__*/React__default.createElement(StyledInnerMediaContainer, null, isAudio ? /*#__PURE__*/React__default.createElement(StyledAudio, {
    ref: mediaRef,
    onEnded: function onEnded(e) {
      e.preventDefault();
      setCurrentTokenPlayingMedia(undefined);
    }
  }, /*#__PURE__*/React__default.createElement("source", {
    src: mediaSrc
  })) : /*#__PURE__*/React__default.createElement(StyledVideo, {
    $aspectRatio: getMediaAspectRatio(uniformAspectRatio, setUniformAspectRatio),
    ref: mediaRef,
    onEnded: function onEnded(e) {
      e.preventDefault();
      setCurrentTokenPlayingMedia(undefined);
    },
    loop: true,
    playsInline: true
  }, /*#__PURE__*/React__default.createElement("source", {
    src: mediaSrc
  })))) : /*#__PURE__*/React__default.createElement(PlaybackButton, null, /*#__PURE__*/React__default.createElement(Play, {
    size: "24px",
    onClick: function onClick(e) {
      e.preventDefault();
      e.stopPropagation();
      setCurrentTokenPlayingMedia(tokenId);
    }
  })));
};
var NoContentContainerBackground = styled.div(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["\n  position: relative;\n  width: 100%;\n  height: ", ";\n  padding-top: 100%;\n  background: ", ";\n"])), function (_ref13) {
  var $height = _ref13.$height;
  return $height ? "".concat($height, "px") : "auto";
}, function (_ref14) {
  var theme = _ref14.theme;
  return "linear-gradient(90deg, ".concat(theme.surface1, " 0%, ").concat(theme.surface3, " 95.83%)");
});
var NoContentText = styled(ThemedText.BodyPrimary)(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral(["\n  position: absolute;\n  text-align: center;\n  left: 50%;\n  top: 50%;\n  transform: translate3d(-50%, -50%, 0);\n  color: ", ";\n"])), colors.gray500);
var NoContentContainer = function NoContentContainer(_ref15) {
  var height = _ref15.height;
  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(NoContentContainerBackground, {
    $height: height
  }, /*#__PURE__*/React__default.createElement(NoContentText, null, /*#__PURE__*/React__default.createElement(Trans, {
    id: "cASU3N",
    message: "Content not"
  }), /*#__PURE__*/React__default.createElement("br", null), /*#__PURE__*/React__default.createElement(Trans, {
    id: "zZ4uq1",
    message: "available yet"
  }))));
};

export { MediaContainer, NftImage, NftPlayableMedia, StyledImage };
