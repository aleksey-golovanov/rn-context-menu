import React, { FC, ReactElement, ReactNode } from "react";
import { View, ViewProps } from "react-native";

import ContextMenuView from "./RNContextMenuNativeComponent";

export type ContextMenuProps = {
  title?: string;
  preview?: ReactElement<ViewProps>;
  actions: {
    title: string;
    onPress?: () => void;
    iosSystemImageName?: string;
  }[];
  children: ReactNode;
};

export const ContextMenu: FC<ContextMenuProps & ViewProps> = ({
  title,
  preview,
  actions,
  children,
  ...rest
}) => (
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
    {preview ? (
      <View style={{ position: "absolute" }} nativeID="preview-provider">
        {preview}
      </View>
    ) : null}
    {children}
  </ContextMenuView>
);
