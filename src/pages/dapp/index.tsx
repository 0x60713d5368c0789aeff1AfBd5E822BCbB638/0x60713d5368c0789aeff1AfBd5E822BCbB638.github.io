import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import { useStores } from "@/hooks";
import { observer } from "mobx-react-lite";

import styled from "styled-components";
import Title from "../components/title";
import { useBurn } from "@/lib/burn";
import { useAddress } from "@/lib/address";
export default observer(() => {
  const { auto, manual, balance } = useBurn();
  const Addresses = useAddress();
  return (
    <ViewStyled>
      <Header />
      <ContentStyle>
        {/*Upcoming*/}
        <div className="dapp_view">
          <div className="title">Upcoming</div>
          <div className="dapp_content">
            <div className="dapp_info">
              <div className="dapp_icon">
                <img src={createURL("icons/icon_dapp_lg.png")} />
              </div>
              <div className="dapp_txt">
                DAppinfoDAppinfo DAppinfoDAppinfo DAppinfoDAppinfo
              </div>
            </div>
            <div className="dapp_link_btns">
              <div>
                <a href="">
                  <img src={createURL("btns/btn_wpaper.png")} />
                </a>
              </div>
              <div>
                <a href="">
                  <img src={createURL("btns/btn_join.png")} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </ContentStyle>
      <Footer current="dapp" />
    </ViewStyled>
  );
});
const ViewStyled = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
`;
const ContentStyle = styled.div`
  flex: 1;
  height: 0;
  flex-shrink: 0;
  padding: 0 0.26rem 0.26rem;
  background: url(${createURL("page_bg.png")}) no-repeat center top/contain;
  overflow-y: auto;
  .dapp_view {
    margin-top: 0.26rem;
    border-radius: 0 0 0.1rem 0.1rem;
    border: 1px solid #ff00ff;
    background: #2f1533;
    .title {
      width: calc(100% + 2px);
      margin: -1px -1px 0;
      text-align: center;
      height: 0.58rem;
      font-size: 0.24rem;
      font-weight: bold;
      color: #ff00ff;
      background: url(${createURL("titles/title_bg_def.png")}) no-repeat center
        top/100%;
    }
    .dapp_content {
      padding: 0.18rem 0.24rem 0.28rem;
      .dapp_info {
        display: flex;
        align-items: center;
        .dapp_icon {
          padding: 0.1rem;
          border-radius: 0.1rem;
          background-color: #7f20a2;
          img {
            width: 0.62rem;
            height: 0.62rem;
            object-fit: contain;
          }
        }
        .dapp_txt {
          flex: 1;
          padding-left: 0.16rem;
          font-size: 0.16rem;
          line-height: 0.26rem;
          color: #fff;
          word-break: break-all;
        }
      }
      .dapp_link_btns {
        display: flex;
        align-items: center;
        margin-top: 0.2rem;
        & > div {
          flex: 1;
          img {
            width: 100%;
            object-fit: contain;
          }
          &:last-child {
            margin-left: 0.2rem;
          }
        }
      }
    }
  }
`;
