import tape from "tape"; // Adjust the import path accordingly
import { flattenMenuTree } from "../utils/flatten-menu-tree";
import { Menu } from "../types";
import { UIMenuElement } from "../RNContextMenuNativeComponent";

tape("flattenMenuTree", (t) => {
  t.test("should flatten a simple menu", (t) => {
    const menu: Menu = {
      title: "Root Menu",
      children: [
        {
          title: "Action 1",
          onPress: () => console.log("Action 1 pressed"),
        },
      ],
    };

    const result: UIMenuElement[] = flattenMenuTree(menu);

    t.deepEqual(result, [
      { id: 0, title: "Root Menu", children: [1] },
      {
        id: 1,
        title: "Action 1",
        iosSystemImageName: undefined,
        disabled: undefined,
        destructive: undefined,
        isSubMenu: false,
      },
    ]);

    t.end();
  });

  t.test("should flatten a nested menu with submenus", (t) => {
    const menu: Menu = {
      title: "Root Menu",
      children: [
        {
          title: "Sub Menu 1",
          iosSystemImageName: "icon1",
          children: [
            {
              title: "Sub Menu 1.1",
              iosSystemImageName: "icon1.1",
              children: [],
            },
            {
              title: "Action 1.2",
              onPress: () => console.log("Action 1.2 pressed"),
            },
          ],
        },
        {
          title: "Action 2",
          onPress: () => console.log("Action 2 pressed"),
        },
      ],
    };

    const result: UIMenuElement[] = flattenMenuTree(menu);

    t.deepEqual(result, [
      { id: 0, title: "Root Menu", children: [1, 4] },
      {
        id: 1,
        title: "Sub Menu 1",
        iosSystemImageName: "icon1",
        destructive: undefined,
        displayInline: undefined,
        isSubMenu: true,
        children: [2, 3],
      },
      {
        id: 2,
        title: "Sub Menu 1.1",
        iosSystemImageName: "icon1.1",
        destructive: undefined,
        displayInline: undefined,
        isSubMenu: true,
        children: [],
      },
      {
        id: 3,
        title: "Action 1.2",
        iosSystemImageName: undefined,
        disabled: undefined,
        destructive: undefined,
        isSubMenu: false,
      },
      {
        id: 4,
        title: "Action 2",
        iosSystemImageName: undefined,
        disabled: undefined,
        destructive: undefined,
        isSubMenu: false,
      },
    ]);

    t.end();
  });

  t.test("should flatten a menu with mixed actions and submenus", (t) => {
    const menu: Menu = {
      title: "Root Menu",
      children: [
        {
          title: "Action 1",
          onPress: () => console.log("Action 1 pressed"),
        },
        {
          title: "Sub Menu 1",
          iosSystemImageName: "icon1",
          children: [
            {
              title: "Action 1.1",
              onPress: () => console.log("Action 1.1 pressed"),
            },
            {
              title: "Sub Menu 1.2",
              iosSystemImageName: "icon1.2",
              children: [],
            },
          ],
        },
      ],
    };

    const result: UIMenuElement[] = flattenMenuTree(menu);

    t.deepEqual(result, [
      { id: 0, title: "Root Menu", children: [1, 2] },
      {
        id: 1,
        title: "Action 1",
        iosSystemImageName: undefined,
        disabled: undefined,
        destructive: undefined,
        isSubMenu: false,
      },
      {
        id: 2,
        title: "Sub Menu 1",
        iosSystemImageName: "icon1",
        destructive: undefined,
        displayInline: undefined,
        isSubMenu: true,
        children: [3, 4],
      },
      {
        id: 3,
        title: "Action 1.1",
        iosSystemImageName: undefined,
        disabled: undefined,
        destructive: undefined,
        isSubMenu: false,
      },
      {
        id: 4,
        title: "Sub Menu 1.2",
        iosSystemImageName: "icon1.2",
        destructive: undefined,
        displayInline: undefined,
        isSubMenu: true,
        children: [],
      },
    ]);

    t.end();
  });
});
