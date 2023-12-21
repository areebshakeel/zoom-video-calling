import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { MainStackNavigator } from './src/navigation';
// import { ZoomVideoSdkProvider, useZoom, EventType } from '@zoom/react-native-videosdk';
import { request, PERMISSIONS } from 'react-native-permissions';
import { Platform } from 'react-native';

function App() {
  useEffect(() => {
    getPermissions()
  }, [])

  const getPermissions = async() => {
    const grant = await request(Platform.select({
      android:PERMISSIONS.ANDROID.RECORD_AUDIO,
      ios:PERMISSIONS.IOS.MICROPHONE
    }) ).then((res) => {
      console.log("audio permissions -> ", grant);
    }).catch((er)=>{
      console.log("error audio permissions -> ",er);
    })
    const grantCamera = await request(Platform.select({
      android:PERMISSIONS.ANDROID.CAMERA,
      ios:PERMISSIONS.IOS.CAMERA
    }) ).then((res) => {
      console.log("camera permissions -> ", grant);
    }).catch((er)=>{
      console.log("error audio permissions -> ",er);
    })
  }
  return (
    <NavigationContainer>
      {/* <ZoomVideoSdkProvider
        config={{
          appGroupId: 'test.zoom.sdk',
          domain: 'zoom.us',
          enableLog: true,
        }}
      > */}
        <MainStackNavigator />
      {/* </ZoomVideoSdkProvider> */}
    </NavigationContainer>

  );
}


export default App;
