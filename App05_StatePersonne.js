import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, Alert } from "react-native";

export default function App() {
  const [personne, setPersonne] = useState({ nom: "", age: "" });
  return (
    <View style={styles.container}>
      <Text>Tester State avec objet personne</Text>
      <Text>Nom</Text>
      <TextInput style={{borderWidth:1}} value={personne.nom}
        onChangeText={(n) => setPersonne({ ...personne, nom: n })} />
      <Text>Age</Text>
      <TextInput style={{borderWidth:1}} keyboardType="number-pad" value={personne.age}
        onChangeText={(age) => setPersonne({nom:personne.nom, age })} />  
      <Button title="Afficher" 
      onPress={()=>Alert.alert(`${personne.nom} a ${personne.age} ans.`)}  />
      <StatusBar style="auto" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "center",
  },
});
