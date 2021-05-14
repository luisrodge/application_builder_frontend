import { Spin } from "antd";
import styled from "styled-components";
import { blue } from "@ant-design/colors";

const FullViewContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.24);
`;

const SpinnerContainer = styled.div`
  background: #fff;
  padding: 12px 50px;
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
  height: 100%;
`;

export const Spinner = () => (
  <div style={{ textAlign: "center" }}>
    <Spin size="large" style={{ marginTop: 50 }} />
  </div>
);

export const FullViewSpinner = () => (
  <FullViewContainer>
    <FullViewInnerContainer>
      <SpinnerContainer>
        <Spin size="large" />
        <p style={{ margin: 0 }}>Creating...</p>
      </SpinnerContainer>
    </FullViewInnerContainer>
  </FullViewContainer>
);
