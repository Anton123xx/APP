// screens/ProfileScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text,StyleSheet, Button, Image, Pressable, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = ({navigation, route}) => {
  const [username, setUsername ] = useState(route.params.username);
  const [imageUri, setImageUri] = useState(null);
  const [audioUri, setAudioUri] = useState(null);


  useEffect(() => {
    const onLoad = async () => {
      var tempUri = await getValue("ImageUri");
      var user = await getValue('Username');
      setUsername(user);
      
      if(tempUri === null){
        var imagePath = require('./defaultProfileImg.jpg');
        var imgUri = Image.resolveAssetSource(imagePath).uri
        setImageUri(imgUri);
        await setUserData("ImageUri", imageUri);
      }

      setImageUri(tempUri);
    }
    onLoad();
  }, []);

  const getValue = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if(value !== null){
        console.log(value);
       
        return value;
      }
      else{
        console.log('No username. Displaying sign up screen.')
        return null;
      }
    }
    catch{
      console.error('Error retrieving username: ', error);
      return null;
    }
  }

  const setUserData = async (key, value) => {
    try{
      await AsyncStorage.setItem(key, value);
    }
    catch(error){
      console.error('Error storing data: ', error);
    }
  }

  const handlePlayAudio = () => {
    // Code pour jouer l'audio enregistré
    console.log('Lecture de l\'audio:', audioUri);
  };

  const playAudio = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync({ uri: audioUri });
      //setSound(sound);
      await sound.playAsync();
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image style={styles.profilePicture} source={{ uri: imageUri}}/>
      <Text>{route.params.username}</Text>
      <Text>Nom: {route.params.username}</Text>
        <View style={{ marginVertical: 10 }}>
          <Text>Audio enregistré: {audioUri}</Text>
          <TouchableOpacity style={styles.button} onPress={handlePlayAudio} title="Jouer l'audio">
          <Text style={{ color: 'white' }}>Lire l'audio</Text>
          </TouchableOpacity>
        </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 20,
  },
  profilePictureContainer: {
    marginBottom: 20,
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: '#ccc',
    marginBottom: 50
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    width: '100%',
    height: 40,
    backgroundColor: 'blue',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ProfileScreen;
