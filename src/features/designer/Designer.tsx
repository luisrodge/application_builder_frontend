import React, { useState } from "react";
import { Button } from "antd";
import styled from "styled-components";
import { blue } from "@ant-design/colors";

import Drawer from "../../components/Drawer";
import SectionPicker from "./SectionPicker";
import Sections from "./Sections";
import ElementPicker from "../../components/ElementPicker";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { addSection, selectSections } from "./designerSlice";

const Container = styled.div`
  background: #fff;
  padding: 30px 20px;
  border-radius: 2px;
  text-align: center;
`;

const Designer = () => {
  const sections = useAppSelector(selectSections);
  const dispatch = useAppDispatch();

  const [openDrawer, setOpenDrawer] = useState(false);
  const [openElementDrawer, setOpenElementDrawer] = useState(false);

  const showDrawer = () => {
    setOpenDrawer(true);
  };

  const closeDrawer = () => {
    setOpenDrawer(false);
  };

  const handleAddSection = (sectionId: string, numOfCols: number) => {
    const newSection = { id: sectionId, numOfCols };
    dispatch(addSection(newSection));
    closeDrawer();
  };

  const selectElement = (type: string) => {};

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
      {sections.length > 0 && <div style={{ marginTop: 70 }}></div>}
      <Container>
        <Sections
          sections={sections}
          setOpenElementDrawer={() => setOpenElementDrawer(true)}
        />
        <Drawer
          isOpen={openDrawer}
          closeDrawer={closeDrawer}
          title="Add new section"
          width="500"
        >
          <SectionPicker selectSection={handleAddSection} />
        </Drawer>
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
