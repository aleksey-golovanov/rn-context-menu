import type { HostComponent, ViewProps } from "react-native";
import type {
  DirectEventHandler,
  Int32,
} from "react-native/Libraries/Types/CodegenTypes";
import codegenNativeComponent from "react-native/Libraries/Utilities/codegenNativeComponent";

export type UIMenuElement = {
  id: Int32;
  title?: string;
  iosSystemImageName?: string;
  disabled?: boolean;
  destructive?: boolean;
  displayInline?: boolean;
  children?: Int32[];
  isSubMenu?: boolean;
};

export type ActionPressEvent = { index: Int32 };

export interface NativeProps extends ViewProps {
  menu: UIMenuElement[];
  onActionPress: DirectEventHandler<ActionPressEvent>;
}

export default codegenNativeComponent<NativeProps>(
  "RNContextMenu"
) as HostComponent<NativeProps>;
