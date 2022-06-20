import Home from "./home";
import Burn from "./burn";
import Mint from "./mint";
import Claim from "./claim";
import Dapp from "./dapp";

export default [
  {
    path: "/",
    exact: true,
    component: Home,
  },
  {
    path: "/burn",
    exact: true,
    component: Burn,
  },
  {
    path: "/mint",
    exact: true,
    component: Mint,
  },
  {
    path: "/claim",
    exact: true,
    component: Claim,
  },
  {
    path: "/dapp",
    exact: true,
    component: Dapp,
  },
];
