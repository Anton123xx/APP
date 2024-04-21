import * as React from 'react';
import { Text, View, StyleSheet, Image, Button, Alert, TextInput, ScrollView } from 'react-native';
import Constants from 'expo-constants';


export default function App() {
  const NomDefaut = "";
  const [nom, setNom] = React.useState(NomDefaut);
  const [compteur, setCompteur] = React.useState(0);
  
  return(
    <View style={styles.container}>
   
      <TextInput style={{borderWidth:2, width:200}} 
                value={nom}
                onChangeText={n=>setNom(n)}
                placeholder="Tapez votre nom"/>
      <Text> {"\n\n"}</Text>
      <Text> Votre nom est {nom} et votre compteur affiche {compteur}</Text>
      <Text> {"\n\n"}</Text>

      <Button title=" Reset" color="pink" onPress={()=>setNom(NomDefaut)}/> 
      <Text> {"\n\n"}</Text>
      <Button title="augmente Compteur " color="navy" 
              onPress={()=>setCompteur(compteur + 1)}/>  
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
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
