import { Redirect, useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectSection, selectSectionRows } from "./designerSlice";

import Rows from "./Rows";
import Header from "./Header";
import { Container } from "./style";
import { DRAWER_TYPES } from "../../shared/constants";

const SectionDesigner = () => {
  const { sectionId } = useParams<{ sectionId: string }>();

  const section = useAppSelector(selectSection(sectionId));
  const sectionRows = useAppSelector(selectSectionRows(sectionId));

  if (!section)
    return (
      <Redirect
        to={{
          pathname: "/",
        }}
      />
    );

  return (
    <>
      <Header
        drawerType={DRAWER_TYPES.ROW_PICKER_DRAWER}
        btnTitle="Add row to section"
      />
      {sectionRows!.length > 0 && <div style={{ marginTop: 70 }}></div>}

      <Container>
        <Rows sectionId={sectionId} />
      </Container>
    </>
  );
};

export default SectionDesigner;
