import React, { useState, useEffect, useCallback } from 'react';
import { AppState } from 'react-native';
import AppLoading from 'expo-app-loading';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { useFonts, Spartan_400Regular } from '@expo-google-fonts/spartan';
import { OpenSans_400Regular, OpenSans_600SemiBold } from '@expo-google-fonts/open-sans';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import { DeviceMotion } from 'expo-sensors';

import AppNavigator from './navigation/AppNavigator';
import flashcardsReducer from './store/reducers/flashcards';
import messagesReducer from './store/reducers/messages';
import init from './helpers/init';
import contactReducer from './store/reducers/contact';
import settingsReducer from './store/reducers/settings';
import remindersReducer from './store/reducers/reminders';
import medInfoReducer from './store/reducers/medInfo';

const ACCEL_THRESHOLD = 20;
const TIME_THRESHOLD = 100;
const SHAKE_TIMEOUT = 800;
const SHAKE_THROTTLE = 1000;
const SHAKE_COUNT = 3;

const rootReducer = combineReducers({
  flashcards: flashcardsReducer,
  messages: messagesReducer,
  contact: contactReducer,
  settings: settingsReducer,
  reminders: remindersReducer,
  medInfo: medInfoReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

const taskName = 'background-task';

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [fontsLoaded] = useFonts({ Spartan_400Regular, OpenSans_400Regular, OpenSans_600SemiBold });
  const [startTime, setStartTime] = useState();
  const [lastTime, setLastTime] = useState(0);
  const [motionData, setMotionData] = useState();
  const [shakeCount, setShakeCount] = useState(0);
  const [lastShake, setLastShake] = useState(0);
  const [lastForce, setLastForce] = useState(0);

  useEffect(() => {
    DeviceMotion.setUpdateInterval(60);
    TaskManager.defineTask(taskName, () => {
      console.log('background');
      // DeviceMotion.removeAllListeners();
      DeviceMotion.addListener((data) => {
        console.log('got data');
        // if (AppState.currentState !== 'active') {
        setMotionData(data.acceleration);
        // }
      });
      return BackgroundFetch.Result.NewData;
    });
    BackgroundFetch.registerTaskAsync(taskName, { minimumInterval: 5, stopOnTerminate: false, startOnBoot: true });
  }, []);

  useEffect(() => {
    if (motionData) {
      onSensorData();
    }
  }, [motionData, onSensorData]);

  const onSensorData = useCallback(() => {
    const now = Date.now();
    if (now - lastForce > SHAKE_TIMEOUT) {
      setShakeCount(0);
    }
    const diff = now - lastTime;
    if (diff > TIME_THRESHOLD) {
      const accelVector = Math.abs(Math.sqrt(motionData.x ** 2 + motionData.y ** 2 + motionData.z ** 2));
      if (accelVector > ACCEL_THRESHOLD) {
        if (shakeCount + 1 >= SHAKE_COUNT && now - lastShake > SHAKE_THROTTLE) {
          setLastShake(now);
          setShakeCount(0);
          console.log('SHAKEY SHAKEY');
          // TODO: DO THE SHAKEY STUFF
        }
        setLastForce(now);
        setShakeCount((shake) => shake + 1);
      }
      setLastTime(now);
    }
  }, [lastTime, shakeCount, lastShake, lastForce, motionData]);

  const startLoading = () => {
    setStartTime(Date.now());
    store.dispatch(init());
  };

  const finishLoading = () => {
    const timeElapsed = Date.now() - startTime;
    if (timeElapsed < 3000) {
      setTimeout(() => {
        setIsReady(true);
      }, 3000 - timeElapsed);
    } else {
      setIsReady(true);
    }
  };

  if (!isReady || !fontsLoaded) {
    return <AppLoading startAsync={startLoading} onFinish={finishLoading} onError={() => console.log('error')} />;
  }

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    </SafeAreaProvider>
  );
}
