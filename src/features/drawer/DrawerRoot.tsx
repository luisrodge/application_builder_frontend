import { ReactNode } from "react";

import SectionLayoutPicker from "./SectionLayoutPicker";
import RowLayoutPicker from "./RowLayoutPicker";
import { useAppSelector } from "../../app/hooks";
import { selectDrawer } from "./drawerSlice";
import { DRAWER_TYPES } from "../../shared/constants";
import InputPicker from "./InputPicker";
import InputOptions from "./InputOptions";
import NewApplication from "./NewApplication";

const {
  SECTION_LAYOUT_PICKER_DRAWER,
  ROW_LAYOUT_PICKER_DRAWER,
  INPUT_OPTIONS_DRAWER,
  INPUT_PICKER_DRAWER,
  NEW_APPLICATION_DRAWER,
} = DRAWER_TYPES;

interface IDrawerComponents {
  [key: string]: ReactNode;
}

const DRAWER_COMPONENTS = {
  [SECTION_LAYOUT_PICKER_DRAWER]: SectionLayoutPicker,
  [ROW_LAYOUT_PICKER_DRAWER]: RowLayoutPicker,
  [INPUT_PICKER_DRAWER]: InputPicker,
  [INPUT_OPTIONS_DRAWER]: InputOptions,
  [NEW_APPLICATION_DRAWER]: NewApplication,
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
