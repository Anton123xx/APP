// App.js
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Pressab, Image } from 'react-native';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getData} from './funcs.js';


const Tab = createBottomTabNavigator();

const HeaderLeftComponent = ({username}) => (
  <View style={{ marginLeft: 10 }}>
    <Text style={{ fontSize: 18 }}>{username}</Text> 
  </View>
);


export default function App() {
  const [audioUri, setAudioUri] = useState(null);
  const [imageUri, setImageUri] = useState(Image.resolveAssetSource(require('./screens/defaultProfileImg.jpg')).uri);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const onLoad = async () => {
      var user = await getData('Username');
      var pword = await getData('Password');
      setUsername(user); 
      setPassword(pword);
    };
    onLoad();
  }, []);


  return (
    <PaperProvider>
      <NavigationContainer>
        <Tab.Navigator screenOptions={{ headerLeft: () => ( <HeaderLeftComponent username={username}/> ), }}>
          <Tab.Screen name="Accueil" options={{ tabBarIcon: ({ focused }) => <Ionicons name="home" size={24} color={focused ? "red" : "blue"} /> }} >
            {() => <HomeScreen user={username} pword={password} />}
          </Tab.Screen>

          <Tab.Screen name="Profile" options={{ tabBarIcon: ({ focused }) => <MaterialIcons name="account-box" size={24} color={focused ? "red" : "blue"} /> }} >
            {() => <ProfileScreen username={username} imageUri={imageUri} audioUri={audioUri} />}
          </Tab.Screen>

          <Tab.Screen name="Caméra" options={{ tabBarIcon: ({ focused }) => <AntDesign name="camera" size={24} color={focused ? "red" : "blue"} /> }}>
            {() => <CameraScreen imageUri={imageUri} setImageUri={setImageUri} />}
          </Tab.Screen>

          <Tab.Screen name="Audio" options={{ tabBarIcon: ({ focused }) => <FontAwesome5 name="microphone" size={24} color={focused ? "red" : "blue"} /> }} >
            {() => <AudioScreen audioUri={audioUri} setAudioUri={setAudioUri} />}
          </Tab.Screen>

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