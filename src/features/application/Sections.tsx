import { Button, Tooltip, Typography } from "antd";
import styled from "styled-components";
import { blue } from "@ant-design/colors";
import { CloseSquareOutlined, PlusOutlined } from "@ant-design/icons";

import Rows from "./Rows";
import { useAppDispatch } from "../../app/hooks";
import { removeSection, setActiveSection } from "./applicationSlice";
import { ISection } from "./application.interface";
import { useHistory } from "react-router";
import { showDrawer } from "../drawer/drawerSlice";
import { DRAWER_TYPES } from "../../shared/constants";

const { Title } = Typography;

const RemoveIcon = styled(CloseSquareOutlined)`
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  background: ${blue.primary};
  padding: 6px;
  left: 50%;
  top: 0;
  text-align: center;
  color: #fff;
  display: none;
  :hover {
    color: ${blue.primary};
  }
`;

const SectionContainer = styled.div`
  background: #fff;
  position: relative;
  padding: 30px 20px;
  border: 1px solid transparent;
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
  disabled: boolean;
}

const Sections = ({ sections, disabled }: ISections) => {
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
          style={{ marginBottom: 20 }}
        >
          <Tooltip title="Remove section">
            <RemoveIcon onClick={() => dispatch(removeSection(section))} />
          </Tooltip>
          <Title level={4}>{section.title}</Title>
          <div style={{ textAlign: "center" }}>
            <Rows sectionId={section.id} disabled={disabled} />
          </div>
        </SectionContainer>
      ))}
      <div style={{ textAlign: "center", marginTop: 50 }}>
        <Button
          onClick={() =>
            dispatch(
              showDrawer({
                drawerType: DRAWER_TYPES.SECTION_LAYOUT_PICKER_DRAWER,
              })
            )
          }
          icon={<PlusOutlined />}
        >
          Add Section
        </Button>
      </div>
    </>
  );
};

export default Sections;
