import { Checkbox } from "antd";

import { IInputProps } from "./inputs.interface";

const CheckboxInput = ({ input }: IInputProps) => (
  <Checkbox>{input.label}</Checkbox>
);

export default CheckboxInput;
