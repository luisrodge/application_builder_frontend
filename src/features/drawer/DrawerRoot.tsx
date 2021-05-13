import { ReactNode } from "react";

import SectionLayoutPicker from "./SectionLayoutPicker";
import RowLayoutPicker from "./RowLayoutPicker";
import { useAppSelector } from "../../app/hooks";
import { selectDrawer } from "./drawerSlice";
import { DRAWER_TYPES } from "../../shared/constants";
import ElementPicker from "./ElementPicker";
import ElementOptions from "./ElementOptions";
import NewApplication from "./NewApplication";

const {
  SECTION_LAYOUT_PICKER_DRAWER,
  ROW_LAYOUT_PICKER_DRAWER,
  ELEMENT_PICKER_DRAWER,
  ELEMENT_OPTIONS_DRAWER,
  NEW_APPLICATION_DRAWER,
} = DRAWER_TYPES;

interface IDrawerComponents {
  [key: string]: ReactNode;
}

const DRAWER_COMPONENTS = {
  [SECTION_LAYOUT_PICKER_DRAWER]: SectionLayoutPicker,
  [ROW_LAYOUT_PICKER_DRAWER]: RowLayoutPicker,
  [ELEMENT_PICKER_DRAWER]: ElementPicker,
  [ELEMENT_OPTIONS_DRAWER]: ElementOptions,
  [NEW_APPLICATION_DRAWER]: NewApplication,
} as IDrawerComponents;

export const DrawerTypes = Object.keys(DRAWER_COMPONENTS);

const DrawerRoot = () => {
  const { drawerType, drawerProps } = useAppSelector(selectDrawer);

  if (!drawerType) {
    return null;
  }

  const SpecificDrawer = DRAWER_COMPONENTS[drawerType] as React.ElementType;
  return <SpecificDrawer {...drawerProps} />;
};

export default DrawerRoot;
