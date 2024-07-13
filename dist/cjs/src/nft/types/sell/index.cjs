'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var ListingStatus = /*#__PURE__*/function (ListingStatus) {
  ListingStatus["APPROVED"] = "Approved";
  ListingStatus["CONTINUE"] = "Continue";
  ListingStatus["DEFINED"] = "Defined";
  ListingStatus["FAILED"] = "Failed";
  ListingStatus["PAUSED"] = "Paused";
  ListingStatus["PENDING"] = "Pending";
  ListingStatus["REJECTED"] = "Rejected";
  ListingStatus["SIGNING"] = "Signing";
  return ListingStatus;
}({});
// Creating this as an enum and not boolean as we will likely have a success screen state to show
var ProfilePageStateType = /*#__PURE__*/function (ProfilePageStateType) {
  ProfilePageStateType[ProfilePageStateType["VIEWING"] = 0] = "VIEWING";
  ProfilePageStateType[ProfilePageStateType["LISTING"] = 1] = "LISTING";
  return ProfilePageStateType;
}({});

exports.ListingStatus = ListingStatus;
exports.ProfilePageStateType = ProfilePageStateType;
