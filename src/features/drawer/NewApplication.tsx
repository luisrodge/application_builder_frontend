import { Button, Drawer, Form, Input, message } from "antd";
import { useHistory } from "react-router";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { IApplicationAttributes } from "../applications/applications.interface";

import { hideDrawer, selectDrawer } from "./drawerSlice";
import { CreateApplication } from "../applications/services";

const NewApplication = () => {
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector(selectDrawer);
  const history = useHistory();

  const [form] = Form.useForm();

  const onFinish = async (application: IApplicationAttributes) => {
    const resultAction = await dispatch(CreateApplication(application));
    if (CreateApplication.fulfilled.match(resultAction)) {
      const createdApplication = resultAction.payload;
      dispatch(hideDrawer());
      message.success("Application created");
      history.push(`/applications/${createdApplication.id}`);
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
          rules={[{ required: true, message: "Please enter a title" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Application details" name="details">
          <Input.TextArea />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default NewApplication;
