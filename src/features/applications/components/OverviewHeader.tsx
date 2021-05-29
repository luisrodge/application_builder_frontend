import { Button, Layout } from "antd";
import { PlusOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { blue } from "@ant-design/colors";
import { Link } from "react-router-dom";

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
          <Link to="/" style={{ color: "#FFF" }}>
            <ArrowLeftOutlined /> Applications
          </Link>
        </div>
        <div>
          <span style={{ color: "#fff", marginRight: 20 }}>
            {application?.title}
          </span>
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
        </div>
      </div>
    </Header>
  );
}
