import { Result } from "antd";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ArrowLeftOutlined } from "@ant-design/icons";

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
    <>
      <Container>
        <Result
          status="success"
          title="Application Submitted!"
          subTitle="Your application is on it's way to being processed"
        />
      </Container>
      <div style={{ textAlign: "center", padding: "20px 0" }}>
        <Link to="/" style={{ fontSize: 18 }}>
          <ArrowLeftOutlined style={{ marginRight: 6 }} />
          Back to Quickapply
        </Link>
      </div>
    </>
  );
}
