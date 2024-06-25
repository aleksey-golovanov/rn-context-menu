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
