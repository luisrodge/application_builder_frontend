import styled from "styled-components";
import { Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import ElementLabel from "./ElementLabel";

const InputContainer = styled.div`
  display: flex;
  align-items: flex-end;
`;

const LabelCol = styled.div`
  flex: 0 1 auto;
  padding-right: 20px;
`;

const InputCol = styled.div`
  flex: 1;
`;

const UploadInput = () => (
  <InputContainer>
    <LabelCol>
      <ElementLabel />
    </LabelCol>
    <InputCol>
      <Upload>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
    </InputCol>
  </InputContainer>
);

export default UploadInput;
