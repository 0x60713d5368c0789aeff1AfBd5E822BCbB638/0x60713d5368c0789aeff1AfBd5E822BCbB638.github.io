import styled from 'styled-components'

export default (props: any) => {
  let { name, size = 'def', text = '', theme = '' } = props
  const titleSrc: any = `titles/${name}.png`
  let titImg = createURL(titleSrc)
  return (
    <TitleStyle className={`${size} ${text ? 'title' : null} ${theme}`}>
      <img src={titImg} />
      {text && <div className="text">({text})</div>}
    </TitleStyle>
  )
}

const TitleStyle = styled.div`
  width: calc(100% + 2px);
  margin: -1px -1px 0;
  text-align: center;
  background-repeat: no-repeat;
  background-position: center top;
  background-size: 100%;
  &.sm {
    padding-top: 0.04rem;
    height: 0.31rem;
    background-image: url(${createURL('titles/title_bg_sm.png')});
  }
  &.sm2 {
    padding-top: 0.04rem;
    height: 0.31rem;
    background-image: url(${createURL('titles/title_bg_sm.png')});
    img {
      height: 0.13rem;
    }
  }
  &.def {
    padding-top: 0.1rem;
    height: 0.58rem;
    background-image: url(${createURL('titles/title_bg_def.png')});
    img {
      height: 0.16rem;
    }
  }
  &.lg {
    padding-top: 0.1rem;
    height: 0.68rem;
    background-image: url(${createURL('titles/title_bg_lg.png')});
    &.yellow {
      background-image: url(${createURL('titles/title_bg_yellow.png')});
      img {
        height: 0.16rem;
      }
    }
    img {
      height: 0.2rem;
    }
  }

  &.title {
    padding-top: 0.02rem;
  }
  img {
    height: 0.1rem;
    object-fit: contain;
  }
  .text {
    margin-top: 0.01rem;
    text-align: center;
    font-size: 0.12rem;
    color: #ff00ff;
  }
`
