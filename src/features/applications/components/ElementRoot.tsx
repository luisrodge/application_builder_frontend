import { ReactNode } from "react";

import { useAppSelector } from "../../../app/hooks";
import { ELEMENT_TYPES } from "../../../shared/constants";
import NumberInput from "../../../components/elements/NumberInput";
import TextInput from "../../../components/elements/TextInput";
import { IColumn } from "../applications.interface";
import { selectElement } from "../applicationsSlice";
import DatePickerInput from "../../../components/elements/DatePickerInput";
import CheckboxInput from "../../../components/elements/CheckboxInput";
import UploadInput from "../../../components/elements/UploadInput";

const {
  NUMBER_INPUT_ELEMENT,
  TEXT_INPUT_ELEMENT,
  DATE_PICKER_INPUT_ELEMENT,
  CHECKBOX_INPUT_ELEMENT,
  UPLOAD_INPUT_ELEMENT,
} = ELEMENT_TYPES;

interface IElementComponents {
  [key: string]: ReactNode;
}

const ELEMENT_COMPONENTS = {
  [NUMBER_INPUT_ELEMENT]: NumberInput,
  [TEXT_INPUT_ELEMENT]: TextInput,
  [DATE_PICKER_INPUT_ELEMENT]: DatePickerInput,
  [CHECKBOX_INPUT_ELEMENT]: CheckboxInput,
  [UPLOAD_INPUT_ELEMENT]: UploadInput,
} as IElementComponents;

export const ElementTypes = Object.keys(ELEMENT_COMPONENTS);

interface IProps {
  column?: IColumn;
  disabled?: boolean;
}

export default function ElementRoot({ column, disabled }: IProps) {
  const element = useAppSelector(selectElement(column!.id))!;

  if (!element) return null;

  const SpecificElement = ELEMENT_COMPONENTS[element.type] as React.ElementType;
  return <SpecificElement element={element} disabled={disabled} />;
}
