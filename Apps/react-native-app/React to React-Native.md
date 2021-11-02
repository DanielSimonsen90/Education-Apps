
## [Docs](https://reactnative.dev/docs/getting-started)
[Adding Sass to react-native project](https://blog.logrocket.com/sass-react-native-guide/)

### Views
#### React
```html
<div>
    <p>Hello, World!</p>
    <img src="../assets/myImage.png" />
    <img src="https://www.streamscheme.com/wp-content/uploads/2020/04/Pogchamp.png" style="width: 200px; height: 300px" />
</div>
```
#### React-Native
```jsx
<SafeAreaView>
    <Text>Hello, World!</Text>
    <Image source={require('../assets/myImage.png')} />
    <Image source={{
        uri: "https://www.streamscheme.com/wp-content/uploads/2020/04/Pogchamp.png",
        width: 200,
        height: 300
    }} />
</SafeAreaView>
```
*Difference between SafeAreaView & View from react-native, is SafeAreaView will make sure that the view doesn't go beyond the phone ratio, whereas View is morelike a div*
...but for some reason, this only works on iOS. You will have to add extra margin to Android devices.

---

### Touchables
* TouchableOpacity: When user touches the container, the container does a fade animation
* TouchableHighlight: When user touches the container, the container becomes dark for a slight moment
* TouchableWithoutFeedback: When user touches container, nothing changes in the UI
* TouchableNativeFeedback: When user touches container, a dark circle animates from center to edges - **Android only feature**

### Alert
When using alerts, you can use Alert from react-native as a static class utility - **Alert is __not__ a component!**
Both Android and iOS understand Alert.alert(), but only iOS understands Alert.prompt.

### Dynamic Styles
In many occasions, styles should be applied depending on the device type:
```js
const style = {
    backgroundColor: Platform.OS === 'android' ? 'limegreen' : 'red'
}
```
Platform.OS is a type, so the string will give you specific choices.

 ### Device Dimension
 To detect device dimensions, use the `@react-native-community/hooks` module and import the useDimensions or useDeviceOrientation hook.
 * useDimensions: Returns object of precise pixels on width & height
 * useDeviceOrientation: Returns two booleans: landscape & portrait, to indicate which mode the app is in.

 If you want to support landscape or both portrait & landscape mode, edit the orientation in app.json. If you wish to support both, set to "default".

 ### Navigation
 To do any kind of navigation, like react-router-dom, react-native has something similar: **@react-navigation/native @react-navigation/native-stack**
 This method is a mixture of react-router-dom's way of doing routes, with a pinch of the Context system from React.

 ```jsx
import react from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Dashboard from '../components/screens/Dashboard';
import Profile from '../components/screens/Profile';

const Stack = createNativeStackNavigator();

export default function MyStack() { 
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Dashboard" component={Dashboard} options={{ /* Additional props goes here */ }} />
                <Stack.Screen name="Profile" component={Profile} />
            </Stack.Navigator>
        </NavigationContainer>  
    );
}
 ```

 Every "screen" component includes a few properties, one of which is the **navigation** property. This is used to navigate between the Stack.Screen items in Stack.Navigator
 ```jsx
import react from 'react';
import { Button } from 'react-native';

export default function Profile({ navigation, route }) {
    return (
        <Button 
            title="Go to your dashboard" 
            onPress={() => navigation.navigate('Dashboard', { /* Additional props goes here, and are stored in route.params */ })}
        />
    )
}
 ```