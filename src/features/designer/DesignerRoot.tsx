import { Layout, Button, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { blue } from "@ant-design/colors";

import Sections from "./Sections";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectSections } from "./designerSlice";
import { DRAWER_TYPES } from "../../shared/constants";
import { Container } from "./style";
import Sidebar from "./components/Sidebar";
import { showDrawer } from "../drawer/drawerSlice";

const { Header, Content } = Layout;
const { Title } = Typography;

const DesignerRoot = () => {
  const sections = useAppSelector(selectSections);
  const dispatch = useAppDispatch();

  return (
    <Layout>
      <Sidebar sections={sections} />
      <Layout className="site-layout" style={{ marginRight: 200 }}>
        <Header
          className="site-layout-background"
          style={{
            marginBottom: 100,
            background: blue.primary,
          }}
        >
          <div style={{ display: "flex" }}>
            <div style={{ flex: "1", color: "#fff" }}>
              Your Application Name
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
            </div>
          </div>
        </Header>
        <Content
          style={{
            marginLeft: 50,
            marginRight: 50,
            marginBottom: 100,
          }}
        >
          {sections.length ? (
            <div className="site-layout-background">
              <Sections sections={sections} disabled={true} />
            </div>
          ) : (
            <Title level={3} style={{ textAlign: "center" }}>
              Add your first section
            </Title>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DesignerRoot;
