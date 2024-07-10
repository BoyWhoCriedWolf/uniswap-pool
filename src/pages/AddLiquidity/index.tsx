import { BigNumber } from "@ethersproject/bignumber";
import type { TransactionResponse } from "@ethersproject/providers";
import { Trans } from "@lingui/macro";
import {
  BrowserEvent,
  InterfaceElementName,
  InterfaceEventName,
  LiquidityEventName,
} from "@uniswap/analytics-events";
import {
  Currency,
  CurrencyAmount,
  NONFUNGIBLE_POSITION_MANAGER_ADDRESSES,
  Percent,
} from "@uniswap/sdk-core";
import { FeeAmount, NonfungiblePositionManager } from "@uniswap/v3-sdk";
import { useWeb3React } from "@web3-react/core";
import { sendAnalyticsEvent, TraceEvent, useTrace } from "analytics";
import { useToggleAccountDrawer } from "components/AccountDrawer";
import OwnershipWarning from "components/addLiquidity/OwnershipWarning";
import UnsupportedCurrencyFooter from "components/swap/UnsupportedCurrencyFooter";
import { isSupportedChain } from "constants/chains";
import { useSingleCallResult } from "lib/hooks/multicall";
import { PositionPageUnsupportedContent } from "pages/Pool/PositionPage";
import { useCallback, useMemo, useState } from "react";
import { AlertTriangle } from "react-feather";
import { Text } from "rebass";
import {
  useRangeHopCallbacks,
  useV3DerivedMintInfo,
  useV3MintActionHandlers,
  useV3MintState,
} from "state/mint/v3/hooks";
import { useTheme } from "styled-components";
import { ThemedText } from "theme/components";
import { addressesAreEquivalent } from "utils/addressesAreEquivalent";
import { WrongChainError } from "utils/errors";

import {
  ButtonError,
  ButtonLight,
  ButtonPrimary,
  ButtonText,
} from "../../components/Button";
import { BlueCard, OutlineCard, YellowCard } from "../../components/Card";
import { AutoColumn } from "../../components/Column";
import CurrencyInputPanel from "../../components/CurrencyInputPanel";
import FeeSelector from "../../components/FeeSelector";
import HoverInlineText from "../../components/HoverInlineText";
import LiquidityChartRangeInput from "../../components/LiquidityChartRangeInput";
import { AddRemoveTabs } from "../../components/NavigationTabs";
import { PositionPreview } from "../../components/PositionPreview";
import RangeSelector from "../../components/RangeSelector";
import PresetsButtons from "../../components/RangeSelector/PresetsButtons";
import RateToggle from "../../components/RateToggle";
import Row, { RowBetween, RowFixed } from "../../components/Row";
import { SwitchLocaleLink } from "../../components/SwitchLocaleLink";
import TransactionConfirmationModal, {
  ConfirmationModalContent,
} from "../../components/TransactionConfirmationModal";
import { ZERO_PERCENT } from "../../constants/misc";
import { WRAPPED_NATIVE_CURRENCY } from "../../constants/tokens";
import { useCurrency } from "../../hooks/Tokens";
import {
  ApprovalState,
  useApproveCallback,
} from "../../hooks/useApproveCallback";
import { useArgentWalletContract } from "../../hooks/useArgentWalletContract";
import { useV3NFTPositionManagerContract } from "../../hooks/useContract";
import { useDerivedPositionInfo } from "../../hooks/useDerivedPositionInfo";
import { useIsSwapUnsupported } from "../../hooks/useIsSwapUnsupported";
import { useStablecoinValue } from "../../hooks/useStablecoinPrice";
import useTransactionDeadline from "../../hooks/useTransactionDeadline";
import { useV3PositionFromTokenId } from "../../hooks/useV3Positions";
import { Bound, Field } from "../../state/mint/v3/actions";
import { useTransactionAdder } from "../../state/transactions/hooks";
import {
  TransactionInfo,
  TransactionType,
} from "../../state/transactions/types";
import { useUserSlippageToleranceWithDefault } from "../../state/user/hooks";
import approveAmountCalldata from "../../utils/approveAmountCalldata";
import { calculateGasMargin } from "../../utils/calculateGasMargin";
import { currencyId } from "../../utils/currencyId";
import { maxAmountSpend } from "../../utils/maxAmountSpend";
import { Dots } from "../Pool/styled";
import { Review } from "./Review";
import {
  DynamicSection,
  MediumOnly,
  ResponsiveTwoColumns,
  ScrollablePage,
  StyledInput,
  Wrapper,
} from "./styled";

const DEFAULT_ADD_IN_RANGE_SLIPPAGE_TOLERANCE = new Percent(50, 10_000);

interface AddLiquidityProps {
  currencyIdA?: string;
  currencyIdB?: string;
  onChangeCurrencyIdA?: (v?: string) => void;
  onChangeCurrencyIdB?: (v?: string) => void;

  feeAmount?: FeeAmount;
  onChangeFeeAmount?: (v?: FeeAmount) => void;
  tokenId?: string;

  openPools?: () => void;
}

