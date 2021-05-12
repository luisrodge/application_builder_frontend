import { Layout, Menu, Button } from "antd";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { blue, grey } from "@ant-design/colors";

import { ISection } from "../designer.interface";
import { useAppDispatch } from "../../../app/hooks";
import { showDrawer } from "../../drawer/drawerSlice";
import { DRAWER_TYPES } from "../../../shared/constants";
import { Link } from "react-router-dom";

const { Sider } = Layout;

interface IProps {
  sections: ISection[];
}

const Sidebar = ({ sections }: IProps) => {
  const dispatch = useAppDispatch();
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
      <div className="logo">Sections</div>

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
