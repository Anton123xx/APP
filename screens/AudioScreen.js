import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';

//https://docs.expo.dev/versions/latest/sdk/media-library/

const AudioScreen = ({audioUri, setAudioUri}) => {
  const [recording, setRecording] = useState(null);
  //const [audioUri, setAudioUri] = useState(null);

  const startRecording = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to record audio not granted');
        return;
      }
      Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await recording.startAsync();
      setRecording(recording);
      //setAudioUri(recording);
    } catch (error) {
      console.error('Failed to start recording', error);
    }
  };

  const stopRecording = async () => {
    if (!recording) {
      return;
    }

    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setAudioUri(uri);
      setRecording(null);
    } catch (error) {
      console.error('Failed to stop recording', error);
    }
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

  const deleteAudio = async () => {
    try {
      await FileSystem.deleteAsync(audioUri);
      setAudioUri(null);
    } catch (error) {
      console.error('Failed to delete audio', error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Enregistrement audio</Text>
      {audioUri && (
        <View style={{ marginTop: 20 }}>
          <Text>Chemin de sauvegarde: {audioUri}</Text>
          <Button title="Rejouer" onPress={playAudio} />
          <Button title="Supprimer" onPress={deleteAudio} />
        </View>
      )}
      {!audioUri && (
        <View style={{ marginTop: 20 }}>
          <Button title="Démarrer l'enregistrement" onPress={startRecording} />
        </View>
      )}
      {recording && (
        <View style={{ marginTop: 20 }}>
          <Text>Enregistrement en cours...</Text>
          <Button title="Arrêter l'enregistrement" onPress={stopRecording} />
        </View>
      )}
    </View>
  );
};

export default AudioScreen;
