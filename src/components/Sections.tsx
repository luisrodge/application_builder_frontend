import { Row } from "antd";
import styled from "styled-components";

import Section from "./Section";
import EmptyColumn from "./EmptyColumn";

import { GUTTER } from "../utils/theme";

interface ISection {
  id: number;
  numOfCols: number;
}

interface ISections {
  sections: ISection[];
}

const Container = styled.div`
  background: #fff;
  padding: 30px 20px;
  border-radius: 2px;
  text-align: center;
`;

const Sections = ({ sections }: ISections) => {
  return (
    <>
      {sections.length > 0 && <div style={{ marginTop: 30 }}></div>}
      {sections.map((section) => (
        <Section>
          <Row gutter={GUTTER.lg}>
            {[...Array(section.numOfCols)].map((e, i) => (
              <EmptyColumn span={24 / section.numOfCols} />
            ))}
          </Row>
        </Section>
      ))}
    </>
  );
};

export default Sections;
