import { Steps, Typography } from "antd";
import { useState } from "react";
import styled from "styled-components";

import { useAppSelector } from "../../../app/hooks";
import { selectActiveApplication, selectSections } from "../applySlice";

const { Step } = Steps;
const { Title } = Typography;

export const ApplyContainer = styled.div`
  padding: 30px;
  display: flex;
`;

export const StepNavigation = styled.div`
  padding-right: 50px;
`;

export const SectionContainer = styled.div`
  background: #f7f7f7;
  flex: 1;
`;

export default function StepsNavigation() {
  const [current, setCurrent] = useState(0);
  const application = useAppSelector(selectActiveApplication);
  const sections = useAppSelector(selectSections);

  return (
    <>
      <Title level={4}>{application.title}</Title>
      <br />
      <Steps
        direction="vertical"
        current={current}
        onChange={(current) => setCurrent(current)}
      >
        {sections.map((section) => (
          <Step
            title={section.title}
            description={section.details}
            key={section.id}
          />
        ))}
      </Steps>
    </>
  );
}
