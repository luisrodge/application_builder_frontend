import Column from "./Column";
import { useAppSelector } from "../../app/hooks";
import { selectRowColumns } from "./applicationSlice";
import { IRow } from "./application.interface";

interface IProps {
  row: IRow;
  sectionId: string;
  disabled?: boolean;
  setOpenElementDrawer?: (columnId: number) => void;
}

const Columns = ({ row, sectionId, disabled }: IProps) => {
  const rowColumns = useAppSelector(selectRowColumns(row.id));

  return (
    <>
      {rowColumns?.map((column) => (
        <Column
          key={column.id}
          span={24 / rowColumns.length}
          column={column}
          row={row}
          disabled={disabled}
        />
      ))}
    </>
  );
};

export default Columns;
