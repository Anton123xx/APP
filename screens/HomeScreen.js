// screens/HomeScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import SignUpScreen from './SignUpScreen';

const HomeScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Vérifiez les informations de connexion
    // Si les informations sont correctes, naviguez vers un autre écran
    // Vous pouvez également stocker les informations de connexion dans un contexte ou un état global pour les utiliser dans d'autres écrans
    // Ici, nous afficherons simplement le nom sur la console
    console.log('Nom:', username);
    // Naviguer vers un autre écran (par exemple, Profil)
    navigation.navigate('Profil', { username: username });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Accueil</Text>
      <TextInput
        style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1, marginVertical: 10 }}
        placeholder="Nom d'utilisateur"
        onChangeText={text => setUsername(text)}
        value={username}
      />
      <TextInput
        style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1, marginVertical: 10 }}
        placeholder="Mot de passe"
        onChangeText={text => setPassword(text)}
        secureTextEntry={true}
        value={password}
      />
      <Pressable
        style={{ backgroundColor: 'blue', padding: 10, borderRadius: 5, marginTop: 10 }}
        onPress={handleLogin}
      >
        <Text style={{ color: 'white' }}>Se connecter</Text>
      </Pressable>

      <Text style={{ marginTop: 20 }}>Pas encore de compte ?</Text>

      <Pressable
        style={{ backgroundColor: 'blue', padding: 10, borderRadius: 5, marginTop: 10 }}
        onPress={SignUpScreen}
      > 
      <Text style={{ color: 'white' }}>Inscrivez-vous!</Text>
      </Pressable>
    </View>

      
  );
}

export default HomeScreen;
