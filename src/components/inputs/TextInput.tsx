import { Form, Input } from "antd";

import { IInputProps } from "./inputs.interface";

const TextInput = ({ input, disabled }: IInputProps) => (
  <Form.Item
    label={input.label}
    style={{ marginBottom: 0 }}
    name={input.name}
    labelCol={{ span: 24 }}
  >
    <Input style={{ width: "100%" }} disabled={disabled} />
  </Form.Item>
);

export default TextInput;
