# Importing Components

Import the named components from their respective folders, e.g.:

```
import { Container, Content, Header, View } from "../components/layout";
import { Text } from "../components/typography";
import { Button, Switch } from "../components/buttons";
import { Form, Input } from "../components/forms";
```

Note: if you add a new component to the components/ folder, you might need to clear Expo's cache before you can import that component into another file.

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
      onSubmitEditing={() => {passwordInputRef._root.focus();}}
    />
    <Input variant="text" 
      label="Password" 
      ref={(input) => {passwordInputRef = input;}}
    />
  </Form>
);
```

## Layout

Layout is based on NativeBase's structure. The View component can be used inside Content for additional layout/styling.

```
<Container>
  <Header>
    User Profile
  </Header>
  <Content>
    ...
  </Content>
</Container>
```

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
    - "body", "title" (used for displaying text on screen)
    - "header" (used in the Header component)
    - "primary", "secondary", "alarm", "urgent" (used in the Button component)
  - default: "body"
