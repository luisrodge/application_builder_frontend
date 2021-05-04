import { ReactNode } from "react";
import styled from "styled-components";

interface IProps {
  children: ReactNode;
}

const SectionContainer = styled.div`
  background: #fff;
  padding: 30px 20px;
  border-radius: 2px;
  text-align: center;
`;

const Section = ({ children, ...props }: IProps) => (
  <SectionContainer>{children}</SectionContainer>
);

export default Section;
