import { useEffect } from "react";
import { Layout, Typography } from "antd";
import { useParams } from "react-router";

import SectionList from "./components/SectionList";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectLoadingStatuses, selectSections } from "./applicationsSlice";
import Sidebar from "./components/OverviewSidebar";
import { GetApplication } from "./services";
import { Spinner } from "../../components/Spinner";
import OverviewHeader from "./components/OverviewHeader";

const { Content } = Layout;
const { Title } = Typography;

export default function ApplicationOverview() {
  const dispatch = useAppDispatch();

  const { slug } = useParams<{ slug: string }>();

  const loadingStatuses = useAppSelector(selectLoadingStatuses);
  const sections = useAppSelector(selectSections);

  useEffect(() => {
    dispatch(GetApplication(slug));
  }, [slug, dispatch]);

  return (
    <Layout>
      <Sidebar sections={sections} />
      <Layout className="site-layout" style={{ marginRight: 200 }}>
        <OverviewHeader />

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
