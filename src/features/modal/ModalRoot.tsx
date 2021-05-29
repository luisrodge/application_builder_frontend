import { ReactNode } from "react";

import { useAppSelector } from "../../app/hooks";
import { MODAL_TYPES } from "../../shared/constants";
import { selectModal } from "./modalSlice";
import ApplicantEmailRequest from "./ApplicantEmailRequest";

const { APPLICANT_EMAIL_REQUEST } = MODAL_TYPES;

interface IModalComponents {
  [key: string]: ReactNode;
}

const MODAL_COMPONENTS = {
  [APPLICANT_EMAIL_REQUEST]: ApplicantEmailRequest,
} as IModalComponents;

export const ModalTypes = Object.keys(MODAL_COMPONENTS);

export default function ModalRoot() {
  const { modalType, modalProps } = useAppSelector(selectModal);

  if (!modalType) return null;

  const SpecificModal = MODAL_COMPONENTS[modalType] as React.ElementType;
  return <SpecificModal {...modalProps} />;
}
