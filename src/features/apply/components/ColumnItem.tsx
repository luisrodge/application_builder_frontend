import styled from "styled-components";
import { Button, Col } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { grey } from "@ant-design/colors";

import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  selectActiveColumn,
  selectInput,
  setActiveColumn,
  setActiveRow,
} from "../applySlice";
import { IColumn, IRow } from "../../applications/applications.interface";
import { showDrawer } from "../../drawer/drawerSlice";
import { DRAWER_TYPES } from "../../../shared/constants";
import InputRoot from "../../applications/components/InputRoot";

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
  &:hover {
    border: 1px dashed ${grey.primary};
  }
`;

const Container = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  background: #fff;
  padding: 20px;
  width: 100%;
  cursor: pointer;
`;

interface IProps {
  column: IColumn;
  span?: number;
  row: IRow;
  disabled?: boolean;
}

export default function ColumnItem({ span, column, row }: IProps) {
  const dispatch = useAppDispatch();
  const activeColumn = useAppSelector(selectActiveColumn);
  const input = useAppSelector(selectInput(column?.id));

  const isEmpty = input == undefined;

  const onClick = () => {
    dispatch(setActiveRow(row));
    dispatch(setActiveColumn(column));
    dispatch(showDrawer({ drawerType: DRAWER_TYPES.INPUT_PICKER_DRAWER }));
  };

  return (
    <Col span={span} style={{ display: "inline-flex", alignSelf: "stretch" }}>
      <Container>
        <InnerContainer>
          {isEmpty ? (
            <div
              style={{
                width: "100%",
              }}
            >
              <Button
                icon={<PlusOutlined />}
                type="primary"
                ghost
                onClick={onClick}
              ></Button>
            </div>
          ) : (
            <InputContainer>
              <InputRoot column={column} disabled={false} />
            </InputContainer>
          )}
        </InnerContainer>
      </Container>
    </Col>
  );
}
