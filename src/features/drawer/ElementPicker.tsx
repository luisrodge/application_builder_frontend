import { Card, Row } from "antd";
import { blue, grey } from "@ant-design/colors";
import styled from "styled-components";

import DrawerContainer from "./DrawerContainer";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectDrawer, hideDrawer } from "./drawerSlice";
import {
  selectActiveSection,
  setActiveColumn,
  setActiveRow,
} from "../designer/designerSlice";

const ElementCard = styled.div`
  width: 100%;
  text-align: center;
  cursor: pointer;
  border: 1px solid ${grey.primary};
  border-radius: 2px;
  padding: 10px;
  :hover {
    border: 1px solid ${blue.primary};
  }
`;

const ElementPicker = () => {
  const { isOpen } = useAppSelector(selectDrawer);
  const section = useAppSelector(selectActiveSection);

  const dispatch = useAppDispatch();

  const onClose = () => {
    dispatch(setActiveRow());
    dispatch(setActiveColumn());
    dispatch(hideDrawer());
  };

  return (
    <DrawerContainer
      width={400}
      isOpen={isOpen}
      title="Add element"
      closeDrawer={onClose}
    >
      <br />
      <Row>
        <ElementCard>
          <h4 style={{ margin: 0 }}>Number Input</h4>
        </ElementCard>
      </Row>
    </DrawerContainer>
  );
};

export default ElementPicker;
