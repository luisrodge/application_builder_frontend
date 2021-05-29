import { useHistory } from "react-router";
import { Modal, Form, Input, Alert, message, Button } from "antd";
import { SendOutlined } from "@ant-design/icons";

import { hideModal, selectModal } from "./modalSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { CreateSubmission } from "../apply/services";

export default function ApplicantEmailRequest() {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { isOpen } = useAppSelector(selectModal);

  const [form] = Form.useForm();

  const submitApplication = async () => {
    const email = form.getFieldValue("email");
    const resultAction = await dispatch(CreateSubmission(email));

    if (CreateSubmission.fulfilled.match(resultAction)) {
      dispatch(hideModal());
      history.push("/apply/success");
    } else {
      dispatch(hideModal());
      if (resultAction.payload) {
        message.error(`Submission failed: ${resultAction.payload.message}`);
      } else {
        message.error(`Submission failed: ${resultAction.error.message}`);
      }
    }
  };

  return (
    <Modal
      width={400}
      style={{ top: 40 }}
      visible={isOpen}
      title="Just one more thing"
      okText="Submit Application"
      cancelButtonProps={{ style: { display: "none" } }}
      onOk={submitApplication}
      onCancel={() => dispatch(hideModal())}
      closable={true}
      footer={[
        <Button
          key="link"
          type="primary"
          onClick={submitApplication}
          icon={<SendOutlined />}
        >
          Submit Application
        </Button>,
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        requiredMark="optional"
      >
        <Alert
          message="Entering your email address will allow us to send you a copy of your submission."
          type="info"
          style={{ fontSize: 12 }}
        />
        <br />
        <Form.Item
          name="email"
          label="Your email address"
          rules={[
            {
              type: "email",
              message: "Must be a valid email address",
            },
          ]}
        >
          <Input type="email" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
