import { Layout, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { blue } from "@ant-design/colors";

import { SlimContainer } from "../style";
import { useAppDispatch } from "../../../app/hooks";
import { showDrawer } from "../../drawer/drawerSlice";
import { DRAWER_TYPES } from "../../../shared/constants";

const { Header: AntHeader } = Layout;

export default function ApplicationsHeader() {
  const dispatch = useAppDispatch();
  return (
    <AntHeader
      className="site-layout-background"
      style={{
        marginBottom: 60,
        background: blue.primary,
      }}
    >
      <SlimContainer>
        <div style={{ display: "flex" }}>
          <div style={{ flex: "1", color: "#fff" }}>Applications</div>
          <div>
            <Button
              onClick={() =>
                dispatch(
                  showDrawer({
                    drawerType: DRAWER_TYPES.NEW_APPLICATION_DRAWER,
                  })
                )
              }
              icon={<PlusOutlined />}
            >
              New Application
            </Button>
          </div>
        </div>
      </SlimContainer>
    </AntHeader>
  );
}
