import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import Constants from 'expo-constants';

const AfficheImage = () => {
  let pic ={uri:"https://1000logos.net/wp-content/uploads/2021/05/Google-logo.png"};
  return <Image style={{width:200, height:100, marginTop:40, 
                        borderWidth:3,borderColor:"red"}} 
                source={pic}/>

}

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={{fontSize:20}}>
        Image 
      </Text>

      <AfficheImage />
      <AfficheImage />
    </View>
  );
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
