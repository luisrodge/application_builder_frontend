import { Upload, Button, Form } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import { IInputProps } from "./inputs.interface";
import { selectSectionField } from "../../features/apply/applySlice";
import { useAppSelector } from "../../app/hooks";

const UploadInput = ({ input, disabled }: IInputProps) => {
  const field = useAppSelector(selectSectionField(input.sectionId, input.name));
  const fileList = field?.value.fileList.slice(-1);

  return (
    <Form.Item
      label={input.label}
      style={{ marginBottom: 0 }}
      name={input.name}
      valuePropName="file"
    >
      <Upload
        disabled={disabled}
        beforeUpload={() => false}
        name={input.name}
        defaultFileList={fileList}
        multiple={false}
      >
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
    </Form.Item>
  );
};

export default UploadInput;
