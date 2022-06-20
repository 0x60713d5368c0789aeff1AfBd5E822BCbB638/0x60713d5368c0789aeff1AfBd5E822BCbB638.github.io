import styled from "styled-components";

export default (props: any) => {
  let { progress = 0 } = props;
  return (
    <BarStyled>
      <div className="bar" style={{ width: progress }}></div>
    </BarStyled>
  );
};
const BarStyled = styled.div`
  position: relative;
  width: 100%;
  height: 0.1rem;
  border-radius: 0.1rem;
  border: 1px solid rgba(242, 242, 242, 0.4);
  overflow: hidden;
  .bar {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background: #ff00ff;
    border-radius: 0.1rem;
  }
`;
