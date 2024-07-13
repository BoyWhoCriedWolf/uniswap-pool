'use strict';

var _asyncToGenerator = require('@babel/runtime/helpers/asyncToGenerator');
var _regeneratorRuntime = require('@babel/runtime/regenerator');
var core = require('@web3-react/core');
var ms = require('ms');
var React = require('react');
var hooks = require('../../../state/signatures/hooks.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _asyncToGenerator__default = /*#__PURE__*/_interopDefaultLegacy(_asyncToGenerator);
var _regeneratorRuntime__default = /*#__PURE__*/_interopDefaultLegacy(_regeneratorRuntime);
var ms__default = /*#__PURE__*/_interopDefaultLegacy(ms);

// const UNISWAP_API_URL = process.env.REACT_APP_UNISWAP_API_URL;
var UNISWAP_API_URL = "https://api.uniswap.org/v2";
function fetchOrderStatuses(account, orders) {
  var orderHashes = orders.map(function (order) {
    return order.orderHash;
  }).join(",");
  return global.fetch("".concat(UNISWAP_API_URL, "/orders?swapper=").concat(account, "&orderHashes=").concat(orderHashes));
}
var OFF_CHAIN_ORDER_STATUS_POLLING = ms__default["default"]("2s");
function OrderUpdater(_ref) {
  var pendingOrders = _ref.pendingOrders,
    onOrderUpdate = _ref.onOrderUpdate;
  var _useWeb3React = core.useWeb3React(),
    account = _useWeb3React.account;
  React.useEffect(function () {
    function getOrderStatuses() {
      return _getOrderStatuses.apply(this, arguments);
    }
    function _getOrderStatuses() {
      _getOrderStatuses = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee() {
        var pollOrderStatus, orderStatuses;
        return _regeneratorRuntime__default["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              if (!(!account || pendingOrders.length === 0)) {
                _context.next = 2;
                break;
              }
              return _context.abrupt("return");
            case 2:
              if (!pendingOrders.every(function (order) {
                return hooks.isFinalizedOrder(order.status);
              })) {
                _context.next = 5;
                break;
              }
              clearInterval(interval);
              return _context.abrupt("return");
            case 5:
              _context.prev = 5;
              _context.next = 8;
              return fetchOrderStatuses(account, pendingOrders);
            case 8:
              pollOrderStatus = _context.sent;
              _context.next = 11;
              return pollOrderStatus.json();
            case 11:
              orderStatuses = _context.sent;
              pendingOrders.forEach(function (pendingOrder) {
                var updatedOrder = orderStatuses.orders.find(function (order) {
                  return order.orderHash === pendingOrder.orderHash;
                });
                if (updatedOrder) {
                  onOrderUpdate(pendingOrder, updatedOrder);
                }
              });
              _context.next = 18;
              break;
            case 15:
              _context.prev = 15;
              _context.t0 = _context["catch"](5);
              console.error("Error fetching order statuses", _context.t0);
            case 18:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[5, 15]]);
      }));
      return _getOrderStatuses.apply(this, arguments);
    }
    var interval = setInterval(getOrderStatuses, OFF_CHAIN_ORDER_STATUS_POLLING);
    return function () {
      return clearInterval(interval);
    };
  }, [account, onOrderUpdate, pendingOrders]);
  return null;
}

module.exports = OrderUpdater;
