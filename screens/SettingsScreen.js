import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, ScrollView, View, Text, Platform, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { color } from 'd3-color';
import { CheckBox } from 'react-native-elements';

import Colors from '../constants/colors';
import TouchableComponent from '../components/UI/TouchableComponent';
import BottomDrawer from '../components/UI/BottomDrawer';
import { setEmergency, setEnabled, setShake, COLOR_PALETTES, setColorPalette } from '../store/actions/settings';

const FEATURES_TEXT = [
  ['Breathe', 'Guided breathing exercises to help slow your breathing'],
  ['Grounding', 'Using your five senses to help ground you in the present moment'],
  ['Relax', 'Progressively relax the muscles of your body to relax tension'],
  ['Reminders', 'Refreshable prompts to help remind and relax you', 'Reminders Settings', 'Customize Reminders'],
  [
    'Communicate',
    'Use text chat or flashcard prompts to help communicate when you are nonverbal',
    'Communicate Settings',
    'Customize Flashcards',
  ],
  ['Contact', 'Text or call an emergency contact', 'Contact Settings', 'Edit Contact Information'],
];

const SettingsScreen = (props) => {
  const dispatch = useDispatch();
  const enabledFeatures = useSelector((state) => state.settings.enabled);
  const openOnShake = useSelector((state) => state.settings.openOnShake);
  const emergencyInfo = useSelector((state) => state.settings.emergencyInfo);
  const colorPalette = useSelector((state) => state.settings.colorPalette);
  const [colorsSliderOpen, setColorsSliderOpen] = useState(false);
  const fadedColor = color(Colors.shade2);
  fadedColor.opacity = 0.3;

  const toggleFeature = (feature) => {
    const newValue = !enabledFeatures[feature];
    dispatch(setEnabled(feature, newValue));
  };

  const toggleShake = () => {
    dispatch(setShake(!openOnShake));
  };

  const toggleEmergency = () => {
    dispatch(setEmergency(!emergencyInfo));
  };

  const chooseColors = (palette) => {
    dispatch(setColorPalette(palette));
  };

  return (
    <View style={styles.screen}>
      <ScrollView style={styles.screen}>
        <View style={styles.container}>
          <Text style={styles.label}>APP BEHAVIOR</Text>
          <View style={styles.switchItem}>
            <View style={styles.itemLeft}>
              <Text style={styles.title}>Display Emergency Information</Text>
              <Text style={styles.description}>
                Access saved information such as medications or medical notes via the home screen
              </Text>
            </View>
            <Switch
              value={emergencyInfo}
              onValueChange={toggleEmergency}
              ios_backgroundColor="lightgray"
              trackColor={{
                false: 'gray',
                true: Platform.OS === 'ios' ? Colors.shade3 : fadedColor,
              }}
              thumbColor={Platform.OS === 'android' ? (emergencyInfo ? Colors.shade2 : 'lightgray') : undefined}
            />
          </View>
          {emergencyInfo && (
            <TouchableComponent
              activeOpacity={0.5}
              onPress={() => props.navigation.navigate('Emergency Info Settings')}
            >
              <View style={styles.subItem}>
                <Text style={styles.title}>Edit Emergency Information</Text>
                <Ionicons name="chevron-forward" size={25} />
              </View>
            </TouchableComponent>
          )}
          <View style={styles.switchItem}>
            <View style={styles.itemLeft}>
              <Text style={styles.title}>Open on Shake</Text>
              <Text style={styles.description}>Open the application when you shake your phone</Text>
            </View>
            <Switch
              value={openOnShake}
              onValueChange={toggleShake}
              ios_backgroundColor="lightgray"
              trackColor={{
                false: 'gray',
                true: Platform.OS === 'ios' ? Colors.shade3 : fadedColor,
              }}
              thumbColor={Platform.OS === 'android' ? (openOnShake ? Colors.shade2 : 'lightgray') : undefined}
            />
          </View>
          <TouchableComponent activeOpacity={0.5} onPress={() => setColorsSliderOpen((value) => !value)}>
            <View style={styles.switchItem}>
              <Text style={styles.title}>Color Theme</Text>
              <Ionicons name="chevron-forward" size={25} />
            </View>
          </TouchableComponent>
          <View style={styles.divider} />
          <Text style={styles.label}>SUPPORT SUITE FEATURES</Text>
          {FEATURES_TEXT.map((feature) => {
            const key = feature[0].toLowerCase();
            return (
              <View key={key}>
                <View style={styles.switchItem}>
                  <View style={styles.itemLeft}>
                    <Text style={styles.title}>{feature[0]}</Text>
                    <Text style={styles.description}>{feature[1]}</Text>
                  </View>
                  <Switch
                    value={enabledFeatures[key]}
                    onValueChange={() => toggleFeature(key)}
                    ios_backgroundColor="lightgray"
                    trackColor={{
                      false: 'gray',
                      true: Platform.OS === 'ios' ? Colors.shade3 : fadedColor,
                    }}
                    thumbColor={
                      Platform.OS === 'android' ? (enabledFeatures[key] ? Colors.shade2 : 'lightgray') : undefined
                    }
                  />
                </View>
                {feature[2] && enabledFeatures[key] && (
                  <TouchableComponent activeOpacity={0.5} onPress={() => props.navigation.navigate(feature[2])}>
                    <View style={styles.subItem}>
                      <Text style={styles.title}>{feature[3]}</Text>
                      <Ionicons name="chevron-forward" size={25} />
                    </View>
                  </TouchableComponent>
                )}
              </View>
            );
          })}
        </View>
      </ScrollView>
      <BottomDrawer drawerOpen={colorsSliderOpen} setDrawerOpen={setColorsSliderOpen}>
        {COLOR_PALETTES.map((name) => (
          <TouchableComponent activeOpacity={0.5} key={name} onPress={() => chooseColors(name)}>
            <CheckBox
              title={name}
              checkedColor={Colors.shade3}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              fontFamily="OpenSans_600SemiBold"
              onPress={() => chooseColors(name)}
              checked={name === colorPalette}
              containerStyle={styles.checkbox}
            />
          </TouchableComponent>
        ))}
      </BottomDrawer>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.light,
  },
  container: {
    width: '80%',
    marginHorizontal: '10%',
    paddingBottom: 40,
  },
  label: {
    fontFamily: 'OpenSans_600SemiBold',
    fontSize: 16,
    color: '#777',
    marginTop: 30,
  },
  switchItem: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 25,
  },
  itemLeft: {
    width: '80%',
  },
  title: {
    fontFamily: 'OpenSans_600SemiBold',
    fontSize: 15,
  },
  description: {
    fontFamily: 'OpenSans_400Regular',
    color: '#777',
    fontSize: 15,
  },
  subItem: {
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  divider: {
    height: 1,
    width: '140%',
    marginLeft: '-20%',
    backgroundColor: '#ccc',
    marginTop: 20,
  },
  checkbox: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
});

export default SettingsScreen;
