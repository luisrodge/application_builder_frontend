import { Button, Drawer, Form, Input, message } from "antd";
import { useHistory } from "react-router";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { ICreateApplicationAttributes } from "../applications/applications.interface";

import { hideDrawer, selectDrawer } from "./drawerSlice";
import { CreateApplication } from "../applications/services";
import { selectLoadingStatuses } from "../applications/applicationsSlice";

export default function NewApplication() {
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector(selectDrawer);
  const { applicationLoading } = useAppSelector(selectLoadingStatuses);
  const history = useHistory();

  const [form] = Form.useForm();

  const loading = applicationLoading === "pending";

  const onFinish = async (application: ICreateApplicationAttributes) => {
    const resultAction = await dispatch(CreateApplication(application));
    if (CreateApplication.fulfilled.match(resultAction)) {
      const createdApplication = resultAction.payload;
      dispatch(hideDrawer());
      message.success("Application created");
      history.push(`/applications/${createdApplication.slug}`);
    } else {
      if (resultAction.payload) {
        message.error(`Create failed: ${resultAction.payload.message}`);
      } else {
        message.error(`Create failed: ${resultAction.error.message}`);
      }
    }
  };

  const onClose = () => {
    form.resetFields();
    dispatch(hideDrawer());
  };

  return (
    <Drawer
      title="New application"
      width={320}
      closable={false}
      onClose={onClose}
      visible={isOpen}
    >
      <Form name="basic" layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Title is required" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          tooltip="The email address submissions will be sent to."
          rules={[
            {
              required: true,
              message: "Email is required",
            },
            {
              message: "Must be a valid email address",
              type: "email",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Details" name="details">
          <Input.TextArea />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            {loading ? "Creating" : "Create"}
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
}
