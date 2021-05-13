import { Layout, Menu } from "antd";
import { EditOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { blue } from "@ant-design/colors";
import { Link } from "react-router-dom";

import { ISection } from "../application.interface";

const { Sider } = Layout;

interface IProps {
  sections: ISection[];
}

const Sidebar = ({ sections }: IProps) => {
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

      <Menu theme="light" mode="inline" defaultSelectedKeys={["4"]}>
        {sections.map((section) => (
          <Menu.Item key={section.id}>
            <Link to={`/sections/${section.id}`}>
              <EditOutlined />
              <span>{section.title}</span>
            </Link>
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
};

export default Sidebar;
