import ColumnItem from "./ColumnItem";
import { useAppSelector } from "../../../app/hooks";
import { selectRowColumns } from "../applicationsSlice";
import { IRow } from "../applications.interface";
import { splitColumnsArray } from "../../../utils/splitColumns";

interface IProps {
  row: IRow;
  sectionId: number;
  disabled?: boolean;
  setOpenElementDrawer?: (columnId: number) => void;
}

export default function ColumnList({ row, disabled }: IProps) {
  const allRowColumns = useAppSelector(selectRowColumns(row.id));

  const rowColumns = splitColumnsArray(allRowColumns!);

  return (
    <>
      {rowColumns?.map((columns) =>
        columns.map((column) => (
          <ColumnItem
            key={column.id}
            span={24 / columns.length}
            column={column}
            row={row}
            disabled={disabled}
          />
        ))
      )}

      {/* 
      {allRowColumns?.map((column) => (
        <ColumnItem
          key={column.id}
          span={24 / allRowColumns.length}
          column={column}
          row={row}
          disabled={disabled}
        />
      ))} */}
    </>
  );
}
