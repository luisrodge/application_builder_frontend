import { Button } from "antd";
import styled from "styled-components";
import { blue } from "@ant-design/colors";

import { useAppDispatch } from "../../app/hooks";
import { showDrawer } from "../drawer/drawerSlice";
import { DRAWER_TYPES } from "../../shared/constants";

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

const Header = () => {
  const dispatch = useAppDispatch();

  return (
    <HeaderContainer>
      <HeaderContent>
        <Button
          onClick={() =>
            dispatch(
              showDrawer({ drawerType: DRAWER_TYPES.SECTION_PICKER_DRAWER })
            )
          }
          style={{ marginRight: 24 }}
        >
          Add Section
        </Button>
        <Button type="text">Cancel</Button>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
