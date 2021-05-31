import { Typography } from "antd";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ArrowLeftOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const Container = styled.div`
  text-align: center;
  background: #f0f2f5;
  height: 440px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export default function NotFound() {
  return (
    <>
      <Container>
        <Title>404 - Not Found!</Title>
        <Text>We're sorry but we couldn't find what you were looking for.</Text>
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
