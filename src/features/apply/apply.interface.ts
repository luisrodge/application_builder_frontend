export interface IFieldData {
  name: string | number | (string | number)[];
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
  sectionId: string;
}

export interface ISubmissionRowAttributes {
  title: string;
  details: string;
  sectionFields: ISectionFields;
}

export interface IFilledInputAttributes {
  value: string;
  name: string | number | (string | number)[];
}

export interface ISubmissionColumnAttributes {
  filledInput: IFilledInputAttributes;
}

export interface ISubmissionRowAttributes {
  submissionColumns: ISubmissionColumnAttributes[];
}
export interface ISubmissionSectionAttributes {
  title: string;
  details: string;
  submissionRows: ISubmissionRowAttributes[];
}

export interface ICreateSubmissionAttributes {
  applicationId: string;
  // submissionSections: ISubmissionSectionAttributes[];
  sectionFields: IFilledInputAttributes[];
}
