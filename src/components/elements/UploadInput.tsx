import { Upload, Button, Form } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import { IElementProps } from "./elements.interface";

const UploadInput = ({ element }: IElementProps) => (
  <Form.Item
    label={element.label}
    style={{ fontWeight: "bold", marginBottom: 0 }}
  >
    <Upload>
      <Button icon={<UploadOutlined />}>Click to Upload</Button>
    </Upload>
  </Form.Item>
);

export default UploadInput;
