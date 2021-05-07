import React from "react";
import { Card, Row } from "antd";
import { AlignCenterOutlined } from "@ant-design/icons";
import { blue, grey } from "@ant-design/colors";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

const SectionCard = styled(Card)`
  width: 100%;
  text-align: center;
  cursor: pointer;
  :hover {
    border: 1px solid ${blue.primary};
  }
`;

interface IProps {
  selectSection: (sectionId: string, numberOfCols: number) => void;
}

const SectionPicker = ({ selectSection }: IProps) => {
  return (
    <>
      <Row>
        <SectionCard onClick={() => selectSection(uuidv4(), 1)}>
          <AlignCenterOutlined style={{ fontSize: 80, color: grey.primary }} />
        </SectionCard>
      </Row>
      <br />
      <Row>
        <SectionCard onClick={() => selectSection(uuidv4(), 2)}>
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
        <SectionCard onClick={() => selectSection(uuidv4(), 3)}>
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
    </>
  );
};

export default SectionPicker;
