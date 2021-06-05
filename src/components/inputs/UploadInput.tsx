import { Upload, Button, Form } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import { IInputProps, IInputRootProps } from "./inputs.interface";
import { selectSectionField } from "../../features/apply/applySlice";
import { useAppSelector } from "../../app/hooks";

const DisabledUploadInput = ({ input }: IInputProps) => (
  <Form.Item
    label={input.label}
    style={{ marginBottom: 0 }}
    name={input.name}
    valuePropName="file"
  >
    <Upload
      disabled={true}
      beforeUpload={() => false}
      name={input.name}
      multiple={false}
    >
      <Button icon={<UploadOutlined />}>Click to Upload</Button>
    </Upload>
  </Form.Item>
);

const UploadInput = ({ input }: IInputRootProps) => {
  const field = useAppSelector(selectSectionField(input.sectionId, input.name));

  const fileList = field?.value.hasOwnProperty("fileList")
    ? field?.value.fileList.slice(-1)
    : [];

  return (
    <Form.Item
      label={input.label}
      style={{ marginBottom: 0 }}
      name={input.name}
      valuePropName="file"
    >
      <Upload
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

const RootUploadInput = ({ input, designerActive }: IInputRootProps) => {
  if (designerActive) return <DisabledUploadInput input={input} />;
  return <UploadInput input={input} />;
};

export default RootUploadInput;
