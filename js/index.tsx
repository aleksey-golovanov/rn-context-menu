import React, { FC, ReactNode } from "react";
import { ViewProps } from "react-native";

import ContextMenuView from "./RNContextMenuNativeComponent";

export type ContextMenuProps = {
  title?: string;
  actions: {
    title: string;
    onPress?: () => void;
    iosSystemImageName?: string;
  }[];
  children: ReactNode;
};

export const ContextMenu: FC<ContextMenuProps & ViewProps> = ({
  title,
  actions,
  children,
  ...rest
}) => {
  return (
    <ContextMenuView
      title={title}
      actions={actions}
      onActionPress={(e) => {
        const handler = actions[e.nativeEvent.index]?.onPress;

        if (handler) {
          handler();
        }
      }}
      {...rest}
    >
      {children}
    </ContextMenuView>
  );
};
