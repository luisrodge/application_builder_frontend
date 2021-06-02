import { Row, Button, message, Typography, Col } from "antd";
import styled, { css } from "styled-components";
import {
  CloseSquareOutlined,
  PlusOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { blue, grey } from "@ant-design/colors";

import Columns from "./ColumnList";
import { GUTTER } from "../../../shared/theme";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import {
  selectActiveRow,
  selectSectionRows,
  setActiveRow,
} from "../applicationsSlice";
import { CreateColumn, DeleteRow } from "../services";
import { ICreateColumnAttributes, IRow } from "../applications.interface";
import { showDrawer } from "../../drawer/drawerSlice";
import { DRAWER_TYPES } from "../../../shared/constants";

const { Title, Text } = Typography;

const RowActionsContainer = styled.div`
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  top: -22px;
  text-align: center;
  background: ${blue.primary};
  cursor: pointer;
  display: none;
  width: 120px;
`;

const IconContainer = styled.div`
  text-align: center;
  cursor: pointer;
  flex: 1;
`;

const AddColumnBtnContainer = styled.div`
  position: absolute;
  display: none;
  bottom: 0;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
`;

interface IRowContainerProps {
  $active: boolean;
}

const RowContainer = styled.div<IRowContainerProps>`
  padding: 20px 0;
  border: 1px solid transparent;
  ${(props) =>
    props.$active &&
    css`
      border: 1px solid ${blue.primary};
    `}
`;

const Container = styled.div`
  position: relative;
  &:hover ${RowActionsContainer} {
    display: flex;
  }
  &:hover ${RowContainer} {
    border: 1px solid ${blue.primary};
  }
  &:hover ${AddColumnBtnContainer} {
    display: inherit;
  }
`;

interface IProps {
  sectionId: number;
  disabled?: boolean;
  setOpenElementDrawer?: (columnId: number) => void;
}

export default function RowList({ sectionId, disabled }: IProps) {
  const sectionRows = useAppSelector(selectSectionRows(sectionId));
  const activeRow = useAppSelector(selectActiveRow);
  const dispatch = useAppDispatch();

  const addColumnToRow = async (column: ICreateColumnAttributes) => {
    const resultAction = await dispatch(CreateColumn(column));
    if (!CreateColumn.fulfilled.match(resultAction)) {
      if (resultAction.payload) {
        message.error(`Failed: ${resultAction.payload.message}`);
      } else {
        message.error(`Failed: ${resultAction.error.message}`);
      }
    }
  };

  const editRow = (row: IRow) => {
    dispatch(setActiveRow(row));
    dispatch(showDrawer({ drawerType: DRAWER_TYPES.ROW_FORM_DRAWER }));
  };

  return (
    <>
      {sectionRows?.map((row) => (
        <div key={row.id}>
          <Container>
            <RowActionsContainer>
              <IconContainer
                onClick={() => dispatch(DeleteRow(row.id))}
                style={{ borderRight: `1px solid ${blue[3]}` }}
              >
                {!disabled && <CloseSquareOutlined style={{ color: "#fff" }} />}
              </IconContainer>
              <IconContainer onClick={() => editRow(row)}>
                {!disabled && <EditOutlined style={{ color: "#fff" }} />}
              </IconContainer>
            </RowActionsContainer>
            <RowContainer
              key={row.id}
              $active={activeRow !== undefined && activeRow.id === row.id}
            >
              {(row.title || row.details) && (
                <Row gutter={GUTTER.lg}>
                  <Col span={24}>
                    <div
                      style={{
                        padding: "8px 0",
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
                <Columns row={row} sectionId={sectionId} disabled={disabled} />
              </Row>
              {!disabled && (
                <AddColumnBtnContainer>
                  <Button
                    type="primary"
                    size="small"
                    onClick={() => addColumnToRow({ sectionId, rowId: row.id })}
                    icon={<PlusOutlined />}
                    style={{ borderRadius: 0 }}
                  >
                    Add column
                  </Button>
                </AddColumnBtnContainer>
              )}
            </RowContainer>
          </Container>
        </div>
      ))}
    </>
  );
}
