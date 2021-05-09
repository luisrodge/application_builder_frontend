import { RootState } from "../app/store";

export declare type EventType =
  | React.KeyboardEvent<HTMLDivElement>
  | React.MouseEvent<HTMLDivElement | HTMLButtonElement>;

export type Selector<S> = (state: RootState) => S;
