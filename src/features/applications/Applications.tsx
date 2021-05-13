import styled from "styled-components";
import { Button, Col, Tooltip } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { blue } from "@ant-design/colors";
import { useAppDispatch } from "../../app/hooks";
import { showDrawer } from "../drawer/drawerSlice";
import { DRAWER_TYPES } from "../../shared/constants";

const Container = styled.div`
  width: 600px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
`;

const Applications = () => {
  const dispatch = useAppDispatch();
  return (
    <Container>
      <div style={{ flex: 1 }}>
        <h2>Your Applications</h2>
      </div>
      <div>
        <Button
          onClick={() =>
            dispatch(
              showDrawer({ drawerType: DRAWER_TYPES.NEW_APPLICATION_DRAWER })
            )
          }
          icon={<PlusOutlined />}
        >
          New Application
        </Button>
      </div>
    </Container>
  );
};

export default Applications;
