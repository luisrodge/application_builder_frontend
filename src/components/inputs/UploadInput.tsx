import { Upload, Button, Form } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import { IInputProps } from "./inputs.interface";

const UploadInput = ({ input, disabled }: IInputProps) => (
  <Form.Item label={input.label} style={{ marginBottom: 0 }} name={input.label}>
    <Upload disabled={disabled}>
      <Button icon={<UploadOutlined />}>Click to Upload</Button>
    </Upload>
  </Form.Item>
);

export default UploadInput;
