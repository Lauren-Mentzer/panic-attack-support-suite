import React from 'react';
import { Platform, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/colors';
import HomeScreen from '../screens/HomeScreen';
import BreatheScreen from '../screens/BreatheScreen';
import FlaschardScreen from '../screens/FlashcardScreen';
import ChatScreen from '../screens/ChatScreen';
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

const MainStack = createStackNavigator();
const Tab = Platform.OS === 'android' ? createMaterialBottomTabNavigator() : createBottomTabNavigator();

const screenOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white',
    borderBottomWidth: Platform.OS === 'ios' ? 1 : 0,
    borderBottomColor: '#ccc',
  },
  headerTitleStyle: {
    fontFamily: 'OpenSans_600SemiBold',
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
  headerBackTitleStyle: {
    fontFamily: 'OpenSans_400Regular',
  },
};

const headerOptions = ({ navigation }) => {
  return {
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title="Settings" iconName="settings-sharp" onPress={() => navigation.navigate('App Settings')} />
      </HeaderButtons>
    ),
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === 'ios' ? 'medical-sharp' : 'medical'}
          onPress={() => navigation.navigate('Emergency Information')}
        />
      </HeaderButtons>
    ),
  };
};

const tabBarOptions = {
  activeTintColor: Colors.shade2,
  labelStyle: {
    fontFamily: 'OpenSans_400Regular',
    fontSize: 12,
  },
  tabStyle: {
    borderTopColor: '#ccc',
    borderTopWidth: Platform.OS === 'ios' ? 1 : 0,
    paddingTop: Platform.OS === 'ios' ? 5 : 0,
  },
};

const tabScreenOptions = ({ route }) => {
  return {
    tabBarIcon: ({ focused, color }) => {
      let iconName;
      if (route.name === 'Chat') {
        if (Platform.OS === 'ios') {
          iconName = focused ? 'ios-chatbox-ellipses' : 'ios-chatbox-ellipses-outline';
        } else {
          iconName = focused ? 'md-chatbox-ellipses' : 'md-chatbox-ellipses-outline';
        }
      } else if (route.name === 'Flashcards') {
        if (Platform.OS === 'ios') {
          iconName = focused ? 'ios-file-tray-full' : 'ios-file-tray-full-outline';
        } else {
          iconName = focused ? 'md-file-tray-full' : 'md-file-tray-full-outline';
        }
      }
      return <Ionicons name={iconName} color={color} size={25} />;
    },
    tabBarLabel:
      Platform.OS === 'ios' ? (
        route.name
      ) : (
        <Text style={{ fontSize: 12, fontFamily: 'OpenSans_400Regular' }}>{route.name}</Text>
      ),
  };
};

const TalkTabs = () => {
  return (
    <Tab.Navigator
      tabBarOptions={tabBarOptions}
      screenOptions={tabScreenOptions}
      initialRouteName="Flashcards"
      activeColor={Colors.shade3}
      shifting
      barStyle={{ backgroundColor: Colors.primary }}
    >
      <Tab.Screen name="Flashcards" component={FlaschardScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
    </Tab.Navigator>
  );
};

const AppNavigator = (props) => {
  return (
    <NavigationContainer>
      <MainStack.Navigator screenOptions={screenOptions}>
        <MainStack.Screen name="Home" component={HomeScreen} options={headerOptions} />
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
