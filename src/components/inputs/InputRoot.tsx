import { ReactNode } from "react";

import { INPUT_TYPES } from "../../shared/constants";
import NumberInput from "./NumberInput";
import TextInput from "./TextInput";
import { IInputRootProps } from "./inputs.interface";
import DatePickerInput from "./DatePickerInput";
import CheckboxInput from "./CheckboxInput";
import RootUploadInput from "./UploadInput";
import RadioInput from "./RadioInput";

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
  [UPLOAD_INPUT]: RootUploadInput,
  [RADIO_INPUT]: RadioInput,
} as IInputComponents;

export const InputTypes = Object.keys(INPUT_COMPONENTS);

export default function InputRoot({
  input,
  disabled,
  designerActive,
}: IInputRootProps) {
  if (!input) return null;

  const SpecificInput = INPUT_COMPONENTS[input.inputType] as React.ElementType;
  return (
    <SpecificInput
      input={input}
      disabled={disabled}
      designerActive={designerActive}
    />
  );
}
