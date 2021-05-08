import React from "react";
import { Card, Row } from "antd";
import { AlignCenterOutlined } from "@ant-design/icons";
import { blue, grey } from "@ant-design/colors";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

import DrawerContainer from "./DrawerContainer";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectDrawer, hideDrawer } from "./drawerSlice";
import { addRow, selectActiveSection } from "../designer/designerSlice";

const SectionCard = styled(Card)`
  width: 100%;
  text-align: center;
  cursor: pointer;
  :hover {
    border: 1px solid ${blue.primary};
  }
`;

const RowPicker = () => {
  const { isOpen } = useAppSelector(selectDrawer);
  const section = useAppSelector(selectActiveSection);

  const dispatch = useAppDispatch();

  const pickRow = (rowId: string, numOfCols: number) => {
    const newRow = { id: rowId, numOfCols, sectionId: section!.id };
    dispatch(addRow(newRow));
    dispatch(hideDrawer());
  };

  return (
    <DrawerContainer
      width={500}
      isOpen={isOpen}
      title="Add row to section"
      closeDrawer={() => dispatch(hideDrawer())}
    >
      <Row>
        <SectionCard onClick={() => pickRow(uuidv4(), 1)}>
          <AlignCenterOutlined style={{ fontSize: 80, color: grey.primary }} />
        </SectionCard>
      </Row>
      <br />
      <Row>
        <SectionCard onClick={() => pickRow(uuidv4(), 2)}>
          <AlignCenterOutlined
            style={{ fontSize: 80, marginRight: 8, color: grey.primary }}
          />
          <AlignCenterOutlined
            style={{ fontSize: 80, marginLeft: 8, color: grey.primary }}
          />
        </SectionCard>
      </Row>
      <br />
      <Row>
        <SectionCard onClick={() => pickRow(uuidv4(), 3)}>
          <AlignCenterOutlined
            style={{ fontSize: 80, color: grey.primary }}
            color={blue.primary}
          />
          <AlignCenterOutlined
            style={{
              fontSize: 80,
              marginRight: 16,
              marginLeft: 16,
              color: grey.primary,
            }}
          />
          <AlignCenterOutlined style={{ fontSize: 80, color: grey.primary }} />
        </SectionCard>
      </Row>
    </DrawerContainer>
  );
};

export default RowPicker;
