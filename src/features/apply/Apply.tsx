import { Steps, Typography } from "antd";
import { useEffect } from "react";
import { useParams } from "react-router";
import styled from "styled-components";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectLoadingStatuses } from "./applySlice";
import StepsNavigation from "./components/StepsNavigation";
import { GetApplication } from "./services";

export const ApplyContainer = styled.div`
  padding: 30px;
  display: flex;
`;

export const StepsContainer = styled.div`
  padding-right: 50px;
`;

export const SectionContainer = styled.div`
  background: #f7f7f7;
  flex: 1;
`;

export default function Apply() {
  const dispatch = useAppDispatch();

  const { applicationId } = useParams<{ applicationId: string }>();

  const loadingStatuses = useAppSelector(selectLoadingStatuses);

  useEffect(() => {
    dispatch(GetApplication(applicationId));
  }, []);

  if (
    loadingStatuses.applicationLoading === "pending" ||
    loadingStatuses.applicationLoading === "idle"
  )
    return null;

  return (
    <ApplyContainer>
      <StepsContainer>
        <StepsNavigation />
      </StepsContainer>
      <SectionContainer></SectionContainer>
    </ApplyContainer>
  );
}
