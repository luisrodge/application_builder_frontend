import { Steps, Typography } from "antd";
import { useState } from "react";
import styled from "styled-components";

import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  selectActiveApplication,
  selectSections,
  setActiveSection,
} from "../applySlice";

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
  const dispatch = useAppDispatch();
  const [current, setCurrent] = useState(0);
  const application = useAppSelector(selectActiveApplication)!;
  const sections = useAppSelector(selectSections);

  const changeSection = (current: number) => {
    setCurrent(current);
    dispatch(setActiveSection(sections[current]));
  };

  return (
    <>
      <Title level={4}>{application.title}</Title>
      <br />
      <Steps direction="vertical" current={current} onChange={changeSection}>
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
