import { Button, Popconfirm, Typography } from "antd";
import styled from "styled-components";
import { blue } from "@ant-design/colors";
import { CloseSquareOutlined, PlusOutlined } from "@ant-design/icons";
import { useHistory } from "react-router";

import RowList from "./RowList";
import { useAppDispatch } from "../../../app/hooks";
import { ISection } from "../applications.interface";
import { showDrawer } from "../../drawer/drawerSlice";
import { DRAWER_TYPES } from "../../../shared/constants";
import { DeleteSection } from "../services";

const { Title } = Typography;

const RemoveIconContainer = styled.div`
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  top: -22px;
  width: 50px;
  text-align: center;
  background: ${blue.primary};
  cursor: pointer;
  display: none;
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
`;

const ParentContainer = styled.div`
  position: relative;
  &:hover ${RemoveIconContainer} {
    display: inherit;
  }
  &:hover ${SectionContainer} {
    border: 1px solid ${blue.primary};
  }
`;

interface ISections {
  sections: ISection[];
  disabled: boolean;
}

export default function SectionList({ sections, disabled }: ISections) {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const navigateToSection = (section: ISection) => {
    history.push(
      `/applications/${section.applicationId}/sections/${section.id}`
    );
  };

  return (
    <>
      {sections.map((section) => (
        <ParentContainer key={section.id}>
          <Popconfirm
            title="Are you sure？"
            okText="Yes"
            cancelText="No"
            onConfirm={() => dispatch(DeleteSection(section.id))}
          >
            <RemoveIconContainer>
              <CloseSquareOutlined style={{ color: "#fff" }} />
            </RemoveIconContainer>
          </Popconfirm>

          <SectionContainer
            key={section.id}
            onClick={() => navigateToSection(section)}
            style={{ marginBottom: 20 }}
          >
            <Title level={4}>{section.title}</Title>
            <div style={{ textAlign: "center" }}>
              <RowList sectionId={section.id} disabled={disabled} />
            </div>
          </SectionContainer>
        </ParentContainer>
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
}
