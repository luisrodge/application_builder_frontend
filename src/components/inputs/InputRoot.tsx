import { ReactNode } from "react";

import { INPUT_TYPES } from "../../../shared/constants";
import NumberInput from "../../../components/inputs/NumberInput";
import TextInput from "../../../components/inputs/TextInput";
import { IInput } from "../applications.interface";
import DatePickerInput from "../../../components/inputs/DatePickerInput";
import CheckboxInput from "../../../components/inputs/CheckboxInput";
import UploadInput from "../../../components/inputs/UploadInput";
import RadioInput from "../../../components/inputs/RadioInput";

const {
  NUMBER_INPUT,
  TEXT_INPUT,
  DATE_PICKER_INPUT,
  CHECKBOX_INPUT,
  UPLOAD_INPUT,
  RADIO_INPUT,
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
  [RADIO_INPUT]: RadioInput,
} as IInputComponents;

export const InputTypes = Object.keys(INPUT_COMPONENTS);

interface IProps {
  input: IInput;
  disabled?: boolean;
}

export default function InputRoot({ input, disabled }: IProps) {
  if (!input) return null;

  const SpecificInput = INPUT_COMPONENTS[input.inputType] as React.ElementType;
  return <SpecificInput input={input} disabled={disabled} />;
}
