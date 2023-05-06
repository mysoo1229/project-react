import Header from "../components/Header";
import { useLocation, useParams } from "react-router";

interface ICoinEachProps {
  coinId: string;
}

interface IRouteState {
  name: string;
}

function CoinEach() {
  const { coinId } = useParams<ICoinEachProps>();
  const { state } = useLocation<IRouteState>();

  return (
    <>
      <Header title={state?.name || "loading..."} />
    </>
  )
}

export default CoinEach;
