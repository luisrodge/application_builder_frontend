import { useRef } from "react";
import {
  Drawer,
  Form,
  Button,
  message,
  notification,
  Typography,
  Input,
  Popconfirm,
} from "antd";
import { CloseOutlined, SendOutlined } from "@ant-design/icons";
import Parser from "html-react-parser";
import SignatureCanvas from "react-signature-canvas";
import { useHistory } from "react-router";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectDrawer, hideDrawers } from "./drawerSlice";
import { selectActiveApplication } from "../apply/applySlice";
import { CreateSubmission } from "../apply/services";
import { ICreateSubmissionParams } from "../applications/applications.interface";

const { Title } = Typography;

const openSignatureNotification = () => {
  notification["error"]({
    message: "Signature required",
    description: "Please provide your signature below in order to submit.",
  });
};

export default function Signature() {
  const history = useHistory();
  const dispatch = useAppDispatch();

  const sigCanvas = useRef<any>({});

  const { isOpen } = useAppSelector(selectDrawer);
  const activeApplication = useAppSelector(selectActiveApplication)!;

  const [form] = Form.useForm();

  let showWideDrawer = false;

  if (
    activeApplication?.terms ||
    activeApplication?.policies ||
    activeApplication?.signatureEnabled
  )
    showWideDrawer = true;

  const onClose = () => {
    form.resetFields();
    dispatch(hideDrawers());
  };

  const clearSignature = () => {
    sigCanvas.current.clear();
  };

  const submit = async () => {
    const email = form.getFieldValue("email");

    const submissionData = { email } as ICreateSubmissionParams;

    if (activeApplication.signatureEnabled) {
      if (sigCanvas.current.isEmpty()) {
        openSignatureNotification();
        return;
      }
      const signature = sigCanvas.current
        .getTrimmedCanvas()
        .toDataURL("image/png");

      submissionData.signature = signature;
    }

    const resultAction = await dispatch(CreateSubmission(submissionData));

    if (CreateSubmission.fulfilled.match(resultAction)) {
      form.resetFields();
      dispatch(hideDrawers());
      history.push("/apply/success");
    } else {
      form.resetFields();
      dispatch(hideDrawers());
      if (resultAction.payload) {
        message.error(`Submission failed: ${resultAction.payload.message}`);
      } else {
        message.error(`Submission failed: ${resultAction.error.message}`);
      }
    }
  };

  return (
    <Drawer
      title="Send in your application"
      width={showWideDrawer ? 700 : 400}
      closable={false}
      onClose={onClose}
      visible={isOpen}
      footer={
        <div
          style={{
            textAlign: "right",
          }}
        >
          <Button style={{ marginRight: 8 }} onClick={onClose}>
            Cancel
          </Button>
          <Popconfirm
            title="Are you sure？"
            okText="Yes"
            cancelText="No"
            onConfirm={submit}
          >
            <Button type="primary" icon={<SendOutlined />}>
              Submit Application
            </Button>
          </Popconfirm>
        </div>
      }
    >
      {activeApplication.terms && Parser(activeApplication.terms)}
      {activeApplication.policies && Parser(activeApplication.policies)}
      <div
        style={{
          paddingTop: 10,
        }}
      >
        <div style={{ width: "100%" }}>
          <div
            style={{
              borderTop: "1px solid #f0f0f0",
              borderBottom: "1px solid #f0f0f0",
              paddingTop: 20,
            }}
          >
            <Form
              form={form}
              layout="vertical"
              name="submission_email_form"
              requiredMark="optional"
            >
              <Form.Item
                name="email"
                label="Your email address"
                extra="Entering your email address will allow us to send you a copy of your submission."
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
          </div>
          {activeApplication.signatureEnabled && (
            <div style={{ paddingTop: 20 }}>
              <Title level={5} style={{ margin: 0, marginBottom: 10 }}>
                Your signature
              </Title>
              <div
                style={{
                  background: "#f7f7f7",
                  width: "100%",
                  height: "150px",
                }}
              >
                <div style={{ width: "100%", height: "100%" }}>
                  <SignatureCanvas
                    ref={sigCanvas}
                    canvasProps={{ className: "sigPad" }}
                  />
                </div>
              </div>
              <Button
                type="text"
                onClick={clearSignature}
                icon={<CloseOutlined />}
              >
                Clear signature
              </Button>
            </div>
          )}
        </div>
      </div>
    </Drawer>
  );
}
