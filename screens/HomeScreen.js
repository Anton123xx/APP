// screens/HomeScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import SignUpScreen from './SignUpScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState('');
  const [showSignUp, setShowSignUp] = useState(false);

  useEffect(() => {
    const onLoad = async () => {
      await handleShowSignUp();
      var photoUri = await getValue("ImageUri");
      if(photoUri === null){
        await setUserData("ImageUri", './defaultprofileimg.jpg');
      }
    }
    onLoad();
  }, []);


  const clearData = async () => {
    try {
      // Clear all stored data
      await AsyncStorage.clear();
      console.log('All data cleared successfully!');
    } catch (error) {
      console.error('Error clearing data:', error);
    }
  };

  const setUserData = async (key, value) => {
    try{
      await AsyncStorage.setItem(key, value);
    }
    catch(error){
      console.error('Error storing data: ', error);
    }
  }

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

  const handleLogin = async () => {
    // Vérifiez les informations de connexion
    // Si les informations sont correctes, naviguez vers un autre écran
    // Vous pouvez également stocker les informations de connexion dans un contexte ou un état global pour les utiliser dans d'autres écrans
    // Ici, nous afficherons simplement le nom sur la console
    console.log('Nom:', username);
    // Naviguer vers un autre écran (par exemple, Profil)
    var password = await getValue('Password');
    var user = await getValue('Username');
    if(password === password && username){
      navigation.navigate('Profile');
    }
    else{
      setErrorText("Mot de passe ou nom d'utilisateur invalide.");
    }
  };

  const handleShowSignUp = async () => {
    
    try{
      const username = await getValue('Username');
      if(username === null){
        setShowSignUp(true);
      }
      else{
        setShowSignUp(false);
        setUsername(username);
      }
    }
    catch{
      console.error('Error getting username', error);
    }
  };
  

  const Home = () => {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Accueil</Text>
      <Text style={{color:'red'}}>{errorText}</Text>
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
      <Pressable style={{ backgroundColor: 'blue', padding: 10, borderRadius: 5, marginTop: 10 }}onPress={clearData}>
        <Text>Clear Data</Text>
      </Pressable>
    </View>
    );
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        {showSignUp ? ( <SignUpScreen/> ) : ( <Home/> )}
        <Text>Anton Sussmann Messmer, Tristan Berthiaume</Text>
    </View>
  );
}

export default HomeScreen;
