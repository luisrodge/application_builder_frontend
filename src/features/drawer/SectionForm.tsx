import { Drawer, Form, Input, Button, message } from "antd";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { hideDrawer, selectDrawer, hideDrawers } from "./drawerSlice";
import {
  selectActiveSection,
  selectLoadingStatuses,
} from "../applications/applicationsSlice";
import { IUpdateSectionAttributes } from "../applications/applications.interface";
import { UpdateSection } from "../applications/services";

export default function SectionForm() {
  const dispatch = useAppDispatch();
  const { sectionUpdateLoading } = useAppSelector(selectLoadingStatuses);

  const { isOpen } = useAppSelector(selectDrawer);
  const section = useAppSelector(selectActiveSection)!;
  const [form] = Form.useForm();

  const onFinish = async (sectionUpdateData: IUpdateSectionAttributes) => {
    const updateData = { ...sectionUpdateData, id: section.id };

    const resultAction = await dispatch(UpdateSection(updateData));

    if (UpdateSection.fulfilled.match(resultAction)) {
      dispatch(hideDrawers());
      message.success("Section updated");
    } else {
      if (resultAction.payload) {
        message.error(`Update failed: ${resultAction.payload.message}`);
      } else {
        message.error(`Update failed: ${resultAction.error.message}`);
      }
    }
  };

  const onClose = () => {
    form.resetFields();
    dispatch(hideDrawer());
  };

  return (
    <Drawer
      title="Update section"
      width={320}
      closable={false}
      onClose={onClose}
      visible={isOpen}
    >
      <Form
        initialValues={{ title: section.title, details: section.details }}
        name="basic"
        layout="vertical"
        form={form}
        onFinish={onFinish}
      >
        <Form.Item label="Title" name="title" required>
          <Input placeholder="Section title" />
        </Form.Item>

        <Form.Item label="Details" name="details">
          <Input.TextArea placeholder="Section details" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={sectionUpdateLoading === "pending"}
          >
            {sectionUpdateLoading === "pending" ? "Updating" : "Update"}
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
}
