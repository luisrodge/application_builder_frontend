import { Layout, Menu } from "antd";
import { EditOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { blue } from "@ant-design/colors";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { ISection } from "../applications.interface";

const { Sider } = Layout;

const MenuLink = styled(Link)`
  color: #fff !important;
  &:hover {
    color: #dadada !important;
  }
`;

interface IProps {
  sections: ISection[];
}

export default function OverviewSidebar({ sections }: IProps) {
  return (
    <Sider
      theme="light"
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        right: 0,
        background: blue.primary,
      }}
    >
      <div className="logo">
        <UnorderedListOutlined style={{ marginRight: 6 }} />
        Sections
      </div>

      <Menu
        mode="inline"
        defaultSelectedKeys={["4"]}
        style={{
          background: blue[4],
        }}
      >
        {sections.map((section) => (
          <Menu.Item key={section.id}>
            <MenuLink
              to={`/applications/${section.applicationSlug}/sections/${section.id}`}
            >
              <EditOutlined />
              <span>{section.title}</span>
            </MenuLink>
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
}
