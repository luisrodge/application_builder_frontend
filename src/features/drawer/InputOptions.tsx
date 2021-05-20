import { Button, Drawer, Form, Input } from "antd";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { IInput } from "../applications/applications.interface";
import {
  addInput,
  selectActiveInput,
  setActiveColumn,
  setActiveInput,
  setActiveRow,
} from "../applications/applicationsSlice";

import { hideChildDrawer, hideDrawers, selectChildDrawer } from "./drawerSlice";

export default function InputOptions() {
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector(selectChildDrawer);
  const unsavedInput = useAppSelector(selectActiveInput);

  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    const newInput = { ...unsavedInput, ...values } as IInput;
    dispatch(addInput(newInput));
    dispatch(setActiveRow());
    dispatch(setActiveColumn());
    dispatch(setActiveInput());
    dispatch(hideDrawers());
  };

  const onClose = () => {
    form.resetFields();
    dispatch(setActiveInput());
    dispatch(hideChildDrawer());
  };

  return (
    <Drawer
      title="Input options"
      width={320}
      closable={false}
      onClose={onClose}
      visible={isOpen}
    >
      <Form name="basic" layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item
          label="Label"
          name="label"
          rules={[{ required: true, message: "Please enter a label" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Done
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
}
