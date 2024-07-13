import { TxStateType, BagStatus } from '../types/checkout/index.js';
import { useRef, useEffect } from 'react';
import { useBag } from './useBag.js';
import { useSendTransaction } from './useSendTransaction.js';

function useSubscribeTransactionState(setModalIsOpen) {
  var transactionState = useSendTransaction(function (state) {
    return state.state;
  });
  var setTransactionState = useSendTransaction(function (state) {
    return state.setState;
  });
  var transactionStateRef = useRef(transactionState);
  var _useBag = useBag(function (_ref) {
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
  useEffect(function () {
    useSendTransaction.subscribe(function (state) {
      return transactionStateRef.current = state.state;
    });
  }, []);
  useEffect(function () {
    if (transactionStateRef.current === TxStateType.Confirming) setBagStatus(BagStatus.PROCESSING_TRANSACTION);
    if (transactionStateRef.current === TxStateType.Denied || transactionStateRef.current === TxStateType.Invalid) {
      if (transactionStateRef.current === TxStateType.Invalid) {
        setBagStatus(BagStatus.WARNING);
      } else setBagStatus(BagStatus.CONFIRM_REVIEW);
      setTransactionState(TxStateType.New);
      setBagLocked(false);
      setModalIsOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setBagLocked, setBagStatus, setModalIsOpen, setTransactionState, transactionStateRef.current]);
}

export { useSubscribeTransactionState };
