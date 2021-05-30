import { Result, Alert } from "antd";
import styled from "styled-components";
import { Redirect, useLocation } from "react-router";
import { grey } from "@ant-design/colors";
import { Link } from "react-router-dom";
import LinkClipboard from "./components/LinkClipboard";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 60px;
  padding-left: 100px;
  padding-right: 100px;
  background: #f0f2f5;
  flex-direction: column;
`;

interface ILocationLinks {
  link: string;
  shortLink: string;
}

export default function PublishSuccess() {
  const location = useLocation();
  const links = location.state as ILocationLinks;

  window.history.replaceState({}, document.title);

  if (!links) return <Redirect to="/" />;

  return (
    <div>
      <div>
        <Alert
          message="Be sure to save your apply links somewhere. After leaving or reloading this page you won't have access to them again."
          type="info"
          style={{ textAlign: "center", fontWeight: "bold" }}
        />
      </div>
      <Container>
        <Result
          status="success"
          title="Your application has been published"
          subTitle="You can now copy and begin sharing the following apply links"
        />
        <LinkClipboard
          link={`${window.location.hostname}/s/${links.shortLink}`}
          label="Copy Quik Link"
        />
        <br />
        <LinkClipboard
          link={`${window.location.hostname}/${links.link}/apply`}
          label="Copy Full Link"
        />
      </Container>
      <div
        style={{
          textAlign: "center",
          padding: "20px 0",
        }}
      >
        <p style={{ fontSize: 16, color: grey.primary }}>
          Thanks for using <Link to="/">Quikapply</Link>
        </p>
      </div>
    </div>
  );
}
