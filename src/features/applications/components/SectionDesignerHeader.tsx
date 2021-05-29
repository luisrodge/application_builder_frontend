import { Button, message, Popconfirm } from "antd";
import styled from "styled-components";
import { blue } from "@ant-design/colors";
import {
  CheckOutlined,
  PlusOutlined,
  DeleteOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { showDrawer } from "../../drawer/drawerSlice";
import { DRAWER_TYPES } from "../../../shared/constants";
import { DeleteSection } from "../services";
import {
  selectActiveApplication,
  selectActiveSection,
} from "../applicationsSlice";

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
`;

const HeaderContent = styled.div`
  display: flex;
  background: ${blue.primary};
  padding: 18px 20px;
`;

const HeaderActionsContainer = styled.div`
  justify-content: flex-end;
  background: ${blue.primary};
`;

const BackContainer = styled.div`
  flex: 1;
  padding-top: 4px;
`;

interface IProps {
  drawerType: string;
  btnTitle: string;
  applicationSlug: string | undefined;
}

export default function SectionDesignerHeader({
  drawerType,
  btnTitle,
  applicationSlug,
}: IProps) {
  const section = useAppSelector(selectActiveSection);
  const application = useAppSelector(selectActiveApplication);
  const dispatch = useAppDispatch();
  const history = useHistory();

  const onDeleteSection = async () => {
    const resultAction = await dispatch(DeleteSection(section!.id));

    if (DeleteSection.fulfilled.match(resultAction)) {
      message.success("Section removed");
      history.push(`/applications/${applicationSlug}`);
    } else {
      message.error("Failed to delete");
    }
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <BackContainer>
          <Link
            to={`/applications/${section?.applicationSlug}`}
            style={{ color: "#FFF" }}
          >
            <ArrowLeftOutlined /> {application?.title}
          </Link>
        </BackContainer>
        <HeaderActionsContainer>
          <Button
            onClick={() => dispatch(showDrawer({ drawerType }))}
            style={{ marginRight: 24 }}
            icon={<PlusOutlined />}
          >
            {btnTitle}
          </Button>
          {drawerType === DRAWER_TYPES.ROW_LAYOUT_PICKER_DRAWER && (
            <Button
              icon={<CheckOutlined />}
              style={{ marginRight: 24 }}
              onClick={() => history.push(`/applications/${applicationSlug}`)}
            >
              Done
            </Button>
          )}

          <Popconfirm
            title="Are you sure？"
            okText="Yes"
            cancelText="No"
            onConfirm={onDeleteSection}
          >
            <Button type="text" icon={<DeleteOutlined />}>
              Remove
            </Button>
          </Popconfirm>

          <Button
            type="text"
            onClick={() => history.push(`/applications/${applicationSlug}`)}
          >
            Cancel
          </Button>
        </HeaderActionsContainer>
      </HeaderContent>
    </HeaderContainer>
  );
}
