import { Checkbox } from "antd";

import { IInputProps } from "./inputs.interface";

const CheckboxInput = ({ input, disabled }: IInputProps) => (
  <Checkbox disabled={disabled} name={input.name}>
    {input.label}
  </Checkbox>
);

export default CheckboxInput;
