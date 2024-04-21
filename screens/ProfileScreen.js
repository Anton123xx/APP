// screens/ProfileScreen.js
import React, { useState } from 'react';
import { View, Text, Button, Image, Pressable } from 'react-native';

const ProfileScreen = ({ route }) => {
  const { username } = route.params;
  const [imageUri, setImageUri] = useState(null);
  const [audioUri, setAudioUri] = useState(null);

  const handlePlayAudio = () => {
    // Code pour jouer l'audio enregistré
    console.log('Lecture de l\'audio:', audioUri);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Profil</Text>
      <Text>Nom: {username}</Text>
      {imageUri && <Image source={{ uri: imageUri }} style={{ width: 200, height: 200, marginVertical: 10 }} />}
      <Button title="Prendre une photo" onPress={() => {
        // Code pour prendre une photo et mettre à jour l'URI de l'image
        console.log('Prendre une photo');
        // Supposons que setImageUri mette à jour l'URI de l'image après avoir pris la photo
        setImageUri('https://example.com/image.jpg'); // Remplacer par l'URI réelle de l'image prise
      }} />
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
      <Button title="Enregistrer un audio" onPress={() => {
        // Code pour enregistrer un audio et mettre à jour l'URI de l'audio
        console.log('Enregistrer un audio');
        // Supposons que setAudioUri mette à jour l'URI de l'audio après l'enregistrement
        setAudioUri('https://example.com/audio.mp3'); // Remplacer par l'URI réelle de l'audio enregistré
      }} />
    </View>
  );
}

export default ProfileScreen;
