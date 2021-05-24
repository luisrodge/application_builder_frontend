import { useEffect } from "react";
import { useParams } from "react-router";
import styled from "styled-components";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Spinner } from "../../components/Spinner";
import { selectActiveSection, selectLoadingStatuses } from "./applySlice";
import SectionForm from "./components/SectionForm";
import StepsNavigation from "./components/StepsNavigation";
import Footer from "./components/Footer";
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
  max-width: 300px;
  padding-right: 50px;
`;

export const SectionContainer = styled.div`
  flex: 1;
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
    return <Spinner />;

  return (
    <Container>
      <ApplyContainer>
        <StepsContainer>
          <StepsNavigation />
        </StepsContainer>
        <SectionContainer>
          <SectionForm sectionId={section!.id} />
        </SectionContainer>
      </ApplyContainer>
      <Footer applicationId={applicationId} />
    </Container>
  );
}
