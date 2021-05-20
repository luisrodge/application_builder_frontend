export interface ICreateApplicationAttributes {
  title: string;
  details?: string;
}

export interface ICreateSectionAttributes extends ICreateApplicationAttributes {
  numOfCols: number;
  applicationId: string;
}

export interface ICreateRowAttributes {
  numOfCols: number;
  sectionId: string;
}

export interface IApplication {
  id: string;
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
  application: IApplication;
}

export interface IRowWithChildren {
  row: IRow;
  columns: IColumn[];
}

export interface IDeleteColumnResult {
  rowId: string;
  columnId: string;
}

export interface ISection {
  id: string;
  applicationId: string;
  title?: string;
  details?: string;
  numOfCols: number;
  rows?: number[];
}

export interface IRow {
  id: string;
  sectionId: string;
  numOfCols?: number;
  columns?: number[];
}

export interface IColumn {
  id: string;
  rowId: string;
  sectionId: string;
}

export interface IInput {
  columnId: string;
  type: string;
  label: string;
  required?: boolean;
}

export interface IErrorMessage {
  message: string;
}
