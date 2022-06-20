import { Link } from "react-router-dom";
import styled from "styled-components";

import { observer } from "mobx-react-lite";

export default observer((props: any) => {
  let { current = "fomo" } = props;
  return (
    <FooterStyled>
      <Link className={`fomo ${current == "fomo" ? "cur" : null}`} to="/">
        HOME
      </Link>
      <Link className={`burn ${current == "burn" ? "cur" : null}`} to="/burn">
        BURN
      </Link>
      <Link className={`mint ${current == "mint" ? "cur" : null}`} to="/mint">
        MINT
      </Link>
      <Link
        className={`claim ${current == "claim" ? "cur" : null}`}
        to="/claim"
      >
        CLAIM
      </Link>
      <Link className={`dapp ${current == "dapp" ? "cur" : null}`} to="/dapp">
        DAPP
      </Link>
    </FooterStyled>
  );
});
const FooterStyled = styled.div`
  padding: 0.14rem 0.3rem 0.12rem;
  background-color: #4a1a56;
  display: flex;
  justify-content: space-between;
  align-items: center;
  a {
    position: relative;
    color: #f2f2f2;
    text-align: center;
    &::before {
      content: " ";
      display: block;
      margin: 0 auto 0.04rem;
      width: 0.3rem;
      height: 0.3rem;
      border-radius: 0.06rem;
      background-position: center;
      background-size: contain;
      transition: all 0.2s linear;
    }
    &.cur {
      color: #ffffff;
      &::before {
        background-color: #7a2f8c;
      }
    }
    &.fomo {
      &::before {
        background-image: url(${createURL("icons/icon_fomo.png")});
      }
    }
    &.burn {
      &::before {
        background-image: url(${createURL("icons/icon_burn.png")});
      }
    }
    &.mint {
      &::before {
        background-image: url(${createURL("icons/icon_mint.png")});
      }
    }
    &.claim {
      &::before {
        background-image: url(${createURL("icons/icon_claim.png")});
      }
    }
    &.dapp {
      &::before {
        background-image: url(${createURL("icons/icon_dapp.png")});
      }
    }
  }
`;
