import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

create()(devtools(function (set) {
  return {
    isCollectionNftsLoading: false,
    setIsCollectionNftsLoading: function setIsCollectionNftsLoading(isCollectionNftsLoading) {
      return set(function () {
        return {
          isCollectionNftsLoading: isCollectionNftsLoading
        };
      });
    },
    isCollectionStatsLoading: false,
    setIsCollectionStatsLoading: function setIsCollectionStatsLoading(isCollectionStatsLoading) {
      return set(function () {
        return {
          isCollectionStatsLoading: isCollectionStatsLoading
        };
      });
    }
  };
}, {
  name: "useIsCollectionLoading"
}));
