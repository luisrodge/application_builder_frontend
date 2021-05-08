import EmptyColumn from "./EmptyColumn";

import { useAppSelector } from "../../app/hooks";
import { selectRowColumns, selectSection } from "./designerSlice";

interface IProps {
  rowId: string;
  sectionId: string;
  setOpenElementDrawer?: (columnId: number) => void;
}

const Columns = ({ rowId, sectionId }: IProps) => {
  const rowColumns = useAppSelector(selectRowColumns(rowId));
  const section = useAppSelector(selectSection(sectionId));

  return (
    <>
      {rowColumns?.map((column) => (
        <EmptyColumn
          key={column.id}
          span={24 / rowColumns.length}
          column={column}
        />
      ))}
    </>
  );
};

export default Columns;
