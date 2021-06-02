import { Form, Radio } from "antd";

import { IInputProps } from "./inputs.interface";

const RadioInput = ({ input, disabled }: IInputProps) => {
  if (!input.radioOptions) return null;

  return (
    <>
      <Form.Item
        label={input.label}
        labelCol={{ span: 24 }}
        style={{ marginBottom: 0 }}
        name={input.name}
      >
        <Radio.Group disabled={disabled}>
          {input.radioOptions.map((option) => (
            <Radio value={option.name} key={option.name}>
              {option.name}
            </Radio>
          ))}
        </Radio.Group>
      </Form.Item>
    </>
  );
};

export default RadioInput;
