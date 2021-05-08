import React, { ReactNode } from "react";
import { Drawer as AntdDrawer } from "antd";

import { EventType } from "../shared/types";

interface IProps {
  children: ReactNode;
  title: string;
  isOpen: boolean;
  width: number | string;
  closeDrawer: (event: EventType) => void;
}

const Drawer = ({ children, ...props }: IProps) => {
  const { title, isOpen, width, closeDrawer } = props;

  return (
    <AntdDrawer
      title={title}
      placement="right"
      onClose={closeDrawer}
      visible={isOpen}
      width={width}
    >
      {children}
    </AntdDrawer>
  );
};

export default Drawer;
