import { Button, message } from "antd";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { CopyOutlined } from "@ant-design/icons";

interface IProps {
  label: string;
  link: string;
}

export default function LinkClipboard({ label, link }: IProps) {
  const onCopy = () => message.success("Link copied");

  return (
    <div
      style={{
        display: "flex",
        height: 45,
        alignItems: "center",
        background: "#fff",
        border: "1px solid #ccc",
      }}
    >
      <div style={{ padding: "0 20px" }}>
        <p style={{ margin: 0 }}>{link}</p>
      </div>

      <CopyToClipboard text={link} onCopy={onCopy}>
        <Button
          style={{
            height: "100%",
            borderRadius: 0,
            border: 0,
            borderLeft: "1px solid #ccc",
            background: "#fafafa",
          }}
          icon={<CopyOutlined />}
        >
          {label}
        </Button>
      </CopyToClipboard>
    </div>
  );
}
