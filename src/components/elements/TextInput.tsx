import styled from "styled-components";
import { Input } from "antd";

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

const TextInput = () => (
  <InputContainer>
    <LabelCol>
      <ElementLabel />
    </LabelCol>
    <InputCol>
      <Input style={{ width: "100%" }} />
    </InputCol>
  </InputContainer>
);

export default TextInput;
