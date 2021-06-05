import { Button, Drawer, Form, Input, message } from "antd";
import { useHistory } from "react-router";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  ICreateApplicationAttributes,
  IUpdateApplicationAttributes,
} from "../applications/applications.interface";

import { hideDrawer, selectDrawer } from "./drawerSlice";
import { CreateApplication, UpdateApplication } from "../applications/services";
import {
  selectActiveApplication,
  selectLoadingStatuses,
} from "../applications/applicationsSlice";

export default function ApplicationForm() {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  const { isOpen } = useAppSelector(selectDrawer);
  const { applicationLoading, applicationUpdateLoading } = useAppSelector(
    selectLoadingStatuses
  );
  const application = useAppSelector(selectActiveApplication);

  const initialValues = {
    id: application?.id,
    title: application?.title,
    details: application?.details,
    email: application?.email,
  };

  const createApplication = async (
    application: ICreateApplicationAttributes
  ) => {
    const resultAction = await dispatch(CreateApplication(application));
    if (CreateApplication.fulfilled.match(resultAction)) {
      const createdApplication = resultAction.payload;
      dispatch(hideDrawer());
      form.resetFields();
      message.success("Application created");
      history.push(`/applications/${createdApplication.slug}`);
    } else {
      form.resetFields();
      if (resultAction.payload) {
        message.error(`Create failed: ${resultAction.payload.message}`);
      } else {
        message.error(`Create failed: ${resultAction.error.message}`);
      }
    }
  };

  const updateApplication = async (
    applicationUpdateData: IUpdateApplicationAttributes
  ) => {
    const updateData = { ...applicationUpdateData, id: application!.id };

    const resultAction = await dispatch(UpdateApplication(updateData));

    if (UpdateApplication.fulfilled.match(resultAction)) {
      const updatedApplication = resultAction.payload;
      dispatch(hideDrawer());
      form.resetFields();
      message.success("Application updated");
      history.push(`/applications/${updatedApplication.slug}`);
    } else {
      form.resetFields();
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
      title={application ? "Edit Application" : "New Application"}
      width={320}
      closable={false}
      onClose={onClose}
      visible={isOpen}
    >
      <Form
        name="basic"
        layout="vertical"
        form={form}
        onFinish={application ? updateApplication : createApplication}
        initialValues={initialValues}
      >
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
          <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item>
          {application ? (
            <Button
              type="primary"
              htmlType="submit"
              loading={applicationUpdateLoading === "pending"}
            >
              {applicationUpdateLoading === "pending" ? "Updating" : "Update"}
            </Button>
          ) : (
            <Button
              type="primary"
              htmlType="submit"
              loading={applicationLoading === "pending"}
            >
              {applicationLoading === "pending" ? "Creating" : "Create"}
            </Button>
          )}
        </Form.Item>
      </Form>
    </Drawer>
  );
}
