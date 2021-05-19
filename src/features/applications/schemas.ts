import { schema } from "normalizr";

const columnSchema = new schema.Entity("columns");

const rowSchema = new schema.Entity("rows", {
  columns: [columnSchema],
});

const sectionSchema = new schema.Entity("sections", {
  rows: [rowSchema],
});

export const ApplicationSchema = new schema.Entity("applications", {
  sections: [sectionSchema],
});

export const SectionSchema = new schema.Entity("sections", {
  rows: [rowSchema],
  application: new schema.Entity("applications"),
});
