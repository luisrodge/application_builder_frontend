import { Drawer, Form, Input, Button, message } from "antd";
import { useHistory } from "react-router";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectDrawer, hideDrawers } from "./drawerSlice";
import {
  selectActiveApplication,
  selectActiveSection,
  selectLoadingStatuses,
} from "../applications/applicationsSlice";
import {
  ICreateSectionAttributes,
  IUpdateSectionAttributes,
} from "../applications/applications.interface";
import { CreateSection, UpdateSection } from "../applications/services";

export default function SectionForm() {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  const { sectionUpdateLoading, sectionCreateLoading } = useAppSelector(
    selectLoadingStatuses
  );
  const { isOpen } = useAppSelector(selectDrawer);
  const activeApplication = useAppSelector(selectActiveApplication)!;
  const activeSection = useAppSelector(selectActiveSection);

  const initialValues = {
    id: activeSection?.id,
    title: activeSection?.title,
    details: activeSection?.details,
    applicationId: activeApplication.id,
  };

  const create = async (section: ICreateSectionAttributes) => {
    const data = { ...section, applicationId: activeApplication.id };
    const resultAction = await dispatch(CreateSection(data));

    if (CreateSection.fulfilled.match(resultAction)) {
      const createdSection = resultAction.payload;
      dispatch(hideDrawers());
      message.success("Section created");
      history.push(
        `/applications/${createdSection.applicationSlug}/sections/${createdSection.id}`
      );
    } else {
      if (resultAction.payload) {
        message.error(`Create failed: ${resultAction.payload.message}`);
      } else {
        message.error(`Create failed: ${resultAction.error.message}`);
      }
    }
  };

  const update = async (sectionUpdateData: IUpdateSectionAttributes) => {
    const updateData = {
      ...sectionUpdateData,
      id: activeSection!.id,
      applicationId: activeSection!.applicationId,
    };

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
    dispatch(hideDrawers());
  };

  return (
    <Drawer
      title={activeSection ? "Edit Section" : "New Section"}
      width={320}
      closable={false}
      onClose={onClose}
      visible={isOpen}
    >
      <Form
        initialValues={initialValues}
        name="basic"
        layout="vertical"
        form={form}
        onFinish={activeSection ? update : create}
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Title is required" }]}
        >
          <Input placeholder="Section title" />
        </Form.Item>

        <Form.Item label="Details" name="details">
          <Input.TextArea placeholder="Section details" rows={4} />
        </Form.Item>

        <Form.Item>
          {activeSection ? (
            <Button
              type="primary"
              htmlType="submit"
              loading={sectionUpdateLoading === "pending"}
            >
              {sectionUpdateLoading === "pending" ? "Updating" : "Update"}
            </Button>
          ) : (
            <Button
              type="primary"
              htmlType="submit"
              loading={sectionCreateLoading === "pending"}
            >
              {sectionCreateLoading === "pending" ? "Creating" : "Create"}
            </Button>
          )}
        </Form.Item>
      </Form>
    </Drawer>
  );
}
