import React from 'react';
import { useSelector } from 'react-redux';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HomeScreen from '../screens/HomeScreen';
import BreatheScreen from '../screens/BreatheScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ReminderSettingsScreen from '../screens/settings/ReminderSettingsScreen';
import CommunicateSettingsScreen from '../screens/settings/CommunicateSettingsScreen';
import ContactSettingsScreen from '../screens/settings/ContactSettingsScreen';
import InfoScreen from '../screens/InfoScreen';
import HeaderButton from '../components/UI/HeaderButton';
import GroundingScreen from '../screens/GroundingScreen';
import RelaxScreen from '../screens/RelaxScreen';
import RemindersScreen from '../screens/RemindersScreen';
import InfoSettingsScreen from '../screens/settings/InfoSettingsScreen';
import ContactScreen from '../screens/ContactScreen';
import TalkTabs from './TalkTabs';

const MainStack = createStackNavigator();

const AppNavigator = () => {
  const colors = useSelector((state) => state.settings.colors);
  const colorMode = useSelector((state) => state.settings.colorPalette);

  return (
    <NavigationContainer>
      <MainStack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: Platform.select({
              ios: colorMode === 'Dark' ? colors.primary : 'white',
              android: colors.primary,
            }),
            borderBottomWidth: Platform.OS === 'ios' ? 1 : 0,
            borderBottomColor: colorMode === 'Dark' ? colors.shade2 : '#ccc',
          },
          headerTitleStyle: {
            fontFamily: 'OpenSans_600SemiBold',
          },
          headerTintColor: Platform.select({
            android: 'white',
            ios: colorMode === 'Dark' ? colors.text : colors.primary,
          }),
          headerBackTitleStyle: {
            fontFamily: 'OpenSans_400Regular',
          },
        }}
      >
        <MainStack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => {
            return {
              headerRight: () => (
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                  <Item
                    title="Settings"
                    iconName="settings-sharp"
                    buttonStyle={{
                      color: Platform.select({
                        ios: colorMode === 'Dark' ? 'white' : colors.primary,
                        android: 'white',
                      }),
                    }}
                    onPress={() => navigation.navigate('App Settings')}
                  />
                </HeaderButtons>
              ),
              headerLeft: () => (
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                  <Item
                    title="Emergency"
                    iconName={Platform.OS === 'ios' ? 'medical-sharp' : 'medical'}
                    onPress={() => navigation.navigate('Emergency Information')}
                    buttonStyle={{
                      color: Platform.select({
                        ios: colorMode === 'Dark' ? 'white' : colors.primary,
                        android: 'white',
                      }),
                    }}
                  />
                </HeaderButtons>
              ),
            };
          }}
        />
        <MainStack.Screen name="Breathe" component={BreatheScreen} />
        <MainStack.Screen name="Grounding" component={GroundingScreen} />
        <MainStack.Screen name="Relax" component={RelaxScreen} />
        <MainStack.Screen
          name="Communicate"
          component={TalkTabs}
          options={({ navigation }) => {
            return {
              headerRight: () => (
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                  <Item
                    title="Settings"
                    iconName="settings-sharp"
                    onPress={() => navigation.navigate('Communicate Settings')}
                    buttonStyle={{
                      color: Platform.select({
                        ios: colorMode === 'Dark' ? 'white' : colors.primary,
                        android: 'white',
                      }),
                    }}
                  />
                </HeaderButtons>
              ),
            };
          }}
        />
        <MainStack.Screen
          name="Reminders"
          component={RemindersScreen}
          options={({ navigation }) => {
            return {
              headerRight: () => (
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                  <Item
                    title="Settings"
                    iconName="settings-sharp"
                    onPress={() => navigation.navigate('Reminders Settings')}
                    buttonStyle={{
                      color: Platform.select({
                        ios: colorMode === 'Dark' ? 'white' : colors.primary,
                        android: 'white',
                      }),
                    }}
                  />
                </HeaderButtons>
              ),
            };
          }}
        />
        <MainStack.Screen
          name="Contact"
          component={ContactScreen}
          options={({ navigation }) => {
            return {
              headerRight: () => (
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                  <Item
                    title="Settings"
                    iconName="settings-sharp"
                    onPress={() => navigation.navigate('Contact Settings')}
                    buttonStyle={{
                      color: Platform.select({
                        ios: colorMode === 'Dark' ? 'white' : colors.primary,
                        android: 'white',
                      }),
                    }}
                  />
                </HeaderButtons>
              ),
            };
          }}
        />
        <MainStack.Screen
          name="Emergency Information"
          component={InfoScreen}
          options={({ navigation }) => {
            return {
              headerRight: () => (
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                  <Item
                    title="Settings"
                    iconName="settings-sharp"
                    onPress={() => navigation.navigate('Emergency Info Settings')}
                    buttonStyle={{
                      color: Platform.select({
                        ios: colorMode === 'Dark' ? 'white' : colors.primary,
                        android: 'white',
                      }),
                    }}
                  />
                </HeaderButtons>
              ),
            };
          }}
        />

        <MainStack.Screen name="App Settings" component={SettingsScreen} />
        <MainStack.Screen name="Reminders Settings" component={ReminderSettingsScreen} />
        <MainStack.Screen name="Communicate Settings" component={CommunicateSettingsScreen} />
        <MainStack.Screen name="Contact Settings" component={ContactSettingsScreen} />
        <MainStack.Screen name="Emergency Info Settings" component={InfoSettingsScreen} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
