import React, { FC, ReactNode } from "react";
import { View, ViewProps } from "react-native";

export type ContextMenuProps = {
  children: ReactNode;
};

export const ContextMenu: FC<ContextMenuProps & ViewProps> = ({
  children,
  ...rest
}) => {
  return <View {...rest}>{children}</View>;
};
