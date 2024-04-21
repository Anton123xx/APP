import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const SignUpScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
 

  const handleSignUp = () => {
    // Implémentez ici la logique d'inscription
    console.log('Nom d\'utilisateur:', username);
    console.log('Mot de passe:', password);
    //console.log('Email:', email);
    // Vous pouvez ajouter ici la logique d'envoi des données au serveur, de stockage dans la base de données, etc.
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Inscription</Text>
      <TextInput
        style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1, marginVertical: 10 }}
        placeholder="Nom d'utilisateur"
        onChangeText={text => setUsername(text)}
        value={username}
      />
      <TextInput
        style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1, marginVertical: 10 }}
        placeholder="Mot de passe"
        onChangeText={text => setPassword(text)}
        secureTextEntry={true}
        value={password}
      />
      <Button
        title="S'inscrire"
        onPress={handleSignUp}
      />
    </View>
  );
};

export default SignUpScreen;
