/**
 * @format
 */
import React from 'react';
import {Text} from 'react-native';
import {AppRegistry, LogBox} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import {Store} from './src/redux/store/Store';
import {Provider} from 'react-redux';
import messaging from '@react-native-firebase/messaging';

//Register Background Handler
messaging().setBackgroundMessageHandler(async remotrMessage => {
  console.log('Message handeled in background !', remotrMessage);
});

const KubeApp = () => {
  return (
    <Provider store={Store}>
      <App />
    </Provider>
  );
};
LogBox.ignoreAllLogs();
AppRegistry.registerComponent(appName, () => KubeApp);
