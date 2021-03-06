# Importing Components

Import the named components from their respective folders, e.g.:

```
import { Container, Content, Header, View } from "../components/layout";
import { Text } from "../components/typography";
import { Button, Switch } from "../components/buttons";
import { Form, Input } from "../components/forms";
import Timer from "../components/Timer/Timer";
```

Note: if you add a new file to the components/ folder, Expo might give you an error like

> Invariant Violation: Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.

To resolve this, try restarting Expo and clearing its cache.

```
expo start --clear
```

# Using Components

## Buttons

**Button**

```
<Button
  variant="warning"
  size="large"
  textStyles={{fontSize: 32}}
>
  Stop
</Button>
```

Props:

- variant: changes the appearance of the button
  - optional
  - type: one of "dark", "light", "affirmation", "warning"
  - default: "dark"
- size: changes the size of the button
  - optional
  - type: one of "medium", "large"
  - default: "medium"
- textStyles: additional styles to pass onto the Text component inside the Button
  - optional
  - type: object
- loadingText: text shown on the button when the "disabled" prop is set to true
  - optional
  - type: string


**Switch**

```
const [switchValue, setSwitchValue] = useState(true);

return(
  <Switch 
    value={switchValue} 
    onValueChange={(newValue) => {setSwitchValue(newValue)}}
  />
);
```

Props:

- onValueChange: use to update a state variable
  - required
  - type: function
- value: should be connected to the state variable
  - optional
  - type: boolean
  - default: true

**IconButton**

```
<IconButton variant="icon" name="md-pin" label="current location" />
<IconButton variant="counter" counterValue={3} label="responders available" />
```

Props:

- variant: determines what is displayed inside the button
  - optional
  - type: one of "counter", "icon"
  - default: "counter"
- label: the text underneath the button
  - optional
  - type: string
  - default: none
- name: the name of the icon (only used if variant == "icon"). For options, see https://ionicons.com/ (must prefix the name with "md-" or "ios-")
  - optional
  - type: string
  - default: "md-pin"
- counterValue: the current value of the counter (only used if variant == "counter")
  - optional
  - type: number
  - default: 0
- size: the size of the button
  - optional
  - type: number
  - default: 42
- color: the color of the button
  - optional
  - type: string
  - default: "#60A781" (green)
- onPress: the function to execute when the IconButton is pressed
  - optional
  - type: function
  - default: none

## Forms

**Form**

Every input should be wrapped in a Form element. This allows scrolling and keyboard dismissal on touch.

**Input**

```
<Form>
  <Input
    variant="email"
    label="Email"
    constraints={{presence: true, email: {message: "Email is not valid."}}}
    onChangeText=((newValue, isValid) => {console.log(newValue, isValid)})
  />
</Form>
```

Props:

- variant: changes the keyboard type
  - optional
  - type: one of "text", "password", "number"
  - default: "text"
- label: acts as the placeholder, then floats up once the Input is selected
  - required
  - type: string
- hasNext: set to true if onSubmitEditing is linked to another Input (see below)
  - optional
  - type: boolean
  - default: false
- constraints: the constraints object used to validate the input
  - optional
  - type: object, see https://validatejs.org/#validate-single
- onChangeText: the callback invoked whenever the user types into the Input
  - optional
  - type: function
    - if the constraints prop is supplied, onChangeText can take two parameters: onChangeText = (newValue, isValid) => {...}
    - otherwise, onChangeText can be defined as normal: onChangeText = (newValue) => {...}
- refresh: can be used to force the Input to validate. Every time refresh is toggled, Input will simulate a call to onChangeText using the current input value
  - optional
  - type: boolean

You can use refs to link multiple Inputs together. In the example below, pressing the return key on the Username field will shift focus to the Password field. 

```
let passwordInputRef = React.createRef();

return(
  <Form>
    <Input variant="text" 
      label="Username" 
      hasNext
      onSubmitEditing={() => passwordInputRef._root.focus()}
    />
    <Input variant="text" 
      label="Password" 
      ref={(input) => passwordInputRef = input}
    />
  </Form>
);
```

**SearchBar**

```
const [searchBarValue, setSearchBarValue] = useState("");

return (
  <SearchBar 
    placeholder="Search for a username"
    enableClearButton
    onChangeText={(newText) => setSearchBarValue(newText)}
    onClearButtonPress={() => setSearchBarValue("")}
    onSubmitEditing={() => console.log("Searched for", searchBarValue)} 
  />
);
```

Props:

- placeholder: the text shown when the SearchBar is empty
  - optional
  - type: string
- enableClearButton: set to true to enable a clear button that appears on focus
  - optional
  - type: boolean
  - default: true
- onChangeText: when the text is edited, captures the new value
  - required
  - type: function
- onClearButtonPress: when the clear button is pressed, the search bar text will be cleared. Use this to reset whatever variable you're using to capture the text
  - optional
  - type: function
- onSubmitEditing: callback for when the user enters text then presses the enter key
  - required
  - type: function

**Checkbox**

```
const [checkboxValue, setCheckboxValue] = useState(false);

<Checkbox 
  checked={checkboxValue}
  onPress={() => setCheckboxValue(!checkboxValue)} 
/>
</Form>
```

Props:

- checked: true if the checkbox is currently checked
  - required
  - type: boolean
- onPress: callback for when the checkbox is pressed
  - required
  - type: function

## Layout

Layout is based on NativeBase's structure.
- Container encapsulates the entire screen
- Header is the static header at the top of the screen, used for navigation
- Content is the main part of the screen (scrollable in iOS)
- Banner can be used to wrap a row of components inside Content
- View can be used for other page-specific formatting

```
<Container>
  <Header>
    User Profile
  </Header>
  <Content>
    <Banner> ... </Banner>
    <View> ... </View>
  </Content>
</Container>
```

