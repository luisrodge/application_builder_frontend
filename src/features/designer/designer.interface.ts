export interface ISection {
  id: string;
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
