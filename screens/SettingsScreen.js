import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ScrollView, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { color } from 'd3-color';
import { CheckBox } from 'react-native-elements';

import WalkthroughModal from '../components/WalkthroughModal';
import Toggle from '../components/UI/Toggle';
import TouchableComponent from '../components/UI/TouchableComponent';
import BottomDrawer from '../components/UI/BottomDrawer';
import { setEmergency, setEnabled, COLOR_PALETTES, setColorPalette, setWalkthrough } from '../store/actions/settings';
import CardModal from '../components/UI/CardModal';
import MainButton from '../components/UI/MainButton';

const MODAL_TEXT = [
  "This is the application's main settings page. From here, you can turn on and off any feature of the app, depending on what you find helpful. If turned off, the button to access that feature will simply disappear from the home screen, leaving the app uncluttered by features you do not need.",
];

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

const getStyles = (colors, colorMode) => {
  return {
    screen: {
      flex: 1,
      backgroundColor: colors.light,
    },
    container: {
      width: '80%',
      marginHorizontal: '10%',
      paddingBottom: 40,
    },
    label: {
      fontFamily: 'OpenSans_600SemiBold',
      fontSize: 16,
      color: colors.title,
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
      color: colors.text,
    },
    description: {
      fontFamily: 'OpenSans_400Regular',
      color: colors.title,
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
      backgroundColor: colorMode === 'Dark' ? colors.shade2 : '#ccc',
      marginTop: 20,
    },
    checkbox: {
      backgroundColor: 'transparent',
      borderWidth: 0,
    },
    checkboxText: {
      color: colors.title,
    },
    modalButtonRow: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 15,
    },
    modalButton: {
      marginLeft: 10,
      width: 100,
      height: 35,
      borderRadius: 5,
    },
    buttonText: {
      fontFamily: 'Spartan_400Regular',
      color: 'white',
      fontSize: 14,
    },
    buttonContainer: {
      borderRadius: 5,
    },
    modalText: {
      color: colors.text,
      fontFamily: 'OpenSans_400Regular',
    },
  };
};

const SettingsScreen = (props) => {
  const { navigation } = props;
  const dispatch = useDispatch();
  const colors = useSelector((state) => state.settings.colors);
  const colorMode = useSelector((state) => state.settings.colorPalette);
  const [styles, setStyles] = useState(getStyles(colors, colorMode));
  const enabledFeatures = useSelector((state) => state.settings.enabled);
  const emergencyInfo = useSelector((state) => state.settings.emergencyInfo);
  const [colorsSliderOpen, setcolorsSliderOpen] = useState(false);
  const [walkthroughModalOpen, setWalkthroughModalOpen] = useState(false);
  const fadedColor = color(colors.shade2);
  fadedColor.opacity = 0.3;

  useEffect(() => {
    setStyles(getStyles(colors));
  }, [colors]);

  const toggleFeature = (feature) => {
    const newValue = !enabledFeatures[feature];
    dispatch(setEnabled(feature, newValue));
  };

  const toggleEmergency = () => {
    dispatch(setEmergency(!emergencyInfo));
  };

  const choosecolors = (palette) => {
    dispatch(setColorPalette(palette));
  };

  const enableWalkthrough = () => {
    setWalkthroughModalOpen(false);
    navigation.navigate('Home');
    setTimeout(() => {
      dispatch(setWalkthrough(true, null));
    }, 1000);
  };

  return (
    <View style={styles.screen}>
      <WalkthroughModal name="settings" textArray={MODAL_TEXT} />
      <CardModal visible={walkthroughModalOpen}>
        <Text style={styles.modalText}>Would you like to enable the application walkthrough?</Text>
        <View style={styles.modalButtonRow}>
          <MainButton
            style={styles.modalButton}
            containerStyle={styles.buttonContainer}
            color={colorMode === 'Dark' ? colors.shade3 : colors.primary}
            onPress={() => setWalkthroughModalOpen(false)}
          >
            <Text style={styles.buttonText}>No</Text>
          </MainButton>
          <MainButton
            style={styles.modalButton}
            containerStyle={styles.buttonContainer}
            color={colorMode === 'Dark' ? colors.accent : colors.shade2}
            onPress={enableWalkthrough}
          >
            <Text style={{ ...styles.buttonText, color: colorMode === 'Dark' ? 'black' : 'white' }}>Yes</Text>
          </MainButton>
        </View>
      </CardModal>
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
            <Toggle toggleValue={emergencyInfo} toggleHandler={toggleEmergency} />
          </View>
          {emergencyInfo && (
            <TouchableComponent activeOpacity={0.5} onPress={() => navigation.navigate('Emergency Info Settings')}>
              <View style={styles.subItem}>
                <Text style={styles.title}>Edit Emergency Information</Text>
                <Ionicons name="chevron-forward" size={25} color={colors.text} />
              </View>
            </TouchableComponent>
          )}
          <TouchableComponent activeOpacity={0.5} onPress={() => setcolorsSliderOpen((value) => !value)}>
            <View style={styles.switchItem}>
              <Text style={styles.title}>Color Theme</Text>
              <Ionicons name="chevron-forward" size={25} color={colors.text} />
            </View>
          </TouchableComponent>
          <TouchableComponent activeOpacity={0.5} onPress={() => setWalkthroughModalOpen(true)}>
            <View style={styles.switchItem}>
              <Text style={styles.title}>App Walkthrough</Text>
              <Ionicons name="chevron-forward" size={25} color={colors.text} />
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
                  <Toggle toggleValue={enabledFeatures[key]} toggleHandler={() => toggleFeature(key)} />
                </View>
                {feature[2] && enabledFeatures[key] && (
                  <TouchableComponent activeOpacity={0.5} onPress={() => navigation.navigate(feature[2])}>
                    <View style={styles.subItem}>
                      <Text style={styles.title}>{feature[3]}</Text>
                      <Ionicons name="chevron-forward" size={25} color={colors.text} />
                    </View>
                  </TouchableComponent>
                )}
              </View>
            );
          })}
        </View>
      </ScrollView>
      <BottomDrawer drawerOpen={colorsSliderOpen} setDrawerOpen={setcolorsSliderOpen}>
        {COLOR_PALETTES.map((name) => (
          <TouchableComponent activeOpacity={0.5} key={name} onPress={() => choosecolors(name)}>
            <CheckBox
              title={name}
              checkedColor={colorMode === 'Dark' ? colors.accent : colors.shade3}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              fontFamily="OpenSans_600SemiBold"
              onPress={() => choosecolors(name)}
              checked={name === colorMode}
              containerStyle={styles.checkbox}
              textStyle={styles.checkboxText}
            />
          </TouchableComponent>
        ))}
      </BottomDrawer>
    </View>
  );
};

export default SettingsScreen;
