import React, { FC } from "react";
import { View, ViewProps } from "react-native";

import ContextMenuView from "./RNContextMenuNativeComponent";
import { ContextMenuProps, MenuAction } from "./types";
import { flattenMenuTree } from "./utils/flatten-menu-tree";

export const ContextMenu: FC<ContextMenuProps & ViewProps> = ({
  menu,
  preview,
  children,
  ...rest
}) => (
  <ContextMenuView
    menu={flattenMenuTree(menu)}
    onActionPress={(e) => {
      const handler = (menu.children[e.nativeEvent.index] as MenuAction)
        ?.onPress;

      if (handler) {
        handler();
      }
    }}
    {...rest}
  >
    {preview ? (
      <View style={{ position: "absolute" }} nativeID="preview-provider">
        {preview}
      </View>
    ) : null}
    {children}
  </ContextMenuView>
);

export type { Menu, SubMenu, MenuAction, ContextMenuProps } from "./types";
