import { ReactNode } from "react";

import { useAppSelector } from "../../../app/hooks";
import { INPUT_TYPES } from "../../../shared/constants";
import NumberInput from "../../../components/inputs/NumberInput";
import TextInput from "../../../components/inputs/TextInput";
import { IColumn } from "../applications.interface";
import { selectInput } from "../applicationsSlice";
import DatePickerInput from "../../../components/inputs/DatePickerInput";
import CheckboxInput from "../../../components/inputs/CheckboxInput";
import UploadInput from "../../../components/inputs/UploadInput";

const {
  NUMBER_INPUT,
  TEXT_INPUT,
  DATE_PICKER_INPUT,
  CHECKBOX_INPUT,
  UPLOAD_INPUT,
} = INPUT_TYPES;

interface IInputComponents {
  [key: string]: ReactNode;
}

const INPUT_COMPONENTS = {
  [NUMBER_INPUT]: NumberInput,
  [TEXT_INPUT]: TextInput,
  [DATE_PICKER_INPUT]: DatePickerInput,
  [CHECKBOX_INPUT]: CheckboxInput,
  [UPLOAD_INPUT]: UploadInput,
} as IInputComponents;

export const InputTypes = Object.keys(INPUT_COMPONENTS);

interface IProps {
  column?: IColumn;
  disabled?: boolean;
}

export default function InputRoot({ column, disabled }: IProps) {
  const input = useAppSelector(selectInput(column!.id))!;

  if (!input) return null;

  const SpecificInput = INPUT_COMPONENTS[input.type] as React.ElementType;
  return <SpecificInput input={input} disabled={disabled} />;
}
