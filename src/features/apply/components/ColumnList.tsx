import ColumnItem from "./ColumnItem";
import { useAppSelector } from "../../../app/hooks";
import { selectRowColumns } from "../applySlice";
import { IRow } from "../../applications/applications.interface";

interface IProps {
  row: IRow;
  disabled?: boolean;
  setOpenElementDrawer?: (columnId: number) => void;
}

export default function ColumnList({ row, disabled }: IProps) {
  const rowColumns = useAppSelector(selectRowColumns(row.id));

  return (
    <>
      {rowColumns?.map((column) => (
        <ColumnItem
          key={column.id}
          span={24 / rowColumns.length}
          column={column}
          disabled={disabled}
        />
      ))}
    </>
  );
}
