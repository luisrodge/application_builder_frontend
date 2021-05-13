import styled from "styled-components";
import { Button, Col, Tooltip } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { blue } from "@ant-design/colors";

const Container = styled.div`
  width: 600px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
`;

const Applications = () => {
  return (
    <Container>
      <div style={{ flex: 1 }}>
        <h2>Your Applications</h2>
      </div>
      <div>
        <Button icon={<PlusOutlined />}>New Application</Button>
      </div>
    </Container>
  );
};

export default Applications;
