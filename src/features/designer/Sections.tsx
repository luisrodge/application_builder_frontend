import Section from "../../components/Section";
import Rows from "./Rows";

import { ISection } from "./designer.interface";

interface ISections {
  sections: ISection[];
  setOpenElementDrawer: (columnId: number) => void;
}

const Sections = ({ sections, setOpenElementDrawer }: ISections) => {
  return (
    <>
      {sections.map((section) => (
        <Section key={section.id}>
          <Rows sectionId={section.id} />
        </Section>
      ))}
    </>
  );
};

export default Sections;
