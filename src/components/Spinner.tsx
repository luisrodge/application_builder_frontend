import { Spin } from "antd";
import styled from "styled-components";

const FullViewContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.45);
`;

const SpinnerContainer = styled.div`
  background: #fff;
  padding: 30px 50px;
  border-radius: 4px;
  text-align: center;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
`;

const FullViewInnerContainer = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  z-index: 1000;
  border-radius: 4;
  height: 300px;
`;

interface ISpinnerProps {
  marginTop?: number;
  delay?: number;
}

export const Spinner = ({ marginTop = 50, delay = 500 }: ISpinnerProps) => (
  <div style={{ textAlign: "center" }}>
    <Spin size="large" style={{ marginTop }} delay={delay} />
  </div>
);

interface IFullViewSpinnerProps {
  text: string;
}

export const FullViewSpinner = ({ text }: IFullViewSpinnerProps) => (
  <FullViewContainer>
    <FullViewInnerContainer>
      <SpinnerContainer>
        <Spin size="large" />
        <p style={{ margin: 0, fontWeight: "bold" }}>{text}</p>
      </SpinnerContainer>
    </FullViewInnerContainer>
  </FullViewContainer>
);
