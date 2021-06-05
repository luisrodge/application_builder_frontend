import { Button, Popconfirm } from "antd";
import styled from "styled-components";
import { blue } from "@ant-design/colors";
import {
  CheckOutlined,
  PlusOutlined,
  DeleteOutlined,
  ArrowLeftOutlined,
  EditOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

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
  addBtnTitle?: string;
  mainTitle: string;
  secondaryTitle?: string;
  backUrl: string;
  onAdd?: React.MouseEventHandler<HTMLElement> | undefined;
  onDone?: React.MouseEventHandler<HTMLElement> | undefined;
  onEdit?: React.MouseEventHandler<HTMLElement> | undefined;
  onSave?: React.MouseEventHandler<HTMLElement> | undefined;
  onDelete?: (e?: React.MouseEvent<HTMLElement>) => void;
}

export default function Header({
  addBtnTitle,
  mainTitle,
  backUrl,
  onSave,
  onAdd,
  onDone,
  onEdit,
  onDelete,
}: IProps) {
  return (
    <HeaderContainer>
      <HeaderContent>
        <BackContainer>
          <Link to={backUrl} style={{ color: "#FFF" }}>
            <ArrowLeftOutlined /> {mainTitle}
          </Link>
        </BackContainer>
        <HeaderActionsContainer>
          {onSave && (
            <Button
              onClick={onSave}
              style={{ marginRight: 20 }}
              icon={<SaveOutlined />}
            >
              Save
            </Button>
          )}
          {onAdd && (
            <Button
              onClick={onAdd}
              style={{ marginRight: 20 }}
              icon={<PlusOutlined />}
            >
              {addBtnTitle}
            </Button>
          )}
          {onDone && (
            <Button
              type="text"
              style={{ color: "#fff" }}
              icon={<CheckOutlined />}
              onClick={onDone}
            >
              Done
            </Button>
          )}

          {onEdit && (
            <Button
              type="text"
              icon={<EditOutlined />}
              style={{ color: "#fff" }}
              onClick={onEdit}
            >
              Edit
            </Button>
          )}

          {onDelete && (
            <Popconfirm
              title="Are you sure？"
              okText="Yes"
              cancelText="No"
              onConfirm={onDelete}
            >
              <Button
                type="text"
                icon={<DeleteOutlined />}
                style={{ color: "#fff" }}
              >
                Remove
              </Button>
            </Popconfirm>
          )}
        </HeaderActionsContainer>
      </HeaderContent>
    </HeaderContainer>
  );
}
