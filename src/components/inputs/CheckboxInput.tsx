import { Checkbox, Form } from "antd";

import { IInputProps } from "./inputs.interface";

const CheckboxInput = ({ input, disabled }: IInputProps) => {
  if (!input.checkboxOptions) return null;

  const options = input.checkboxOptions.map((cbOption) => ({
    label: cbOption.name,
    value: cbOption.name,
  }));

  return (
    <>
      <Form.Item
        label={input.label}
        labelCol={{ span: 24 }}
        style={{ marginBottom: 0 }}
        name={input.name}
      >
        <Checkbox.Group options={options} disabled={disabled} />
      </Form.Item>
    </>
  );
};

export default CheckboxInput;
