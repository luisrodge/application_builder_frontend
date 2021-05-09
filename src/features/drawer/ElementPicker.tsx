import { Card, Row } from "antd";
import { blue } from "@ant-design/colors";
import styled from "styled-components";

import DrawerContainer from "./DrawerContainer";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectDrawer, hideDrawer } from "./drawerSlice";
import { selectActiveSection } from "../designer/designerSlice";

const ElementCard = styled(Card)`
  width: 100%;
  text-align: center;
  cursor: pointer;
  :hover {
    border: 1px solid ${blue.primary};
  }
`;

const ElementPicker = () => {
  const { isOpen } = useAppSelector(selectDrawer);
  const section = useAppSelector(selectActiveSection);

  const dispatch = useAppDispatch();

  return (
    <DrawerContainer
      width={400}
      isOpen={isOpen}
      title="Add element"
      closeDrawer={() => dispatch(hideDrawer())}
    >
      <Row>
        <ElementCard>
          <h4>Number Input</h4>
        </ElementCard>
      </Row>
    </DrawerContainer>
  );
};

export default ElementPicker;
