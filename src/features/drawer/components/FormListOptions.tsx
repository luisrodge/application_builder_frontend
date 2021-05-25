import { Form, Input, Button } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

interface IProps {
  name: string;
}

export default function FormListOptions({ name }: IProps) {
  return (
    <>
      <Form.List
        name={name}
        rules={[
          {
            validator: async (_, options) => {
              if (!options || options.length < 1) {
                return Promise.reject(new Error("At least 1 option"));
              }
            },
          },
        ]}
      >
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map((field, index) => (
              <Form.Item
                label={index === 0 ? "Options" : ""}
                required={false}
                key={field.key}
              >
                <div style={{ display: "flex" }}>
                  <div style={{ flex: 1, paddingRight: 4 }}>
                    <Form.Item
                      {...field}
                      validateTrigger={["onChange", "onBlur"]}
                      rules={[
                        {
                          required: true,
                          whitespace: true,
                          message: "Please input option's name",
                        },
                      ]}
                      noStyle
                    >
                      <Input placeholder="Option name" />
                    </Form.Item>
                  </div>
                  <div>
                    {fields.length > 1 ? (
                      <MinusCircleOutlined
                        className="dynamic-delete-button"
                        onClick={() => remove(field.name)}
                      />
                    ) : null}
                  </div>
                </div>
              </Form.Item>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                style={{ width: "100%" }}
                icon={<PlusOutlined />}
              >
                Add option
              </Button>
              <Form.ErrorList errors={errors} />
            </Form.Item>
          </>
        )}
      </Form.List>
    </>
  );
}
