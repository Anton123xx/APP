// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider } from 'react-native-paper';
import HomeScreen from './screens/HomeScreen.js';
import ProfileScreen from './screens/ProfileScreen.js';
import CameraScreen from './screens/CameraScreen.js';
import AudioScreen from './screens/AudioScreen.js';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';


const Tab = createBottomTabNavigator();


export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Accueil" component={HomeScreen}
            options={{
              tabBarIcon: ({ focused }) => <Ionicons name="home" size={24}
                color={focused ? "red" : "blue"} />
            }} />
             <Tab.Screen name="Profile" component={ProfileScreen}
            options={{
              tabBarIcon: ({ focused }) =><MaterialIcons name="account-box" size={24}
                color={focused ? "red" : "blue"} />
            }} />
          <Tab.Screen name="Caméra" component={CameraScreen} 
            options={{
              tabBarIcon: ({ focused }) =><AntDesign name="camera" size={24}
                color={focused ? "red" : "blue"} />
            }} 
          />
          <Tab.Screen name="Audio" component={AudioScreen} 
           options={{
            tabBarIcon: ({ focused }) =><FontAwesome5 name="microphone" size={24} 
              color={focused ? "red" : "blue"} />
          }} 
          />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}




















/*
import { Camera, CameraType } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function App() {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
*/