import { useEffect } from "react";
import styled from "styled-components";
import { Button, Card } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { showDrawer } from "../drawer/drawerSlice";
import { DRAWER_TYPES } from "../../shared/constants";
import { GetApplications } from "./services";
import { selectApplications, selectLoading } from "./applicationsSlice";
import { Spinner } from "../../components/Spinner";

const Container = styled.div`
  width: 600px;
  margin: 0 auto;
  padding: 30px 0;
`;

const Header = styled.div`
  display: flex;
  margin-bottom: 30px;
`;

const Applications = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectLoading);
  const applications = useAppSelector(selectApplications);

  useEffect(() => {
    dispatch(GetApplications());
  }, []);

  return (
    <Container>
      <Header>
        <div style={{ flex: 1 }}>
          <h2>Your Applications</h2>
        </div>
        <div>
          <Button
            onClick={() =>
              dispatch(
                showDrawer({ drawerType: DRAWER_TYPES.NEW_APPLICATION_DRAWER })
              )
            }
            icon={<PlusOutlined />}
          >
            New Application
          </Button>
        </div>
      </Header>
      <div>
        {loading == "pending" ? (
          <Spinner />
        ) : (
          applications.map((application) => (
            <Card style={{ marginBottom: 10, cursor: "pointer" }}>
              <Link to={`/applications/${application.id}`}>
                <p>{application.title}</p>
              </Link>
            </Card>
          ))
        )}
      </div>
    </Container>
  );
};

export default Applications;
