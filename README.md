# iOS Context Menu for React Native

Fabric Native Component wrapper for iOS [`UIContextMenuInteraction`](https://developer.apple.com/documentation/uikit/uicontextmenuinteraction). Currently does nothing on Android.

<img src="./assets/recording.gif" width="250">

## Installation

```bash
npm i @aleksei-golovanov/rn-context-menu
cd ios/
RCT_NEW_ARCH_ENABLED=1 bundle exec pod install
```

## Usage

```javascript
import {
  ContextMenu,
  ContextMenuAction,
} from "@aleksei-golovanov/rn-context-menu";

const title = "Select what to do";

const actions: ContextMenuAction[] = [
  {
    title: "share",
    onPress: () => console.log("shared"),
    iosSystemImageName: "square.and.arrow.up",
  },
  {
    title: "like",
    onPress: () => console.log("liked"),
    iosSystemImageName: "hand.thumbsup",
  },
  {
    title: "dislike",
    onPress: () => console.log("disliked"),
    iosSystemImageName: "hand.thumbsdown",
    disabled: true,
  },
  {
    title: "delete",
    onPress: () => console.log("deleted"),
    iosSystemImageName: "trash",
    destructive: true,
  },
];

const DogCard = () => (
  <View style={styles.container}>
    <Image source={require("./dog.jpg")} style={styles.image} />
    <Text style={styles.title}>DOG</Text>
  </View>
);

function App(): React.JSX.Element {
  return (
    <SafeAreaView>
      <ContextMenu title={title} actions={actions} style={styles.view}>
        <DogCard />
      </ContextMenu>
      <ContextMenu
        title={title}
        actions={actions}
        style={styles.view}
        preview={<DogCard />}
      >
        <Text style={styles.text}>CUSTOM PREVIEW</Text>
      </ContextMenu>
    </SafeAreaView>
  );
}
```

## Props

#### `title?: string`

The title of the menu.

#### `actions: ContextMenuAction[]`

Menu actions

#### ContextMenuAction

`title: string;` action title \
`onPress?: () => void;` action handler \
`iosSystemImageName?: string;` [iOS system image](https://developer.apple.com/sf-symbols/) (SF Symbol) \
`disabled?: boolean;` action is disabled \
`destructive?: boolean;` action is [desctructive](https://developer.apple.com/documentation/uikit/uimenuelementattributes/uimenuelementattributesdestructive)

#### `preview?: ReactElement<ViewProps>`

Custom preview component
