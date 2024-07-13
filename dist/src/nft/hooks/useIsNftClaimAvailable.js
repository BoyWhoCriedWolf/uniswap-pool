import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

var useIsNftClaimAvailable = create()(devtools(function (set) {
  return {
    isClaimAvailable: false,
    setIsClaimAvailable: function setIsClaimAvailable(isClaimAvailable) {
      set(function () {
        return {
          isClaimAvailable: isClaimAvailable
        };
      });
    }
  };
}, {
  name: "useIsNftClaimAvailable"
}));

export { useIsNftClaimAvailable };
