import { Layout, Button, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { blue } from "@ant-design/colors";
import { Redirect, useParams } from "react-router";

import Sections from "./Sections";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectApplication,
  selectSections,
  setActiveApplication,
} from "./applicationsSlice";
import { DRAWER_TYPES } from "../../shared/constants";
import Sidebar from "./components/Sidebar";
import { showDrawer } from "../drawer/drawerSlice";

const { Header, Content } = Layout;
const { Title } = Typography;

const DesignerRoot = () => {
  const dispatch = useAppDispatch();

  const { applicationId } = useParams<{ applicationId: string }>();

  const application = useAppSelector(selectApplication(applicationId));
  const sections = useAppSelector(selectSections);
  dispatch(setActiveApplication(application));

  if (!application)
    return (
      <Redirect
        to={{
          pathname: "/",
        }}
      />
    );

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
            <div style={{ flex: "1", color: "#fff" }}>{application?.title}</div>
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
