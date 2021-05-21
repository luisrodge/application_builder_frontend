import { DatePicker, Form } from "antd";

import { IInputProps } from "./inputs.interface";

const DatePickerInput = ({ input }: IInputProps) => (
  <Form.Item label={input.label} style={{ marginBottom: 0 }}>
    <DatePicker style={{ width: "100%" }} />
  </Form.Item>
);

export default DatePickerInput;
