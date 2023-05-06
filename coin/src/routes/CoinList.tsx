import { useQuery } from "react-query";
import { fetchCoins } from "../api";
import Header from "../components/Header";
import LoadingSvg from "../resources/loading";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Loading = styled.div`
  width: 50px;
  height: 50px;
  margin: 0 auto;
  
  svg path {
    stroke: ${(props) => props.theme.textColor};
  }
`;

const List = styled.ul`
  display: grid;
	grid-template-columns: repeat(3, 1fr);
  gap: 1.6rem;
`;

const Item = styled.li`
  padding: 20px 10px 17px;
  box-sizing: border-box;
  background: ${(props) => props.theme.fillColor};
  border-radius: 16px;
  text-align: center;
`;

const ItemLogo = styled.div`
  width: 50px;
  height: 50px;
  margin: 0 auto 15px;
  
  img {
    width: 100%;
  }
`;

const ItemName = styled.div`
  font-size: 13px;
  letter-spacing: 1px;
  text-transform: uppercase;
`;

interface ICoinProps {
  id: string;
  name: string;
  symbol: string;
}

function CoinList() {
  const { isLoading, data } = useQuery<ICoinProps[]>("coinList", fetchCoins);

  return (
    <>
      <Header title={"Coin Tracker"} />
      { isLoading ? (
        <Loading>
          <LoadingSvg />
        </Loading>
      ) : (
        <List>
          {data?.slice(0, 18).map(coin => (
            <Item key={coin.id}>
              <Link
                to={{
                  pathname: `/${coin.id}`,
                  state: { name: coin.name }
                }}>
                <ItemLogo>
                  <img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} />
                </ItemLogo>
                <ItemName>{coin.name}</ItemName>
              </Link>
            </Item>
          ))}
        </List>
      )}
    </>
  )
}

export default CoinList;
