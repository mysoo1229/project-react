import Header from "../components/Header";
import { Route, Switch, useLocation, useParams, useRouteMatch } from "react-router";
import { useQuery } from "react-query";
import { fetchCoinInfo, fetchCoinPrice, } from "../api";
import LoadingSvg from "../resources/loading";
import styled from "styled-components";
import { Link } from "react-router-dom";
import LineChart from "./tabs/LineChart";
import CandleChart from "./tabs/CandleChart";
import Price from "./tabs/Price";

const Loading = styled.div`
  width: 50px;
  height: 50px;
  margin: 0 auto;
  
  svg path {
    stroke: ${(props) => props.theme.textColor};
  }
`;

const Summary = styled.summary`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const InfoRank = styled.span`
  font-size: 60px;
  font-weight: bold;
`;

const InfoPrice = styled.div`
  flex: 1;
  padding: 12px 16px;
  background: ${(props) => props.theme.fillColor};
  border-radius: 12px;
  text-align: center;
  font-size: 30px;
  line-height: 35px;
  font-weight: bold;

  span {
    font-weight: normal;
    font-size: 22px;
    vertical-align: 2px;
  }
`;

const SummaryImage = styled.div`
  flex-shrink: 0;
  width: 60px;
  
  img {
    width: 100%;
  }
`;

const Description = styled.div`
  margin: 20px 0;
  font-size: 14px;
  line-height: 1.3;
`;

const Supply = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 30px;
  background: ${(props) => props.theme.fillColor};
  border-radius: 12px;
  text-align: center;
`;

const SupplyEach = styled.div`
  div {
    margin-top: 8px;
    font-size: 20px;
    font-weight: bold;
  }

  span {
    font-size: 13px;
    font-weight: normal;
    text-transform: uppercase;
  }
`;

const Tab = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 60px 0 20px;
  padding: 2px;
  background: ${(props) => props.theme.fillColor};
  border-radius: 12px;
  box-shadow: 0 0 10px 3px ${(props) => props.theme.shadowColor};
  overflow: hidden;
  text-align: center;
`;

const TabEach = styled.div<{ isActive: boolean }>`
  text-transform: uppercase;
  font-size: 14px;

  a {
    display: block;
    padding: 10px 14px;
    border-radius: 12px;
    background: ${(props) => props.isActive ? props.theme.accentColor : "none"};
    box-shadow: 0 0 10px 3px ${(props) => props.isActive ? props.theme.shadowColor : "rgba(0, 0, 0, 0)"};
    color: ${(props) => props.isActive ? "#fff" : props.theme.textColor};
  }
`;

interface ICoinEach {
  coinId: string;
}

interface IRouteState {
  name: string;
}
interface ICoinInfo {
  name: string;
  rank: number;
  logo: string;
  description: string;
}

interface ICoinPrice {
  total_supply: number;
  max_supply: number;
  quotes: {
    USD: {
      price: number;
    }
  }
}

function CoinEach() {
  const { coinId } = useParams<ICoinEach>();
  const { state } = useLocation<IRouteState>();
  const { isLoading: infoLoading, data: infoData } = useQuery<ICoinInfo>("coinInfo",  () => fetchCoinInfo(coinId));
  const { isLoading: priceLoading, data: priceData } = useQuery<ICoinPrice>("coinPrice", () => fetchCoinPrice(coinId));
  const isLoading = infoLoading || priceLoading;
  const priceMatch = useRouteMatch("/:coinId/price");
  const lineChartMatch = useRouteMatch("/:coinId/linechart");
  const candleChartMatch = useRouteMatch("/:coinId/candlechart");

  return (
    <>
      <Header
        title={state?.name ? state.name : isLoading ? "loading..." : infoData?.name ? infoData.name : ""}
        hasHomeLink={true}
      />
      { isLoading ? (
        <Loading>
          <LoadingSvg />
        </Loading>
      ) : (
        <>
          <Summary>
            <InfoRank>{infoData?.rank}</InfoRank>
            <InfoPrice><span>$ </span>{priceData?.quotes.USD.price.toFixed(2)}</InfoPrice>
            <SummaryImage>
              <img src={infoData?.logo} alt="logo" />
            </SummaryImage>
          </Summary>
          <Description>{infoData?.description}</Description>
          <Supply>
            <SupplyEach>
              <span>Total Supply</span>
              <div>{priceData?.total_supply}</div>
            </SupplyEach>
            <SupplyEach>
              <span>Max Supply</span>
              <div>{priceData?.max_supply}</div>
            </SupplyEach>
          </Supply>
          <Tab>
            <TabEach isActive={lineChartMatch !== null}>
              <Link to={`/${coinId}/linechart`}>Line Chart</Link>
            </TabEach>
            <TabEach isActive={candleChartMatch !== null}>
              <Link to={`/${coinId}/candlechart`}>Candle Chart</Link>
            </TabEach>
            <TabEach isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </TabEach>
          </Tab>

          <Switch>
            <Route path="/:coinId/linechart">
              <LineChart coinId={coinId} />
            </Route>
            <Route path="/:coinId/candlechart">
              <CandleChart coinId={coinId} />
            </Route>
            <Route path="/:coinId/price">
              <Price coinId={coinId} />
            </Route>
          </Switch>
        </>
      )}
    </>
  )
}

export default CoinEach;
