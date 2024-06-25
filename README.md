# rn-context-menu

Fabric Native Component wrapper for iOS [`UIContextMenuInteraction`](https://developer.apple.com/documentation/uikit/uicontextmenuinteraction). Currently does nothing on Android.

<img src="./assets/recording.gif" width="250">

## Usage

```javascript
import { ContextMenu } from "@aleksei-golovanov/rn-context-menu";

function App(): React.JSX.Element {
  return (
    <SafeAreaView>
      <ContextMenu
        title="Select what to do"
        actions={[
          {
            title: "share",
            onPress: () => {
              console.log("shared");
            },
            iosSystemImageName: "square.and.arrow.up",
          },
          {
            title: "like",
            onPress: () => {
              console.log("liked");
            },
            iosSystemImageName: "hand.thumbsup",
          },
        ]}
        style={styles.view}
      >
        <Image source={require("./dog.jpg")} style={styles.image} />
        <Text style={styles.text}>DOG</Text>
      </ContextMenu>
    </SafeAreaView>
  );
}
```

## Props

#### `title?: string`

The title of the menu.

#### `actions: { title: string; onPress?: () => void; iosSystemImageName?: string; }[]`

- `title` action title
- `onPress` action handler
- `iosSystemImageName` [iOS system image](https://developer.apple.com/sf-symbols/)
