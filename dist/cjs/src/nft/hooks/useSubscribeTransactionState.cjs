'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var index = require('../types/checkout/index.cjs');
var React = require('react');
var useBag = require('./useBag.cjs');
var useSendTransaction = require('./useSendTransaction.cjs');

function useSubscribeTransactionState(setModalIsOpen) {
  var transactionState = useSendTransaction.useSendTransaction(function (state) {
    return state.state;
  });
  var setTransactionState = useSendTransaction.useSendTransaction(function (state) {
    return state.setState;
  });
  var transactionStateRef = React.useRef(transactionState);
  var _useBag = useBag.useBag(function (_ref) {
      var setBagExpanded = _ref.setBagExpanded,
        setBagStatus = _ref.setBagStatus,
        setLocked = _ref.setLocked;
      return {
        setBagExpanded: setBagExpanded,
        setBagStatus: setBagStatus,
        setLocked: setLocked
      };
    }),
    setBagStatus = _useBag.setBagStatus,
    setBagLocked = _useBag.setLocked;
  React.useEffect(function () {
    useSendTransaction.useSendTransaction.subscribe(function (state) {
      return transactionStateRef.current = state.state;
    });
  }, []);
  React.useEffect(function () {
    if (transactionStateRef.current === index.TxStateType.Confirming) setBagStatus(index.BagStatus.PROCESSING_TRANSACTION);
    if (transactionStateRef.current === index.TxStateType.Denied || transactionStateRef.current === index.TxStateType.Invalid) {
      if (transactionStateRef.current === index.TxStateType.Invalid) {
        setBagStatus(index.BagStatus.WARNING);
      } else setBagStatus(index.BagStatus.CONFIRM_REVIEW);
      setTransactionState(index.TxStateType.New);
      setBagLocked(false);
      setModalIsOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setBagLocked, setBagStatus, setModalIsOpen, setTransactionState, transactionStateRef.current]);
}

exports.useSubscribeTransactionState = useSubscribeTransactionState;
