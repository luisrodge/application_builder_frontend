import { useEffect } from "react";
import { Typography, message, Divider, Radio } from "antd";
import { useParams } from "react-router";
import styled from "styled-components";
import ReactQuill from "react-quill";
import Parser from "html-react-parser";
import "react-quill/dist/quill.snow.css";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectActiveApplication,
  setApplicationPolicies,
  setApplicationSignatureRequired,
  setApplicationTerms,
} from "./applicationsSlice";
import Header from "./components/Header";
import { GetApplication, UpdateApplication } from "./services";
import { IUpdateApplicationAttributes } from "./applications.interface";

const { Title } = Typography;

const Container = styled.div`
  width: 1200px;
  margin: 0 auto;
  margin-top: 120px;
`;

const InnerContainer = styled.div`
  display: flex;
`;

const RichContainer = styled.div`
  flex: 1;
`;

const PreviewContainer = styled.div`
  width: 480px;
  padding-left: 80px;
`;

export default function TermsAndPolicies() {
  const dispatch = useAppDispatch();
  const activeApplication = useAppSelector(selectActiveApplication);

  const { applicationSlug } = useParams<{ applicationSlug: string }>();

  useEffect(() => {
    dispatch(GetApplication(applicationSlug));
  }, [applicationSlug, dispatch]);

  const save = async () => {
    const updateData = {
      ...activeApplication,
    } as IUpdateApplicationAttributes;

    const resultAction = await dispatch(UpdateApplication(updateData));
    if (UpdateApplication.fulfilled.match(resultAction)) {
      message.success("Updated successfully");
    } else {
      if (resultAction.payload) {
        message.error(`Update failed: ${resultAction.payload.message}`);
      } else {
        message.error(`Update failed: ${resultAction.error.message}`);
      }
    }
  };

  return (
    <>
      <Header
        mainTitle="Terms and Policies"
        backUrl={`/applications/${activeApplication?.slug}`}
        onSave={save}
      />
      <Container>
        <InnerContainer>
          <RichContainer>
            <Title level={4}>Terms</Title>
            <ReactQuill
              theme="snow"
              value={activeApplication?.terms || ""}
              onChange={(values) => dispatch(setApplicationTerms(values))}
            />
            <br />
            <Title level={4}>Policies</Title>
            <ReactQuill
              theme="snow"
              value={activeApplication?.policies || ""}
              onChange={(values) => dispatch(setApplicationPolicies(values))}
            />
            <br />
            <Title level={4}>Require signature?</Title>
            <Radio
              checked={activeApplication?.signatureEnabled}
              onChange={() => dispatch(setApplicationSignatureRequired(true))}
            >
              Enabled
            </Radio>
            <Radio
              checked={!activeApplication?.signatureEnabled}
              onChange={() => dispatch(setApplicationSignatureRequired(false))}
            >
              Disabled
            </Radio>
          </RichContainer>
          <PreviewContainer>
            {activeApplication?.terms && Parser(activeApplication?.terms)}
            {activeApplication?.policies && (
              <>
                <Divider />
                {Parser(activeApplication?.policies)}
              </>
            )}
          </PreviewContainer>
        </InnerContainer>
      </Container>
    </>
  );
}
