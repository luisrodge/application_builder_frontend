import { Row, Form, Col, Typography } from "antd";
import styled from "styled-components";
import { blue, grey } from "@ant-design/colors";

import Columns from "./ColumnList";
import { GUTTER } from "../../../shared/theme";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import {
  selectSectionFields,
  selectSectionRows,
  setSectionFields,
} from "../applySlice";
import { IFieldData } from "../apply.interface";

const { Title, Text } = Typography;

const RowContainer = styled.div`
  width: 100%;
  border: 1px solid transparent;
  margin-bottom: 30px;
`;

const Container = styled.div`
  width: 100%;
  position: relative;
`;

interface IProps {
  sectionId: number;
  setOpenElementDrawer?: (columnId: number) => void;
}

export default function SectionForm({ sectionId }: IProps) {
  const dispatch = useAppDispatch();

  const sectionRows = useAppSelector(selectSectionRows(sectionId));
  const sectionFields = useAppSelector(selectSectionFields(sectionId));

  const onChange = (fields: IFieldData[]) => {
    dispatch(setSectionFields({ sectionId, fields }));
  };

  return (
    <>
      <Form
        name="global_state"
        layout="vertical"
        fields={sectionFields}
        onFieldsChange={(_, inputFields) => {
          onChange(inputFields as IFieldData[]);
        }}
      >
        {sectionRows?.map((row) => (
          <Container key={row.id}>
            <RowContainer key={row.id}>
              {(row.title || row.details) && (
                <Row gutter={GUTTER.lg}>
                  <Col span={24}>
                    <div
                      style={{
                        paddingBottom: "6px",
                        display: "flex",
                        textAlign: "left",
                      }}
                    >
                      <div
                        style={{
                          flex: "0 0 auto",
                          borderLeft: `2px solid ${blue.primary}`,
                          paddingLeft: 10,
                        }}
                      >
                        <Title level={5} style={{ margin: 0 }}>
                          {row.title}
                        </Title>
                      </div>
                      <div
                        style={{
                          paddingLeft: 18,
                          flex: "1 1 auto",
                        }}
                      >
                        <Text style={{ color: grey.primary }}>
                          {row.details}
                        </Text>
                      </div>
                    </div>
                  </Col>
                </Row>
              )}
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
