import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { MainStackNavigator } from './src/navigation';
import { ZoomVideoSdkProvider, useZoom, EventType } from '@zoom/react-native-videosdk';

function App() {
  return (
    <NavigationContainer>
      <ZoomVideoSdkProvider
        config={{
          appGroupId: 'test.zoom.sdk',
          domain: 'zoom.us',
          enableLog: true,
        }}
      >
        <MainStackNavigator />
      </ZoomVideoSdkProvider>
    </NavigationContainer>

  );
}


export default App;