**Header**

```
<Header leftButton="arrow" 
  onLeftButtonPress={() => this.props.navigation.goBack()}}>
  Home Screen 
</Header>
```

Props:

- leftButton: the icon that appears on the left edge of the header
  - optional
  - type: one of "arrow", "header"
  - default: none
- onLeftButtonPress: the function to execute when the left button (if present) is pressed
  - optional
  - type: function
  - default: none

**Segment**

```
<Segment active="left"
  leftText="Previous" rightText="Next"
  onRightButtonPress={() => handleLeftButtonPress()}
/>
<Segment active="right"
  leftText="Previous" rightText="Next"
  onLeftButtonPress={() => handleRightButtonPress()}
/>
```

Props:
- active: which button is active for the current screen
  - optional
  - type: one of "left", "right"
  - default: left
- leftText: the text to show on the left button
  - required
  - type: string
- rightText: the text to show on the right button
  - required
  - type: string
- onLeftButtonPress: the function to execute when the left button is pressed
  - optional
  - type: function
  - default: none
- onRightButtonPress: the function to execute when the right button is pressed
  - optional
  - type: function
  - default: none

**List & ListItem**

```
<List>
  <ListItem leftText="user123" rightText="available" />
  <ListItem leftText="user456" rightText="unavailable" />
</List>
```

Props:
- leftText: text on the left side of the ListItem
  - optional
  - type: string
  - default: none
- leftTextStyle: styling for the leftText
  - optional
  - type: object
  - default: heavy font, regular size (for usernames)
- rightText: text on the right side of the ListItem
  - optional
  - type: string
  - default: none
- rightTextStyle: styling for the rightText
  - optional
  - type: object
  - default: regular font, extra small size (for user availability status)

## Popups

**Modal**

```
const [modalVisible, setModalVisible] = useState(false);

const modalHeader="Logout";
const modalBody = (<Text>Are you sure?</Text>);
const modalFooterLeft = (<Button variant="secondary" onPress={() => setModalVisible(false)}>Cancel</Button>);
const modalFooterRight = (<Button variant="primary" onPress={() => Actions.auth()}>Logout</Button>);

return (
  <Modal
    modalVisible={modalVisible}
    modalHeader={modalHeader}
    modalBody={modalBody}
    modalFooterLeft={modalFooterLeft}
    modalFooterRight={modalFooterRight}
    onBackdropPress={() => setModalVisible(false)}
    onBackButtonPress={() => setModalVisible(false)}
  />
);
```

Props: 
- modalVisible: controls whether the modal is shown on-screen
  - required
  - type: boolean
- modalHeader: the header text of the modal
  - required
  - type: string
- modalBody: the body of the modal (usually a Text or List component)
  - required
  - type: element
- modalFooterLeft and modalFooterRight: the footer comoponents of the modal (probably Buttons). If you only need 1 footer component, leave either modalFooterLeft or modalFooterRight undefined; the other will be centered.
  - optional
  - type: element
  - default: none

**Alert**


```
const alertTitle = "Reminder";
const alertBody = "Please update your profile.",
const positiveButton = {
  text: "OK",
  onPress: () => console.log("Woo!")
};
const negativeButton = {
  text: "Cancel",
  style: "cancel"
};
const neutralButton = {
  text: "Later"
}
const onCancel = () => console.log("Cancelled");

return (
  <Alert
    alertTitle={alertTitle}
    alertBody={alertBody}
    positiveButton={positiveButton}
    negativeButton={negativeButton}
    neutralButton={neutralButton}
    cancelable={true}
    onCancel={onCancel}
  /> 
);
```

Props: 
- alertTitle: the title of the alert popup
  - required
  - type: string
- alertBody: the message inside the alert body
  - required
  - type: string
- positiveButton, negativeButton, neutralButton: buttons to dismiss the modal or perform other actions
  - positiveButton is required
  - if neutralButton is defined, then negativeButton must also be defined
  - type: object with properties
    - text: string (required)
    - style: one of "default", "cancel", "destructive"
    - onPress: function
- cancelable: if true, allows Android users to dismiss the alert by tapping on the background or pressing the hardware back button
  - type: boolean
  - default: true

## Typography

**Text**

```
<Text variant="title">Welcome</Text>
<Text variant="body">Sign in below</Text>
```

Props:

- variant: changes the text appearance
  - optional
  - type: one of
    - "body", "footnote", "title" (used for displaying text on screen)
    - "header" (used in the Header component)
    - "label" (used for very small text, e.g. button labels)
    - "numeral" (used for digits on the countdown timer)
  - default: "body"

## Timer

**Timer**

```
<Timer isUsing={true}/>
<Timer isUsing={false}/>
```

Props:

- using: specifies weather the Timer is in "using" mode (i.e. when the Timer is activated and starts counting)
  - required
  - type: boolean
   
**ProgressCircle**

```
<ProgressCircle 
  percentage={(1 - timeRemaining / time) * 100}
  seconds={timeRemaining} 
  increaseTimeHandler={this.incrementTimer} 
  decreaseTimeHandler={this.decrementTimer} 
/>
```

Props: 
- percentage: the percentage of the time remaining over the initial start time
  - required
  - type: number
- seconds: the time remaining in seconds 
  - required
  - type: number
- increaseTimeHandler: the function that increase the time remaining by 15 seconds
  - required
  - type: function
- decreaseTimeHandler: the function that decrease the time reamining by 15 seconds
  - required
  - type: function


**SetTimeButton**

```
<SetTimeButton changeTimeHandler={decreaseTimeHandler}>-15</SetTimeButton>
```

Props: 
- changeTimeHandler: the function that modifies the time
  - required
  - type: function
