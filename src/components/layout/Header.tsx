import styled from 'styled-components'
import { useStores } from '@/hooks/index'
import { observer } from 'mobx-react-lite'
import { useWallet } from '@/lib/wallet'
import { useBnbBalance } from '@/lib/balance'

export default observer(() => {
  const { connect, address } = useWallet()
  const balance = useBnbBalance(address)
  return (
    <HeaderStyled>
      <div className="header_container">
        <div className="header_left">
          <img className="bnb_icon" src={createURL('icons/icon_bnb_circle.png')} />
          <div className="header_bnb_num">{balance.toDP(4).toString()}</div>
        </div>
        <div className="header_logo">
          <img src={createURL('logo.png')} />
        </div>
        <div className="header_right">
          {address ? (
            <div className="right_btn">{address}</div>
          ) : (
            <div className="right_btn" onClick={() => connect()}>
              Connect
            </div>
          )}
        </div>
      </div>
    </HeaderStyled>
  )
})

const HeaderStyled = styled.div`
  width: 100%;
  height: 0.56rem;

  .header_container {
    padding: 0 0.15rem;
    height: 0.56rem;
    display: flex;
    background: url(${createURL('header_bg.png')}) no-repeat center/contain;
  }
  .header_left,
  .header_right {
    padding-top: 0.1rem;
    flex: 1;
  }
  .header_left {
    position: relative;
    padding-right: 0.1rem;
    overflow: hidden;
    .bnb_icon {
      position: absolute;
      left: 0;
      top: 0.1rem;
      width: 0.24rem;
      height: 0.24rem;
      object-fit: contain;
    }
    .header_bnb_num {
      display: inline-block;
      max-width: 100%;
      padding: 0 0.12rem 0 0.3rem;
      line-height: 0.2rem;
      border: 2px solid #ff00ff;
      border-radius: 0.24rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .header_right {
    text-align: right;
    .right_btn {
      display: inline-block;
      max-width: 0.7rem;
      padding: 0 0.08rem;
      line-height: 0.2rem;
      border: 2px solid #ff00ff;
      color: #f2f2f2;
      border-radius: 0.24rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .header_logo {
    padding-top: 0.1rem;
    width: 1.41rem;
    text-align: center;
    img {
      height: 0.33rem;
      width: 1.41rem;
      object-fit: contain;
    }
  }
`
