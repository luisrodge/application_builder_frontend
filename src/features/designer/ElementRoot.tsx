import { ReactNode } from "react";

import { useAppSelector } from "../../app/hooks";
import { ELEMENT_TYPES } from "../../shared/constants";
import NumberInput from "../../components/elements/NumberInput";
import { IColumn } from "./designer.interface";
import { selectElement } from "./designerSlice";

const { NUMBER_INPUT_ELEMENT } = ELEMENT_TYPES;

interface IElementComponents {
  [key: string]: ReactNode;
}

const ELEMENT_COMPONENTS = {
  [NUMBER_INPUT_ELEMENT]: NumberInput,
} as IElementComponents;

export const ElementTypes = Object.keys(ELEMENT_COMPONENTS);

interface IProps {
  column?: IColumn;
}

const ElementRoot = ({ column }: IProps) => {
  const element = useAppSelector(selectElement(column!.id))!;

  if (!element) return null;

  const SpecificElement = ELEMENT_COMPONENTS[element.type] as React.ElementType;
  return <SpecificElement />;
};

export default ElementRoot;
