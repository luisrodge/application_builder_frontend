import { useEffect } from "react";
import { Layout, Typography } from "antd";
import { useParams } from "react-router";

import SectionList from "./components/SectionList";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectActiveApplication,
  selectError,
  selectLoadingStatuses,
  selectSections,
} from "./applicationsSlice";
import Sidebar from "./components/OverviewSidebar";
import { GetApplication } from "./services";
import { Spinner } from "../../components/Spinner";
import OverviewHeader from "./components/OverviewHeader";
import NotFound from "../../components/NotFound";

const { Content } = Layout;
const { Title } = Typography;

export default function ApplicationOverview() {
  const dispatch = useAppDispatch();

  const { slug } = useParams<{ slug: string }>();

  const loadingStatuses = useAppSelector(selectLoadingStatuses);
  const activeApplication = useAppSelector(selectActiveApplication);
  const sections = useAppSelector(selectSections);
  const error = useAppSelector(selectError);

  useEffect(() => {
    dispatch(GetApplication(slug));
  }, [slug, dispatch]);

  if (error && error.status === 404) return <NotFound />;

  return (
    <Layout>
      <Sidebar activeApplication={activeApplication} sections={sections} />
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
