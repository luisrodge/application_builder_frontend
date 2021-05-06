import React, { useState } from "react";
import { Button } from "antd";
import styled from "styled-components";
import { blue } from "@ant-design/colors";

import Drawer from "./components/Drawer";
import SectionPicker from "./components/SectionPicker";
import Sections from "./components/Sections";

interface ISection {
  id: number;
  numOfCols: number;
}

const Container = styled.div`
  background: #fff;
  padding: 30px 20px;
  border-radius: 2px;
  text-align: center;
`;

function App() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [sections, setSections] = useState<ISection[]>([]);

  const showDrawer = () => {
    setOpenDrawer(true);
  };

  const closeDrawer = () => {
    setOpenDrawer(false);
  };

  const selectSection = (sectionId: number, numOfCols: number) => {
    const newSection = [...sections, { id: sectionId, numOfCols }];
    setSections(newSection);
    closeDrawer();
  };

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 999,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            background: blue.primary,
            padding: "18px 20px",
          }}
        >
          <Button onClick={showDrawer} style={{ marginRight: 24 }}>
            Add Section
          </Button>
          <Button type="text">Cancel</Button>
        </div>
      </header>
      {sections.length > 0 && <div style={{ marginTop: 50 }}></div>}
      <Container>
        <Sections sections={sections} />

        <Drawer
          isOpen={openDrawer}
          closeDrawer={closeDrawer}
          title="Add new section"
          width="500"
        >
          <SectionPicker selectSection={selectSection} />
        </Drawer>
      </Container>
    </>
  );
}

export default App;
