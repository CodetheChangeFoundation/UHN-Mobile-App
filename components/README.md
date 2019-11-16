# Importing Components

Import the named components from their respective folders, e.g.:

```
import { Container, Content, Header, View } from "../components/layout";
import { Text } from "../components/typography";
import { Button, Switch } from "../components/buttons";
import { Form, Input } from "../components/forms";
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
<Button variant="alarm" />
```

Props:

- variant: changes the appearance of the button
  - optional
  - type: one of "primary", "secondary", "alarm", "urgent"
  - default: "primary"


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

## Forms

**Form**

Every input should be wrapped in a Form element. This allows scrolling and keyboard dismissal on touch.

**Input**

```
<Form>
  <Input
    label="Phone Number"
    variant="number"
  />
</Form>
```

Props:

- label: acts as the placeholder, then floats up once the Input is selected
  - required
  - type: string
- variant: changes the keyboard type
  - optional
  - type: one of "text", "number"
  - default: "text"
- hasNext: set to true if onSubmitEditing is linked to another Input (see below)
  - optional
  - type: boolean
  - default: false

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

## Layout

Layout is based on NativeBase's structure.
- Container encapsulates the entire screen
- Header is the static header at the top of the screen, used for navigation
- Content is the main part of the screen (scrollable in iOS)
- Banner is a fixed-height element, used to wrap a row of components inside Content

```
<Container>
  <Header>
    User Profile
  </Header>
  <Content>
    <Banner />
    ...
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
    - "primary", "secondary", "alarm", "urgent" (used in the Button component)
  - default: "body"
