import { Card, Row, message, Form, Drawer, Input, Button } from "antd";
import { AlignCenterOutlined } from "@ant-design/icons";
import { blue, grey } from "@ant-design/colors";
import styled from "styled-components";

import DrawerContainer from "./DrawerContainer";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  selectDrawer,
  hideDrawer,
  selectChildDrawer,
  hideDrawers,
  hideChildDrawer,
  showChildDrawer,
} from "./drawerSlice";
import { selectActiveSection } from "../applications/applicationsSlice";
import { CreateRow } from "../applications/services";
import { ICreateRowAttributes } from "../applications/applications.interface";
import { useState } from "react";
import { DRAWER_TYPES } from "../../shared/constants";

const SectionCard = styled(Card)`
  width: 100%;
  text-align: center;
  cursor: pointer;
  :hover {
    border: 1px solid ${blue.primary};
  }
`;

interface IEnterRowInfoProps {
  unsavedRow: ICreateRowAttributes;
}

function EnterRowInfo({ unsavedRow }: IEnterRowInfoProps) {
  const { isOpen } = useAppSelector(selectChildDrawer);
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    const newRow = {
      ...unsavedRow,
      ...values,
    } as ICreateRowAttributes;

    const resultAction = await dispatch(CreateRow(newRow));

    if (CreateRow.fulfilled.match(resultAction)) {
      dispatch(hideDrawers());
      message.success("Row added to section");
    } else {
      message.error(`Failed to add row`);
    }
  };

  const onClose = () => {
    form.resetFields();
    dispatch(hideChildDrawer());
  };

  return (
    <Drawer
      title="Enter row details"
      width={320}
      closable={false}
      onClose={onClose}
      visible={isOpen}
    >
      <Form name="basic" layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item label="Row title" name="title">
          <Input placeholder="title" />
        </Form.Item>

        <Form.Item label="Row details" name="details">
          <Input.TextArea placeholder="details" rows={4} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Done
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
}

export default function RowLayoutPicker() {
  const { isOpen } = useAppSelector(selectDrawer);
  const section = useAppSelector(selectActiveSection);
  const [unsavedRow, setUnsavedRow] = useState<ICreateRowAttributes>();

  const dispatch = useAppDispatch();

  const pickRow = async (numOfCols: number) => {
    setUnsavedRow({
      title: "",
      details: "",
      numOfCols,
      sectionId: section!.id,
    });

    dispatch(
      showChildDrawer({ drawerType: DRAWER_TYPES.ENTER_SECTION_INFO_DRAWER })
    );
  };

  return (
    <DrawerContainer
      width={400}
      isOpen={isOpen}
      title="Select row layout"
      closeDrawer={() => dispatch(hideDrawer())}
    >
      <Row>
        <SectionCard onClick={() => pickRow(1)}>
          <AlignCenterOutlined style={{ fontSize: 60, color: grey.primary }} />
        </SectionCard>
      </Row>
      <br />
      <Row>
        <SectionCard onClick={() => pickRow(2)}>
          <AlignCenterOutlined
            style={{ fontSize: 60, marginRight: 8, color: grey.primary }}
          />
          <AlignCenterOutlined
            style={{ fontSize: 60, marginLeft: 8, color: grey.primary }}
          />
        </SectionCard>
      </Row>
      <br />
      <Row>
        <SectionCard onClick={() => pickRow(3)}>
          <AlignCenterOutlined
            style={{ fontSize: 60, color: grey.primary }}
            color={blue.primary}
          />
          <AlignCenterOutlined
            style={{
              fontSize: 60,
              marginRight: 16,
              marginLeft: 16,
              color: grey.primary,
            }}
          />
          <AlignCenterOutlined style={{ fontSize: 60, color: grey.primary }} />
        </SectionCard>
      </Row>
      <br />
      <Row>
        <SectionCard onClick={() => pickRow(4)}>
          <AlignCenterOutlined
            style={{ fontSize: 60, color: grey.primary, marginRight: 16 }}
            color={blue.primary}
          />
          <AlignCenterOutlined
            style={{
              fontSize: 60,
              color: grey.primary,
              marginRight: 16,
            }}
          />
          <AlignCenterOutlined
            style={{ fontSize: 60, color: grey.primary, marginRight: 16 }}
          />
          <AlignCenterOutlined style={{ fontSize: 60, color: grey.primary }} />
        </SectionCard>
      </Row>
      <EnterRowInfo unsavedRow={unsavedRow!} />
    </DrawerContainer>
  );
}
