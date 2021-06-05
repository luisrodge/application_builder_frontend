import { Popconfirm, Button } from "antd";
import styled from "styled-components";
import {
  CheckCircleOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import { useHistory } from "react-router";

import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  selectCurrentStep,
  selectSections,
  setCurrentStep,
  setActiveSection,
  setSubmissionAttributes,
} from "../applySlice";
import { DRAWER_TYPES } from "../../../shared/constants";
import { showDrawer } from "../../drawer/drawerSlice";

export const Container = styled.footer`
  padding: 30px;
  text-align: right;
`;

export default function MainActions() {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const currentStep = useAppSelector(selectCurrentStep);
  const sections = useAppSelector(selectSections);

  const isFinalStep = sections.length - 1 === currentStep;
  const showPrevious = currentStep > 0;

  const changeStep = (newStep: number) => {
    dispatch(setCurrentStep(newStep));
    dispatch(setActiveSection(sections[newStep]));
  };

  const submit = async () => {
    // Build out the submission object to POST
    dispatch(setSubmissionAttributes());

    dispatch(showDrawer({ drawerType: DRAWER_TYPES.SIGNATURE_DRAWER }));
  };

  return (
    <Container>
      <Popconfirm
        title="Are you sure？"
        okText="Yes"
        cancelText="No"
        onConfirm={() => history.push("/")}
      >
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
          onClick={submit}
        >
          Ready to submit
        </Button>
      )}
    </Container>
  );
}
