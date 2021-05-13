import { Button, Drawer, Form, Input } from "antd";
import { v4 as uuidv4 } from "uuid";
import { useHistory } from "react-router";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { IApplication } from "../applications/applications.interface";
import { addApplication } from "../applications/applicationsSlice";

import { hideDrawer, selectDrawer } from "./drawerSlice";

const NewApplication = () => {
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector(selectDrawer);
  const history = useHistory();

  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    const newApplication = { ...values, id: uuidv4() } as IApplication;
    dispatch(addApplication(newApplication));
    dispatch(hideDrawer());
    history.push(`/applications/${newApplication.id}`);
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
