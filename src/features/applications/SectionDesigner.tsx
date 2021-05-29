import { Redirect, useParams } from "react-router-dom";
import { Typography, message, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectActiveSection,
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

const { Title, Text } = Typography;

export default function SectionDesigner() {
  const dispatch = useAppDispatch();

  const { sectionId, applicationSlug } =
    useParams<{ sectionId: string; applicationSlug: string }>();

  const loadingStatuses = useAppSelector(selectLoadingStatuses);
  const section = useAppSelector(selectActiveSection);

  useEffect(() => {
    dispatch(GetSection(sectionId));
  }, [sectionId, dispatch]);

  if (loadingStatuses.sectionLoading === "failed") {
    message.error("Failed to load section");
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
            <div style={{ marginTop: 70 }}></div>
            <Container>
              <Title level={4}>{section.title}</Title>
              <Text>{section.details}</Text>

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
                  marginTop: 20,
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
