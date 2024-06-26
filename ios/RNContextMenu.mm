#import "RNContextMenu.h"

#import <react/renderer/components/RNContextMenuSpecs/ComponentDescriptors.h>
#import <react/renderer/components/RNContextMenuSpecs/EventEmitters.h>
#import <react/renderer/components/RNContextMenuSpecs/Props.h>
#import <react/renderer/components/RNContextMenuSpecs/RCTComponentViewHelpers.h>

#import "RCTFabricComponentsPlugins.h"

using namespace facebook::react;

@interface RNContextMenu () <RCTRNContextMenuViewProtocol, UIContextMenuInteractionDelegate>
@end

@implementation RNContextMenu {
    UIView *_previewProvider;
}

+ (ComponentDescriptorProvider)componentDescriptorProvider {
    return concreteComponentDescriptorProvider<RNContextMenuComponentDescriptor>();
}

- (instancetype)initWithFrame:(CGRect)frame {
    if (self = [super initWithFrame:frame]) {
        static const auto defaultProps = std::make_shared<const RNContextMenuProps>();
        _props = defaultProps;
    }

    if (@available(iOS 13.0, *)) {
        UIContextMenuInteraction* contextInteraction = [[UIContextMenuInteraction alloc] initWithDelegate:self];
        [self addInteraction:contextInteraction];
    }

    return self;
}

- (nullable UIContextMenuConfiguration *)contextMenuInteraction:(nonnull UIContextMenuInteraction *)interaction configurationForMenuAtLocation:(CGPoint)location API_AVAILABLE(ios(13.0)) {
    const auto &props = *std::static_pointer_cast<RNContextMenuProps const>(_props);
    
    const auto actions = props.actions;
    const auto title = props.title;
    
    return [UIContextMenuConfiguration configurationWithIdentifier:nil previewProvider: ^UIViewController * _Nullable {
        if (self->_previewProvider == nil) {
            return nil;
        } else {
            UIViewController *viewController = [[UIViewController alloc] init];
            viewController.preferredContentSize = self->_previewProvider.frame.size;
            viewController.view = self->_previewProvider;
            return viewController;
        }
    } actionProvider:^UIMenu * _Nullable(NSArray<UIMenuElement *> * _Nonnull suggestedActions) {
        NSMutableArray<UIAction *> *uiActions = [NSMutableArray arrayWithCapacity:actions.size()];

        for (size_t i = 0; i < actions.size(); ++i) {
            NSString *actionName = [NSString stringWithUTF8String:actions[i].title.c_str()];
            NSString *actionImage = [NSString stringWithUTF8String:actions[i].iosSystemImageName.c_str()];

            UIAction *uiAction = [UIAction actionWithTitle:actionName image:[UIImage systemImageNamed:actionImage] identifier:nil handler:^(__kindof UIAction * _Nonnull action) {
                if (self->_eventEmitter != nullptr) {
                    std::dynamic_pointer_cast<const facebook::react::RNContextMenuEventEmitter>(self->_eventEmitter)->onActionPress({.index =  static_cast<int>(i)});
                }
            }];

            [uiActions addObject:uiAction];
        }

        return [UIMenu menuWithTitle:[NSString stringWithUTF8String:title.c_str()] children:uiActions];
    }];
}

- (void)mountChildComponentView:(UIView<RCTComponentViewProtocol> *)childComponentView index:(NSInteger)index {
    const auto &props = *std::static_pointer_cast<facebook::react::ViewProps const>(childComponentView.props);
    const auto nativeId = props.nativeId;

    if ([[NSString stringWithUTF8String:nativeId.c_str()] isEqual:@"preview-provider"]) {
        _previewProvider = childComponentView;
        return;
    }

    [super mountChildComponentView:childComponentView index:index];
}

@end

Class<RCTComponentViewProtocol> RNContextMenuCls(void) {
    return RNContextMenu.class;
}
