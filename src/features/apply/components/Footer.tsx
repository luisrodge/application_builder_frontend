import { Popconfirm, Button } from "antd";
import styled from "styled-components";
import {
  CheckCircleOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";

import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  selectCurrentStep,
  selectSections,
  setCurrentStep,
  setActiveSection,
} from "../applySlice";

export const FooterContainer = styled.footer`
  padding: 30px;
  text-align: right;
`;

export default function Footer() {
  const dispatch = useAppDispatch();
  const currentStep = useAppSelector(selectCurrentStep);
  const sections = useAppSelector(selectSections);

  const isFinalStep = sections.length - 1 == currentStep;
  const showPrevious = currentStep > 0;

  const changeStep = (newStep: number) => {
    dispatch(setCurrentStep(newStep));
    dispatch(setActiveSection(sections[newStep]));
  };

  return (
    <FooterContainer>
      <Popconfirm title="Are you sure？" okText="Yes" cancelText="No">
        <Button style={{ marginRight: 15 }}>Cancel</Button>
      </Popconfirm>
      {showPrevious && (
        <Button
          style={{ marginRight: 15 }}
          icon={<ArrowLeftOutlined />}
          onClick={() => changeStep(currentStep - 1)}
        >
          Previous
        </Button>
      )}

      {!isFinalStep && (
        <Button
          type="primary"
          style={{ width: 220 }}
          onClick={() => changeStep(currentStep + 1)}
          icon={<ArrowRightOutlined />}
        >
          Next Section
        </Button>
      )}
      {isFinalStep && (
        <Button
          type="primary"
          style={{ width: 220 }}
          icon={<CheckCircleOutlined />}
        >
          Confirm & Submit
        </Button>
      )}
    </FooterContainer>
  );
}
