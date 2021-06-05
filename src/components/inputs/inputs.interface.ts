import { IInput } from "../../features/applications/applications.interface";

export interface IInputProps {
  input: IInput;
  disabled?: boolean;
}

export interface IInputRootProps {
  input: IInput;
  disabled?: boolean;
  designerActive?: boolean;
}
