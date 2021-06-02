import { ReactNode } from "react";

import RowLayoutPicker from "./RowLayoutPicker";
import { useAppSelector } from "../../app/hooks";
import { selectDrawer } from "./drawerSlice";
import { DRAWER_TYPES } from "../../shared/constants";
import InputPicker from "./InputPicker";
import InputOptions from "./InputOptions";
import ApplicationForm from "./ApplicationForm";
import SectionForm from "./SectionForm";
import RowForm from "./RowForm";

const {
  SECTION_LAYOUT_PICKER_DRAWER,
  ROW_LAYOUT_PICKER_DRAWER,
  INPUT_OPTIONS_DRAWER,
  INPUT_PICKER_DRAWER,
  APPLICATION_FORM_DRAWER,
  SECTION_FORM_DRAWER,
  ROW_FORM_DRAWER,
} = DRAWER_TYPES;

interface IDrawerComponents {
  [key: string]: ReactNode;
}

const DRAWER_COMPONENTS = {
  [ROW_LAYOUT_PICKER_DRAWER]: RowLayoutPicker,
  [INPUT_PICKER_DRAWER]: InputPicker,
  [INPUT_OPTIONS_DRAWER]: InputOptions,
  [APPLICATION_FORM_DRAWER]: ApplicationForm,
  [SECTION_FORM_DRAWER]: SectionForm,
  [ROW_FORM_DRAWER]: RowForm,
} as IDrawerComponents;

export const DrawerTypes = Object.keys(DRAWER_COMPONENTS);

export default function DrawerRoot() {
  const { drawerType, drawerProps } = useAppSelector(selectDrawer);

  if (!drawerType) {
    return null;
  }

  const SpecificDrawer = DRAWER_COMPONENTS[drawerType] as React.ElementType;
  return <SpecificDrawer {...drawerProps} />;
}
