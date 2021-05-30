import { Button, Layout, Modal, message } from "antd";
import {
  PlusOutlined,
  EyeOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { blue } from "@ant-design/colors";

import { DRAWER_TYPES } from "../../../shared/constants";
import { showDrawer } from "../../drawer/drawerSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectActiveApplication } from "../applicationsSlice";
import { Publish } from "../services";
import { useHistory } from "react-router";

const { Header } = Layout;
const { confirm } = Modal;

export default function OverviewHeader() {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const application = useAppSelector(selectActiveApplication);

  const publishApplication = async () => {
    const resultAction = await dispatch(Publish(application!.slug));
    if (Publish.fulfilled.match(resultAction)) {
      message.success("Your application is now live");
      history.push(`/${application?.slug}/published`, {
        link: application?.slug,
        shortLink: application?.shortUrl,
      });
    } else {
      if (resultAction.payload) {
        message.error(`Publish failed: ${resultAction.payload.message}`);
      } else {
        message.error(`Publish failed: ${resultAction.error.message}`);
      }
    }
  };

  const showConfirm = () => {
    confirm({
      title: "Publish application?",
      icon: <ExclamationCircleOutlined />,
      content:
        "You'll be unable to further update your application after it is published.",
      onOk() {
        publishApplication();
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  return (
    <Header
      className="site-layout-background"
      style={{
        marginBottom: 100,
        background: blue.primary,
      }}
    >
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          <span style={{ color: "#fff", marginRight: 20 }}>
            {application?.title}
          </span>
        </div>
        <div>
          <Button
            icon={<PlusOutlined />}
            onClick={() =>
              dispatch(
                showDrawer({
                  drawerType: DRAWER_TYPES.SECTION_LAYOUT_PICKER_DRAWER,
                })
              )
            }
          >
            Add Section
          </Button>
          <Button
            icon={<EyeOutlined />}
            style={{ marginLeft: 20, background: blue[4] }}
            type="primary"
            onClick={showConfirm}
          >
            Publish
          </Button>
        </div>
      </div>
    </Header>
  );
}
