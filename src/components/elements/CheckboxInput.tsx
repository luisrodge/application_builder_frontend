import { Checkbox } from "antd";

import { IElementProps } from "./elements.interface";

const CheckboxInput = ({ element }: IElementProps) => (
  <Checkbox>{element.label}</Checkbox>
);

export default CheckboxInput;
