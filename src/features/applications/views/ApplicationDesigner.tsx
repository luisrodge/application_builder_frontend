import { useEffect } from "react";
import { Layout, Button, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { blue } from "@ant-design/colors";
import { useParams } from "react-router";

import SectionList from "../components/SectionList";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  selectActiveApplication,
  selectLoading,
  selectSections,
  setActiveApplication,
} from "../applicationsSlice";
import { DRAWER_TYPES } from "../../../shared/constants";
import Sidebar from "../components/ApplicationDesignerSidebar";
import { showDrawer } from "../../drawer/drawerSlice";
import { GetApplication } from "../services";
import { Spinner } from "../../../components/Spinner";

const { Header, Content } = Layout;
const { Title } = Typography;

export default function ApplicationDesigner() {
  const dispatch = useAppDispatch();

  const { applicationId } = useParams<{ applicationId: string }>();

  const loading = useAppSelector(selectLoading);
  const application = useAppSelector(selectActiveApplication);
  const sections = useAppSelector(selectSections);
  dispatch(setActiveApplication(application));

  useEffect(() => {
    dispatch(GetApplication(applicationId));
  }, []);

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
          {loading == "pending" ? (
            <Spinner />
          ) : sections.length ? (
            <div className="site-layout-background">
              <SectionList sections={sections} disabled={true} />
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
}
