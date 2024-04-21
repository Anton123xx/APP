import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

//Composant sans décomposition
const Afficher1 = (props)=>{
  return <Text>{props.nom} agé de {props.age? props.age:21} ans.</Text>
}

//Composant AVEC décomposition
const Afficher2 = (props)=>{
  let {nom, age} = props; //décomposition
  return <Text>{nom} agé de {age} ans.</Text>
}

//Composant AVEC décomposition 2
const Afficher3 = ({nom, age})=>{
  return <Text>{nom} agé de {age} ans.</Text>
}
//Composant AVEC décomposition, alias et valeur par défaut
const Afficher4 = ({nom:n="élève anonyme", age:a=21})=>{
  return <Text>{n} agé de {a} ans.</Text>
}

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={{fontSize:20}}>
        Props Décomposition
        {'\n'}
      </Text>
      <Afficher1  nom="Valérie" />
      <Afficher2  nom="Alice" age={26}  />

      <Afficher3  nom="Alice"  />
      <Afficher4  nom="Carlos" age={27}  />
      <Afficher4 />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
