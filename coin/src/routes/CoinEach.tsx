import Header from "../components/Header";
import { useLocation, useParams } from "react-router";
import { useQuery } from "react-query";
import { fetchCoinInfo, fetchCoinPrice, } from "../api";
import LoadingSvg from "../resources/loading";
import styled from "styled-components";
import { useState } from "react";

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
  font-size: 15px;
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
  margin-top: 60px;
  padding: 12px 30px;
  background: ${(props) => props.theme.fillColor};
  border-radius: 12px;
  box-shadow: 0 0 10px 3px ${(props) => props.theme.shadowColor};
  text-align: center;
`;

const TabEach = styled.div`
  text-transform: uppercase;
  font-size: 14px;
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

  return (
    <>
      <Header title={state?.name ? state.name : isLoading ? "loading..." : infoData?.name ? infoData.name : ""} />
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
            <TabEach>Line Chart</TabEach>
            <TabEach>Candlestick Chart</TabEach>
            <TabEach>Price</TabEach>
          </Tab>
        </>
      )}
    </>
  )
}

export default CoinEach;
