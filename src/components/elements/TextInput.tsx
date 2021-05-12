import { Form, Input } from "antd";

import { IElementProps } from "./elements.interface";

const TextInput = ({ element }: IElementProps) => (
  <Form.Item label={element.label} style={{ marginBottom: 0 }}>
    <Input style={{ width: "100%" }} />
  </Form.Item>
);

export default TextInput;
