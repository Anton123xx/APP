// screens/ProfileScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button, Image, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
  const [username, setUsername ] = useState(null);
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
        console.log('Username: ', value)
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

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{username}</Text>
      <Text>Nom: {username}</Text>
      <Image source={{ uri: imageUri}} style={{ width: 200, height: 200, marginVertical: 10 }} />
      {audioUri && (
        <View style={{ marginVertical: 10 }}>
          <Text>Audio enregistré: {audioUri}</Text>
          <Pressable
            style={{ backgroundColor: 'blue', padding: 10, borderRadius: 5, marginTop: 10 }}
            onPress={handlePlayAudio}
          >
            <Text style={{ color: 'white' }}>Lire l'audio</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

export default ProfileScreen;
