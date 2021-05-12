import Header from "./Header";
import Sections from "./Sections";

import { useAppSelector } from "../../app/hooks";
import { selectSections } from "./designerSlice";
import { DRAWER_TYPES } from "../../shared/constants";
import { Container } from "./style";

const DesignerRoot = () => {
  const sections = useAppSelector(selectSections);

  return (
    <>
      <Header
        drawerType={DRAWER_TYPES.SECTION_LAYOUT_PICKER_DRAWER}
        btnTitle="Add section"
      />
      {sections.length > 0 && <div style={{ marginTop: 70 }}></div>}
      <Container>
        <Sections sections={sections} />
      </Container>
    </>
  );
};

export default DesignerRoot;
