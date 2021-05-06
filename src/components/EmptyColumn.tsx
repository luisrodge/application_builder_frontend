import styled from "styled-components";
import { Button, Col } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { blue } from "@ant-design/colors";

interface IProps {
  span?: number;
}

const InnerContainer = styled.div`
  background: #fafafa;
  padding: 16px 20px;
  border-radius: 2px;
  text-align: center;
  width: 100%;
  cursor: pointer;
  border: 1px solid transparent;
  :hover {
    border: 1px solid ${blue.primary};
  }
`;

const EmptyColumn = ({ span }: IProps) => (
  <Col span={span}>
    <InnerContainer>
      <Button icon={<PlusOutlined />} type="primary" ghost></Button>
    </InnerContainer>
  </Col>
);

export default EmptyColumn;
