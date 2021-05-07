import { Row } from "antd";

import Columns from "./Columns";
import { GUTTER } from "../../utils/theme";
import { useAppSelector } from "../../app/hooks";
import { selectSectionRows } from "./designerSlice";

interface IProps {
  sectionId: string;
  setOpenElementDrawer?: (columnId: number) => void;
}

const Rows = ({ sectionId }: IProps) => {
  const sectionRows = useAppSelector(selectSectionRows(sectionId));

  return (
    <>
      {" "}
      {sectionRows?.map((row) => (
        <Row gutter={GUTTER.lg} key={row.id}>
          <Columns rowId={row.id} sectionId={sectionId} />
        </Row>
      ))}
    </>
  );
};

export default Rows;
