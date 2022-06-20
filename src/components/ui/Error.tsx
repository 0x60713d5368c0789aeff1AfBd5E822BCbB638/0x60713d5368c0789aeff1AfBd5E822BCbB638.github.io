import Modal from "./Modal";
import styled from "styled-components";

export default (props: any) => {
  let { tips } = props;

  return (
    <ErrorView
      onClick={() => {
        Modal.clear();
      }}
    >
      <div className="tips">{tips}</div>
    </ErrorView>
  );
};
const ErrorView = styled.div`
  position: relative;
  margin: 0 auto;
  width: 2.44rem;
  height: 3.3rem;
  background: url(${createURL("popup_error.png")}) no-repeat center;
  background-size: 100% 100%;
  .tips {
    position: absolute;
    left: 50%;
    bottom: 0.3rem;
    transform: translateX(-50%);
    width: 1.6rem;
    height: 1.2rem;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    font-size: 0.18rem;
    color: #f2f2f2;
    text-align: center;
    overflow: hidden;
  }
`;
