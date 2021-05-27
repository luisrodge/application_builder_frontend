import { useEffect } from "react";
import { Layout, Typography } from "antd";
import { useParams } from "react-router";

import SectionList from "./components/SectionList";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectLoadingStatuses, selectSections } from "./applicationsSlice";
import Sidebar from "./components/ApplicationDesignerSidebar";
import { GetApplication } from "./services";
import { Spinner } from "../../components/Spinner";
import ApplicationDesignerHeader from "./components/ApplicationDesignerHeader";

const { Content } = Layout;
const { Title } = Typography;

export default function ApplicationDesigner() {
  const dispatch = useAppDispatch();

  const { applicationId } = useParams<{ applicationId: string }>();

  const loadingStatuses = useAppSelector(selectLoadingStatuses);
  const sections = useAppSelector(selectSections);

  useEffect(() => {
    dispatch(GetApplication(applicationId));
  }, [applicationId, dispatch]);

  return (
    <Layout>
      <Sidebar sections={sections} />
      <Layout className="site-layout" style={{ marginRight: 200 }}>
        <ApplicationDesignerHeader />

        <Content
          style={{
            marginLeft: 50,
            marginRight: 50,
            marginBottom: 100,
          }}
        >
          {loadingStatuses.applicationLoading === "pending" ? (
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
