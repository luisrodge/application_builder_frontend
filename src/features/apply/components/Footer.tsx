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
  selectFields,
} from "../applySlice";
import { CreateSubmission } from "../services";
import { IFilledInputAttributes } from "../apply.interface";

export const FooterContainer = styled.footer`
  padding: 30px;
  text-align: right;
`;

interface IProps {
  applicationId: string;
}

export default function Footer({ applicationId }: IProps) {
  const dispatch = useAppDispatch();
  const currentStep = useAppSelector(selectCurrentStep);
  const sections = useAppSelector(selectSections);
  const fields = useAppSelector(selectFields);

  const isFinalStep = sections.length - 1 == currentStep;
  const showPrevious = currentStep > 0;

  const changeStep = (newStep: number) => {
    dispatch(setCurrentStep(newStep));
    dispatch(setActiveSection(sections[newStep]));
  };

  const submitApplication = () => {
    const sectionIds = Object.keys(fields);
    const filledInputs: IFilledInputAttributes[] = [];
    for (const sectionId of sectionIds) {
      const sectionFields = fields[sectionId];
      for (const sectionField of sectionFields) {
        const name = Array.isArray(sectionField.name)
          ? sectionField.name[0]
          : sectionField.name;
        filledInputs.push({
          value: sectionField.value,
          name,
        });
      }
    }
    dispatch(CreateSubmission({ applicationId, sectionFields: filledInputs }));
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
        <Popconfirm
          title="Are you sure？"
          okText="Yes"
          cancelText="No"
          onConfirm={submitApplication}
        >
          <Button
            type="primary"
            style={{ width: 220 }}
            icon={<CheckCircleOutlined />}
          >
            Confirm & Submit
          </Button>
        </Popconfirm>
      )}
    </FooterContainer>
  );
}
