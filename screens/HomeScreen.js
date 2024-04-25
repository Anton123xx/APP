// screens/HomeScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import SignUpScreen from './SignUpScreen';

const HomeScreen = ({username, password}) => {
  //const [username, setUsername] = useState('');
  //const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [welcomeText, setWelcomText] = useState('');

  if(loggedIn){
    //setUsername(username); 
    //setPassword(password);
    setWelcomText("Bienvenue " + username);
  }


  const handleLogin = async () => {
    // Vérifiez les informations de connexion
    // Si les informations sont correctes, naviguez vers un autre écran
    // Vous pouvez également stocker les informations de connexion dans un contexte ou un état global pour les utiliser dans d'autres écrans
    // Ici, nous afficherons simplement le nom sur la console
    console.log('Nom:', username);
    // Naviguer vers un autre écran (par exemple, Profil)
    //navigation.navigate('Profile', {username});
   
    if(password === "swag" && "swag" === username){
      //navigation.navigate('Profile', {username});
      setWelcomText("Bienvenue " + username);
      setLoggedIn(true);
    }
    else{
      setErrorText("Mot de passe ou nom d'utilisateur invalide.");
    }

  };
  

  const Home = () => {

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{color:'green'}}>{welcomeText}</Text>
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

      <Pressable
        style={{ backgroundColor: 'blue', padding: 10, borderRadius: 5, marginTop: 10 }}
        onPress={SignUpScreen}
      >
        <Text style={{ color: 'white' }}>S'inscrire</Text>
      </Pressable>

    </View>
    );
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Home/>
        <Text>Anton Sussmann Messmer, Tristan Berthiaume</Text>
    </View>
  );
}

export default HomeScreen;
