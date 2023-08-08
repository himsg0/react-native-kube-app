import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showError} from './helperFunctions';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status', authStatus);
    getFcmToken();
  }
}

const getFcmToken = async () => {
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  console.log(fcmToken, 'old Token');
  if (!fcmToken) {
    try {
      const fcmToken = 'qwerty-121_0G';
      if (fcmToken) {
        console.log(fcmToken, 'New token');
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    } catch (error) {
      console.log(error, 'err ');
      showError(error.message);
    }
  }
};

export const subscribeToTopic = async topicName => {
  try {
    await messaging().subscribeToTopic(topicName);
    console.log(`Subscribed to topic: ${topicName}`);
  } catch (error) {
    console.error(`Error subscribing to topic: ${error}`);
  }
};

export const notificationListener = async () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state :',
      remoteMessage.notification,
    );
  });

  messaging().onMessage(async remoteMessage => {
    console.log('recived in foreground', remoteMessage);
  });

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state :',
          remoteMessage.notification,
        );
      }
    });
};
