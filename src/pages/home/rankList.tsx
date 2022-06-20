import { observer } from "mobx-react-lite";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFlip } from "swiper";
import "swiper/css";
import "swiper/css/effect-flip";
import { useRef } from "react";
import styled from "styled-components";
import Title from "../components/title";
export default observer(() => {
  const swiperRef = useRef<any>();
  const tempArr = new Array(10).fill({
    mint: 17,
    address: Date.now(),
  });
  return (
    <SwiperView>
      <Swiper
        className="swiper_view"
        slidesPerView={1}
        modules={[EffectFlip]}
        effect="flip"
        flipEffect={{ slideShadows: false }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        <SwiperSlide className="slide_item" key={0}>
          <div className="item_view">
            <Title name="super_prize" size="lg" />
            <div className="rank_list">
              <div className="list_title">
                <div>Ranking</div>
                <div>Mint(BNB)</div>
                <div className="ad">Address</div>
              </div>
              {tempArr.map((item, index) => {
                return (
                  <div key={index} className="list_item">
                    <div className="index">{index + 1}</div>
                    <div>{item.mint}</div>
                    <div className="ad">{item.address}</div>
                  </div>
                );
              })}
            </div>
            <div
              className="view_btn"
              onClick={() => {
                swiperRef.current.slideNext();
              }}
            >
              <img src={createURL("btns/btn_view_last.png")} />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="slide_item" key={1}>
          <div className="item_view last_view">
            <Title name="last_round" theme="yellow" size="lg" />
            <div className="rank_list">
              <div className="list_title">
                <div>Ranking</div>
                <div>Mint(BNB)</div>
                <div className="ad">Address</div>
              </div>
              {tempArr.map((item, index) => {
                return (
                  <div key={index} className="list_item">
                    <div className="index">{index + 1}</div>
                    <div>{item.mint}</div>
                    <div className="ad">{item.address}</div>
                  </div>
                );
              })}
            </div>
            <div
              className="view_btn"
              onClick={() => {
                swiperRef.current.slidePrev();
              }}
            >
              <img src={createURL("btns/btn_view_this.png")} />
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </SwiperView>
  );
});

const SwiperView = styled.div`
  width: 100%;
  .swiper_view {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
  .slide_item {
    width: 100%;
    padding: 0 0.5rem;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    .item_view {
      padding: 0.28rem 0.1rem;
      background: #2f1533;
      border-radius: 0.1rem;
      border: 1px solid #ff00ff;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      &.last_view {
        border-color: #ffb22d;
        .rank_list {
          .list_title {
            border-color: #ffb22d;
          }
          .list_item {
            border-color: #ffb22d;
          }
        }
      }
      .view_btn {
        margin-top: 0.3rem;
        text-align: center;
        img {
          height: 0.4rem;
          object-fit: contain;
        }
      }
      .rank_list {
        min-height: 2.8rem;
        padding: 0 0.12rem;
        .list_title {
          display: flex;
          align-items: center;
          background: #2f1533;
          border-radius: 0.1rem;
          border: 1px solid #ff00ff;
          padding: 0.1rem 0.06rem;
          & > div {
            flex: 1.5;
            width: 0;
            font-size: 0.15rem;
            line-height: 1;
            text-align: center;
            color: #f2f2f2;
            &.ad {
              flex: 2;
              padding-left: 0.1rem;
              text-align: left;
            }
          }
        }
        .list_item {
          display: flex;
          align-items: center;
          padding: 0.09rem;
          border-bottom: 1px solid #ff00ff;
          &:last-child {
            border-bottom: none;
          }
          & > div {
            flex: 1.5;
            width: 0;
            font-size: 0.14rem;
            line-height: 1;
            text-align: center;
            color: #f2f2f2;
            &.index {
              color: #ffc476;
            }
            &.ad {
              flex: 2;
              padding-left: 0.1rem;
              text-align: left;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
      }
    }
  }
`;
