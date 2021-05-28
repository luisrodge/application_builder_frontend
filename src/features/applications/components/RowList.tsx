import { Row } from "antd";
import styled from "styled-components";
import { CloseSquareOutlined } from "@ant-design/icons";
import { blue } from "@ant-design/colors";

import Columns from "./ColumnList";
import { GUTTER } from "../../../shared/theme";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { selectSectionRows } from "../applicationsSlice";
import { DeleteRow } from "../services";

const IconContainer = styled.div`
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  top: -22px;
  width: 50px;
  text-align: center;
  background: ${blue.primary};
  cursor: pointer;
  display: none;
`;

const RowContainer = styled.div`
  padding: 20px 0;
  border: 1px solid transparent;
`;

const Container = styled.div`
  position: relative;
  &:hover ${IconContainer} {
    display: inherit;
  }
  &:hover ${RowContainer} {
    border: 1px solid ${blue.primary};
  }
`;

interface IProps {
  sectionId: number;
  disabled?: boolean;
  setOpenElementDrawer?: (columnId: number) => void;
}

export default function RowList({ sectionId, disabled }: IProps) {
  const sectionRows = useAppSelector(selectSectionRows(sectionId));
  const dispatch = useAppDispatch();

  return (
    <>
      {sectionRows?.map((row) => (
        <div key={row.id}>
          <Container>
            <IconContainer onClick={() => dispatch(DeleteRow(row.id))}>
              {!disabled && <CloseSquareOutlined style={{ color: "#fff" }} />}
            </IconContainer>
            <RowContainer key={row.id}>
              <Row gutter={GUTTER.lg}>
                <Columns row={row} sectionId={sectionId} disabled={disabled} />
              </Row>
            </RowContainer>
          </Container>
        </div>
      ))}
    </>
  );
}
