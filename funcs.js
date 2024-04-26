import AsyncStorage from '@react-native-async-storage/async-storage';

export const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if(value !== null){
        return value;
      }
      else{
        return null;
      }
    }
    catch{
      console.error('Error retrieving data: ', error);
      return null;
    }
  };

export const setData = async (key, value) => {
    try{
      await AsyncStorage.setItem(key, value);
    }
    catch(error){
      console.error('Error storing data: ', error);
    }
  };

export const clearData = async () => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing data:', error);
    }
  };

