import { Result, Button } from "antd";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 60px;
  padding-bottom: 60px;
  background: #f0f2f5;
`;

export default function ApplySuccess() {
  return (
    <Container>
      <Result
        status="success"
        title="Application Submitted!"
        subTitle="Your application is on it's way to being processed"
        extra={[
          <Link className="ant-btn" to="/" key="home">
            Return home
          </Link>,
        ]}
      />
    </Container>
  );
}
