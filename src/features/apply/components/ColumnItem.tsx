import styled from "styled-components";
import { Col } from "antd";
import { grey } from "@ant-design/colors";

import { useAppSelector } from "../../../app/hooks";
import { selectInput } from "../applySlice";
import { IColumn } from "../../applications/applications.interface";
import InputRoot from "../../../components/inputs/InputRoot";

const InnerContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const InputContainer = styled.div`
  border: 1px solid transparent;
  width: 100%;
  position: relative;
  padding: 24px 0;
`;

const Container = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  background: #fff;
  padding: 20px;
  width: 100%;
`;

interface IProps {
  column: IColumn;
  span?: number;
  disabled?: boolean;
}

export default function ColumnItem({ span, column }: IProps) {
  const input = useAppSelector(selectInput(column?.id));

  const isEmpty = input === undefined;

  return (
    <Col span={span} style={{ display: "inline-flex", alignSelf: "stretch" }}>
      <Container>
        <InnerContainer>
          {isEmpty ? (
            <div
              style={{
                width: "100%",
                textAlign: "center",
                color: grey.primary,
              }}
            >
              <p style={{ margin: 0 }}>Empty</p>
            </div>
          ) : (
            <InputContainer>
              <InputRoot input={input!} disabled={false} />
            </InputContainer>
          )}
        </InnerContainer>
      </Container>
    </Col>
  );
}
