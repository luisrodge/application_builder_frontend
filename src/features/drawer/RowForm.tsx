import { Drawer, Form, Input, Button, message } from "antd";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectDrawer, hideDrawers } from "./drawerSlice";
import {
  selectActiveRow,
  selectLoadingStatuses,
  setActiveRow,
} from "../applications/applicationsSlice";
import { IUpdateRowAttributes } from "../applications/applications.interface";
import { UpdateRow } from "../applications/services";

export default function RowForm() {
  const dispatch = useAppDispatch();
  const { rowUpdateLoading } = useAppSelector(selectLoadingStatuses);

  const { isOpen } = useAppSelector(selectDrawer);
  const row = useAppSelector(selectActiveRow)!;
  const [form] = Form.useForm();

  const onFinish = async (sectionUpdateData: IUpdateRowAttributes) => {
    const updateData = { ...sectionUpdateData, id: row.id };

    const resultAction = await dispatch(UpdateRow(updateData));

    if (UpdateRow.fulfilled.match(resultAction)) {
      dispatch(hideDrawers());
      dispatch(setActiveRow());
      message.success("Row updated");
    } else {
      dispatch(hideDrawers());
      dispatch(setActiveRow());
      if (resultAction.payload) {
        message.error(`Update failed: ${resultAction.payload.message}`);
      } else {
        message.error(`Update failed: ${resultAction.error.message}`);
      }
    }
  };

  const onClose = () => {
    form.resetFields();
    dispatch(hideDrawers());
    dispatch(setActiveRow());
  };

  return (
    <Drawer
      title="Edit row"
      width={320}
      closable={false}
      onClose={onClose}
      visible={isOpen}
    >
      <Form
        initialValues={{ title: row.title, details: row.details }}
        name="basic"
        layout="vertical"
        form={form}
        onFinish={onFinish}
      >
        <Form.Item label="Title" name="title">
          <Input placeholder="Row title" />
        </Form.Item>

        <Form.Item label="Details" name="details">
          <Input.TextArea placeholder="Row details" rows={4} />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={rowUpdateLoading === "pending"}
          >
            {rowUpdateLoading === "pending" ? "Updating" : "Update"}
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
}
