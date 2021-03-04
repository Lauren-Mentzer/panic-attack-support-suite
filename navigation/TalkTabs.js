import React from 'react';
import { Platform, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import FlaschardScreen from '../screens/FlashcardScreen';
import ChatScreen from '../screens/ChatScreen';

const Tab = Platform.OS === 'android' ? createMaterialBottomTabNavigator() : createBottomTabNavigator();

const TalkTabs = () => {
  const colors = useSelector((state) => state.settings.colors);
  const colorMode = useSelector((state) => state.settings.colorPalette);

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: colorMode === 'Dark' ? colors.accent : colors.shade2,
        labelStyle: {
          fontFamily: 'OpenSans_400Regular',
          fontSize: 12,
        },
        tabStyle: {
          borderTopColor: colorMode === 'Dark' ? colors.shade1 : '#ccc',
          borderTopWidth: Platform.OS === 'ios' ? 1 : 0,
          paddingTop: Platform.OS === 'ios' ? 5 : 0,
        },
        style: { backgroundColor: colorMode === 'Dark' ? colors.primary : 'white' },
      }}
      screenOptions={({ route }) => {
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
      }}
      initialRouteName="Flashcards"
      activeColor={colorMode === 'Dark' ? colors.accent : colors.shade3}
      shifting
      barStyle={{ backgroundColor: colors.primary }}
    >
      <Tab.Screen name="Flashcards" component={FlaschardScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
    </Tab.Navigator>
  );
};

export default TalkTabs;
