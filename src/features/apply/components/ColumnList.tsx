import ColumnItem from "./ColumnItem";
import { useAppSelector } from "../../../app/hooks";
import { selectRowColumns } from "../applySlice";
import { IRow } from "../../applications/applications.interface";
import { splitColumnsArray } from "../../../utils/splitColumns";

interface IProps {
  row: IRow;
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
            disabled={disabled}
          />
        ))
      )}

      {/* {rowColumns?.map((column) => (
        <ColumnItem
          key={column.id}
          span={24 / rowColumns.length}
          column={column}
          disabled={disabled}
        />
      ))} */}
    </>
  );
}
