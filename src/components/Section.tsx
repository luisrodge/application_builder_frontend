import { ReactNode } from "react";
import styled from "styled-components";
import { blue } from "@ant-design/colors";

interface IProps {
  children: ReactNode;
}

const SectionContainer = styled.div`
  text-align: center;
  padding: 30px 0;
  border: 1px solid transparent;
  border-bottom: 1px solid #f0f0f0;
  border-radius: 2px;
  cursor: pointer;
  :hover {
    border-bottom: 0;
    border: 1px dashed #f0f0f0;
  }
`;

const Section = ({ children, ...props }: IProps) => (
  <SectionContainer>{children}</SectionContainer>
);

export default Section;
