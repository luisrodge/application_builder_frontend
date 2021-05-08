import { Tooltip, Button } from "antd";
import styled from "styled-components";
import { blue, grey } from "@ant-design/colors";
import { CloseSquareOutlined } from "@ant-design/icons";

import Rows from "./Rows";
import { useAppDispatch } from "../../app/hooks";
import { removeSection, setActiveSection } from "./designerSlice";
import { ISection } from "./designer.interface";
import { showDrawer } from "../drawer/drawerSlice";
import { DRAWER_TYPES } from "../../shared/constants";

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

  const addSectionRow = (section: ISection) => {
    dispatch(setActiveSection(section));
    dispatch(showDrawer({ drawerType: DRAWER_TYPES.ROW_PICKER_DRAWER }));
  };

  return (
    <>
      {sections.map((section) => (
        <SectionContainer key={section.id}>
          <Tooltip title="Remove section">
            <RemoveIcon onClick={() => dispatch(removeSection(section))} />
          </Tooltip>
          <Rows sectionId={section.id} />
          <Button
            size="small"
            style={{ marginTop: 8 }}
            onClick={() => addSectionRow(section)}
          >
            Add Row
          </Button>
        </SectionContainer>
      ))}
    </>
  );
};

export default Sections;
