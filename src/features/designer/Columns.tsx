import Column from "./Column";
import { useAppSelector } from "../../app/hooks";
import { selectRowColumns } from "./designerSlice";
import { IRow } from "./designer.interface";

interface IProps {
  row: IRow;
  sectionId: string;
  setOpenElementDrawer?: (columnId: number) => void;
}

const Columns = ({ row, sectionId }: IProps) => {
  const rowColumns = useAppSelector(selectRowColumns(row.id));

  return (
    <>
      {rowColumns?.map((column) => (
        <Column
          key={column.id}
          span={24 / rowColumns.length}
          column={column}
          row={row}
        />
      ))}
    </>
  );
};

export default Columns;
