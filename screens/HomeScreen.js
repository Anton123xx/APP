// screens/HomeScreen.js
import React, { useEffect, useState, useRef, useCallback} from 'react';
import { View, Text, TextInput, Pressable, Button } from 'react-native';
import { getData, setData, clearData } from '../funcs.js';

const HomeScreen = ({ user, pword }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameLogin, setUsernameLogin] = useState('');
  const [passwordLogin, setPasswordLogin] = useState('');
  const [errorText, setErrorText] = useState('');
  const [isRegisted, setRegistered] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [accueilRenderCount, setAccueilRenderCount] = useState(0);

  useEffect(() => {
    // Function to retrieve value from AsyncStorage
    const onLoad = async () => {
      try {
        var registed = await getData('Registered');
        if (registed === 'true') {
          setRegistered(true);
          var logged = await getData('LoggedIn');
          console.log(logged);
          if (logged === 'true') {
            console.log("HERE");
            setLoggedIn(true);
            setUsername(user); 
            setPassword(pword);


          }
        }
      } catch (error) {
        console.error('Error retrieving value from AsyncStorage:', error);
      }
    };
    onLoad();
  }, []);

  const logout = async () => {
    await setData('LoggedIn', 'false');
    setLoggedIn(false);
  }

  const deleteAccount = async () => {
    await clearData();
    setLoggedIn(false);
    setRegistered(false);
  }

  const HandleDisplay = () => {
    if (isRegisted === true) {
      if (isLoggedIn === true) {
        return (<View>
          <Text>Bienvenu sur l'app de: </Text>
          <Text>Anton Sussmann Messmer, Tristan Berthiaume</Text>
          <Text />
          <Button title='Se déconnecter' onPress={logout} />
          <Button title='Effacer mon compte' onPress={deleteAccount} />
        </View>)
      }
      else {
        return <Home />
      }
    }
    else {
      return <SignUpScreen />
    }
  }


  const Home = () => {

    const handleLogin = async () => {

      if (passwordLogin === password && usernameLogin === username) {
        await setData('LoggedIn', "true");
        setLoggedIn(true);
      }
      else {
        setErrorText("Mot de passe ou nom d'utilisateur invalide.");
      }
  
    };

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

        <Text>Accueil</Text>
        <Text style={{ color: 'red' }}>{errorText}</Text>
        <TextInput
          style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1, marginVertical: 10 }}
          placeholder="Nom d'utilisateur"
          value={usernameLogin}
          onChangeText={text => setUsernameLogin(text)}
        />
        <TextInput
          style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1, marginVertical: 10 }}
          placeholder="Mot de passe"
          value={passwordLogin}
          onChangeText={text => setPasswordLogin(text)}
          secureTextEntry={true}

        />
        <Button
          title="Se connecter"
          onPress={handleLogin}
        />
        <Text />
        <Text>Anton Sussmann Messmer, Tristan Berthiaume</Text>
      </View>
    );
  };

  const SignUpScreen = () => {

    const handleSignUp = async () => {
      console.log(username)

      try{
        await setData('Username', username);
        await setData('Password', password);
        await setData('Registered', 'true');

        setRegistered(true);
      }
      catch(error){
        console.error('Error saving data to AsyncStorage:', error);
      }

    };


    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Inscription</Text>
        <TextInput
          style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1, marginVertical: 10 }}
          placeholder="Nom d'utilisateur"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1, marginVertical: 10 }}
          placeholder="Mot de passe"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}

        />
        <Button
          title="S'inscrire"
          onPress={handleSignUp}
        />
        <Text />
        <Text>Anton Sussmann Messmer, Tristan Berthiaume</Text>
      </View>
    );
  };



  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <HandleDisplay />
    </View>
  );
}

export default HomeScreen;
