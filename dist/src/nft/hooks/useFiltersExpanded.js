import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

var useFiltersExpandedStore = create()(persist(devtools(function (set) {
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

export { useFiltersExpanded };
