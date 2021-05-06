import { ReactNode } from "react";
import styled from "styled-components";

interface IProps {
  children: ReactNode;
}

const SectionContainer = styled.div`
  text-align: center;
  padding: 30px 0;
  border-bottom: 1px solid #f7f7f7;
  &:first-child {
    font-weight: bold;
  }
`;

const Section = ({ children, ...props }: IProps) => (
  <SectionContainer>{children}</SectionContainer>
);

export default Section;
