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
