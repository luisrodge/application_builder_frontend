import { Typography, Button } from "antd";
import styled from "styled-components";
import { grey, blue } from "@ant-design/colors";
import { HeartTwoTone, FileTextOutlined } from "@ant-design/icons";

import { useAppDispatch } from "../app/hooks";
import { showDrawer } from "../features/drawer/drawerSlice";
import { DRAWER_TYPES } from "../shared/constants";

const { Title, Text } = Typography;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 130px 0;
  background: #f0f2f5;
  flex-direction: column;
`;

export default function SimpleHome() {
  const dispatch = useAppDispatch();

  return (
    <>
      <Container>
        <Title level={1} style={{ margin: 0, marginBottom: 3 }}>
          <span style={{ color: blue.primary }}>Quik</span>apply
        </Title>
        <Text style={{ margin: 0, color: grey.primary, fontSize: 16 }}>
          Bring your printed <FileTextOutlined /> application forms online - the{" "}
          <strong>quik</strong> way!
        </Text>
        <Button
          type="primary"
          size="large"
          style={{ marginTop: 30 }}
          onClick={() =>
            dispatch(
              showDrawer({
                drawerType: DRAWER_TYPES.APPLICATION_FORM_DRAWER,
              })
            )
          }
        >
          Design new application
        </Button>
      </Container>
      <footer style={{ padding: 24, textAlign: "center" }}>
        <Text style={{ color: grey.primary }}>
          For you with <HeartTwoTone /> from{" "}
          <a href="http://rodgetech.com/" target="_blank" rel="noreferrer">
            rodgetech.com
          </a>
        </Text>
      </footer>
    </>
  );
}
