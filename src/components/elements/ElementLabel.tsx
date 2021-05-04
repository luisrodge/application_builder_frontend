import { useState } from "react";
import { Typography } from "antd";

const { Text } = Typography;

const ElementLabel = () => {
  const [editableStr, setEditableStr] = useState("Label");
  return (
    <Text
      editable={{
        onChange: setEditableStr,
        tooltip: false,
        maxLength: 25,
        autoSize: { maxRows: 1 },
      }}
      style={{ marginBottom: 0 }}
      strong
    >
      {editableStr}
    </Text>
  );
};

export default ElementLabel;
