import { Button, Drawer, Form, Input } from "antd";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { IElement } from "../designer/designer.interface";
import {
  addElement,
  resetActive,
  selectActiveElement,
  setActiveElement,
} from "../designer/designerSlice";

import { hideChildDrawer, hideDrawers, selectChildDrawer } from "./drawerSlice";

const ElementOptions = () => {
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector(selectChildDrawer);
  const unsavedElement = useAppSelector(selectActiveElement);

  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    const newElement = { ...unsavedElement, ...values } as IElement;
    dispatch(addElement(newElement));
    dispatch(resetActive());
    dispatch(hideDrawers());
  };

  const onClose = () => {
    form.resetFields();
    dispatch(setActiveElement());
    dispatch(hideChildDrawer());
  };

  return (
    <Drawer
      title="Element options"
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
};

export default ElementOptions;
