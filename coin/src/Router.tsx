import { BrowserRouter, Switch, Route } from "react-router-dom";
import CoinList from "./routes/CoinList";
import CoinEach from "./routes/CoinEach";

function Router() {
  return (
    <BrowserRouter basename="/project-react/coin">
      <Switch>
        <Route path="/:coinId">
          <CoinEach />
        </Route>
        <Route path="/">
          <CoinList />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default Router;
