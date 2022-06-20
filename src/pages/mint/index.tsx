import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

import { observer } from 'mobx-react-lite'

import styled from 'styled-components'
import Title from '../components/title'
import { useMemo, useState } from 'react'
import MintItem from './mintItem'
import Modal from '../../components/ui/Modal'
import { useMint } from '@/lib/mint'
const fdao_icon = createURL('icons/icon_coin_fomo.png')
const bnb_icon = createURL('icons/icon_bnb_circle.png')
export default observer(() => {
  // EDIT
  const range = [0.25, 10]

  const { getFdaoOutput, mint, balance, current, next } = useMint()
  const [fromState, setfromState] = useState('')
  const [loading, setLoading] = useState(false)
  const coinChange = () => {
    // let from = { ...fromState };
    // let to = { ...toState };
    // setfromState(to);
    // setToState(from);
  }
  const changeFromValue = (v: string) => {
    setfromState(v)
  }

  const display = useMemo(() => {
    const value = parseFloat(fromState)
    if (isNaN(value) || value <= 0) {
      return {
        output: '',
        price: getFdaoOutput('1').price.toFixed(4),
      }
    }
    const output = getFdaoOutput(fromState)
    return {
      output: output.output.toFixed(4),
      price: output.price.toFixed(4),
    }
  }, [getFdaoOutput, fromState])

  const changeToValue = (v: any) => {
    // let to = { ...toState }
    // to.value = v
    // setToState(to)
  }
  const submit = () => {
    let value = parseFloat(fromState)
    if (isNaN(value)) {
      return
    }
    if (value < range[0] || value > range[1]) {
      Modal.error(`Please enter ${range[0]}BNB ~ ${range[1]}BNB`)
      return false
    }
    setLoading(true)
    mint(fromState)
      .then(() => {
        Modal.success('Mint success')
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
        {/*fdao-mint*/}
        <div className="card_view">
          <Title name="fdao_mint" text={`Tier-${current.round + 1}`} />
          <div className="card_content">
            <div className="mint_form">
              <div className="form_item">
                <div className="form_tit">From</div>
                <div className="coin_item">
                  <div className="coin_type">
                    <div className="icon">
                      <img src={bnb_icon} />
                    </div>
                    <div className="name">BNB</div>
                  </div>
                  <div className="input">
                    <input
                      value={fromState}
                      placeholder={`${range[0]}BNB ~ ${range[1]}BNB`}
                      onChange={(e) => {
                        changeFromValue(e.target.value)
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="form_mid">
                <div className="form_change" onClick={coinChange}>
                  <img src={createURL('icons/icon_exchange.svg')} />
                </div>
              </div>
              <div className="form_item to_item">
                <div className="form_tit">To</div>
                <div className="coin_item">
                  <div className="coin_type">
                    <div className="icon">
                      <img src={fdao_icon} />
                    </div>
                    <div className="name">FDAO</div>
                  </div>
                  <div className="input">
                    <input
                      value={display.output}
                      disabled
                      onChange={(e) => {
                        changeToValue(e.target.value)
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="coin_rate">1BNB ≈ {display.price}FDAO</div>
            <div className="tips">300 days release, TGE 0.3333%, and 0.3333% every days.</div>
            <div className="btn_view">
              <button className="btn_mint" disabled={loading} onClick={submit}>
                <img src={createURL('btns/btn_mint.png')} />
              </button>
            </div>
          </div>
        </div>
        {/*tier-mint*/}
        <div className="card_view">
          <Title name="tier_mint" size="sm" />
          <div className="card_content">
            <div className="balance_view">
              <div className="label">Unminted Tokens:</div>
              <div className="value">{balance.toFixed(4)}</div>
            </div>
            <div className="mint_list">
              <MintItem
                data={{
                  name: `Tier-${current.round + 1}`,
                  rate: `1BNB = ${current.price.toFixed(2)}FDAO`,
                  progress: `${current.rate}%`,
                }}
                current={true}
              />
              {next && (
                <MintItem
                  data={{
                    name: `Tier-${next.round + 1}`,
                    rate: `1BNB = ${next.price.toFixed(2)}FDAO`,
                    progress: `${next.rate}%`,
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </ContentStyle>
      <Footer current="mint" />
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
  z-index: 1;
  .card_view {
    margin-top: 0.18rem;
    border-radius: 0 0 0.1rem 0.1rem;
    border: 1px solid #ff00ff;
    background: #2f1533;
    overflow: hidden;
    .card_content {
      padding: 0 0.2rem 0.14rem;
    }
    .form_item {
      .form_tit {
        font-size: 0.12rem;
        color: #f9bdff;
      }
      &.to_item {
        margin-top: -0.1rem;
      }
      .coin_item {
        display: flex;
        align-items: center;
        .coin_type {
          width: 0.55rem;
          height: 0.5rem;
          display: flex;
          flex-flow: column nowrap;
          justify-content: center;
          align-items: center;
          border-radius: 0.1rem;
          border: 1px solid #a305a8;
          background: #391d3f;

          .icon {
            img {
              width: 0.2rem;
              height: 0.2rem;
              object-fit: contain;
            }
          }
          .name {
            color: #f2f2f2;
            font-size: 0.12rem;
            line-height: 1;
          }
        }
        .input {
          flex: 1;
          padding-left: 0.08rem;
          input {
            width: 100%;
            height: 0.5rem;
            line-height: 0.5rem;
            border: 1px solid #a305a8;
            font-size: 0.18rem;
            font-weight: 500;
            background: #391d3f;
            border-radius: 0.1rem;
            text-align: center;
            outline: none;
            transition: all 0.2s linear;
            color: #f2f2f2;
            &:focus {
              border-color: rgba(255, 170, 35, 1);
            }
          }
        }
      }
    }
    .form_mid {
      position: relative;
      padding: 0.1rem 0;
      text-align: right;
      &::before {
        content: ' ';
        display: block;
        position: absolute;
        top: 50%;
        left: 0.1rem;
        width: 2.5rem;
        transform: translateY(-50%);
        border-top: 1px solid #a305a8;
      }
      .form_change {
        display: inline-block;
        img {
          width: 0.18rem;
          height: 0.18rem;
          object-fit: contain;
        }
      }
    }
    .coin_rate {
      margin-top: 0.05rem;
      text-align: right;
      font-size: 0.12rem;
      color: #f2f2f2;
    }
    .tips {
      position: relative;
      margin-top: 0.2rem;
      padding: 0.24rem 0.25rem 0.15rem;
      text-align: center;
      color: #000;
      font-size: 0.14rem;
      background: #ffaa23;
      border-radius: 0.1rem;
      &::before {
        content: ' ';
        position: absolute;
        top: -0.15rem;
        left: 50%;
        margin-left: -0.16rem;
        width: 0.32rem;
        height: 0.32rem;
        background: url(${createURL('icons/icon_tips_white.png')}) no-repeat center/contain;
      }
    }
    .btn_view {
      margin-top: 0.2rem;
      text-align: center;
      .btn_mint {
        display: inline-block;
        background: none;
        outline: none;
        img {
          height: 0.42rem;
          object-fit: contain;
        }
      }
    }

    .balance_view {
      display: flex;
      align-items: center;
      margin-top: 0.18rem;
      padding: 0.12rem;
      border: 1px solid #ff00ff;
      background: #2f1533;
      border-radius: 0.1rem;
      .label {
        font-size: 0.12rem;
        color: #f9bdff;
      }
      .value {
        flex: 1;
        padding-left: 0.12rem;
        width: 0;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 0.18rem;
        font-weight: 500;
        color: #f2f2f2;
      }
    }
  }
`
