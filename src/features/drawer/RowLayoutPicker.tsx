import { Card, Row, message } from "antd";
import { AlignCenterOutlined } from "@ant-design/icons";
import { blue, grey } from "@ant-design/colors";
import styled from "styled-components";

import DrawerContainer from "./DrawerContainer";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectDrawer, hideDrawer } from "./drawerSlice";
import { selectActiveSection } from "../applications/applicationsSlice";
import { CreateRow } from "../applications/services";

const SectionCard = styled(Card)`
  width: 100%;
  text-align: center;
  cursor: pointer;
  :hover {
    border: 1px solid ${blue.primary};
  }
`;

export default function RowLayoutPicker() {
  const { isOpen } = useAppSelector(selectDrawer);
  const section = useAppSelector(selectActiveSection);

  const dispatch = useAppDispatch();

  const pickRow = async (numOfCols: number) => {
    const newRow = { numOfCols, sectionId: section!.id };
    const resultAction = await dispatch(CreateRow(newRow));

    if (CreateRow.fulfilled.match(resultAction)) {
      dispatch(hideDrawer());
      message.success("Row added to section");
    } else {
      message.error(`Failed to add row`);
    }
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
    </DrawerContainer>
  );
}
