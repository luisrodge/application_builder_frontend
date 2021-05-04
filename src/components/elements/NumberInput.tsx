import styled from "styled-components";
import { InputNumber } from "antd";

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

const NumberInput = () => (
  <InputContainer>
    <LabelCol>
      <ElementLabel />
    </LabelCol>
    <InputCol>
      <InputNumber style={{ width: "100%" }} />
    </InputCol>
  </InputContainer>
);

export default NumberInput;
