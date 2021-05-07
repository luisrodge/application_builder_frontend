export interface ISection {
  id: string;
  title?: string;
  numOfCols: number;
}

export interface IRow {
  id: string;
  sectionId: string;
}

export interface IColumn {
  id: string;
  rowId: string;
  sectionId: string;
}
