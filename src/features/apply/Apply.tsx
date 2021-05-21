import { Popconfirm, Button } from "antd";
import { useEffect } from "react";
import { useParams } from "react-router";
import styled from "styled-components";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectActiveSection, selectLoadingStatuses } from "./applySlice";
import RowList from "./components/RowList";
import StepsNavigation from "./components/StepsNavigation";
import { GetApplication } from "./services";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const ApplyContainer = styled.div`
  padding: 50px 30px;
  display: flex;
  flex: 1;
  background: #f0f2f5;
`;

export const StepsContainer = styled.div`
  padding-right: 50px;
`;

export const SectionContainer = styled.div`
  flex: 1;
`;

export const Footer = styled.footer`
  padding: 30px;
  text-align: right;
`;

export default function Apply() {
  const dispatch = useAppDispatch();

  const { applicationId } = useParams<{ applicationId: string }>();

  const loadingStatuses = useAppSelector(selectLoadingStatuses);
  const section = useAppSelector(selectActiveSection);

  useEffect(() => {
    dispatch(GetApplication(applicationId));
  }, []);

  if (
    loadingStatuses.applicationLoading === "pending" ||
    loadingStatuses.applicationLoading === "idle"
  )
    return null;

  return (
    <Container>
      <ApplyContainer>
        <StepsContainer>
          <StepsNavigation />
        </StepsContainer>
        <SectionContainer>
          <RowList sectionId={section!.id} />
        </SectionContainer>
      </ApplyContainer>
      <Footer>
        <Popconfirm title="Are you sure？" okText="Yes" cancelText="No">
          <Button style={{ marginRight: 15 }}>Cancel</Button>
        </Popconfirm>
        <Button type="primary" style={{ width: 220 }}>
          Next Section
        </Button>
      </Footer>
    </Container>
  );
}
