import styled from "styled-components";
import { blue } from "@ant-design/colors";

import Rows from "./Rows";

import { ISection } from "./designer.interface";

const SectionContainer = styled.div`
  text-align: center;
  padding: 30px 0;
  border: 1px solid transparent;
  border-bottom: 1px solid #f0f0f0;
  border-radius: 2px;
  cursor: pointer;
  :hover {
    border-bottom: 0;
    border: 1px dashed ${blue.primary};
  }
`;

interface ISections {
  sections: ISection[];
  setOpenElementDrawer: (columnId: number) => void;
}

const Sections = ({ sections, setOpenElementDrawer }: ISections) => {
  return (
    <>
      {sections.map((section) => (
        <SectionContainer key={section.id}>
          <Rows sectionId={section.id} />
        </SectionContainer>
      ))}
    </>
  );
};

export default Sections;
