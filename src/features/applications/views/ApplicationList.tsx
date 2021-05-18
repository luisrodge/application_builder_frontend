import { useEffect } from "react";
import { List, Popconfirm } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { DeleteApplication, GetApplications } from "../services";
import { selectApplications, selectLoading } from "../applicationsSlice";
import Header from "../components/ApplicationsHeader";
import { SlimContainer } from "../style";

export default function ApplicationList() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectLoading);
  const applications = useAppSelector(selectApplications);

  useEffect(() => {
    dispatch(GetApplications());
  }, []);

  return (
    <>
      <Header />
      <SlimContainer>
        <List
          itemLayout="horizontal"
          dataSource={applications}
          loading={loading === "pending"}
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
                  <a key="list-delete">
                    <DeleteOutlined />
                  </a>
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
