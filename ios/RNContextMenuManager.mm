#import <React/RCTLog.h>
#import <React/RCTUIManager.h>
#import <React/RCTViewManager.h>

@interface RNContextMenuManager : RCTViewManager
@end

@implementation RNContextMenuManager

RCT_EXPORT_MODULE(RNContextMenu)

RCT_EXPORT_VIEW_PROPERTY(actions, NSArray)

RCT_EXPORT_VIEW_PROPERTY(onActionPress, RCTDirectEventBlock)

@end
