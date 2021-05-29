import { Button, Layout } from "antd";
import { PlusOutlined, EyeOutlined } from "@ant-design/icons";
import { blue } from "@ant-design/colors";

import { DRAWER_TYPES } from "../../../shared/constants";
import { showDrawer } from "../../drawer/drawerSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectActiveApplication } from "../applicationsSlice";

const { Header } = Layout;

export default function OverviewHeader() {
  const dispatch = useAppDispatch();
  const application = useAppSelector(selectActiveApplication);

  return (
    <Header
      className="site-layout-background"
      style={{
        marginBottom: 100,
        background: blue.primary,
      }}
    >
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          <span style={{ color: "#fff", marginRight: 20 }}>
            {application?.title}
          </span>
        </div>
        <div>
          <Button
            icon={<PlusOutlined />}
            onClick={() =>
              dispatch(
                showDrawer({
                  drawerType: DRAWER_TYPES.SECTION_LAYOUT_PICKER_DRAWER,
                })
              )
            }
          >
            Add Section
          </Button>
          <Button
            icon={<EyeOutlined />}
            style={{ marginLeft: 20, background: blue[4] }}
            type="primary"
          >
            Publish
          </Button>
        </div>
      </div>
    </Header>
  );
}
