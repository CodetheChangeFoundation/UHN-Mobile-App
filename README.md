# UHN-Mobile-App
University Health Network React Native Mobile Application

Some libraries used in this app:
- Notification and Location Services via `expo`
- Routing via `react-native-router-flux`
- Token Authentication via `jwt-decode`
- Maps via `react-native-webview-leaflet`
- Data storage and management via `react-redux` and `redux-thunk`

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

- Node.js v13 (npm v6)
- Expo SDK
- A running copy of UHN-Backend-Server and Redis Server

### Installing

1. Clone the repository ```git clone```
2. Install the packages ```cd UHN-Mobile-App``` and ```npm install```
3. Create a *.env* file and set *SERVER_ROOT* to http://localhost:3000

### Running

Start the native app by doing

```expo start```
or
```npm start```

> You can launch the app on an Android Virtual Device by running `npm run android`, or on the iOS Simulator by running `npm run ios` (macOS only).

## Environmental Files

*SERVER_ROOT* should contain the location where the backend server is running

By default, UHN-Backend-Server will be running on http://localhost:3000

### Changing Environmental Files

When changing environmental files, reset the app using the following method:

1. `expo start -c` (resets the expo cache)
2. Restart the App (<kbd>r</kbd> on the Expo CLI)
3. <kbd>CTRL^</kbd> + <kbd>C</kbd> to reset the app

Run the app again using `expo start`

## Components

The app uses components and typography provided by default by [ReactNative](https://facebook.github.io/react-native/docs/components-and-apis.html) and from [NativeBase](https://nativebase.io/)

The NativeBase components are located in `src/native-base-theme` and our custom-made components in `src/components`

## Deployment

None yet

## Built With

* [React Native](https://facebook.github.io/react-native/) - Client and Native Framework
* [Expo](https://expo.io/) - Build and Deployment
