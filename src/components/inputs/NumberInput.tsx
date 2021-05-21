import { Form, InputNumber } from "antd";

import { IInputProps } from "./inputs.interface";

const NumberInput = ({ input }: IInputProps) => (
  <Form.Item label={input.label} style={{ marginBottom: 0 }} name={input.label}>
    <InputNumber style={{ width: "100%" }} />
  </Form.Item>
);

export default NumberInput;
