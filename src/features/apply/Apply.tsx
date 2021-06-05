import { useEffect } from "react";
import { useParams } from "react-router";
import styled from "styled-components";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { FullViewSpinner, Spinner } from "../../components/Spinner";
import {
  selectActiveSection,
  selectLoadingStatuses,
  selectError,
} from "./applySlice";
import SectionForm from "./components/SectionForm";
import SectionsNav from "./components/SectionsNav";
import MainActions from "./components/MainActions";
import { GetApplication } from "./services";
import NotFound from "../../components/NotFound";

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

  const { slug } = useParams<{ slug: string }>();

  const { applicationLoading, applySubmitLoading } = useAppSelector(
    selectLoadingStatuses
  );
  const section = useAppSelector(selectActiveSection);
  const error = useAppSelector(selectError);

  useEffect(() => {
    dispatch(GetApplication(slug));
  }, [slug, dispatch]);

  if (applicationLoading === "pending" || applicationLoading === "idle")
    return <Spinner />;

  if (error && error.status === 404) return <NotFound />;

  return (
    <Container>
      <ApplyContainer>
        <StepsContainer>
          <SectionsNav />
        </StepsContainer>
        <SectionContainer>
          <SectionForm sectionId={section!.id} />
        </SectionContainer>
      </ApplyContainer>
      <MainActions />
      {applySubmitLoading === "pending" && (
        <FullViewSpinner text="Submitting application" />
      )}
    </Container>
  );
}
