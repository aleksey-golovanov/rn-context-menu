import { UIMenuElement } from "../RNContextMenuNativeComponent";
import { Menu, MenuAction, SubMenu } from "../types";

export const flattenMenuTree = (menu: Menu): UIMenuElement[] => {
  let currentId = 0;

  const allElements: UIMenuElement[] = [];

  const traverseMenu = (menu: Menu): UIMenuElement[] => {
    const menuElement: UIMenuElement = {
      id: currentId,
      title: menu.title,
      children: [],
    };

    allElements.push(menuElement);

    menu.children.forEach((child) => {
      if ("children" in child) {
        traverseSubMenu(menuElement, child);
      } else {
        processMenuAction(menuElement, child);
      }
    });

    return allElements;
  };

  const traverseSubMenu = (parent: UIMenuElement, child: SubMenu): void => {
    currentId++;

    const menuElement: UIMenuElement = {
      id: currentId,
      title: child.title,
      iosSystemImageName: child.iosSystemImageName,
      destructive: child.destructive,
      displayInline: child.displayInline,
      isSubMenu: true,
      children: [],
    };

    allElements.push(menuElement);

    parent.children?.push(currentId);

    if (child.children.length > 0) {
      child.children.forEach((child) => {
        if ("children" in child) {
          traverseSubMenu(menuElement, child as SubMenu);
        } else {
          processMenuAction(menuElement, child);
        }
      });
    }
  };

  const processMenuAction = (
    parent: UIMenuElement,
    child: MenuAction
  ): void => {
    currentId++;

    const actionElement = {
      id: currentId,
      title: child.title,
      iosSystemImageName: child.iosSystemImageName,
      disabled: child.disabled,
      destructive: child.destructive,
      isSubMenu: false,
    };

    allElements.push(actionElement);

    parent.children?.push(currentId);
  };

  return traverseMenu(menu);
};
