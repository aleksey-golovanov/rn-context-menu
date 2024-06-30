import { ReactElement, ReactNode } from "react";
import { ViewProps } from "react-native";

export type Menu = {
  title?: string;
  children: (MenuAction | SubMenu)[];
};

export type SubMenu = {
  title?: string;
  iosSystemImageName?: string;
  destructive?: boolean;
  displayInline?: boolean;
  children: (MenuAction | SubMenu)[];
};

export type MenuAction = {
  title: string;
  iosSystemImageName?: string;
  disabled?: boolean;
  destructive?: boolean;
  onPress?: () => void;
};

export type ContextMenuProps = {
  menu: Menu;
  children: ReactNode;
  preview?: ReactElement<ViewProps>;
};
