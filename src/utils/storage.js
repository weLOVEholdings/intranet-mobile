import AsyncStorage from '@react-native-community/async-storage';

export const _storeData = async (key, item) => {
  let value = '';
  if (typeof item === 'string') {
    value = item;
  } else {
    value = JSON.stringify(item);
  }

  try {
    await AsyncStorage.setItem(key, value);
    return;
  } catch (error) {
    console.log(error.message);
  }
};

export const _retrieveData = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      if (typeof value === 'string') {
        return value;
      } else {
        const item = JSON.parse(value);
        return item;
      }
    }
  } catch (error) {
    console.log('error in retrieving data: ' + error);
  }
};
