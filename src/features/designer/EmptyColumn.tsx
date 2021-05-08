import styled from "styled-components";
import { Button, Col, Tooltip } from "antd";
import { PlusOutlined, CloseSquareOutlined } from "@ant-design/icons";
import { blue, grey } from "@ant-design/colors";

import { useAppDispatch } from "../../app/hooks";
import { removeColumn } from "./designerSlice";
import { IColumn } from "./designer.interface";

interface IProps {
  column: IColumn;
  span?: number;
  setOpenElementDrawer?: (columnId: number) => void;
}

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

const InnerContainer = styled.div`
  position: relative;
  background: #fafafa;
  padding: 16px 20px;
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
`;

const EmptyColumn = ({ span, setOpenElementDrawer, column }: IProps) => {
  const dispatch = useAppDispatch();

  return (
    <Col span={span}>
      <InnerContainer>
        <Tooltip title="Remove column">
          <RemoveIcon onClick={() => dispatch(removeColumn(column))} />
        </Tooltip>
        <Button icon={<PlusOutlined />} type="primary" ghost></Button>
      </InnerContainer>
    </Col>
  );
};

export default EmptyColumn;
