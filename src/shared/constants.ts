export const DRAWER_TYPES = {
  SECTION_LAYOUT_PICKER_DRAWER: "SECTION_LAYOUT_PICKER_DRAWER",
  ROW_LAYOUT_PICKER_DRAWER: "ROW_LAYOUT_PICKER_DRAWER",
  ENTER_SECTION_INFO_DRAWER: "ENTER_SECTION_INFO_DRAWER",
  INPUT_PICKER_DRAWER: "INPUT_PICKER_DRAWER",
  INPUT_OPTIONS_DRAWER: "INPUT_OPTIONS_DRAWER",
  NEW_APPLICATION_DRAWER: "NEW_APPLICATION_DRAWER",
};

export const INPUT_TYPES = {
  NUMBER_INPUT: "NumberInput",
  TEXT_INPUT: "TextInput",
  DATE_PICKER_INPUT: "DatePickerInput",
  CHECKBOX_INPUT: "CheckboxInput",
  UPLOAD_INPUT: "UploadInput",
};

export const INPUTS = [
  { name: "Number Input", type: INPUT_TYPES.NUMBER_INPUT },
  { name: "Text Input", type: INPUT_TYPES.TEXT_INPUT },
  { name: "Date Picker", type: INPUT_TYPES.DATE_PICKER_INPUT },
  { name: "Checkbox", type: INPUT_TYPES.CHECKBOX_INPUT },
  { name: "File Upload", type: INPUT_TYPES.UPLOAD_INPUT },
];

export const GUTTER = { xs: 8, sm: 16, md: 24, lg: 32 };

export const COLS_PER_ROW = { ONE: 1, TWO: 2, THREE: 3 };
