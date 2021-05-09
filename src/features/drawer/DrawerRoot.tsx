import { ReactNode } from "react";

import SectionLayoutPicker from "./SectionLayoutPicker";
import RowLayoutPicker from "./RowLayoutPicker";
import { useAppSelector } from "../../app/hooks";
import { selectDrawer } from "./drawerSlice";
import { DRAWER_TYPES } from "../../shared/constants";

const { SECTION_LAYOUT_PICKER_DRAWER, ROW_LAYOUT_PICKER_DRAWER } = DRAWER_TYPES;

interface IDrawerComponents {
  [key: string]: ReactNode;
}

const DRAWER_COMPONENTS = {
  [SECTION_LAYOUT_PICKER_DRAWER]: SectionLayoutPicker,
  [ROW_LAYOUT_PICKER_DRAWER]: RowLayoutPicker,
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
