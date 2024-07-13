import { devtools } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';
import { ProfilePageStateType } from '../types/sell/index.js';

var useProfilePageState = createWithEqualityFn()(devtools(function (set) {
  return {
    state: ProfilePageStateType.VIEWING,
    setProfilePageState: function setProfilePageState(newState) {
      return set(function () {
        return {
          state: newState
        };
      });
    }
  };
}, {
  name: "useProfilePageState"
}), shallow);

export { useProfilePageState };
