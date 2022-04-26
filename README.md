# G&S Frontend




This project serves as the REST api consumer built for the SEF Project (https://github.com/Ioan01/LocalG-SApplication)

The project is currently under construction. Most new features are scattered between different development branches. Currently, main only features stable and final functionalities.

## Features

- Account creation/deletion
- Account visualization
- Mock store browsing and filtering
- Mock store addition
- Android support


## Tech

The G&S Frontend uses the following technologies:

- [ReactNative](https://reactnative.dev/) 
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)



## Installation

- [First of all, this project requires the React Native environment setup to be done beforehand.](https://reactnative.dev/docs/environment-setup) 
- After the setup is done, start an emulator or connect a physical device and run : 
```sh
cd <project_root>

#npm install only required the first time running the project
npm install

npx react-native run-android
```





#### Building the application


```
cd <project_root>

react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res

cd android

./gradlew assembleDebug
```




### Libraries used
- ReactNativeNavigation
- ReactNative Paper
- Fetch
- ReactNative vector icons
- Ionicons
- FontAwesome icons



   