export default function AddLiquidityWrapper({
  currencyIdA = "ETH",
  currencyIdB,
  onChangeCurrencyIdA = () => null,
  onChangeCurrencyIdB = () => null,

  feeAmount,
  onChangeFeeAmount = () => null,
  tokenId,

  openPools = () => null,
}: AddLiquidityProps = {}) {
  const { chainId } = useWeb3React();
  if (isSupportedChain(chainId)) {
    return (
      <AddLiquidity
        currencyIdA={currencyIdA}
        onChangeCurrencyIdA={onChangeCurrencyIdA}
        currencyIdB={currencyIdB}
        onChangeCurrencyIdB={onChangeCurrencyIdB}
        feeAmount={feeAmount}
        onChangeFeeAmount={onChangeFeeAmount}
        tokenId={tokenId}
        openPools={openPools}
      />
    );
  } else {
    return <PositionPageUnsupportedContent />;
  }
}

function AddLiquidity({
  currencyIdA = "ETH",
  currencyIdB,
  onChangeCurrencyIdA = () => null,
  onChangeCurrencyIdB = () => null,

  feeAmount,
  onChangeFeeAmount = () => null,
  tokenId,

  openPools = () => null,
}: AddLiquidityProps = {}) {
  const { account, chainId, provider } = useWeb3React();
  const theme = useTheme();
  const trace = useTrace();

  const toggleWalletDrawer = useToggleAccountDrawer(); // toggle wallet when disconnected
  const addTransaction = useTransactionAdder();
  const positionManager = useV3NFTPositionManagerContract();

  // min price, max price
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // check for existing position if tokenId in url
  const { position: existingPositionDetails, loading: positionLoading } =
    useV3PositionFromTokenId(tokenId ? BigNumber.from(tokenId) : undefined);
  const hasExistingPosition = !!existingPositionDetails && !positionLoading;
  const { position: existingPosition } = useDerivedPositionInfo(
    existingPositionDetails
  );

  const baseCurrency = useCurrency(currencyIdA);
  const currencyB = useCurrency(currencyIdB);
  // prevent an error if they input ETH/WETH
  const quoteCurrency =
    baseCurrency && currencyB && baseCurrency.wrapped.equals(currencyB.wrapped)
      ? undefined
      : currencyB;

  // mint state
  const { independentField, typedValue, startPriceTypedValue } =
    useV3MintState();

  const {
    pool,
    ticks,
    dependentField,
    price,
    pricesAtTicks,
    pricesAtLimit,
    parsedAmounts,
    currencyBalances,
    position,
    noLiquidity,
    currencies,
    errorMessage,
    invalidPool,
    invalidRange,
    outOfRange,
    depositADisabled,
    depositBDisabled,
    invertPrice,
    ticksAtLimit,
  } = useV3DerivedMintInfo(
    baseCurrency ?? undefined,
    quoteCurrency ?? undefined,
    feeAmount,
    baseCurrency ?? undefined,
    existingPosition
  );

  const {
    onFieldAInput,
    onFieldBInput,
    onLeftRangeInput,
    onRightRangeInput,
    onStartPriceInput,
  } = useV3MintActionHandlers(noLiquidity);

  const isValid = !errorMessage && !invalidRange;

  // modal and loading
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [attemptingTxn, setAttemptingTxn] = useState<boolean>(false); // clicked confirm

  // txn values
  const deadline = useTransactionDeadline(); // custom from users settings

  const [txHash, setTxHash] = useState<string>("");

  // get formatted amounts
  const formattedAmounts = {
    [independentField]: typedValue,
    [dependentField]: parsedAmounts[dependentField]?.toSignificant(6) ?? "",
  };

  const usdcValues = {
    [Field.CURRENCY_A]: useStablecoinValue(parsedAmounts[Field.CURRENCY_A]),
    [Field.CURRENCY_B]: useStablecoinValue(parsedAmounts[Field.CURRENCY_B]),
  };

  // get the max amounts user can add
  const maxAmounts: { [field in Field]?: CurrencyAmount<Currency> } = [
    Field.CURRENCY_A,
    Field.CURRENCY_B,
  ].reduce((accumulator, field) => {
    return {
      ...accumulator,
      [field]: maxAmountSpend(currencyBalances[field]),
    };
  }, {});

  const atMaxAmounts: { [field in Field]?: CurrencyAmount<Currency> } = [
    Field.CURRENCY_A,
    Field.CURRENCY_B,
  ].reduce((accumulator, field) => {
    return {
      ...accumulator,
      [field]: maxAmounts[field]?.equalTo(parsedAmounts[field] ?? "0"),
    };
  }, {});

  const argentWalletContract = useArgentWalletContract();

  // check whether the user has approved the router on the tokens
  const [approvalA, approveACallback] = useApproveCallback(
    argentWalletContract ? undefined : parsedAmounts[Field.CURRENCY_A],
    chainId ? NONFUNGIBLE_POSITION_MANAGER_ADDRESSES[chainId] : undefined
  );
  const [approvalB, approveBCallback] = useApproveCallback(
    argentWalletContract ? undefined : parsedAmounts[Field.CURRENCY_B],
    chainId ? NONFUNGIBLE_POSITION_MANAGER_ADDRESSES[chainId] : undefined
  );

  const allowedSlippage = useUserSlippageToleranceWithDefault(
    outOfRange ? ZERO_PERCENT : DEFAULT_ADD_IN_RANGE_SLIPPAGE_TOLERANCE
  );

  async function onAdd() {
    if (!chainId || !provider || !account) return;

    if (!positionManager || !baseCurrency || !quoteCurrency) {
      return;
    }

    if (position && account && deadline) {
      const useNative = baseCurrency.isNative
        ? baseCurrency
        : quoteCurrency.isNative
        ? quoteCurrency
        : undefined;
      const { calldata, value } =
        hasExistingPosition && tokenId
          ? NonfungiblePositionManager.addCallParameters(position, {
              tokenId,
              slippageTolerance: allowedSlippage,
              deadline: deadline.toString(),
              useNative,
            })
          : NonfungiblePositionManager.addCallParameters(position, {
              slippageTolerance: allowedSlippage,
              recipient: account,
              deadline: deadline.toString(),
              useNative,
              createPool: noLiquidity,
            });

      let txn: { to: string; data: string; value: string } = {
        to: NONFUNGIBLE_POSITION_MANAGER_ADDRESSES[chainId],
        data: calldata,
        value,
      };

      if (argentWalletContract) {
        const amountA = parsedAmounts[Field.CURRENCY_A];
        const amountB = parsedAmounts[Field.CURRENCY_B];
        const batch = [
          ...(amountA && amountA.currency.isToken
            ? [
                approveAmountCalldata(
                  amountA,
                  NONFUNGIBLE_POSITION_MANAGER_ADDRESSES[chainId]
                ),
              ]
            : []),
          ...(amountB && amountB.currency.isToken
            ? [
                approveAmountCalldata(
                  amountB,
                  NONFUNGIBLE_POSITION_MANAGER_ADDRESSES[chainId]
                ),
              ]
            : []),
          {
            to: txn.to,
            data: txn.data,
            value: txn.value,
          },
        ];
        const data = argentWalletContract.interface.encodeFunctionData(
          "wc_multiCall",
          [batch]
        );
        txn = {
          to: argentWalletContract.address,
          data,
          value: "0x0",
        };
      }

      const connectedChainId = await provider.getSigner().getChainId();
      if (chainId !== connectedChainId) throw new WrongChainError();

      setAttemptingTxn(true);

      provider
        .getSigner()
        .estimateGas(txn)
        .then((estimate) => {
          const newTxn = {
            ...txn,
            gasLimit: calculateGasMargin(estimate),
          };

          return provider
            .getSigner()
            .sendTransaction(newTxn)
            .then((response: TransactionResponse) => {
              setAttemptingTxn(false);
              const transactionInfo: TransactionInfo = {
                type: TransactionType.ADD_LIQUIDITY_V3_POOL,
                baseCurrencyId: currencyId(baseCurrency),
                quoteCurrencyId: currencyId(quoteCurrency),
                createPool: Boolean(noLiquidity),
                expectedAmountBaseRaw:
                  parsedAmounts[Field.CURRENCY_A]?.quotient?.toString() ?? "0",
                expectedAmountQuoteRaw:
                  parsedAmounts[Field.CURRENCY_B]?.quotient?.toString() ?? "0",
                feeAmount: position.pool.fee,
              };
              addTransaction(response, transactionInfo);
              setTxHash(response.hash);
              sendAnalyticsEvent(LiquidityEventName.ADD_LIQUIDITY_SUBMITTED, {
                label: [
                  currencies[Field.CURRENCY_A]?.symbol,
                  currencies[Field.CURRENCY_B]?.symbol,
                ].join("/"),
                ...trace,
                ...transactionInfo,
              });
            });
        })
        .catch((error) => {
          console.error("Failed to send transaction", error);
          setAttemptingTxn(false);
          // we only care if the error is something _other_ than the user rejected the tx
          if (error?.code !== 4001) {
            console.error(error);
          }
        });
    } else {
      return;
    }
  }

  const handleCurrencySelect = useCallback(
    (
      currencyNew: Currency,
      currencyIdOther?: string
    ): (string | undefined)[] => {
      const currencyIdNew = currencyId(currencyNew);

      if (currencyIdNew === currencyIdOther) {
        // not ideal, but for now clobber the other if the currency ids are equal
        return [currencyIdNew, undefined];
      } else {
        // prevent weth + eth
        const isETHOrWETHNew =
          currencyIdNew === "ETH" ||
          (chainId !== undefined &&
            currencyIdNew === WRAPPED_NATIVE_CURRENCY[chainId]?.address);
        const isETHOrWETHOther =
          currencyIdOther !== undefined &&
          (currencyIdOther === "ETH" ||
            (chainId !== undefined &&
              currencyIdOther === WRAPPED_NATIVE_CURRENCY[chainId]?.address));

        if (isETHOrWETHNew && isETHOrWETHOther) {
          return [currencyIdNew, undefined];
        } else {
          return [currencyIdNew, currencyIdOther];
        }
      }
    },
    [chainId]
  );

  const handleCurrencyASelect = useCallback(
    (currencyANew: Currency) => {
      const [idA, idB] = handleCurrencySelect(currencyANew, currencyIdB);
      if (idB === undefined) {
        // navigate(`/add/${idA}`);
        onChangeCurrencyIdA(idA);
      } else {
        // navigate(`/add/${idA}/${idB}`);
        onChangeCurrencyIdA(idA);
        onChangeCurrencyIdB(idB);
      }
    },
    [
      handleCurrencySelect,
      onChangeCurrencyIdA,
      onChangeCurrencyIdB,
      currencyIdB,
    ]
  );

  const handleCurrencyBSelect = useCallback(
    (currencyBNew: Currency) => {
      const [idB, idA] = handleCurrencySelect(currencyBNew, currencyIdA);
      if (idA === undefined) {
        // navigate(`/add/${idB}`);
        onChangeCurrencyIdA(idB);
      } else {
        // navigate(`/add/${idA}/${idB}`);
        onChangeCurrencyIdA(idA);
        onChangeCurrencyIdB(idB);
      }
    },
    [
      handleCurrencySelect,
      onChangeCurrencyIdA,
      onChangeCurrencyIdB,
      currencyIdA,
    ]
  );

  const handleFeePoolSelect = useCallback(
    (newFeeAmount: FeeAmount) => {
      onLeftRangeInput("");
      onRightRangeInput("");
      // navigate(`/add/${currencyIdA}/${currencyIdB}/${newFeeAmount}`);

      onChangeFeeAmount(newFeeAmount);
    },
    [onChangeFeeAmount, onLeftRangeInput, onRightRangeInput]
  );

  const handleDismissConfirmation = useCallback(() => {
    setShowConfirm(false);
    // if there was a tx hash, we want to clear the input
    if (txHash) {
      onFieldAInput("");
      // dont jump to pool page if creating
      // navigate("/pools");
      openPools();
    }
    setTxHash("");
  }, [openPools, onFieldAInput, txHash]);

  const addIsUnsupported = useIsSwapUnsupported(
    currencies?.CURRENCY_A,
    currencies?.CURRENCY_B
  );

  const clearAll = useCallback(() => {
    onFieldAInput("");
    onFieldBInput("");
    onLeftRangeInput("");
    onRightRangeInput("");
    // navigate(`/add`);
    onChangeCurrencyIdA(undefined);
    onChangeCurrencyIdB(undefined);
    onChangeFeeAmount(undefined);
  }, [
    // navigate,
    onFieldAInput,
    onFieldBInput,
    onLeftRangeInput,
    onRightRangeInput,
    onChangeCurrencyIdA,
    onChangeCurrencyIdB,
    onChangeFeeAmount,
  ]);

  // get value and prices at ticks
  const { [Bound.LOWER]: tickLower, [Bound.UPPER]: tickUpper } = ticks;
  const { [Bound.LOWER]: priceLower, [Bound.UPPER]: priceUpper } =
    pricesAtTicks;

  const {
    getDecrementLower,
    getIncrementLower,
    getDecrementUpper,
    getIncrementUpper,
    getSetFullRange,
  } = useRangeHopCallbacks(
    baseCurrency ?? undefined,
    quoteCurrency ?? undefined,
    feeAmount,
    tickLower,
    tickUpper,
    pool
  );

  // we need an existence check on parsed amounts for single-asset deposits
  const showApprovalA =
    !argentWalletContract &&
    approvalA !== ApprovalState.APPROVED &&
    !!parsedAmounts[Field.CURRENCY_A];
  const showApprovalB =
    !argentWalletContract &&
    approvalB !== ApprovalState.APPROVED &&
    !!parsedAmounts[Field.CURRENCY_B];

  const pendingText = `Supplying ${
    !depositADisabled ? parsedAmounts[Field.CURRENCY_A]?.toSignificant(6) : ""
  } ${!depositADisabled ? currencies[Field.CURRENCY_A]?.symbol : ""} ${
    !outOfRange ? "and" : ""
  } ${
    !depositBDisabled ? parsedAmounts[Field.CURRENCY_B]?.toSignificant(6) : ""
  } ${!depositBDisabled ? currencies[Field.CURRENCY_B]?.symbol : ""}`;

  // const [searchParams, setSearchParams] = useSearchParams();

  const handleSetFullRange = useCallback(() => {
    getSetFullRange();

    // const minPrice = pricesAtLimit[Bound.LOWER];
    // if (minPrice) searchParams.set("minPrice", minPrice.toSignificant(5));
    // const maxPrice = pricesAtLimit[Bound.UPPER];
    // if (maxPrice) searchParams.set("maxPrice", maxPrice.toSignificant(5));
    // setSearchParams(searchParams);

    const minP = pricesAtLimit[Bound.LOWER];
    const minPValue = minP?.toSignificant(5) ?? "";
    if (
      minPValue &&
      typeof minPValue === "string" &&
      !isNaN(minPValue as any) &&
      (!minPrice || minPrice !== minPValue)
    ) {
      onLeftRangeInput(minPValue);
    }
    setMinPrice(minPValue);

    const maxP = pricesAtLimit[Bound.UPPER];
    const maxPValue = maxP?.toSignificant(5) ?? "";
    if (
      maxPValue &&
      typeof maxPValue === "string" &&
      !isNaN(maxPValue as any) &&
      (!maxPrice || maxPrice !== maxPValue)
    ) {
      onRightRangeInput(maxPValue);
    }
    setMaxPrice(maxPValue);
  }, [
    getSetFullRange,
    pricesAtLimit,
    maxPrice,
    minPrice,
    onLeftRangeInput,
    onRightRangeInput,
  ]);

  // // START: sync values with query string
  // const oldSearchParams = usePrevious(searchParams);
  // // use query string as an input to onInput handlers
  // useEffect(() => {
  //   const minPrice = searchParams.get("minPrice");
  //   const oldMinPrice = oldSearchParams?.get("minPrice");
  //   if (
  //     minPrice &&
  //     typeof minPrice === "string" &&
  //     !isNaN(minPrice as any) &&
  //     (!oldMinPrice || oldMinPrice !== minPrice)
  //   ) {
  //     onLeftRangeInput(minPrice);
  //   }
  //   // disable eslint rule because this hook only cares about the url->input state data flow
  //   // input state -> url updates are handled in the input handlers
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [searchParams]);

  // useEffect(() => {
  //   const maxPrice = searchParams.get("maxPrice");
  //   const oldMaxPrice = oldSearchParams?.get("maxPrice");
  //   if (
  //     maxPrice &&
  //     typeof maxPrice === "string" &&
  //     !isNaN(maxPrice as any) &&
  //     (!oldMaxPrice || oldMaxPrice !== maxPrice)
  //   ) {
  //     onRightRangeInput(maxPrice);
  //   }
  //   // disable eslint rule because this hook only cares about the url->input state data flow
  //   // input state -> url updates are handled in the input handlers
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [searchParams]);
  // // END: sync values with query string

  const Buttons = () =>
    addIsUnsupported ? (
      <ButtonPrimary disabled={true} $borderRadius="12px" padding="12px">
        <ThemedText.DeprecatedMain mb="4px">
          <Trans>Unsupported Asset</Trans>
        </ThemedText.DeprecatedMain>
      </ButtonPrimary>
    ) : !account ? (
      <TraceEvent
        events={[BrowserEvent.onClick]}
        name={InterfaceEventName.CONNECT_WALLET_BUTTON_CLICKED}
        properties={{ received_swap_quote: false }}
        element={InterfaceElementName.CONNECT_WALLET_BUTTON}
      >
        <ButtonLight
          onClick={toggleWalletDrawer}
          $borderRadius="12px"
          padding="12px"
        >
          <Trans>Connect wallet</Trans>
        </ButtonLight>
      </TraceEvent>
    ) : (
      <AutoColumn gap="md">
        {(approvalA === ApprovalState.NOT_APPROVED ||
          approvalA === ApprovalState.PENDING ||
          approvalB === ApprovalState.NOT_APPROVED ||
          approvalB === ApprovalState.PENDING) &&
          isValid && (
            <RowBetween>
              {showApprovalA && (
                <ButtonPrimary
                  onClick={approveACallback}
                  disabled={approvalA === ApprovalState.PENDING}
                  width={showApprovalB ? "48%" : "100%"}
                >
                  {approvalA === ApprovalState.PENDING ? (
                    <Dots>
                      <Trans>
                        Approving {currencies[Field.CURRENCY_A]?.symbol}
                      </Trans>
                    </Dots>
                  ) : (
                    <Trans>
                      Approve {currencies[Field.CURRENCY_A]?.symbol}
                    </Trans>
                  )}
                </ButtonPrimary>
              )}
              {showApprovalB && (
                <ButtonPrimary
                  onClick={approveBCallback}
                  disabled={approvalB === ApprovalState.PENDING}
                  width={showApprovalA ? "48%" : "100%"}
                >
                  {approvalB === ApprovalState.PENDING ? (
                    <Dots>
                      <Trans>
                        Approving {currencies[Field.CURRENCY_B]?.symbol}
                      </Trans>
                    </Dots>
                  ) : (
                    <Trans>
                      Approve {currencies[Field.CURRENCY_B]?.symbol}
                    </Trans>
                  )}
                </ButtonPrimary>
              )}
            </RowBetween>
          )}
        <ButtonError
          onClick={() => {
            setShowConfirm(true);
          }}
          disabled={
            !isValid ||
            (!argentWalletContract &&
              approvalA !== ApprovalState.APPROVED &&
              !depositADisabled) ||
            (!argentWalletContract &&
              approvalB !== ApprovalState.APPROVED &&
              !depositBDisabled)
          }
          error={
            !isValid &&
            !!parsedAmounts[Field.CURRENCY_A] &&
            !!parsedAmounts[Field.CURRENCY_B]
          }
        >
          <Text fontWeight={535}>
            {errorMessage ? errorMessage : <Trans>Preview</Trans>}
          </Text>
        </ButtonError>
      </AutoColumn>
    );

  const usdcValueCurrencyA = usdcValues[Field.CURRENCY_A];
  const usdcValueCurrencyB = usdcValues[Field.CURRENCY_B];
  const currencyAFiat = useMemo(
    () => ({
      data: usdcValueCurrencyA
        ? parseFloat(usdcValueCurrencyA.toSignificant())
        : undefined,
      isLoading: false,
    }),
    [usdcValueCurrencyA]
  );
  const currencyBFiat = useMemo(
    () => ({
      data: usdcValueCurrencyB
        ? parseFloat(usdcValueCurrencyB.toSignificant())
        : undefined,
      isLoading: false,
    }),
    [usdcValueCurrencyB]
  );

  const owner = useSingleCallResult(
    tokenId ? positionManager : null,
    "ownerOf",
    [tokenId]
  ).result?.[0];
  const ownsNFT =
    addressesAreEquivalent(owner, account) ||
    addressesAreEquivalent(existingPositionDetails?.operator, account);
  const showOwnershipWarning = Boolean(
    hasExistingPosition && account && !ownsNFT
  );

  return (
    <>
      <ScrollablePage noPadding>
        <TransactionConfirmationModal
          isOpen={showConfirm}
          onDismiss={handleDismissConfirmation}
          attemptingTxn={attemptingTxn}
          hash={txHash}
          reviewContent={() => (
            <ConfirmationModalContent
              title={<Trans>Add Liquidity</Trans>}
              onDismiss={handleDismissConfirmation}
              topContent={() => (
                <Review
                  parsedAmounts={parsedAmounts}
                  position={position}
                  existingPosition={existingPosition}
                  priceLower={priceLower}
                  priceUpper={priceUpper}
                  outOfRange={outOfRange}
                  ticksAtLimit={ticksAtLimit}
                />
              )}
              bottomContent={() => (
                <ButtonPrimary style={{ marginTop: "1rem" }} onClick={onAdd}>
                  <Text fontWeight={535} fontSize={20}>
                    <Trans>Add</Trans>
                  </Text>
                </ButtonPrimary>
              )}
            />
          )}
          pendingText={pendingText}
        />
        <AddRemoveTabs
          creating={false}
          adding={true}
          positionID={tokenId}
          autoSlippage={DEFAULT_ADD_IN_RANGE_SLIPPAGE_TOLERANCE}
          showBackLink={!hasExistingPosition}
          onBack={openPools}
        >
          {!hasExistingPosition && (
            <Row
              justifyContent="flex-end"
              style={{ width: "fit-content", minWidth: "fit-content" }}
            >
              <MediumOnly>
                <ButtonText onClick={clearAll}>
                  <ThemedText.DeprecatedBlue fontSize="12px">
                    <Trans>Clear all</Trans>
                  </ThemedText.DeprecatedBlue>
                </ButtonText>
              </MediumOnly>
            </Row>
          )}
        </AddRemoveTabs>
        <Wrapper>
          <ResponsiveTwoColumns wide={!hasExistingPosition}>
            <AutoColumn gap="lg">
              {!hasExistingPosition && (
                <>
                  <AutoColumn gap="md">
                    <RowBetween paddingBottom="20px">
                      <ThemedText.DeprecatedLabel>
                        <Trans>Select pair</Trans>
                      </ThemedText.DeprecatedLabel>
                    </RowBetween>
                    <RowBetween gap="md">
                      <CurrencyInputPanel
                        value={formattedAmounts[Field.CURRENCY_A]}
                        onUserInput={onFieldAInput}
                        hideInput
                        onMax={() => {
                          onFieldAInput(
                            maxAmounts[Field.CURRENCY_A]?.toExact() ?? ""
                          );
                        }}
                        onCurrencySelect={handleCurrencyASelect}
                        showMaxButton={!atMaxAmounts[Field.CURRENCY_A]}
                        currency={currencies[Field.CURRENCY_A] ?? null}
                        id="add-liquidity-input-tokena"
                        showCommonBases
                      />

                      <CurrencyInputPanel
                        value={formattedAmounts[Field.CURRENCY_B]}
                        hideInput
                        onUserInput={onFieldBInput}
                        onCurrencySelect={handleCurrencyBSelect}
                        onMax={() => {
                          onFieldBInput(
                            maxAmounts[Field.CURRENCY_B]?.toExact() ?? ""
                          );
                        }}
                        showMaxButton={!atMaxAmounts[Field.CURRENCY_B]}
                        currency={currencies[Field.CURRENCY_B] ?? null}
                        id="add-liquidity-input-tokenb"
                        showCommonBases
                      />
                    </RowBetween>

                    <FeeSelector
                      disabled={!quoteCurrency || !baseCurrency}
                      feeAmount={feeAmount}
                      handleFeePoolSelect={handleFeePoolSelect}
                      currencyA={baseCurrency ?? undefined}
                      currencyB={quoteCurrency ?? undefined}
                    />
                  </AutoColumn>{" "}
                </>
              )}
              {hasExistingPosition && existingPosition && (
                <PositionPreview
                  position={existingPosition}
                  title={<Trans>Selected range</Trans>}
                  inRange={!outOfRange}
                  ticksAtLimit={ticksAtLimit}
                />
              )}
            </AutoColumn>

            {!hasExistingPosition && (
              <>
                <DynamicSection gap="md" disabled={!feeAmount || invalidPool}>
                  <RowBetween>
                    <ThemedText.DeprecatedLabel>
                      <Trans>Set price range</Trans>
                    </ThemedText.DeprecatedLabel>

                    {Boolean(baseCurrency && quoteCurrency) && (
                      <RowFixed gap="8px">
                        <PresetsButtons onSetFullRange={handleSetFullRange} />
                        <RateToggle
                          currencyA={baseCurrency as Currency}
                          currencyB={quoteCurrency as Currency}
                          handleRateToggle={() => {
                            if (
                              !ticksAtLimit[Bound.LOWER] &&
                              !ticksAtLimit[Bound.UPPER]
                            ) {
                              onLeftRangeInput(
                                (invertPrice
                                  ? priceLower
                                  : priceUpper?.invert()
                                )?.toSignificant(6) ?? ""
                              );
                              onRightRangeInput(
                                (invertPrice
                                  ? priceUpper
                                  : priceLower?.invert()
                                )?.toSignificant(6) ?? ""
                              );
                              onFieldAInput(
                                formattedAmounts[Field.CURRENCY_B] ?? ""
                              );
                            }
                            // navigate(
                            //   `/add/${currencyIdB as string}/${
                            //     currencyIdA as string
                            //   }${feeAmount ? "/" + feeAmount : ""}`
                            // );

                            onChangeCurrencyIdA(currencyIdB);
                            onChangeCurrencyIdB(currencyIdA);
                            onChangeFeeAmount(feeAmount);
                          }}
                        />
                      </RowFixed>
                    )}
                  </RowBetween>

                  <RangeSelector
                    priceLower={priceLower}
                    priceUpper={priceUpper}
                    getDecrementLower={getDecrementLower}
                    getIncrementLower={getIncrementLower}
                    getDecrementUpper={getDecrementUpper}
                    getIncrementUpper={getIncrementUpper}
                    onLeftRangeInput={onLeftRangeInput}
                    onRightRangeInput={onRightRangeInput}
                    currencyA={baseCurrency}
                    currencyB={quoteCurrency}
                    feeAmount={feeAmount}
                    ticksAtLimit={ticksAtLimit}
                  />

                  {outOfRange && (
                    <YellowCard padding="8px 12px" $borderRadius="12px">
                      <RowBetween>
                        <AlertTriangle
                          stroke={theme.deprecated_yellow3}
                          size="16px"
                        />
                        <ThemedText.DeprecatedYellow ml="12px" fontSize="12px">
                          <Trans>
                            Your position will not earn fees or be used in
                            trades until the market price moves into your range.
                          </Trans>
                        </ThemedText.DeprecatedYellow>
                      </RowBetween>
                    </YellowCard>
                  )}

                  {invalidRange && (
                    <YellowCard padding="8px 12px" $borderRadius="12px">
                      <RowBetween>
                        <AlertTriangle
                          stroke={theme.deprecated_yellow3}
                          size="16px"
                        />
                        <ThemedText.DeprecatedYellow ml="12px" fontSize="12px">
                          <Trans>
                            Invalid range selected. The min price must be lower
                            than the max price.
                          </Trans>
                        </ThemedText.DeprecatedYellow>
                      </RowBetween>
                    </YellowCard>
                  )}
                </DynamicSection>

                <DynamicSection gap="md" disabled={!feeAmount || invalidPool}>
                  {!noLiquidity ? (
                    <>
                      {Boolean(
                        price && baseCurrency && quoteCurrency && !noLiquidity
                      ) && (
                        <AutoColumn gap="2px" style={{ marginTop: "0.5rem" }}>
                          <Trans>
                            <ThemedText.DeprecatedMain
                              fontWeight={535}
                              fontSize={12}
                              color="text1"
                            >
                              Current price:
                            </ThemedText.DeprecatedMain>
                            <ThemedText.DeprecatedBody
                              fontWeight={535}
                              fontSize={20}
                              color="text1"
                            >
                              {price && (
                                <HoverInlineText
                                  maxCharacters={20}
                                  text={
                                    invertPrice
                                      ? price.invert().toSignificant(6)
                                      : price.toSignificant(6)
                                  }
                                />
                              )}
                            </ThemedText.DeprecatedBody>
                            {baseCurrency && (
                              <ThemedText.DeprecatedBody
                                color="text2"
                                fontSize={12}
                              >
                                {quoteCurrency?.symbol} per{" "}
                                {baseCurrency.symbol}
                              </ThemedText.DeprecatedBody>
                            )}
                          </Trans>
                        </AutoColumn>
                      )}
                      <LiquidityChartRangeInput
                        currencyA={baseCurrency ?? undefined}
                        currencyB={quoteCurrency ?? undefined}
                        feeAmount={feeAmount}
                        ticksAtLimit={ticksAtLimit}
                        price={
                          price
                            ? parseFloat(
                                (invertPrice
                                  ? price.invert()
                                  : price
                                ).toSignificant(8)
                              )
                            : undefined
                        }
                        priceLower={priceLower}
                        priceUpper={priceUpper}
                        onLeftRangeInput={onLeftRangeInput}
                        onRightRangeInput={onRightRangeInput}
                        interactive={!hasExistingPosition}
                      />
                    </>
                  ) : (
                    <AutoColumn gap="md">
                      {noLiquidity && (
                        <BlueCard
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            padding: "1rem 1rem",
                          }}
                        >
                          <ThemedText.DeprecatedBody
                            fontSize={14}
                            style={{ fontWeight: 535 }}
                            textAlign="left"
                            color={theme.accent1}
                          >
                            <Trans>
                              This pool must be initialized before you can add
                              liquidity. To initialize, select a starting price
                              for the pool. Then, enter your liquidity price
                              range and deposit amount. Gas fees will be higher
                              than usual due to the initialization transaction.
                            </Trans>
                          </ThemedText.DeprecatedBody>
                        </BlueCard>
                      )}
                      <OutlineCard padding="12px">
                        <StyledInput
                          className="start-price-input"
                          value={startPriceTypedValue}
                          onUserInput={onStartPriceInput}
                        />
                      </OutlineCard>
                      <RowBetween
                        style={{
                          backgroundColor: theme.surface1,
                          padding: "12px",
                          borderRadius: "12px",
                        }}
                      >
                        <ThemedText.DeprecatedMain>
                          <Trans>Starting {baseCurrency?.symbol} Price:</Trans>
                        </ThemedText.DeprecatedMain>
                        <ThemedText.DeprecatedMain>
                          {price ? (
                            <ThemedText.DeprecatedMain>
                              <RowFixed>
                                <HoverInlineText
                                  maxCharacters={20}
                                  text={
                                    invertPrice
                                      ? price?.invert()?.toSignificant(8)
                                      : price?.toSignificant(8)
                                  }
                                />{" "}
                                <span style={{ marginLeft: "4px" }}>
                                  {quoteCurrency?.symbol} per{" "}
                                  {baseCurrency?.symbol}
                                </span>
                              </RowFixed>
                            </ThemedText.DeprecatedMain>
                          ) : (
                            "-"
                          )}
                        </ThemedText.DeprecatedMain>
                      </RowBetween>
                    </AutoColumn>
                  )}
                </DynamicSection>
              </>
            )}
            <div>
              <DynamicSection
                disabled={
                  invalidPool ||
                  invalidRange ||
                  (noLiquidity && !startPriceTypedValue)
                }
              >
                <AutoColumn gap="md">
                  <ThemedText.DeprecatedLabel>
                    {hasExistingPosition ? (
                      <Trans>Add more liquidity</Trans>
                    ) : (
                      <Trans>Deposit amounts</Trans>
                    )}
                  </ThemedText.DeprecatedLabel>

                  <CurrencyInputPanel
                    value={formattedAmounts[Field.CURRENCY_A]}
                    onUserInput={onFieldAInput}
                    onMax={() => {
                      onFieldAInput(
                        maxAmounts[Field.CURRENCY_A]?.toExact() ?? ""
                      );
                    }}
                    showMaxButton={!atMaxAmounts[Field.CURRENCY_A]}
                    currency={currencies[Field.CURRENCY_A] ?? null}
                    id="add-liquidity-input-tokena"
                    fiatValue={currencyAFiat}
                    showCommonBases
                    locked={depositADisabled}
                  />

                  <CurrencyInputPanel
                    value={formattedAmounts[Field.CURRENCY_B]}
                    onUserInput={onFieldBInput}
                    onMax={() => {
                      onFieldBInput(
                        maxAmounts[Field.CURRENCY_B]?.toExact() ?? ""
                      );
                    }}
                    showMaxButton={!atMaxAmounts[Field.CURRENCY_B]}
                    fiatValue={currencyBFiat}
                    currency={currencies[Field.CURRENCY_B] ?? null}
                    id="add-liquidity-input-tokenb"
                    showCommonBases
                    locked={depositBDisabled}
                  />
                </AutoColumn>
              </DynamicSection>
            </div>
            <Buttons />
          </ResponsiveTwoColumns>
        </Wrapper>
        {showOwnershipWarning && <OwnershipWarning ownerAddress={owner} />}
        {addIsUnsupported && (
          <UnsupportedCurrencyFooter
            show={addIsUnsupported}
            currencies={[currencies.CURRENCY_A, currencies.CURRENCY_B]}
          />
        )}
      </ScrollablePage>
      <SwitchLocaleLink />
    </>
  );
}
