import { Redirect, useParams } from "react-router-dom";
import { Typography, Button, Row, Col } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectActiveSection,
  selectError,
  selectLoadingStatuses,
} from "./applicationsSlice";

import RowList from "./components/RowList";
import Header from "./components/SectionDesignerHeader";
import { Container } from "./style";
import { DRAWER_TYPES } from "../../shared/constants";
import { useEffect } from "react";
import { GetSection } from "./services";
import { Spinner } from "../../components/Spinner";
import { showDrawer } from "../drawer/drawerSlice";
import { GUTTER } from "../../shared/theme";

const { Title, Text } = Typography;

export default function SectionDesigner() {
  const dispatch = useAppDispatch();

  const { sectionId, applicationSlug } =
    useParams<{ sectionId: string; applicationSlug: string }>();

  const loadingStatuses = useAppSelector(selectLoadingStatuses);
  const section = useAppSelector(selectActiveSection);
  const error = useAppSelector(selectError);

  useEffect(() => {
    dispatch(GetSection(sectionId));
  }, [sectionId, dispatch]);

  if (error) {
    return (
      <Redirect
        to={{
          pathname: `/applications/${applicationSlug}`,
        }}
      />
    );
  }

  return (
    <div style={{ background: "#f0f2f5" }}>
      <Header
        drawerType={DRAWER_TYPES.ROW_LAYOUT_PICKER_DRAWER}
        btnTitle="Add row to section"
        applicationSlug={section && section.applicationSlug}
      />
      {loadingStatuses.sectionLoading === "pending" ? (
        <Spinner marginTop={120} />
      ) : (
        section && (
          <>
            <div
              style={{
                background: "#FFF",
                marginTop: 74,
                padding: "12px 20px",
              }}
            >
              <Row gutter={GUTTER.lg} style={{ textAlign: "left" }}>
                <Col span={24}>
                  <Title level={4} style={{ margin: 0 }}>
                    {section.title}
                  </Title>
                  {section.details && <Text>{section.details}</Text>}
                </Col>
              </Row>
            </div>
            <Container>
              <RowList sectionId={Number(sectionId)} />
              <Button
                onClick={() =>
                  dispatch(
                    showDrawer({
                      drawerType: DRAWER_TYPES.ROW_LAYOUT_PICKER_DRAWER,
                    })
                  )
                }
                style={{
                  paddingLeft: 50,
                  paddingRight: 50,
                  marginTop: 30,
                  marginBottom: 20,
                }}
                icon={<PlusOutlined />}
              >
                Add row
              </Button>
            </Container>
          </>
        )
      )}
    </div>
  );
}
