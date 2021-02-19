/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { CheckBox } from 'react-native-elements';

import Colors from '../constants/colors';
import Shadow from '../constants/shadow';
import MainButton from '../components/UI/MainButton';
import TouchableComponent from '../components/UI/TouchableComponent';

const GROUNDING_SENSES = ['see', 'feel', 'hear', 'smell', 'taste'];

const GroundingScreen = (props) => {
  const [phaseNum, setPhaseNum] = useState(5);
  const [checkbox1, setCheckbox1] = useState(false);
  const [checkbox2, setCheckbox2] = useState(false);
  const [checkbox3, setCheckbox3] = useState(false);
  const [checkbox4, setCheckbox4] = useState(false);
  const [checkbox5, setCheckbox5] = useState(false);

  const check = useCallback(
    (newValue, setFunc) => {
      setFunc(newValue);
      if (newValue) {
        const numComplete = [checkbox1, checkbox2, checkbox3, checkbox4, checkbox5, newValue].filter(Boolean).length;
        if (phaseNum === numComplete) {
          setPhaseNum(phaseNum - 1);
          reset();
        }
      }
    },
    [phaseNum, checkbox1, checkbox2, checkbox3, checkbox4, checkbox5],
  );

  const reset = () => {
    setCheckbox1(false);
    setCheckbox2(false);
    setCheckbox3(false);
    setCheckbox4(false);
    setCheckbox5(false);
  };

  return (
    <View style={styles.screen}>
      {phaseNum >= 1 && (
        <Text style={styles.prompt}>
          Identify {phaseNum} thing{phaseNum === 1 ? '' : 's'} you can {GROUNDING_SENSES[5 - phaseNum]}:
        </Text>
      )}
      <View style={styles.checkboxContainer}>
        {phaseNum >= 1 && (
          <CheckBox
            title={`I can ${GROUNDING_SENSES[5 - phaseNum]} 1 thing`}
            checked={checkbox1}
            onPress={() => check(!checkbox1, setCheckbox1)}
            textStyle={checkbox1 ? styles.checked : undefined}
            containerStyle={styles.checkbox}
            checkedColor={Colors.shade3}
            fontFamily="OpenSans_600SemiBold"
          />
        )}
        {phaseNum >= 2 && (
          <CheckBox
            title={`I can ${GROUNDING_SENSES[5 - phaseNum]} a 2nd thing`}
            checked={checkbox2}
            onPress={(newValue) => check(newValue, setCheckbox2)}
            textStyle={checkbox2 ? styles.checked : undefined}
            containerStyle={styles.checkbox}
            checkedColor={Colors.shade3}
            fontFamily="OpenSans_600SemiBold"
          />
        )}
        {phaseNum >= 3 && (
          <CheckBox
            title={`I can ${GROUNDING_SENSES[5 - phaseNum]} a 3rd thing`}
            checked={checkbox3}
            onPress={(newValue) => check(newValue, setCheckbox3)}
            textStyle={checkbox3 ? styles.checked : undefined}
            containerStyle={styles.checkbox}
            checkedColor={Colors.shade3}
            fontFamily="OpenSans_600SemiBold"
          />
        )}
        {phaseNum >= 4 && (
          <CheckBox
            title={`I can ${GROUNDING_SENSES[5 - phaseNum]} a 4th thing`}
            checked={checkbox4}
            onPress={(newValue) => check(newValue, setCheckbox4)}
            textStyle={checkbox4 ? styles.checked : undefined}
            containerStyle={styles.checkbox}
            checkedColor={Colors.shade3}
            fontFamily="OpenSans_600SemiBold"
          />
        )}
        {phaseNum >= 5 && (
          <CheckBox
            title={`I can ${GROUNDING_SENSES[5 - phaseNum]} a 5th thing`}
            checked={checkbox5}
            onPress={(newValue) => check(newValue, setCheckbox5)}
            textStyle={checkbox5 ? styles.checked : undefined}
            containerStyle={styles.checkbox}
            checkedColor={Colors.shade3}
            fontFamily="OpenSans_600SemiBold"
          />
        )}
      </View>
      {phaseNum === 0 && (
        <View style={styles.finishedContainer}>
          <Text style={styles.finishedText}>
            Nicely done, you have completed this grounding exercise. Hopefully you feel a bit more calm and in-tune with
            your surroundings.
          </Text>
          <MainButton
            color={Colors.shade2}
            style={styles.button}
            containerStyle={styles.buttonContainer}
            onPress={() => props.navigation.navigate('Home')}
          >
            <Text style={styles.title}>Finish</Text>
          </MainButton>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.light,
  },
  prompt: {
    marginLeft: 50,
    fontSize: 18,
    marginTop: 50,
    fontFamily: 'OpenSans_400Regular',
  },
  checkboxContainer: {
    marginHorizontal: 50,
    marginTop: 50,
  },
  checkbox: {
    marginVertical: 12,
    backgroundColor: 'white',
    ...Shadow,
  },
  checked: {
    color: '#bfbfbf',
    textDecorationLine: 'line-through',
  },
  finishedContainer: {
    height: '50%',
    marginTop: '25%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  finishedText: {
    width: '75%',
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'OpenSans_400Regular',
  },
  button: {
    height: 50,
    width: '50%',
    marginTop: 40,
    borderRadius: 10,
    ...Shadow,
  },
  buttonContainer: {
    borderRadius: 10,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontFamily: 'Spartan_400Regular',
  },
});

export default GroundingScreen;
