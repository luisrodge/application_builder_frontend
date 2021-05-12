import { Form, InputNumber } from "antd";

import { IElementProps } from "./elements.interface";

const NumberInput = ({ element }: IElementProps) => (
  <Form.Item label={element.label} style={{ marginBottom: 0 }}>
    <InputNumber style={{ width: "100%" }} />
  </Form.Item>
);

export default NumberInput;
