export interface ICreateApplicationAttributes {
  title: string;
  details?: string;
}

export interface ICreateSectionAttributes extends ICreateApplicationAttributes {
  numOfCols: number;
  applicationId: number;
}

export interface ICreateRowAttributes {
  numOfCols: number;
  sectionId: number;
}

export interface IApplication {
  id: number;
  title?: string;
  details?: string;
  sections?: number[];
}

export interface IApplicationWithChildren {
  application: IApplication;
  sections: ISection[];
  rows: IRow[];
  columns: IColumn[];
  inputs: IInput[];
}

export interface ISectionWithChildren {
  section: ISection;
  rows: IRow[];
  columns: IColumn[];
  inputs: IInput[];
  application: IApplication;
}

export interface IRowWithChildren {
  row: IRow;
  columns: IColumn[];
}

export interface IDeleteColumnResult {
  rowId: number;
  columnId: number;
}

export interface ISection {
  id: number;
  applicationId: number;
  title?: string;
  details?: string;
  numOfCols: number;
  rows?: number[];
}

export interface IRow {
  id: number;
  sectionId: number;
  numOfCols?: number;
  columns?: number[];
}

export interface IColumn {
  id: number;
  rowId: number;
  sectionId: number;
}

export interface ICheckboxOption {
  name: string;
}

export interface IRadioOption extends ICheckboxOption {}

export interface IInput {
  id: string;
  columnId: number;
  sectionId: number;
  inputType: string;
  label: string;
  name: string;
  required?: boolean;
  checkboxOptions?: ICheckboxOption[];
  radioOptions?: IRadioOption[];
}

export interface ICreateInputAttributes {
  columnId: number;
  type: string;
  label: string;
  required?: boolean;
  checkboxOptions?: ICheckboxOption[];
  radioOptions?: IRadioOption[];
}

export interface IErrorMessage {
  message: string;
}
