import { Row, Tooltip } from "antd";
import styled from "styled-components";
import { CloseSquareOutlined } from "@ant-design/icons";
import { grey, blue } from "@ant-design/colors";

import Columns from "./Columns";
import { GUTTER } from "../../utils/theme";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectSectionRows, removeRow } from "./designerSlice";

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

const RowContainer = styled.div`
  padding: 28px 0;
  position: relative;
  :hover {
    border-bottom: 0;
    border: 1px solid ${blue.primary};
  }
  &:hover ${RemoveIcon} {
    display: inherit;
  }
`;

interface IProps {
  sectionId: string;
  setOpenElementDrawer?: (columnId: number) => void;
}

const Rows = ({ sectionId }: IProps) => {
  const sectionRows = useAppSelector(selectSectionRows(sectionId));
  const dispatch = useAppDispatch();

  return (
    <>
      {sectionRows?.map((row) => (
        <RowContainer key={row.id}>
          <Tooltip title="Remove row">
            <RemoveIcon onClick={() => dispatch(removeRow(row))} />
          </Tooltip>

          <Row gutter={GUTTER.lg}>
            <Columns row={row} sectionId={sectionId} />
          </Row>
        </RowContainer>
      ))}
    </>
  );
};

export default Rows;
