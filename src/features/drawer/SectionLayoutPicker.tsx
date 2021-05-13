import { useState } from "react";
import { Card, Row, Drawer, Form, Input, Button } from "antd";
import { AlignCenterOutlined } from "@ant-design/icons";
import { blue, grey } from "@ant-design/colors";
import styled, { css } from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { useHistory } from "react-router-dom";

import DrawerContainer from "./DrawerContainer";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  hideDrawer,
  showChildDrawer,
  selectDrawer,
  hideChildDrawer,
  selectChildDrawer,
  hideDrawers,
} from "./drawerSlice";
import {
  addSection,
  selectActiveApplication,
} from "../applications/applicationsSlice";
import { DRAWER_TYPES } from "../../shared/constants";
import { IApplication, ISection } from "../applications/applications.interface";

const COLS_PER_ROW = { ONE: 1, TWO: 2, THREE: 3 };

interface ISectionCardProps {
  $active: boolean;
}

const SectionCard = styled(Card)<ISectionCardProps>`
  width: 100%;
  text-align: center;
  cursor: pointer;
  :hover {
    border: 1px solid ${blue.primary};
  }
  ${(props) =>
    props.$active &&
    css`
      border: 1px solid ${blue.primary};
    `}
`;

interface IEnterSectionInfoProps {
  unsavedSection: ISection;
}

export const EnterSectionInfo = ({
  unsavedSection,
}: IEnterSectionInfoProps) => {
  const { isOpen } = useAppSelector(selectChildDrawer);
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    const newSection = { ...unsavedSection, ...values } as ISection;
    dispatch(addSection(newSection));
    dispatch(hideDrawers());
    history.push(
      `/applications/${newSection.applicationId}/sections/${newSection.id}`
    );
  };

  const onClose = () => {
    form.resetFields();
    dispatch(hideChildDrawer());
  };

  return (
    <Drawer
      title="Enter section details"
      width={320}
      closable={false}
      onClose={onClose}
      visible={isOpen}
    >
      <Form name="basic" layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item label="Section title" name="title">
          <Input placeholder="Section title" />
        </Form.Item>

        <Form.Item label="Section details" name="details">
          <Input.TextArea placeholder="Section details" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Done
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

const SectionLayoutPicker = () => {
  const { isOpen } = useAppSelector(selectDrawer);
  const activeApplication = useAppSelector(selectActiveApplication);
  const dispatch = useAppDispatch();
  const [unsavedSection, setUnsavedSection] = useState<ISection>();

  const pickSection = (sectionId: string, numOfCols: number) => {
    setUnsavedSection({
      id: sectionId,
      numOfCols,
      applicationId: activeApplication!.id,
    });
    dispatch(
      showChildDrawer({ drawerType: DRAWER_TYPES.ENTER_SECTION_INFO_DRAWER })
    );
  };

  return (
    <DrawerContainer
      width={400}
      isOpen={isOpen}
      title="Select section layout"
      closeDrawer={() => dispatch(hideDrawer())}
    >
      <Row>
        <SectionCard
          onClick={() => pickSection(uuidv4(), COLS_PER_ROW.ONE)}
          $active={
            unsavedSection! && unsavedSection.numOfCols == COLS_PER_ROW.ONE
          }
        >
          <AlignCenterOutlined style={{ fontSize: 80, color: grey.primary }} />
        </SectionCard>
      </Row>
      <br />
      <Row>
        <SectionCard
          onClick={() => pickSection(uuidv4(), COLS_PER_ROW.TWO)}
          $active={
            unsavedSection! && unsavedSection.numOfCols == COLS_PER_ROW.TWO
          }
        >
          <AlignCenterOutlined
            style={{ fontSize: 80, marginRight: 8, color: grey.primary }}
          />
          <AlignCenterOutlined
            style={{ fontSize: 80, marginLeft: 8, color: grey.primary }}
          />
        </SectionCard>
      </Row>
      <br />
      <Row>
        <SectionCard
          onClick={() => pickSection(uuidv4(), COLS_PER_ROW.THREE)}
          $active={
            unsavedSection! && unsavedSection.numOfCols == COLS_PER_ROW.THREE
          }
        >
          <AlignCenterOutlined
            style={{ fontSize: 80, color: grey.primary }}
            color={blue.primary}
          />
          <AlignCenterOutlined
            style={{
              fontSize: 80,
              marginRight: 16,
              marginLeft: 16,
              color: grey.primary,
            }}
          />
          <AlignCenterOutlined style={{ fontSize: 80, color: grey.primary }} />
        </SectionCard>
      </Row>
      <EnterSectionInfo unsavedSection={unsavedSection!} />
    </DrawerContainer>
  );
};

export default SectionLayoutPicker;
