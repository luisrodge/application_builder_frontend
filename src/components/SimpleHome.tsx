import { Typography, Button, Input, Form, message, Row, Col } from "antd";
import { grey } from "@ant-design/colors";
import { HeartTwoTone, ArrowRightOutlined } from "@ant-design/icons";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useHistory } from "react-router-dom";
import { CreateApplication } from "../features/applications/services";
import { ICreateApplicationAttributes } from "../features/applications/applications.interface";
import { selectLoadingStatuses } from "../features/applications/applicationsSlice";

import logo from "../assets/logo.png";

const { Title, Text } = Typography;

export default function SimpleHome() {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  const { applicationLoading } = useAppSelector(selectLoadingStatuses);

  const initialValues = {
    title: "",
    details: "",
    email: "",
  };

  const createApplication = async (
    application: ICreateApplicationAttributes
  ) => {
    const resultAction = await dispatch(CreateApplication(application));
    if (CreateApplication.fulfilled.match(resultAction)) {
      const createdApplication = resultAction.payload;
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

  return (
    <>
      <header
        style={{
          padding: 12,
          textAlign: "center",
        }}
      >
        <a href="https://quikapply.com/">
          <img src={logo} width={100} alt="logo" />
        </a>
      </header>
      <main style={{ backgroundColor: "#f8f9fa", padding: "50px 0" }}>
        <div style={{ textAlign: "center" }}>
          <Title level={2}>
            Get started - Create your new application form
          </Title>
        </div>
        <Row>
          <Col span={8} offset={8}>
            <Form
              name="basic"
              layout="vertical"
              form={form}
              onFinish={createApplication}
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
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={applicationLoading === "pending"}
                  icon={<ArrowRightOutlined />}
                >
                  {applicationLoading === "pending"
                    ? "Creating"
                    : "Start building"}
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </main>
      <footer style={{ padding: 24, textAlign: "center" }}>
        <Text style={{ color: grey.primary }}>
          For you with <HeartTwoTone /> from{" "}
          <a href="http://rodgetech.com/" target="_blank" rel="noreferrer">
            rodgetech.com
          </a>
        </Text>
      </footer>
    </>
  );
}
