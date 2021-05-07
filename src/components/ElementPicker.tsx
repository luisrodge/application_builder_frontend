import React from "react";
import { Card, Row, Typography } from "antd";
import { blue, grey } from "@ant-design/colors";
import styled from "styled-components";

const { Title } = Typography;

interface IProps {
  selectElement: (elementType: string) => void;
}

const ElementCard = styled(Card)`
  width: 100%;
  text-align: center;
  cursor: pointer;
  :hover {
    border: 1px solid ${blue.primary};
  }
`;

const ElementPicker = ({ selectElement }: IProps) => {
  return (
    <>
      <Row>
        <ElementCard onClick={() => selectElement("numberInput")}>
          <Title level={5} style={{ margin: 0, color: grey.primary }}>
            Number Input
          </Title>
        </ElementCard>
      </Row>
      <br />
      <Row>
        <ElementCard onClick={() => selectElement("numberInput")}>
          <Title level={5} style={{ margin: 0, color: grey.primary }}>
            Single Line Text Input
          </Title>
        </ElementCard>
      </Row>
    </>
  );
};

export default ElementPicker;
