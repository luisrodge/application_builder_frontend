import { ReactNode } from "react";

import { useAppSelector } from "../../app/hooks";
import { MODAL_TYPES } from "../../shared/constants";
import { selectModal } from "./modalSlice";
import AskApplicantEmail from "./AskApplicantEmail";

const { ASK_APPLICANT_EMAIL } = MODAL_TYPES;

interface IModalComponents {
  [key: string]: ReactNode;
}

const MODAL_COMPONENTS = {
  [ASK_APPLICANT_EMAIL]: AskApplicantEmail,
} as IModalComponents;

export const ModalTypes = Object.keys(MODAL_COMPONENTS);

export default function ModalRoot() {
  const { modalType, modalProps } = useAppSelector(selectModal);

  if (!modalType) return null;

  const SpecificModal = MODAL_COMPONENTS[modalType] as React.ElementType;
  return <SpecificModal {...modalProps} />;
}
