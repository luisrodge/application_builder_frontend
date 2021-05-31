import { IColumn } from "../features/applications/applications.interface";

export function splitColumnsArray(columns: IColumn[]) {
  var R = [];
  for (var i = 0; i < columns.length; i += 4) R.push(columns.slice(i, i + 4));
  return R;
}
