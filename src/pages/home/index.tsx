import { useEffect, useMemo } from 'react'

import { Link } from 'react-router-dom'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

import { observer } from 'mobx-react-lite'

import styled from 'styled-components'
import Countdown from './countdown'
import { useFomo } from '@/lib/fomo'
import { useAddress } from '@/lib/address'
import { useBurn } from '@/lib/burn'

export default observer((props: any) => {
  const { value, lastTime, totalSupply, circleSupply, burned, tierMintBalance, countdown } = useFomo()
  const { balance } = useBurn()
  const Addresses = useAddress()
  const endTime = useMemo(() => {
    if (lastTime == 0) {
      return 0
    }
    return lastTime + countdown
  }, [lastTime])
  return (
    <ViewStyled>
      <Header />
      <ContentStyle>
        <HomeStyle>
          <div className="top_info">
            <div className="top_num">{balance.toFixed(4)}</div>
            <div className="top_icon">
              <img src={createURL('icons/icon_bnb.png')} />
              <span>BNB</span>
            </div>
            <div className="top_tips">
              Repurchase Contract:
              <br />
              Sell tax will be auto transfer to repurchase contract,
              <br />
              This will be a catalyst to push up the price of FDAO tokens on pancakeswap.
            </div>
            <div className="count_view">
              <Countdown endTime={0} />
            </div>
            <div className="btn_view">
              <a href={`https://pancakeswap.finance/swap?outputCurrency=${Addresses.Fdao}`} target="_blank">
                <img className="btn_mint" src={createURL('btns/btn_buy.png')} />
              </a>
            </div>
          </div>
          <div className="rank_list_view">
            {/*total*/}
            <div className="burn_top_info">
              <div className="info_txt ">FDAO Max Supply:</div>
              <div className="info_num">{totalSupply.toFixed(4)}</div>
              <div className="info_txt">Circulating Supply:</div>
              <div className="info_num">{circleSupply.toFixed(4)}</div>
              <a href="https://ln5.sync.com/dl/f932f4700/zehn6q4p-isakf7gx-sj46dapr-q8cgmmxp" className="img_btn" target="_blank">
                <img src={createURL('btns/btn_wpaper.png')} />
              </a>
              <div className="info_txt mid">Burned to date:</div>
              <div className="info_num">{burned.toFixed(4)}</div>
              <div className="info_txt">Mining pool balance:</div>
              <div className="info_num">{tierMintBalance.toFixed(4)}</div>
              {/* <a href={`https://pancakeswap.finance/swap?outputCurrency=${Addresses.Fdao}`} className="img_btn" target="_blank">
                <img src={createURL('btns/btn_buy.png')} />
              </a> */}
            </div>
            {/* <RankList /> */}
          </div>
        </HomeStyle>
      </ContentStyle>
      <Footer />
    </ViewStyled>
  )
})
const ViewStyled = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
`
const ContentStyle = styled.div`
  position: relative;
  flex: 1;
  height: 0;
  flex-shrink: 0;
  overflow-y: auto;
`
const HomeStyle = styled.div`
  .burn_top_info {
    margin-top: 0.4rem;
    padding-top: 0.3rem;
    width: 100%;
    height: 5.1rem;
    background: url(${createURL('burn_top_info.png')}) no-repeat center top/contain;
    text-align: center;
    overflow: hidden;
    .info_txt {
      width: 2.5rem;
      margin: 0.14rem auto 0;

      &.mid {
        margin-top: 0.22rem;
        padding-top: 0.22rem;
        border-top: 1px solid rgba(163, 5, 168, 1);
      }
      font-size: 0.15rem;
      font-weight: 600;
      color: #ff00ff;
    }
    .info_num {
      width: 2.4rem;
      height: 0.34rem;
      line-height: 0.34rem;
      margin: 0.06rem auto 0;
      font-size: 0.16rem;
      font-weight: 500;
      color: #ffb923;
      border-radius: 0.3rem;

      background: rgba(255, 0, 255, 0.31);
      &.num_sm {
        width: 1.26rem;
      }
    }
    .img_btn {
      margin-top: 0.14rem;
      display: inline-block;
      img {
        height: 0.4rem;
      }
    }
  }
  .top_info {
    min-height: 4.58rem;
    padding-top: 1.28rem;
    background: #0c030c url(${createURL('home_top_bg.png')}) no-repeat top center/contain;
    text-align: center;
    .top_num {
      font-size: 0.26rem;
      font-weight: 600;
    }
    .top_icon {
      img {
        width: 0.16rem;
        height: 0.16rem;
        object-fit: contain;
        vertical-align: middle;
      }
      span {
        padding-left: 0.06rem;
        font-size: 0.16rem;
        color: #ffc476;
        vertical-align: middle;
      }
    }
    .top_tips {
      margin-top: 0.24rem;
    }
    .count_view {
      margin-top: 0.4rem;
    }
    .btn_view {
      margin-top: 0.2rem;
    }
  }

  .btn_view {
    text-align: center;
    a {
      display: inline-block;
    }
    .btn_mint {
      height: 0.42rem;
      object-fit: contain;
    }
  }
  .rank_list_view {
    margin-top: 0.4rem;
    padding-bottom: 0.5rem;
    background: url(${createURL('home_btm_bg.png')}) no-repeat center bottom/cover;
  }
  .regal_view {
    margin-top: 0.3rem;
    padding: 0 0.19rem;
    display: flex;
    .regal_item {
      flex: 1;
      background: #2f1533;
      border-radius: 0 0 0.1rem 0.1rem;
      opacity: 1;
      border: 1px solid #ff00ff;
      &:last-child {
        margin-left: 0.09rem;
      }
      .regal_info {
        padding: 0.12rem 0.1rem;
        .info_item {
          margin-bottom: 0.08rem;
          padding: 0 0.06rem 0.06rem;
          background: linear-gradient(180deg, rgba(255, 0, 255, 0.31) 0%, rgba(175, 58, 187, 0) 100%);
          border-radius: 0.1rem;
          border: 1px solid #ff00ff;
          text-align: center;
          .info_label {
            font-size: 0.12rem;
            font-weight: 500;
            color: #ff00ff;
          }
          .info_value {
            width: 100%;
            padding: 0 0.02rem;
            margin-top: 0.02rem;
            font-size: 0.12rem;
            color: #f9bdff;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            background: rgba(255, 0, 255, 0.31);
            border-radius: 0.1rem;
          }
        }
      }
    }
  }
  .mid_img {
    padding: 0.06rem 0;
    text-align: center;
    img {
      height: 0.95rem;
    }
  }
`
