import React from "react";
import { Card, Row } from "antd";
import { AlignCenterOutlined } from "@ant-design/icons";
import { blue, grey } from "@ant-design/colors";
import styled from "styled-components";

interface IProps {
  selectSection: (sectionId: number, numberOfCols: number) => void;
}

const SectionCard = styled(Card)`
  width: 100%;
  text-align: center;
  cursor: pointer;
  :hover {
    border: 1px solid ${blue.primary};
  }
`;

const SectionPicker = ({ selectSection }: IProps) => {
  return (
    <>
      <Row>
        <SectionCard onClick={() => selectSection(1, 1)}>
          <AlignCenterOutlined style={{ fontSize: 80, color: grey.primary }} />
        </SectionCard>
      </Row>
      <br />
      <Row>
        <SectionCard onClick={() => selectSection(2, 2)}>
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
        <SectionCard onClick={() => selectSection(3, 3)}>
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
