import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

const Titre = () =><View><Text style={{fontSize:20}}>Liste des élèves</Text></View>

/*à faire 1: décomposition de props et donnez des valeurs par défaut */
const Eleve = (props) => {
  return<View>
          <Text style={{fontSize:16, color:props.couleur}}>
            {" " + props.nom}
          </Text>
        </View>
}
/* à faire 2: appeler le composant Eleve plusieurs fois */
export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>
       Collège Le Meilleur
      </Text>
      <Titre />
      <Eleve nom="Jean" couleur="green" />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
