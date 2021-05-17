export interface IApplicationAttributes {
  title: string;
  details: string;
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
  elements: IElement[];
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

export interface IElement {
  sectionId: string;
  rowId: string;
  columnId: string;
  type: string;
  label: string;
}

export interface IErrorMessage {
  message: string;
}
