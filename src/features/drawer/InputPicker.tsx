import { Row } from "antd";
import { blue, grey } from "@ant-design/colors";
import styled, { css } from "styled-components";

import DrawerContainer from "./DrawerContainer";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { hideDrawer, selectDrawer, showChildDrawer } from "./drawerSlice";
import {
  selectActiveColumn,
  selectActiveInput,
  setActiveColumn,
  setActiveInput,
  setActiveRow,
} from "../applications/applicationsSlice";
import { DRAWER_TYPES, INPUTS } from "../../shared/constants";
import { IInput } from "../applications/applications.interface";
import ElementOptions from "./InputOptions";

interface IInputCardProps {
  $active: boolean;
}

const InputCard = styled.div<IInputCardProps>`
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

export default function ElementPicker() {
  const { isOpen } = useAppSelector(selectDrawer);
  const activeColumn = useAppSelector(selectActiveColumn);
  const activeInput = useAppSelector(selectActiveInput);

  const dispatch = useAppDispatch();

  const pickInput = (inputType: string) => {
    const unsavedInput = {
      columnId: activeColumn?.id,
      inputType,
      label: "",
    } as IInput;
    dispatch(setActiveInput(unsavedInput));
    dispatch(
      showChildDrawer({ drawerType: DRAWER_TYPES.INPUT_OPTIONS_DRAWER })
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
      title="Add input"
      closeDrawer={closeDrawer}
    >
      <br />
      {INPUTS.map((input, index) => (
        <Row key={index}>
          <InputCard
            onClick={() => pickInput(input.inputType)}
            $active={
              activeInput !== undefined &&
              activeInput.inputType === input.inputType
            }
          >
            <h4 style={{ margin: 0 }}>{input.name}</h4>
          </InputCard>
        </Row>
      ))}
      <ElementOptions />
    </DrawerContainer>
  );
}
