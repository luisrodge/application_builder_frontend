import { Form, Input } from "antd";

import { IInputProps } from "./inputs.interface";

const TextInput = ({ input }: IInputProps) => (
  <Form.Item label={input.label} style={{ marginBottom: 0 }}>
    <Input style={{ width: "100%" }} />
  </Form.Item>
);

export default TextInput;
