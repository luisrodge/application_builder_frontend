import { useState } from "react";

import Header from "./Header";
import Drawer from "../../components/Drawer";
import Sections from "./Sections";
import ElementPicker from "../../components/ElementPicker";

import { useAppSelector } from "../../app/hooks";
import { selectSections } from "./designerSlice";
import { DRAWER_TYPES } from "../../shared/constants";
import { Container } from "./style";

const Designer = () => {
  const sections = useAppSelector(selectSections);

  const [openElementDrawer, setOpenElementDrawer] = useState(false);

  const selectElement = (type: string) => {};

  return (
    <>
      <Header
        drawerType={DRAWER_TYPES.SECTION_PICKER_DRAWER}
        btnTitle="Add section"
      />
      {sections.length > 0 && <div style={{ marginTop: 70 }}></div>}
      <Container>
        <Sections
          sections={sections}
          setOpenElementDrawer={() => setOpenElementDrawer(true)}
        />

        <Drawer
          isOpen={openElementDrawer}
          closeDrawer={() => setOpenElementDrawer(false)}
          title="Add new element"
          width="500"
        >
          <ElementPicker selectElement={selectElement} />
        </Drawer>
      </Container>
    </>
  );
};

export default Designer;
