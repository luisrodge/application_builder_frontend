import { Button, Drawer, Form, Input, message } from "antd";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { ICreateInputAttributes } from "../applications/applications.interface";
import {
  selectActiveInput,
  setActiveColumn,
  setActiveInput,
  setActiveRow,
} from "../applications/applicationsSlice";
import { CreateInput } from "../applications/services";
import { hideChildDrawer, hideDrawers, selectChildDrawer } from "./drawerSlice";
import { INPUT_TYPES } from "../../shared/constants";
import FormListOptions from "./components/FormListOptions";

export default function InputOptions() {
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector(selectChildDrawer);
  const unsavedInput = useAppSelector(selectActiveInput);

  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    const newInput = { ...unsavedInput, ...values } as ICreateInputAttributes;
    const resultAction = await dispatch(CreateInput(newInput));

    dispatch(setActiveRow());
    dispatch(setActiveColumn());
    dispatch(setActiveInput());
    dispatch(hideDrawers());

    if (CreateInput.fulfilled.match(resultAction)) {
      message.success("Input added");
    } else {
      if (resultAction.payload) {
        message.error(`Failed: ${resultAction.payload.message}`);
      } else {
        message.error(`Failed: ${resultAction.error.message}`);
      }
    }
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

        {unsavedInput?.inputType === INPUT_TYPES.CHECKBOX_INPUT && (
          <FormListOptions name="checkboxOptions" />
        )}

        {unsavedInput?.inputType === INPUT_TYPES.RADIO_INPUT && (
          <FormListOptions name="radioOptions" />
        )}

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Done
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
}
