import { ReactNode } from "react";
import { Drawer } from "antd";

import { EventType } from "../../shared/types";

interface IProps {
  closeDrawer: (event: EventType) => void;
  children: ReactNode;
  title: string;
  isOpen: boolean;
  width: number | string;
}

const DrawerContainer = ({
  closeDrawer,
  children,
  title,
  isOpen,
  width,
}: IProps) => {
  return (
    <>
      <Drawer
        title={title}
        width={width}
        onClose={closeDrawer}
        visible={isOpen}
      >
        {children}
      </Drawer>
    </>
  );
};

export default DrawerContainer;
