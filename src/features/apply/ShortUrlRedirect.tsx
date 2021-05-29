import { useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { Typography } from "antd";
import { blue } from "@ant-design/colors";
import styled from "styled-components";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { GetApplicationIdByShortUrl } from "./services";
import { selectRedirectId } from "./applySlice";
import { Spinner } from "../../components/Spinner";

const { Title } = Typography;

const Header = styled.div`
  text-align: center;
  background: ${blue.primary};
  padding: 30px;
`;

const Content = styled.div`
  text-align: center;
  padding: 100px 0;
`;

function timeout(delay: number) {
  return new Promise((res) => setTimeout(res, delay));
}

export default function ShortUrlRedirect() {
  const dispatch = useAppDispatch();
  const { shortUrl } = useParams<{ shortUrl: string }>();
  const applicationId = useAppSelector(selectRedirectId);
  const history = useHistory();

  useEffect(() => {
    dispatch(GetApplicationIdByShortUrl(shortUrl));
  }, [dispatch, shortUrl]);

  const redirect = async () => {
    await timeout(1000);
    history.push(`/applications/${applicationId}/apply`);
  };

  if (applicationId) redirect();

  return (
    <>
      <Header>
        <Title level={4} style={{ margin: 0, color: "#FFF" }}>
          Quikapply
        </Title>
      </Header>
      <Content>
        <Spinner marginTop={0} delay={0} />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Title level={3}>Redirecting to application</Title>
        </div>
      </Content>
    </>
  );
}
