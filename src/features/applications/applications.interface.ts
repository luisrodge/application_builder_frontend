export interface ICreateApplicationAttributes {
  title: string;
  email: string;
  details?: string;
}

export interface IUpdateApplicationAttributes
  extends ICreateApplicationAttributes {
  id: number;
  terms?: string;
  policies?: string;
  signatureEnabled: boolean;
}

export interface ICreateSectionAttributes {
  title: string;
  details?: string;
  applicationId: number;
}

export interface IUpdateSectionAttributes extends ICreateSectionAttributes {
  id: number;
}

export interface IUpdateRowAttributes extends IUpdateSectionAttributes {}

export interface ICreateRowAttributes {
  numOfCols: number;
  sectionId: number;
  title?: string;
  details?: string;
}

export interface IApplication {
  id: number;
  email: string;
  slug: string;
  shortUrl: string;
  title?: string;
  details?: string;
  terms?: string;
  policies?: string;
  sections?: number[];
  signatureEnabled: boolean;
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
  applicationSlug: string;
  title?: string;
  details?: string;
  rows?: number[];
}

export interface IRow {
  id: number;
  sectionId: number;
  numOfCols?: number;
  columns?: number[];
  title?: string;
  details?: string;
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

export interface ICreateColumnAttributes {
  sectionId: number;
  rowId: number;
}

export interface IErrorMessage {
  message: string;
  status?: number;
}

export interface IExpandedShortUrl {
  applicationSlug: string;
}

export interface ICreateSubmissionParams {
  email?: string;
  signature?: string;
}
