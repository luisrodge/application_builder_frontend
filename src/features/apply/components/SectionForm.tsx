import { Row, Form } from "antd";
import styled from "styled-components";

import Columns from "./ColumnList";
import { GUTTER } from "../../../shared/theme";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import {
  selectSectionFields,
  selectSectionRows,
  setSectionFields,
} from "../applySlice";
import { IFieldData } from "../apply.interface";

const RowContainer = styled.div`
  width: 100%;
  padding: 20px 0;
  border: 1px solid transparent;
`;

const Container = styled.div`
  width: 100%;
  position: relative;
`;

interface IProps {
  sectionId: string;
  setOpenElementDrawer?: (columnId: number) => void;
}

export default function SectionForm({ sectionId }: IProps) {
  const dispatch = useAppDispatch();

  const sectionRows = useAppSelector(selectSectionRows(sectionId));
  const sectionFields = useAppSelector(selectSectionFields(sectionId));

  const onChange = (fields: IFieldData[]) => {
    console.log("Change: ", fields);
    dispatch(setSectionFields({ sectionId, fields }));
  };

  return (
    <>
      <Form
        name="global_state"
        layout="inline"
        fields={sectionFields}
        onFieldsChange={(_, inputFields) => {
          onChange(inputFields);
        }}
      >
        {sectionRows?.map((row) => (
          <Container key={row.id}>
            <RowContainer key={row.id}>
              <Row gutter={GUTTER.lg}>
                <Columns row={row} />
              </Row>
            </RowContainer>
          </Container>
        ))}
      </Form>
    </>
  );
}
