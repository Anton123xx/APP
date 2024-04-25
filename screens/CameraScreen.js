import { Camera, CameraType } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';

//https://docs.expo.dev/versions/latest/sdk/camera/
//faut implementer zoom et auto focus

export default function App({ navigation }) {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
  const [zoom, setZoom] = useState(0);
  const cameraRef = useRef(null);
  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <TouchableOpacity onPress={requestPermission} title="grant permission" />
      </View>
    );
  }
  const setUserData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    }
    catch (error) {
      console.error('Error storing data: ', error);
    }
  }

  const handleZoomIn = () => {
    setZoom(prevZoom => Math.min(prevZoom + 0.1, 1));
  };

  const handleZoomOut = () => {
    setZoom(prevZoom => Math.max(prevZoom - 0.1, 0));
  };

  const toggleFlash = () => {
    setFlashMode(flashMode === Camera.Constants.FlashMode.off ? Camera.Constants.FlashMode.on : Camera.Constants.FlashMode.off);
  };

  const toggleAutoFocus = () => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      let photo = await cameraRef.current.takePictureAsync();

      await setUserData('ImageUri', photo.uri);
      navigation.navigate('Profile');
    }
  };

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={{ flex: 1 }}
        type={type}
        flashMode={flashMode}
        zoom={zoom}
        ref={cameraRef}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            justifyContent: 'space-between',
            margin: 20,
          }}>
          <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 20 }}>
          <TouchableOpacity style={styles.flashButton} onPress={toggleFlash}>
            <Text style={styles.buttonText}><MaterialIcons name={flashMode === Camera.Constants.FlashMode.off ? "flash-off" : "flash-on"} size={45} color="white" /></Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cameraButtons} onPress={takePicture}>
            <Text style={styles.buttonText}><MaterialIcons name="radio-button-unchecked" size={100} color="white"></MaterialIcons></Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.flipCameraButton} onPress={toggleCameraType}>
            <Text style={styles.buttonText}><MaterialIcons name="cached" size={50} color="white"></MaterialIcons></Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.zoomInButton} onPress={handleZoomIn}>
            <Text style={styles.buttonText}><MaterialIcons name="zoom-in" size={60} color="white"></MaterialIcons></Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.zoomOutButton} onPress={handleZoomOut}>
            <Text style={styles.buttonText}><MaterialIcons name="zoom-out" size={60} color="white"></MaterialIcons></Text>
          </TouchableOpacity>
          </View>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',


    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20,

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
  cameraButtons:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    marginBottom: 20
  },
  flipCameraButton:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 300,
    right: 0,
    marginBottom: 580,
  },
  zoomOutButton:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 300,
    marginBottom: 20,
  },
  zoomInButton:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 300,
    right: 0,
    marginBottom: 20,
  },
  flashButton:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 300,
    marginBottom: 580,
  },

  
});
