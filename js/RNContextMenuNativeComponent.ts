import type { HostComponent, ViewProps } from "react-native";
import type {
  DirectEventHandler,
  Int32,
} from "react-native/Libraries/Types/CodegenTypes";
import codegenNativeComponent from "react-native/Libraries/Utilities/codegenNativeComponent";

export type ActionPressEvent = { index: Int32 };

export interface NativeProps extends ViewProps {
  title?: string;
  actions: { title: string; iosSystemImageName?: string }[];
  onActionPress: DirectEventHandler<ActionPressEvent>;
}

export default codegenNativeComponent<NativeProps>(
  "RNContextMenu"
) as HostComponent<NativeProps>;
