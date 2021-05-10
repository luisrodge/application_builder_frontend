import { Row } from "antd";
import { blue, grey } from "@ant-design/colors";
import styled from "styled-components";

import DrawerContainer from "./DrawerContainer";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectDrawer, hideDrawer } from "./drawerSlice";
import {
  addElement,
  selectActiveColumn,
  selectActiveRow,
  setActiveColumn,
  setActiveRow,
} from "../designer/designerSlice";
import { ELEMENT_TYPES } from "../../shared/constants";
import { IElement } from "../designer/designer.interface";

const ElementCard = styled.div`
  width: 100%;
  text-align: center;
  cursor: pointer;
  border: 1px solid ${grey.primary};
  border-radius: 2px;
  padding: 10px;
  margin-bottom: 20px;
  :hover {
    border: 1px solid ${blue.primary};
  }
`;

const elements = [
  { name: "Number Input", type: ELEMENT_TYPES.NUMBER_INPUT_ELEMENT },
  { name: "Text Input", type: ELEMENT_TYPES.TEXT_INPUT_ELEMENT },
  { name: "Date Picker", type: ELEMENT_TYPES.DATE_PICKER_INPUT_ELEMENT },
  { name: "Checkbox", type: ELEMENT_TYPES.CHECKBOX_INPUT_ELEMENT },
  { name: "File Upload", type: ELEMENT_TYPES.UPLOAD_INPUT_ELEMENT },
];

const ElementPicker = () => {
  const { isOpen } = useAppSelector(selectDrawer);
  const activeRow = useAppSelector(selectActiveRow);
  const activeColumn = useAppSelector(selectActiveColumn);

  const dispatch = useAppDispatch();

  const reset = () => {
    dispatch(setActiveRow());
    dispatch(setActiveColumn());
    dispatch(hideDrawer());
  };

  const onClose = () => {
    reset();
  };

  const pickElement = (type: string) => {
    const newElement = {
      sectionId: activeRow?.sectionId,
      rowId: activeRow?.id,
      columnId: activeColumn?.id,
      type,
    } as IElement;
    dispatch(addElement(newElement));
    reset();
  };

  return (
    <DrawerContainer
      width={400}
      isOpen={isOpen}
      title="Add element"
      closeDrawer={onClose}
    >
      <br />
      {elements.map((element, index) => (
        <Row key={index}>
          <ElementCard onClick={() => pickElement(element.type)}>
            <h4 style={{ margin: 0 }}>{element.name}</h4>
          </ElementCard>
        </Row>
      ))}
    </DrawerContainer>
  );
};

export default ElementPicker;
