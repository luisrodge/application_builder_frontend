import { DatePicker, Form } from "antd";

import { IInputProps } from "./inputs.interface";

const DatePickerInput = ({ input, disabled }: IInputProps) => (
  <Form.Item label={input.label} style={{ marginBottom: 0 }} name={input.name}>
    <DatePicker style={{ width: "100%" }} disabled={disabled} />
  </Form.Item>
);

export default DatePickerInput;
