import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

import { useStores } from '@/hooks'
import { observer } from 'mobx-react-lite'

import styled from 'styled-components'
import Title from '../components/title'
import { useBurn } from '@/lib/burn'
import { useAddress } from '@/lib/address'
export default observer(() => {
  const { auto, manual, balance } = useBurn()
  const Addresses = useAddress()
  return (
    <ViewStyled>
      <Header />
      <ContentStyle>
        {/*auto-burn*/}
        <div className="burn_view">
          <Title name="auto_burn" />
          <div className="burn_content">
            <div className="burned_view">
              <div className="info_txt ">Burned FDAO:</div>
              <div className="info_num">{auto.fdao.toFixed(4)}</div>
              <div className="info_txt ">Used BNB:</div>
              <div className="info_num">
                {auto.bnb.toFixed(4)}
                <span className="unit">BNB</span>
              </div>
            </div>
          </div>
        </div>

        {/*manual-burn*/}
        <div className="burn_view">
          <Title name="contract_burn" />
          <div className="burn_content">
            <div className="burned_view">
              <div className="info_txt ">Burned FDAO:</div>
              <div className="info_num">{manual.fdao.toFixed(4)}</div>
              <div className="info_txt ">Used BNB:</div>
              <div className="info_num">
                {manual.bnb.toFixed(4)}
                <span className="unit">BNB</span>
              </div>
            </div>
            <div className="balance_view">
              <div className="info_txt">Contract Balance:</div>
              <div className="info_num">
                {balance.toFixed(4)}
                <span className="unit">BNB</span>
              </div>
            </div>
            <HistoryView>
              <div className="history_tit">History Record</div>
              <div className="history_btn">
                <a href={`https://bscscan.com/address/${Addresses.Buyer}`} target="_blank">
                  <img src={createURL('btns/btn_access.png')} />
                </a>
              </div>
            </HistoryView>
          </div>
        </div>
      </ContentStyle>
      <Footer current="burn" />
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
  flex: 1;
  height: 0;
  flex-shrink: 0;
  padding: 0 0.26rem 0.26rem;
  background: url(${createURL('page_bg.png')}) no-repeat center top/contain;
  overflow-y: auto;

  .burn_view {
    margin-top: 0.26rem;
    border-radius: 0 0 0.1rem 0.1rem;
    border: 1px solid #ff00ff;
    background: #2f1533;
    .burn_content {
      padding: 0.1rem 0.2rem 0.2rem;
    }
    .balance_view {
      margin-top: 0.12rem;
      padding: 0.08rem 0.2rem 0.12rem;
      background: #2f1533;
      border-radius: 0.1rem;
      border: 1px solid #ff00ff;
      text-align: center;
      .info_txt {
        font-size: 0.15rem;
        font-weight: 600;
        color: #ff00ff;
      }
      .info_num {
        width: 100%;
        margin-top: 0.08rem;
        height: 0.34rem;
        line-height: 0.34rem;
        font-size: 0.16rem;
        color: #ffb923;
        border-radius: 0.3rem;
        background: rgba(255, 0, 255, 0.31);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        .unit {
          color: #fff;
          padding-left: 0.05rem;
          font-size: 0.14rem;
        }
      }
    }
    .burned_view {
      padding: 0 0.2rem 0.15rem;
      background: #2f1533;
      border-radius: 0.1rem;
      border: 1px solid #ff00ff;
      text-align: center;
      .info_txt {
        margin-top: 0.06rem;
        font-size: 0.14rem;
        font-weight: 600;
        color: #ff00ff;
      }
      .info_num {
        width: 100%;
        margin-top: 0.05rem;
        line-height: 0.25rem;
        font-size: 0.14rem;
        color: #f2f2f2;
        border-radius: 0.3rem;
        background: rgba(255, 0, 255, 0.31);
        .unit {
          color: #fff;
          padding-left: 0.06rem;
          font-size: 0.12rem;
        }
      }
    }
  }
`

const HistoryView = styled.div`
  margin-top: 0.12rem;
  padding: 0.08rem 0.2rem 0.12rem;
  border-radius: 0.1rem;
  opacity: 1;
  border: 1px solid #ff00ff;
  background: #2f1533;
  .history_tit {
    text-align: center;
    font-size: 0.14rem;
    font-weight: 600;
    color: #ff00ff;
  }
  .history_btn {
    margin-top: 0.08rem;
    text-align: center;
    img {
      width: 100%;
      object-fit: contain;
    }
  }
  .list_tit {
    line-height: 0.32rem;
    display: flex;
    flex-flow: row;
    align-items: center;
    background: linear-gradient(180deg, rgba(255, 0, 255, 0.31) 0%, rgba(175, 58, 187, 0) 100%);
    opacity: 1;
    border-top: 1px solid #ff00ff;
    border-bottom: 1px solid #ff00ff;
    .tit_item {
      flex: 1;
      text-align: center;
      font-size: 0.15rem;
      color: #f2f2f2;
    }
  }
  .list_bd {
    max-height: 1.3rem;
    overflow-y: auto;
    .item {
      line-height: 0.28rem;
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      border-top: 1px solid #ff00ff;
      &:first-child {
        border-top: none;
      }
      & > div {
        flex: 1;
        width: 0;
        padding: 0 0.02rem;
        font-size: 0.13rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: center;
        &.item_block {
          color: #ffc476;
        }
        &.item_num {
          color: #f2f2f2;
          .unit {
            padding-left: 0.02rem;
            font-size: 0.12rem;
            color: #f9bdff;
          }
        }
        &.item_link {
          a {
            padding: 0.01rem 0.08rem;
            color: #ff00ff;
            background: #753077;
            border-radius: 0.12rem;
          }
        }
      }
    }
  }
`
