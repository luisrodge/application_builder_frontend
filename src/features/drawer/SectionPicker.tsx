import { Card, Row } from "antd";
import { AlignCenterOutlined } from "@ant-design/icons";
import { blue, grey } from "@ant-design/colors";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { useHistory } from "react-router-dom";

import DrawerContainer from "./DrawerContainer";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectDrawer, hideDrawer } from "./drawerSlice";
import { addSection } from "../designer/designerSlice";

const SectionCard = styled(Card)`
  width: 100%;
  text-align: center;
  cursor: pointer;
  :hover {
    border: 1px solid ${blue.primary};
  }
`;

const SectionPicker = () => {
  const { isOpen } = useAppSelector(selectDrawer);
  const dispatch = useAppDispatch();
  const history = useHistory();

  const pickSection = (sectionId: string, numOfCols: number) => {
    const newSection = { id: sectionId, numOfCols };
    dispatch(addSection(newSection));
    dispatch(hideDrawer());
    history.push(`/sections/${sectionId}`);
  };

  return (
    <DrawerContainer
      width={500}
      isOpen={isOpen}
      title="Add new section"
      closeDrawer={() => dispatch(hideDrawer())}
    >
      <Row>
        <SectionCard onClick={() => pickSection(uuidv4(), 1)}>
          <AlignCenterOutlined style={{ fontSize: 80, color: grey.primary }} />
        </SectionCard>
      </Row>
      <br />
      <Row>
        <SectionCard onClick={() => pickSection(uuidv4(), 2)}>
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
        <SectionCard onClick={() => pickSection(uuidv4(), 3)}>
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

export default SectionPicker;
