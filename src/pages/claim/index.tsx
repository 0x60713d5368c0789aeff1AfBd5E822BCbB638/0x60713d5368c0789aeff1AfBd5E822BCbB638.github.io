import { useState } from 'react'
import copy from 'copy-to-clipboard'
import { useLocation } from 'react-router-dom'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

import { observer } from 'mobx-react-lite'

import styled from 'styled-components'
import Title from '../components/title'
import { useClaim } from '@/lib/claim'
import Modal from '@/components/ui/Modal'
import { useWallet } from '@/lib/wallet'
export default observer(() => {
  const { address } = useWallet()
  const { totalMint, remain, pending, claim, fomoClaim, fomoStatus, invited, inviter, setInviter, totalBuyBonus, totalMintBonus } =
    useClaim()

  const { search } = useLocation()
  const [loading, setLoading] = useState(false)
  const [inputValue, setInputValue] = useState(new URLSearchParams(search).get('inviter') ?? '')

  const copyLink = () => {
    if (address) {
      copy(`${window.location.protocol}//${window.location.host}/#/claim?inviter=${address}`)
      Modal.success('copy success')
    }
  }

  const handleTierMintClaim = () => {
    setLoading(true)
    claim()
      .then(() => {
        Modal.success('Claim success')
      })
      .catch((err) => {
        Modal.error(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleFomoClaim = () => {
    setLoading(true)
    fomoClaim()
      .then(() => {
        Modal.success('Claim success')
      })
      .catch((err) => {
        Modal.error(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleSetInviter = () => {
    setLoading(true)
    setInviter(inputValue)
      .then(() => {
        Modal.success('Set inviter success')
      })
      .catch((err) => {
        Modal.error(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }
  return (
    <ViewStyled>
      <Header />
      <ContentStyle>
        {/*inviter-address*/}
        <div className="card_view">
          <Title name="inviter_address" />
          <div className="card_content">
            {!inviter && (
              <div className="card_tips_view">
                <div className="card_tips">
                  Tips: fill in the inviter address <br />
                  and click the button to bind
                </div>
              </div>
            )}

            <div className="card_input">
              {inviter ? (
                <input value={inviter} readOnly />
              ) : (
                <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
              )}
            </div>
            {!inviter && (
              <div className="card_btn">
                <button className="btn" disabled={loading} onClick={handleSetInviter}>
                  <img src={createURL('btns/btn_bind_inviter.png')} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/*invitation*/}
        <div className="card_view">
          <Title name="invitation" />
          <div className="card_content">
            <div className="card_item_view">
              <div className="txt">Total purchase bonus:</div>
              <div className="num ">
                {totalBuyBonus.toFixed(4)}
                <span className="unit">FDAO</span>
              </div>
            </div>
            <div className="card_item_view">
              <div className="txt">Total mint bonus:</div>
              <div className="num ">
                {totalMintBonus.toFixed(4)}
                <span className="unit">BNB</span>
              </div>
            </div>
            <div className="card_item_view">
              <div className="txt">My invite num:</div>
              <div className="num">{invited}</div>
            </div>
            <div className="card_item_view">
              <div className="txt">My invite link:</div>
              <div className="num">
                {address ? `${window.location.protocol}//${window.location.host}/#/claim?inviter=${address}` : ''}
              </div>
            </div>

            <div className="card_btn">
              <div className="btn" onClick={copyLink}>
                <img src={createURL('btns/btn_copy_link.png')} />
              </div>
            </div>
          </div>
        </div>

        {/*tier-mint*/}
        <div className="card_view">
          <Title name="tier_mint" size="sm" />
          <div className="card_content">
            <div className="card_item_view">
              <div className="txt">Total of tier mint:</div>
              <div className="num light">
                {totalMint.toFixed(4)}
                <span className="unit">FDAO</span>
              </div>
              <div className="txt ">Wait for release:</div>
              <div className="num light">
                {remain.toFixed(4)}
                <span className="unit">FDAO</span>
              </div>
              <div className="txt ">Has been released:</div>
              <div className="num light">
                {pending.toFixed(4)}
                <span className="unit">FDAO</span>
              </div>
            </div>
            <div className="card_btn">
              <button className="btn" disabled={loading || pending.lte(0)} onClick={handleTierMintClaim}>
                <img src={createURL('btns/btn_claim.png')} />
              </button>
            </div>
          </div>
        </div>

        {/*fomo-prize*/}
        <div className="card_view">
          <Title name="super_prize" size="sm2" />
          <div className="card_content">
            <div className="card_item_view">
              <div className="txt">My Last Round BNB:</div>
              <div className="num light">
                {fomoStatus.amount.toFixed(4)}
                <span className="unit">BNB</span>
              </div>
              <div className="txt">My Last Round Weights:</div>
              <div className="num light">{fomoStatus.weight.toFixed(4)}%</div>
              <div className="txt">Projected Super Prize:</div>
              <div className="num light">
                &#8776; {fomoStatus.projected.toFixed(4)}
                <span className="unit">BNB</span>
              </div>
              <div className="txt">Super Prize:</div>
              <div className="num light">
                {fomoStatus.prize.toFixed(4)}
                <span className="unit">BNB</span>
              </div>
            </div>
            <div className="card_btn">
              <button className="btn" disabled={loading || fomoStatus.prize.lte(0)} onClick={handleFomoClaim}>
                <img src={createURL('btns/btn_claim.png')} />
              </button>
            </div>
          </div>
        </div>
      </ContentStyle>
      <Footer current="claim" />
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
  overflow-y: auto;
  padding: 0.18rem 0.26rem 0.26rem;
  background: url(${createURL('page_bg.png')}) no-repeat center top/contain;
  .card_view {
    margin-top: 0.18rem;
    border-radius: 0 0 0.1rem 0.1rem;
    border: 1px solid #ff00ff;
    background: #2f1533;
    overflow: hidden;
    .card_content {
      padding: 0 0.2rem 0.14rem;
    }
    .card_item_view {
      margin-top: 0.1rem;
      padding: 0 0.2rem 0.14rem;
      border-radius: 0.1rem;
      border: 1px solid #ff00ff;
      background-color: #2f1533;
      text-align: center;
      &.flex_view {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        .flex_item {
          flex: 1;
        }
      }
      &.no_border {
        border: none;
        background-color: transparent;
        padding: 0;
      }
      .txt {
        margin: 0.05rem 0;
        font-size: 0.15rem;
        font-weight: 500;
        color: #ff00ff;
      }
      .num {
        width: 100%;
        padding: 0 0.2rem;
        line-height: 0.26rem;
        color: #f2f2f2;
        font-size: 0.14rem;
        background: rgba(255, 0, 255, 0.31);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        border-radius: 0.3rem;
        &.inline {
          display: inline-block;
          width: auto;
          max-width: 100%;
        }
        &.light {
          font-size: 0.16rem;
          color: rgba(255, 185, 35, 1);
          .unit {
            font-size: 0.14rem;
          }
        }
        &.sm {
          font-size: 0.12rem;
        }
        .unit {
          font-size: 0.12rem;
          padding-left: 0.05rem;
          color: #fff;
        }
      }
    }
    .card_btn {
      margin-top: 0.18rem;
      text-align: center;
      .btn {
        display: inline-block;
        background: none;
        outline: none;
        img {
          height: 0.26rem;
          object-fit: contain;
        }
      }
    }
    .card_tips_view {
      text-align: center;
      .card_tips {
        position: relative;
        padding-left: 0.34rem;
        display: inline-block;
        font-size: 0.12rem;
        color: rgba(255, 170, 35, 1);
        &::before {
          content: ' ';
          position: absolute;
          left: 0;
          top: 50%;
          display: block;
          margin-top: -0.12rem;
          width: 0.24rem;
          height: 0.24rem;
          background: url(${createURL('icons/icon_tips.png')}) no-repeat center/contain;
        }
      }
    }
    .card_input {
      margin-top: 0.16rem;
      input {
        width: 100%;
        height: 0.32rem;
        line-height: 0.32rem;
        border: 1px solid transparent;
        background: #391d3f;
        border-radius: 0.06rem;
        text-align: center;
        outline: none;
        transition: all 0.2s linear;
        &:focus {
          border-color: rgba(255, 170, 35, 1);
        }
      }
    }
  }
`
