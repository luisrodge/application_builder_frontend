import { useRef } from "react";
import { Drawer, Form, Button, message } from "antd";
import Parser from "html-react-parser";
import SignatureCanvas from "react-signature-canvas";
import { useHistory } from "react-router";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectDrawer, hideDrawers } from "./drawerSlice";
import { selectActiveApplication } from "../apply/applySlice";
import { CreateSubmission } from "../apply/services";

export default function Signature() {
  const history = useHistory();
  const dispatch = useAppDispatch();

  const sigCanvas = useRef<any>({});

  const { isOpen } = useAppSelector(selectDrawer);
  const activeApplication = useAppSelector(selectActiveApplication)!;

  const [form] = Form.useForm();

  const onClose = () => {
    form.resetFields();
    dispatch(hideDrawers());
  };

  const clearSignature = () => {
    sigCanvas.current.clear();
  };

  const submit = async () => {
    const signature = sigCanvas.current
      .getTrimmedCanvas()
      .toDataURL("image/png");

    const resultAction = await dispatch(CreateSubmission({ signature }));

    if (CreateSubmission.fulfilled.match(resultAction)) {
      dispatch(hideDrawers());
      history.push("/apply/success");
    } else {
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
      title="Terms & Policies"
      width={750}
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
          <Button type="primary" onClick={submit}>
            Submit
          </Button>
        </div>
      }
    >
      {activeApplication.terms && Parser(activeApplication.terms)}
      {activeApplication.policies && Parser(activeApplication.policies)}
      {activeApplication.signatureEnabled && (
        <>
          <div
            style={{ background: "#f7f7f7", width: "100%", height: "150px" }}
          >
            <div style={{ width: "100%", height: "80%" }}>
              <SignatureCanvas
                ref={sigCanvas}
                canvasProps={{ className: "sigPad" }}
              />
            </div>
          </div>
          <Button type="text" onClick={clearSignature}>
            Clear signature
          </Button>
        </>
      )}
    </Drawer>
  );
}
