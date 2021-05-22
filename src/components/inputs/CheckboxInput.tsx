import { Checkbox } from "antd";

import { IInputProps } from "./inputs.interface";

const CheckboxInput = ({ input, disabled }: IInputProps) => (
  <Checkbox disabled={disabled}>{input.label}</Checkbox>
);

export default CheckboxInput;
