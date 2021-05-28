export interface IFieldData {
  name: string;
  value?: any;
  touched?: boolean;
  validating?: boolean;
  errors?: string[];
}

export interface ISectionFields {
  [index: string]: IFieldData[];
}

export interface ISetSectionFieldsAttributes {
  fields: IFieldData[];
  sectionId: number;
}

export interface IFilledInputAttributes {
  value: string;
  name: string;
  file?: File;
}

export interface ICreateSubmissionAttributes {
  applicationId: number;
  // submissionSections: ISubmissionSectionAttributes[];
  sectionFields: IFilledInputAttributes[];
}

export interface ISubmissionSectionsAttributes {}

export interface ISubmissionColumnAttributes {
  columnId: number;
  filledInputAttributes: IFilledInputAttributes;
}

export interface ISubmissionRowAttributes {
  submissionColumnsAttributes: ISubmissionColumnAttributes[];
}

export interface ISubmissionSectionAttributes {
  title: string;
  details?: string;
  submissionRowsAttributes: ISubmissionRowAttributes[];
}
