import { useEffect } from "react";
import { List, Popconfirm, Button } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { DeleteApplication, GetApplications } from "./services";
import { selectApplications, selectLoadingStatuses } from "./applicationsSlice";
import Header from "./components/ApplicationsHeader";
import { SlimContainer } from "./style";

export default function ApplicationList() {
  const dispatch = useAppDispatch();
  const loadingStatuses = useAppSelector(selectLoadingStatuses);
  const applications = useAppSelector(selectApplications);

  useEffect(() => {
    dispatch(GetApplications());
  }, [dispatch]);

  return (
    <>
      <Header />
      <SlimContainer>
        <List
          itemLayout="horizontal"
          dataSource={applications}
          loading={loadingStatuses.applicationLoading === "pending"}
          renderItem={(application) => (
            <List.Item
              actions={[
                <Link to={`/applications/${application.id}`} key="list-edit">
                  <EditOutlined style={{ marginRight: 5 }} />
                </Link>,
                <Popconfirm
                  title="Are you sure？"
                  okText="Yes"
                  cancelText="No"
                  onConfirm={() => dispatch(DeleteApplication(application.id))}
                >
                  <Button type="link">
                    <DeleteOutlined />
                  </Button>
                </Popconfirm>,
              ]}
            >
              <List.Item.Meta
                title={
                  <Link to={`/applications/${application.id}`}>
                    {application.title}
                  </Link>
                }
                description={application.details}
              />
            </List.Item>
          )}
        />
      </SlimContainer>
    </>
  );
}
