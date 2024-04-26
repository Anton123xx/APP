// screens/ProfileScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text,StyleSheet, Button, Image, Pressable, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';

const ProfileScreen = ({username, imageUri, audioUri}) => {
  //const [username, setUsername ] = useState('');
  //const [imageUri, setImageUri] = useState('');
  //const [audioUri, setAudioUri] = useState('');

  
 
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
      <Text>Nom: {username}</Text>
        <View style={{ marginVertical: 10 }}>
          {
            audioUri !== undefined && <Button style={styles.button} title="Jouer l'audio" onPress={playAudio} />
          }
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
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ProfileScreen;
