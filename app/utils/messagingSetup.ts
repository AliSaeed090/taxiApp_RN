import messaging from '@react-native-firebase/messaging';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { Vibration,PermissionsAndroid,Platform } from 'react-native';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {rootUrl} from '../utilities/constants'
export const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if(Platform.OS==='android'){
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
    }
  if (enabled) {
    console.log('Authorization status:', authStatus);
    await getFcmToken();
  }
  

};

export const getFcmToken = async () => {
   const user = auth().currentUser;
   if (!user) {
    console.log('User not authenticated');
    return;
   }
  try{
    let fcmToken = await messaging().getToken();
  }catch(e:any){
    console.log({e})
  }
   let fcmToken = await messaging().getToken();
   console.log('FCM Token:', fcmToken);
  
   if (fcmToken) {
    const userDocRef = firestore().collection('users').doc(user.uid);
  
    // Get the current user's document
    const userDoc = await userDocRef.get();
  
    if (userDoc.exists) {
     const userData = userDoc.data();
  
     // If the user already has FCM tokens, add the new token if it doesn't exist
     let fcmTokens = userData?.fcmTokens || [];
  
     if (!fcmTokens.includes(fcmToken)) {
      fcmTokens.push(fcmToken);
      await userDocRef.update({
       fcmTokens,
      });
     }
    } else {
     // If the user's document doesn't exist, create it with the FCM token
     await userDocRef.set({
      fcmTokens: [fcmToken],
     });
    }
   }
  };

export const notificationListener = (navigation:any,queryClient:any) => {
  messaging().onNotificationOpenedApp((remoteMessage:any) => {
    if(remoteMessage.data.sendToAdmins==="true"){

    }else{
      navigation.navigate("MyRides")
    }
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
  });

  messaging()
    .getInitialNotification()
    .then((remoteMessage:any) => {
      if (remoteMessage) {
        if(remoteMessage.data.sendToAdmins==="true"){

        }else{
          navigation.navigate("MyRides")
        }
      
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage,
        );
      }
    });

  messaging().onMessage(async (remoteMessage:any) => {
    console.log('A new FCM message arrived!', remoteMessage);
    if(remoteMessage.data.sendToAdmins==="true"){
      queryClient.invalidateQueries({queryKey: ['fetchRideRequests']});
    }else{
      queryClient.invalidateQueries({queryKey: ['fetchMyRides']});
    }
    Vibration.vibrate(50,true)
    showMessage({
      description: remoteMessage.notification?.body,
      message: remoteMessage.notification?.title,
      type: 'success',
      position: 'top',
    })
  });
};
export const sendNotification=(title:string,body:string,sendToAdmins:boolean,userId?:string,)=>{
  const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "userId": userId,
  "sendToAdmins":sendToAdmins,
  "notification": {
    "title": title,
    "body": body,
  }
});

const requestOptions:any = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch(`${rootUrl}/send-notification`, requestOptions)
  .then((response) => response.text())
  .then((result) => console.log({result}))
  .catch((error) => console.error(error));
}