import styled, { css } from "styled-components";
import { Button, Col, Tooltip } from "antd";
import { PlusOutlined, CloseSquareOutlined } from "@ant-design/icons";
import { blue, grey } from "@ant-design/colors";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  removeColumn,
  selectActiveColumn,
  selectElement,
  setActiveColumn,
  setActiveRow,
  removeElement,
} from "./designerSlice";
import { IColumn, IRow } from "./designer.interface";
import { showDrawer } from "../drawer/drawerSlice";
import { DRAWER_TYPES } from "../../shared/constants";
import ElementRoot from "./ElementRoot";

const RemoveIcon = styled(CloseSquareOutlined)`
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  top: 0;
  text-align: center;
  color: ${grey.primary};
  display: none;
`;

const RemoveElementIcon = styled(CloseSquareOutlined)`
  position: absolute;
  right: -15px;
  top: 0;
  text-align: center;
  color: ${grey.primary};
  z-index: 999;
  display: none;
`;

interface IInnerContainerProps {
  $active: boolean;
}

const InnerContainer = styled.div<IInnerContainerProps>`
  position: relative;
  background: #fafafa;
  padding: 30px 20px;
  border-radius: 2px;
  text-align: center;
  width: 100%;
  cursor: pointer;
  border: 1px solid transparent;
  :hover {
    border: 1px solid ${blue.primary};
  }
  &:hover ${RemoveIcon} {
    display: inherit;
  }
  ${(props) =>
    props.$active &&
    css`
      border: 1px solid ${blue.primary};
    `}
`;

const ElementContainer = styled.div`
  position: relative;
  &:hover ${RemoveElementIcon} {
    display: inherit;
  }
`;

interface IProps {
  column: IColumn;
  span?: number;
  row: IRow;
}

const Column = ({ span, column, row }: IProps) => {
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
      <InnerContainer $active={activeColumn! && activeColumn.id == column.id}>
        <Tooltip title="Remove column">
          <RemoveIcon onClick={() => dispatch(removeColumn(column))} />
        </Tooltip>

        {isEmpty ? (
          <Button
            icon={<PlusOutlined />}
            type="primary"
            ghost
            onClick={onClick}
          ></Button>
        ) : (
          <ElementContainer>
            <Tooltip title="Remove element">
              <RemoveElementIcon
                onClick={() => dispatch(removeElement(element!))}
              />
            </Tooltip>
            <ElementRoot column={column} />
          </ElementContainer>
        )}
      </InnerContainer>
    </Col>
  );
};

export default Column;
