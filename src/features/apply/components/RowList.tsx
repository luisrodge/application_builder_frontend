import { Row } from "antd";
import styled from "styled-components";
import { blue } from "@ant-design/colors";

import Columns from "./ColumnList";
import { GUTTER } from "../../../shared/theme";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { selectSectionRows } from "../applySlice";

const RowContainer = styled.div`
  padding: 20px 0;
  border: 1px solid transparent;
`;

const Container = styled.div`
  position: relative;
`;

interface IProps {
  sectionId: string;
  setOpenElementDrawer?: (columnId: number) => void;
}

export default function RowList({ sectionId }: IProps) {
  const sectionRows = useAppSelector(selectSectionRows(sectionId));
  const dispatch = useAppDispatch();

  return (
    <>
      {sectionRows?.map((row) => (
        <div key={row.id}>
          <Container>
            <RowContainer key={row.id}>
              <Row gutter={GUTTER.lg}>
                <Columns row={row} sectionId={sectionId} />
              </Row>
            </RowContainer>
          </Container>
        </div>
      ))}
    </>
  );
}
