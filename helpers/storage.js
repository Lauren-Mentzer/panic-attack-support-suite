import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

export const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.log(error);
  }
};

export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value !== null ? JSON.parse(value) : value;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getAllData = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    return await AsyncStorage.multiGet(keys);
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const storeDataSafe = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await SecureStore.setItemAsync(key, jsonValue);
  } catch (error) {
    console.log(error);
  }
};

export const getDataSafe = async (key) => {
  try {
    const value = await SecureStore.getItemAsync(key);
    return value !== null ? JSON.parse(value) : value;
  } catch (error) {
    console.log(error);
    return null;
  }
};
