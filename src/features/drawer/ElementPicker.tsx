import { Row } from "antd";
import { blue, grey } from "@ant-design/colors";
import styled, { css } from "styled-components";

import DrawerContainer from "./DrawerContainer";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { hideDrawer, selectDrawer, showChildDrawer } from "./drawerSlice";
import {
  selectActiveColumn,
  selectActiveElement,
  selectActiveRow,
  setActiveColumn,
  setActiveElement,
  setActiveRow,
} from "../applications/applicationsSlice";
import { DRAWER_TYPES, ELEMENT_TYPES } from "../../shared/constants";
import { IElement } from "../applications/applications.interface";
import ElementOptions from "./ElementOptions";

interface IElementCardProps {
  $active: boolean;
}

const ElementCard = styled.div<IElementCardProps>`
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
  ${(props) =>
    props.$active &&
    css`
      border: 1px solid ${blue.primary};
    `}
`;

const elements = [
  { name: "Number Input", type: ELEMENT_TYPES.NUMBER_INPUT_ELEMENT },
  { name: "Text Input", type: ELEMENT_TYPES.TEXT_INPUT_ELEMENT },
  { name: "Date Picker", type: ELEMENT_TYPES.DATE_PICKER_INPUT_ELEMENT },
  { name: "Checkbox", type: ELEMENT_TYPES.CHECKBOX_INPUT_ELEMENT },
  { name: "File Upload", type: ELEMENT_TYPES.UPLOAD_INPUT_ELEMENT },
];

export default function ElementPicker() {
  const { isOpen } = useAppSelector(selectDrawer);
  const activeRow = useAppSelector(selectActiveRow);
  const activeColumn = useAppSelector(selectActiveColumn);
  const activeElement = useAppSelector(selectActiveElement);

  const dispatch = useAppDispatch();

  const pickElement = (type: string) => {
    const unsavedElement = {
      sectionId: activeRow?.sectionId,
      rowId: activeRow?.id,
      columnId: activeColumn?.id,
      type,
      label: "",
    } as IElement;
    dispatch(setActiveElement(unsavedElement));
    dispatch(
      showChildDrawer({ drawerType: DRAWER_TYPES.ELEMENT_OPTIONS_DRAWER })
    );
  };

  const closeDrawer = () => {
    dispatch(hideDrawer());
    dispatch(setActiveRow());
    dispatch(setActiveColumn());
  };

  return (
    <DrawerContainer
      width={400}
      isOpen={isOpen}
      title="Add element"
      closeDrawer={closeDrawer}
    >
      <br />
      {elements.map((element, index) => (
        <Row key={index}>
          <ElementCard
            onClick={() => pickElement(element.type)}
            $active={
              activeElement != undefined && activeElement.type == element.type
            }
          >
            <h4 style={{ margin: 0 }}>{element.name}</h4>
          </ElementCard>
        </Row>
      ))}
      <ElementOptions />
    </DrawerContainer>
  );
}
