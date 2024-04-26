// screens/HomeScreen.js
import React, { useEffect, useState, useRef, useCallback} from 'react';
import { View, Text, TextInput, Pressable, Button } from 'react-native';
import { getData, setData, clearData } from '../funcs.js';

const HomeScreen = ({ user, pword }) => {
  //const [username, setUsername] = useState('');
  //const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState('');
  const [isRegisted, setRegistered] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [accueilRenderCount, setAccueilRenderCount] = useState(0);

  const username = useRef(null);
  const password = useRef(null);


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
            //setUsername(user); 
            //setPassword(pword);


          }
        }
      } catch (error) {
        console.error('Error retrieving value from AsyncStorage:', error);
      }
    };
    onLoad();
  }, []);


  const handleLogin = async () => {

    if (password === pword && user === username) {
      await setData('LoggedIn', "true");
      setLoggedIn(true);
    }
    else {
      setErrorText("Mot de passe ou nom d'utilisateur invalide.");
    }

  };



  const logout = async () => {
    await setData('LoggedIn', 'false');
    setLoggedIn(false);
  }

  const deleteAccount = async () => {
    await setData('LoggedIn', 'false');
    await setData('Registered', 'false');
    await setData('Username', '');
    await setData('Password', '');
    setLoggedIn(false);
    setRegistered(false);
  }

  const HandleDisplay = () => {
    console.log(isRegisted + " IS REGISTERED");
    console.log(isLoggedIn + " IS LOGGED");
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

    const loginUpdate = useCallback(async (event) => {
      event.preventDefault();
      // Your logic/code
      // For value do: 
      // const email = emailRef.current.value;

      await setData('LoggedIn', "true");
      setLoggedIn(true);
      // if (password.current.value === pword && user === username.current.value) {
      //   await setData('LoggedIn', "true");
      //   setLoggedIn(true);
      // }
      // else {
      //   setErrorText("Mot de passe ou nom d'utilisateur invalide.");
      // }


    }, [username, password]);
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

        <Text>Accueil</Text>
        <Text style={{ color: 'red' }}>{errorText}</Text>
        <TextInput
          style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1, marginVertical: 10 }}
          placeholder="Nom d'utilisateur"
          //onChangeText={text => setUsername(text)}
          ref={username}
        //value={username}
        />
        <TextInput
          style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1, marginVertical: 10 }}
          placeholder="Mot de passe"
          //onChangeText={text => setPassword(text)}
          ref={password}
          secureTextEntry={true}
        //value={password}
        />
        <Button
          title="Se connecter"
          onPress={loginUpdate}
        />
        <Text />
        <Text>Anton Sussmann Messmer, Tristan Berthiaume</Text>
      </View>
    );
  };

  const SignUpScreen = () => {

    const handleSignUp = async () => {
      await setData('Username', username);
      await setData('Password', password);
      await setData('Registered', 'true');

      setRegistered(true);

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
