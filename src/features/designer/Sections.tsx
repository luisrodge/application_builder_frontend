import { Tooltip } from "antd";
import styled from "styled-components";
import { blue, grey } from "@ant-design/colors";
import { CloseSquareOutlined } from "@ant-design/icons";

import Rows from "./Rows";
import { useAppDispatch } from "../../app/hooks";
import { removeSection, setActiveSection } from "./designerSlice";
import { ISection } from "./designer.interface";
import { useHistory } from "react-router";

const RemoveIcon = styled(CloseSquareOutlined)`
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  top: 0;
  text-align: center;
  color: ${grey.primary};
  display: none;
  width: 20px;
  :hover {
    color: ${blue.primary};
  }
`;

const SectionContainer = styled.div`
  position: relative;
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
  &:hover ${RemoveIcon} {
    display: inherit;
  }
`;

interface ISections {
  sections: ISection[];
  setOpenElementDrawer: (columnId: number) => void;
}

const Sections = ({ sections, setOpenElementDrawer }: ISections) => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const navigateToSection = (section: ISection) => {
    dispatch(setActiveSection(section));
    history.push(`/sections/${section.id}`);
  };

  return (
    <>
      {sections.map((section) => (
        <SectionContainer
          key={section.id}
          onClick={() => navigateToSection(section)}
        >
          <Tooltip title="Remove section">
            <RemoveIcon onClick={() => dispatch(removeSection(section))} />
          </Tooltip>
          <Rows sectionId={section.id} />
        </SectionContainer>
      ))}
    </>
  );
};

export default Sections;
