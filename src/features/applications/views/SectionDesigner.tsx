import { Redirect, useParams } from "react-router-dom";
import { Typography } from "antd";

import { useAppSelector } from "../../../app/hooks";
import { selectSection, selectSectionRows } from "../applicationsSlice";

import RowList from "../components/RowList";
import Header from "../components/SectionDesignerHeader";
import { Container } from "../style";
import { DRAWER_TYPES } from "../../../shared/constants";

const { Title, Text } = Typography;

export default function SectionDesigner() {
  const { sectionId, applicationId } =
    useParams<{ sectionId: string; applicationId: string }>();

  const section = useAppSelector(selectSection(sectionId));
  const sectionRows = useAppSelector(selectSectionRows(sectionId));

  if (!section)
    return (
      <Redirect
        to={{
          pathname: `/applications/${applicationId}`,
        }}
      />
    );

  return (
    <div style={{ background: "#f0f2f5" }}>
      <Header
        drawerType={DRAWER_TYPES.ROW_LAYOUT_PICKER_DRAWER}
        btnTitle="Add row to section"
        applicationId={section.applicationId}
      />
      {sectionRows!.length > 0 && <div style={{ marginTop: 70 }}></div>}
      <Container>
        <Title level={4}>{section.title}</Title>
        <Text>{section.details}</Text>

        <RowList sectionId={sectionId} />
      </Container>
    </div>
  );
}
