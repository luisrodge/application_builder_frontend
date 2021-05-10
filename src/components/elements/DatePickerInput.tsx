import styled from "styled-components";
import { DatePicker } from "antd";

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

const DatePickerInput = () => (
  <InputContainer>
    <LabelCol>
      <ElementLabel />
    </LabelCol>
    <InputCol>
      <DatePicker style={{ width: "100%" }} />
    </InputCol>
  </InputContainer>
);

export default DatePickerInput;
