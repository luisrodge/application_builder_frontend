import { Button } from "antd";
import styled from "styled-components";
import { blue } from "@ant-design/colors";
import { CheckOutlined, PlusOutlined } from "@ant-design/icons";

import { useAppDispatch } from "../../app/hooks";
import { showDrawer } from "../drawer/drawerSlice";
import { DRAWER_TYPES } from "../../shared/constants";
import { useHistory } from "react-router";

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: flex-end;
  background: ${blue.primary};
  padding: 18px 20px;
`;

interface IProps {
  drawerType: string;
  btnTitle: string;
}

const Header = ({ drawerType, btnTitle }: IProps) => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  return (
    <HeaderContainer>
      <HeaderContent>
        <Button
          onClick={() => dispatch(showDrawer({ drawerType }))}
          style={{ marginRight: 24 }}
          icon={<PlusOutlined />}
        >
          {btnTitle}
        </Button>
        {drawerType == DRAWER_TYPES.ROW_LAYOUT_PICKER_DRAWER && (
          <Button
            icon={<CheckOutlined />}
            style={{ marginRight: 24 }}
            onClick={() => history.push("/")}
          >
            Done
          </Button>
        )}

        <Button type="text" onClick={() => history.push("/")}>
          Cancel
        </Button>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
