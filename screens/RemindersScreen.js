import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { View, StyleSheet, Text, Animated } from 'react-native';

import MainButton from '../components/UI/MainButton';
import Colors from '../constants/colors';
import Shadow from '../constants/shadow';
import { POSITIVE_AFFIRMATIONS } from '../store/actions/reminders';

const RemindersScreen = (props) => {
  const animatedValue = useRef(new Animated.Value(1)).current;
  const remindersList = useSelector((state) => state.reminders.list);
  const enablePositiveAffirmations = useSelector((state) => state.reminders.enablePositiveAffirmations);
  const affirmationsEnabled = useSelector((state) => state.reminders.affirmations);
  const [displayText, setDisplayText] = useState('');
  const [displayList, setDisplayList] = useState(
    enablePositiveAffirmations
      ? [...POSITIVE_AFFIRMATIONS.filter((_, index) => affirmationsEnabled[index]), ...remindersList]
      : [...remindersList],
  );

  useEffect(() => {
    setDisplayText(getRandomText());
  }, []);

  useEffect(() => {
    if (displayList.length === 0) {
      setDisplayList(
        enablePositiveAffirmations
          ? [...POSITIVE_AFFIRMATIONS.filter((_, index) => affirmationsEnabled[index]), ...remindersList]
          : [...remindersList],
      );
    }
  }, [displayList]);

  const getRandomText = useCallback(() => {
    const length = displayList.length - 1;
    const index = Math.round(Math.random() * length);
    const retVal = displayList[index];
    const newList = [...displayList];
    newList.splice(index, 1);
    setDisplayList(newList);
    return retVal;
  }, [displayList]);

  const nextHandler = useCallback(() => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start(() => {
      setDisplayText(getRandomText());
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
        delay: 500,
      }).start();
    });
  }, [getRandomText, animatedValue]);

  return (
    <View style={styles.screen}>
      <Animated.View
        style={{
          ...styles.reminderBox,
          opacity: animatedValue,
          marginTop: animatedValue.interpolate({ inputRange: [0, 1], outputRange: [80, 0] }),
        }}
      >
        <Text style={styles.reminderText}>{displayText}</Text>
      </Animated.View>

      <MainButton
        color={Colors.shade2}
        style={styles.button}
        containerStyle={styles.buttonContainer}
        onPress={nextHandler}
      >
        <Text style={styles.buttonText}>Okay</Text>
      </MainButton>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.light,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reminderBox: {
    width: '75%',
  },
  reminderText: {
    fontFamily: 'OpenSans_400Regular',
    fontSize: 20,
    marginTop: '50%',
    textAlign: 'center',
  },
  button: {
    height: 50,
    width: '50%',
    marginTop: 40,
    marginBottom: 150,
    borderRadius: 10,
    ...Shadow,
  },
  buttonContainer: {
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontFamily: 'Spartan_400Regular',
    fontSize: 24,
  },
});

export default RemindersScreen;
