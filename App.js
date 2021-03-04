import React, { useState } from 'react';
import AppLoading from 'expo-app-loading';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { useFonts, Spartan_400Regular } from '@expo-google-fonts/spartan';
import { OpenSans_400Regular, OpenSans_600SemiBold } from '@expo-google-fonts/open-sans';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import AppNavigator from './navigation/AppNavigator';
import StatusBarWrapper from './components/UI/StatusBarWrapper';
import flashcardsReducer from './store/reducers/flashcards';
import messagesReducer from './store/reducers/messages';
import init from './helpers/init';
import contactReducer from './store/reducers/contact';
import settingsReducer from './store/reducers/settings';
import remindersReducer from './store/reducers/reminders';
import medInfoReducer from './store/reducers/medInfo';

const rootReducer = combineReducers({
  flashcards: flashcardsReducer,
  messages: messagesReducer,
  contact: contactReducer,
  settings: settingsReducer,
  reminders: remindersReducer,
  medInfo: medInfoReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [fontsLoaded] = useFonts({ Spartan_400Regular, OpenSans_400Regular, OpenSans_600SemiBold });
  const [startTime, setStartTime] = useState();

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
        <StatusBarWrapper>
          <AppNavigator />
        </StatusBarWrapper>
      </Provider>
    </SafeAreaProvider>
  );
}
