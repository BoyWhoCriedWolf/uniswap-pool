import { Trans } from "@lingui/macro";
import {
  BrowserEvent,
  InterfaceElementName,
  InterfaceEventName,
  InterfacePageName,
} from "@uniswap/analytics-events";
import { FeeAmount } from "@uniswap/v3-sdk";
import { useWeb3React } from "@web3-react/core";
import { Trace, TraceEvent } from "analytics";
import { useToggleAccountDrawer } from "components/AccountDrawer";
import { ButtonPrimary, ButtonText } from "components/Button";
import { AutoColumn } from "components/Column";
import PositionList from "components/PositionList";
import { RowBetween, RowFixed } from "components/Row";
import { SwitchLocaleLink } from "components/SwitchLocaleLink";
import { isSupportedChain } from "constants/chains";
import { useFilterPossiblyMaliciousPositions } from "hooks/useFilterPossiblyMaliciousPositions";
import { useV3Positions } from "hooks/useV3Positions";
import AddLiquidityWrapper from "pages/AddLiquidity";
import { useMemo, useState } from "react";
import { Inbox } from "react-feather";
import { useUserHideClosedPositions } from "state/user/hooks";
import styled, { css, useTheme } from "styled-components";
import { HideSmall, ThemedText } from "theme/components";
import { PositionDetails } from "types/position";

// import CTACards from "./CTACards";
import PositionsLoadingPlaceholder from "./PositionLoadingPlaceHolder";
import WrongNetworkCard from "./WrongNetworkCard";

const PageWrapper = styled(AutoColumn)`
  padding: 8px;
`;
const TitleRow = styled(RowBetween)`
  color: ${({ theme }) => theme.neutral2};
  @media (max-width: ${({ theme }) => `${theme.breakpoint.sm}px`}) {
    flex-wrap: wrap;
    gap: 12px;
    width: 100%;
  }
`;
const ButtonRow = styled(RowFixed)`
  & > *:not(:last-child) {
    margin-left: 8px;
  }

  @media (max-width: ${({ theme }) => `${theme.breakpoint.sm}px`}) {
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
  }
`;

const ErrorContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
  max-width: 300px;
  min-height: 25vh;
`;

const IconStyle = css`
  width: 48px;
  height: 48px;
  margin-bottom: 0.5rem;
`;

const InboxIcon = styled(Inbox)`
  ${IconStyle}
`;

const ResponsiveButtonPrimary = styled(ButtonPrimary)`
  border-radius: 12px;
  font-size: 16px;
  width: fit-content;
  @media (max-width: ${({ theme }) => `${theme.breakpoint.sm}px`}) {
    flex: 1 1 auto;
    width: 50%;
  }
