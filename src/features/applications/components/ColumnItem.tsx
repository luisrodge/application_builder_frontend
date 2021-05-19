import styled, { css } from "styled-components";
import { Button, Col, Tooltip } from "antd";
import { PlusOutlined, CloseSquareOutlined } from "@ant-design/icons";
import { blue, grey } from "@ant-design/colors";

import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  selectActiveColumn,
  selectElement,
  setActiveColumn,
  setActiveRow,
  removeElement,
} from "../applicationsSlice";
import { IColumn, IRow } from "../applications.interface";
import { showDrawer } from "../../drawer/drawerSlice";
import { DRAWER_TYPES } from "../../../shared/constants";
import ElementRoot from "./ElementRoot";
import { DeleteColumn } from "../services";

const RemoveColumnIconContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  padding: 4px;
  background: ${blue.primary};
  cursor: pointer;
  z-index: 9999;
  display: none;
`;

const RemoveElementIcon = styled(CloseSquareOutlined)`
  position: absolute;
  right: 0;
  top: 0;
  color: ${grey.primary};
  z-index: 999;
  display: none;
  background: ${blue.primary};
  padding: 4px;
  color: #fff;
`;

const InnerContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const ElementContainer = styled.div`
  border: 1px solid transparent;
  width: 100%;
  position: relative;
  padding: 24px 0;
  &:hover ${RemoveElementIcon} {
    display: inherit;
  }
  &:hover {
    border: 1px dashed ${grey.primary};
  }
`;

interface IContainerProps {
  $active: boolean;
  $disabled: boolean;
}

const Container = styled.div<IContainerProps>`
  width: 100%;
  position: relative;
  display: flex;
  background: ${(props) => (props.$disabled ? "#fafafa" : "#fff")};
  padding: 20px;
  width: 100%;
  cursor: pointer;
  border: 1px solid transparent;
  :hover {
    border: 1px solid ${blue.primary};
  }
  &:hover ${RemoveColumnIconContainer} {
    display: inherit;
  }
  ${(props) =>
    props.$active &&
    css`
      border: 1px solid ${blue.primary};
    `}
`;

interface IProps {
  column: IColumn;
  span?: number;
  row: IRow;
  disabled?: boolean;
}

export default function ColumnItem({ span, column, row, disabled }: IProps) {
  const dispatch = useAppDispatch();
  const activeColumn = useAppSelector(selectActiveColumn);
  const element = useAppSelector(selectElement(column?.id));

  const isEmpty = element == undefined;

  const onClick = () => {
    dispatch(setActiveRow(row));
    dispatch(setActiveColumn(column));
    dispatch(showDrawer({ drawerType: DRAWER_TYPES.ELEMENT_PICKER_DRAWER }));
  };

  return (
    <Col span={span} style={{ display: "inline-flex", alignSelf: "stretch" }}>
      <Container
        $active={activeColumn! && activeColumn.id == column.id}
        $disabled={disabled!}
      >
        <InnerContainer>
          {!disabled && (
            <RemoveColumnIconContainer
              onClick={() => dispatch(DeleteColumn(column))}
            >
              <Tooltip title="Remove column">
                <CloseSquareOutlined style={{ color: "#fff" }} />
              </Tooltip>
            </RemoveColumnIconContainer>
          )}

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
                disabled={disabled}
              ></Button>
            </div>
          ) : (
            <ElementContainer>
              {!disabled && (
                <Tooltip title="Remove element">
                  <RemoveElementIcon
                    onClick={() => dispatch(removeElement(element!))}
                  />
                </Tooltip>
              )}
              <ElementRoot column={column} disabled={disabled} />
            </ElementContainer>
          )}
        </InnerContainer>
      </Container>
    </Col>
  );
}
