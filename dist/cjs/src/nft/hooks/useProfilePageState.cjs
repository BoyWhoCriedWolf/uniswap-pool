'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var middleware = require('zustand/middleware');
var shallow = require('zustand/shallow');
var traditional = require('zustand/traditional');
var index = require('../types/sell/index.cjs');

var useProfilePageState = traditional.createWithEqualityFn()(middleware.devtools(function (set) {
  return {
    state: index.ProfilePageStateType.VIEWING,
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
}), shallow.shallow);

exports.useProfilePageState = useProfilePageState;
