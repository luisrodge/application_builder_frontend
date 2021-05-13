export interface IApplication {
  id: string;
  title?: string;
  details?: string;
}

export interface ISection {
  id: string;
  applicationId: string;
  title?: string;
  details?: string;
  numOfCols: number;
}

export interface IRow {
  id: string;
  sectionId: string;
  numOfCols?: number;
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