`;

const MainContentWrapper = styled.main`
  background-color: ${({ theme }) => theme.surface1};
  border: 1px solid ${({ theme }) => theme.surface3};
  padding: 0;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export default function Pool() {
  const { account, chainId } = useWeb3React();
  const toggleWalletDrawer = useToggleAccountDrawer();

  const theme = useTheme();
  const [userHideClosedPositions, setUserHideClosedPositions] =
    useUserHideClosedPositions();

  const { positions, loading: positionsLoading } = useV3Positions(account);

  const [openPositions, closedPositions] = positions?.reduce<
    [PositionDetails[], PositionDetails[]]
  >(
    (acc, p) => {
      acc[p.liquidity?.isZero() ? 1 : 0].push(p);
      return acc;
    },
    [[], []]
  ) ?? [[], []];

  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [currencyIdA, setCurrencyIdA] = useState<string | undefined>("ETH");
  const [currencyIdB, setCurrencyIdB] = useState<string | undefined>(undefined);
  const [feeAmount, setFeeAmount] = useState<FeeAmount | undefined>(undefined);

  const userSelectedPositionSet = useMemo(
    () => [
      ...openPositions,
      ...(userHideClosedPositions ? [] : closedPositions),
    ],
    [closedPositions, openPositions, userHideClosedPositions]
  );

  const filteredPositions = useFilterPossiblyMaliciousPositions(
    userSelectedPositionSet
  );

  if (!isSupportedChain(chainId)) {
    return <WrongNetworkCard />;
  }

  const handleOpenAdd = () => {
    setIsOpenAdd(true);
  };

  const showConnectAWallet = Boolean(!account);

  return (
    <Trace page={InterfacePageName.POOL_PAGE} shouldLogImpression>
      <PageWrapper>
        {isOpenAdd ? (
          <AddLiquidityWrapper
            currencyIdA={currencyIdA}
            onChangeCurrencyIdA={(v) => setCurrencyIdA(v ?? undefined)}
            currencyIdB={currencyIdB}
            onChangeCurrencyIdB={(v) => setCurrencyIdB(v ?? undefined)}
            feeAmount={feeAmount}
            onChangeFeeAmount={(v) => setFeeAmount(v ?? undefined)}
            openPools={() => setIsOpenAdd(false)}
          />
        ) : (
          <AutoColumn gap="lg" justify="center">
            <AutoColumn gap="lg" style={{ width: "100%" }}>
              <TitleRow padding="0">
                <ThemedText.SubHeader>
                  <Trans>Pools</Trans>
                </ThemedText.SubHeader>
                <ButtonRow>
                  <ResponsiveButtonPrimary
                    data-cy="join-pool-button"
                    id="join-pool-button"
                    // as={Link}
                    // to="/add/ETH"
                    onClick={handleOpenAdd}
                    padding={"8px 16px"}
                  >
                    + <Trans>New position</Trans>
                  </ResponsiveButtonPrimary>
                </ButtonRow>
              </TitleRow>

              <MainContentWrapper>
                {positionsLoading ? (
                  <PositionsLoadingPlaceholder />
                ) : filteredPositions &&
                  closedPositions &&
                  filteredPositions.length > 0 ? (
                  <PositionList
                    positions={filteredPositions}
                    setUserHideClosedPositions={setUserHideClosedPositions}
                    userHideClosedPositions={userHideClosedPositions}
                  />
                ) : (
                  <ErrorContainer>
                    <ThemedText.BodyPrimary
                      color={theme.neutral3}
                      textAlign="center"
                    >
                      <InboxIcon strokeWidth={1} style={{ marginTop: "2em" }} />
                      <div>
                        <Trans>
                          Your active V3 liquidity positions will appear here.
                        </Trans>
                      </div>
                    </ThemedText.BodyPrimary>
                    {!showConnectAWallet && closedPositions.length > 0 && (
                      <ButtonText
                        style={{ marginTop: ".5rem" }}
                        onClick={() =>
                          setUserHideClosedPositions(!userHideClosedPositions)
                        }
                      >
                        <Trans>Show closed positions</Trans>
                      </ButtonText>
                    )}
                    {showConnectAWallet && (
                      <TraceEvent
                        events={[BrowserEvent.onClick]}
                        name={InterfaceEventName.CONNECT_WALLET_BUTTON_CLICKED}
                        properties={{ received_swap_quote: false }}
                        element={InterfaceElementName.CONNECT_WALLET_BUTTON}
                      >
                        <ResponsiveButtonPrimary
                          style={{
                            marginTop: "2em",
                            marginBottom: "2em",
                          }}
                          onClick={toggleWalletDrawer}
                          padding={"8px 16px"}
                        >
                          <Trans>Connect a wallet</Trans>
                        </ResponsiveButtonPrimary>
                      </TraceEvent>
                    )}
                  </ErrorContainer>
                )}
              </MainContentWrapper>
              {/* <HideSmall>
                <CTACards />
              </HideSmall> */}
            </AutoColumn>
          </AutoColumn>
        )}
      </PageWrapper>
      <SwitchLocaleLink />
    </Trace>
  );
}
