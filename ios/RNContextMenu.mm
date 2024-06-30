#import "RNContextMenu.h"

#import <react/renderer/components/RNContextMenuSpecs/ComponentDescriptors.h>
#import <react/renderer/components/RNContextMenuSpecs/EventEmitters.h>
#import <react/renderer/components/RNContextMenuSpecs/Props.h>
#import <react/renderer/components/RNContextMenuSpecs/RCTComponentViewHelpers.h>

#import "RCTFabricComponentsPlugins.h"

using namespace facebook::react;



@interface RNContextMenu () <RCTRNContextMenuViewProtocol, UIContextMenuInteractionDelegate> {
    @private
    std::shared_ptr<const RNContextMenuProps> contextMenuProps;
}
@end

@implementation RNContextMenu {
    UIView *_previewProvider;
}

+ (ComponentDescriptorProvider)componentDescriptorProvider {
    return concreteComponentDescriptorProvider<RNContextMenuComponentDescriptor>();
}

+ (std::vector<RNContextMenuMenuStruct>::const_iterator)findMenuById:(const std::vector<RNContextMenuMenuStruct>&)menu id:(int)id {
    return std::find_if(menu.begin(), menu.end(), [id](const RNContextMenuMenuStruct& item) {
        return item.id == id;
    });
}

- (void)updateProps:(Props::Shared const &)props oldProps:(Props::Shared const &)oldProps
{
    contextMenuProps = std::static_pointer_cast<RNContextMenuProps const>(props);

    [super updateProps:props oldProps:oldProps];
}

- (NSMutableArray<UIMenuElement *> *)getMenuElementsForChildren:(const std::vector<int> &)children {
    NSMutableArray<UIMenuElement *> *uiMenuElements = [NSMutableArray arrayWithCapacity:children.size()];

    for (size_t i = 0; i < children.size(); ++i) {
        const auto &child = [RNContextMenu findMenuById:contextMenuProps->menu id:children[i]];

        NSString *title = [NSString stringWithUTF8String:child->title.c_str()];
        NSString *image = [NSString stringWithUTF8String:child->iosSystemImageName.c_str()];

        if(child->isSubMenu) {
            UIMenu *uiMenu = [UIMenu menuWithTitle:title image:nil identifier:nil options:child->displayInline ? UIMenuOptionsDisplayInline : 0 children:[self getMenuElementsForChildren:child->children]];

            [uiMenuElements addObject:uiMenu];
        } else {
            UIAction *uiAction = [UIAction actionWithTitle:title image:[UIImage systemImageNamed:image] identifier:nil handler:^(__kindof UIAction * _Nonnull action) {
                if (self->_eventEmitter != nullptr) {
                    std::dynamic_pointer_cast<const facebook::react::RNContextMenuEventEmitter>(self->_eventEmitter)->onActionPress({.index = static_cast<int>(i)});
                }
            }];

            uiAction.attributes = (child->destructive ? UIMenuElementAttributesDestructive : 0) | (child->disabled ? UIMenuElementAttributesDisabled : 0);

            [uiMenuElements addObject:uiAction];
        }
    }

    return uiMenuElements;
}

- (instancetype)initWithFrame:(CGRect)frame {
    if (self = [super initWithFrame:frame]) {
        contextMenuProps = std::static_pointer_cast<RNContextMenuProps const>(_props);
    }

    if (@available(iOS 13.0, *)) {
        UIContextMenuInteraction* contextInteraction = [[UIContextMenuInteraction alloc] initWithDelegate:self];
        [self addInteraction:contextInteraction];
    }

    return self;
}

- (nullable UIContextMenuConfiguration *)contextMenuInteraction:(nonnull UIContextMenuInteraction *)interaction configurationForMenuAtLocation:(CGPoint)location API_AVAILABLE(ios(13.0)) {
    const auto rootMenu = contextMenuProps->menu[0];

    const auto children = rootMenu.children;
    const auto title = rootMenu.title;

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
        return [UIMenu menuWithTitle:[NSString stringWithUTF8String:title.c_str()] children:[self getMenuElementsForChildren:children]];
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
