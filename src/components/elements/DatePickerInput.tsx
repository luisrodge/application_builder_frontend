import { DatePicker, Form } from "antd";

import { IElementProps } from "./elements.interface";

const DatePickerInput = ({ element }: IElementProps) => (
  <Form.Item label={element.label} style={{ marginBottom: 0 }}>
    <DatePicker style={{ width: "100%" }} />
  </Form.Item>
);

export default DatePickerInput;
