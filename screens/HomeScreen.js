import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { View, StyleSheet, SafeAreaView, Text, Platform } from 'react-native';
import { interpolateRgb } from 'd3-interpolate';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import Colors from '../constants/colors';
import Shadow from '../constants/shadow';
import MainButton from '../components/UI/MainButton';
import HeaderButton from '../components/UI/HeaderButton';

const BUTTON_NAMES = ['Breathe', 'Grounding', 'Relax', 'Reminders', 'Communicate', 'Contact'];

const HomeScreen = (props) => {
  const enabledFeatures = useSelector((state) => state.settings.enabled);
  const emergencyInfo = useSelector((state) => state.settings.emergencyInfo);
  const buttonNum = Object.keys(enabledFeatures).filter((key) => enabledFeatures[key]).length;
  const height = 100 / (buttonNum + 2);
  const interpolater = interpolateRgb(Colors.shade1, Colors.shade3);

  useEffect(() => {
    props.navigation.setOptions({
      headerLeft: () => {
        return emergencyInfo ? (
          <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
              title="Menu"
              iconName={Platform.OS === 'ios' ? 'medical-sharp' : 'medical'}
              onPress={() => props.navigation.navigate('Emergency Information')}
            />
          </HeaderButtons>
        ) : null;
      },
    });
  }, [emergencyInfo]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screen}>
        {BUTTON_NAMES.filter((name) => {
          const key = name.toLowerCase();
          return enabledFeatures[key];
        }).map((title, index) => {
          const colorIndex = (1 / (buttonNum - 1)) * index;
          const color = interpolater(colorIndex);
          return (
            <MainButton
              color={color}
              style={{ ...styles.button, height: `${height}%` }}
              containerStyle={styles.buttonContainer}
              onPress={() => props.navigation.navigate(title)}
              key={title}
            >
              <Text style={styles.title}>{title}</Text>
            </MainButton>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light,
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  button: {
    height: '22%',
    width: '95%',
    marginVertical: 10,
    borderRadius: 10,
    ...Shadow,
  },
  buttonContainer: {
    borderRadius: 10,
  },
  title: {
    color: 'white',
    fontSize: 30,
    letterSpacing: 4,
    fontFamily: 'Spartan_400Regular',
  },
});

export default HomeScreen;
