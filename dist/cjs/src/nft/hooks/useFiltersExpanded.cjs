'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var zustand = require('zustand');
var middleware = require('zustand/middleware');

var useFiltersExpandedStore = zustand.create()(middleware.persist(middleware.devtools(function (set) {
  return {
    isExpanded: false,
    setExpanded: function setExpanded(expanded) {
      return set(function () {
        return {
          isExpanded: expanded
        };
      });
    }
  };
}, {
  name: "useFiltersExpanded"
}), {
  name: "useFiltersExpanded"
}));
var useFiltersExpanded = function useFiltersExpanded() {
  var isExpanded = useFiltersExpandedStore(function (s) {
    return s.isExpanded;
  });
  var setExpanded = useFiltersExpandedStore(function (s) {
    return s.setExpanded;
  });
  return [isExpanded, setExpanded];
};

exports.useFiltersExpanded = useFiltersExpanded;
