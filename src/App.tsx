import { Row, Col, Button, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import Section from "./components/Section";
import NumberInput from "./components/elements/NumberInput";
import { GUTTER } from "./utils/theme";

function App() {
  return (
    <div>
      <Section>
        <Row gutter={GUTTER.lg}>
          <Col span={8}>
            <NumberInput />
          </Col>
          <Col span={8}>
            <NumberInput />
          </Col>
          <Col span={8}>
            <NumberInput />
          </Col>
        </Row>
        <br />
        <Row gutter={GUTTER.lg}>
          <Col span={8}>
            <NumberInput />
          </Col>
          <Col span={8}>
            <NumberInput />
          </Col>
          <Col span={8}>
            <NumberInput />
          </Col>
        </Row>
      </Section>
      <br />
      <div style={{ textAlign: "center" }}>
        <Button icon={<PlusOutlined />}>Add Elements</Button>
      </div>
    </div>
  );
}

export default App;
