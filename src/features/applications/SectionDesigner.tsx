import { Redirect, useParams } from "react-router-dom";
import { Typography, message } from "antd";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectActiveSection,
  selectLoadingStatuses,
  selectSectionRows,
} from "./applicationsSlice";

import RowList from "./components/RowList";
import Header from "./components/SectionDesignerHeader";
import { Container } from "./style";
import { DRAWER_TYPES } from "../../shared/constants";
import { useEffect } from "react";
import { GetSection } from "./services";
import { Spinner } from "../../components/Spinner";

const { Title, Text } = Typography;

export default function SectionDesigner() {
  const dispatch = useAppDispatch();

  const { sectionId, applicationId } =
    useParams<{ sectionId: string; applicationId: string }>();

  const loadingStatuses = useAppSelector(selectLoadingStatuses);
  const section = useAppSelector(selectActiveSection);
  const sectionRows = useAppSelector(selectSectionRows(sectionId));

  useEffect(() => {
    dispatch(GetSection(sectionId));
  }, []);

  if (loadingStatuses.sectionLoading === "failed") {
    message.error("Failed to load section");
    return (
      <Redirect
        to={{
          pathname: `/applications/${applicationId}`,
        }}
      />
    );
  }

  return (
    <div style={{ background: "#f0f2f5" }}>
      <Header
        drawerType={DRAWER_TYPES.ROW_LAYOUT_PICKER_DRAWER}
        btnTitle="Add row to section"
        applicationId={section && section.applicationId}
      />
      {loadingStatuses.sectionLoading == "pending" ? (
        <Spinner marginTop={120} />
      ) : (
        section && (
          <>
            {sectionRows!.length > 0 && <div style={{ marginTop: 70 }}></div>}
            <Container>
              <Title level={4}>{section.title}</Title>
              <Text>{section.details}</Text>

              <RowList sectionId={sectionId} />
            </Container>
          </>
        )
      )}
    </div>
  );
}
