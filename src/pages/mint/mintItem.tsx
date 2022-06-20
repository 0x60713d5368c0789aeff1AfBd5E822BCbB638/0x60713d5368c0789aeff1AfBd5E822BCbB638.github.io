import styled from 'styled-components'
import Progressbar from './progressbar'

export default (props: any) => {
  let { data, current = false } = props
  return (
    <MintStyled className={`${current ? 'cur' : null}`}>
      <div className="round_name">
        <div className="name">{data.name}</div>
        <div>{current ? 'this' : 'next'} round</div>
      </div>
      <div className="mint_progress">
        <div className="progress_bar">
          <div className="rate_num">{data.rate}</div>
          <div className="bar_view">
            <Progressbar progress={data.progress} />
          </div>
        </div>
        <div className="progress_num">
          <div>progress rate</div>
          <div className="num">{data.progress}</div>
        </div>
      </div>
    </MintStyled>
  )
}
const MintStyled = styled.div`
  margin-top: 0.1rem;
  display: flex;
  align-items: center;
  line-height: 1;
  &.cur {
    .round_name {
      .name {
        color: #ffb923;
      }
    }
    .mint_progress {
      .progress_num {
        .num {
          color: #ffb923;
        }
      }
    }
  }
  .round_name {
    padding: 0.04rem;
    background: #2f1533;
    border-radius: 0.06rem;
    border: 1px solid #a305a8;
    text-align: center;
    font-size: 0.12rem;
    white-space: nowrap;
    .name {
      font-size: 0.15rem;
      margin-bottom: 0.04rem;
    }
  }
  .mint_progress {
    flex: 1;
    display: flex;
    padding: 0.04rem 0.05rem;
    align-items: center;
    margin-left: 0.05rem;
    background: #2f1533;
    background: #2f1533;
    border-radius: 0.06rem;
    border: 1px solid #a305a8;

    .progress_bar {
      flex: 1;
      padding-right: 0.04rem;
      overflow: hidden;
      .rate_num {
        font-size: 0.12rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .bar_view {
        margin-top: 0.04rem;
      }
    }
    .progress_num {
      border-left: 1px solid #a305a8;
      text-align: center;
      font-size: 0.12rem;
      padding-left: 0.04rem;
      color: rgba(249, 189, 255, 1);
      .num {
        margin-top: 0.04rem;
        font-size: 0.15rem;
      }
    }
  }
`
