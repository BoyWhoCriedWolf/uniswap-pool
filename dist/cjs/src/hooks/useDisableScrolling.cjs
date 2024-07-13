'use strict';

var React = require('react');
var userAgent = require('../utils/userAgent.cjs');

/** Disables scrolling of the main body on mobile when `true` is passed. Generally used for modals. */
function useDisableScrolling(disable) {
  React.useEffect(function () {
    if (!userAgent.isMobile) return;
    document.body.style.overflow = disable ? "hidden" : "auto";
  }, [disable]);
}

module.exports = useDisableScrolling;
