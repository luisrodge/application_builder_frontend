import { Form } from "antd";
import DatePicker from "../DatePicker";

import { IInputProps } from "./inputs.interface";

const DatePickerInput = ({ input, disabled }: IInputProps) => (
  <Form.Item
    label={input.label}
    style={{ marginBottom: 0 }}
    name={input.name}
    labelCol={{ span: 24 }}
  >
    <DatePicker style={{ width: "100%" }} disabled={disabled} />
  </Form.Item>
);

export default DatePickerInput;
