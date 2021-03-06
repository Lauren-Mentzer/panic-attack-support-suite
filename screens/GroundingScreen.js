/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { View, Text } from 'react-native';
import { CheckBox } from 'react-native-elements';

import Shadow from '../constants/shadow';
import MainButton from '../components/UI/MainButton';
import WalkthroughModal from '../components/WalkthroughModal';

const GROUNDING_SENSES = ['see', 'feel', 'hear', 'smell', 'taste'];

const MODAL_TEXT = [
  'Often during a panic attack or other stressful situation, you might become very focused on your own thoughts and feelings. Grounding is a technique that can help you to focus on the present moment, and show your body that there is not an actual threat around you.',
  'This exercise will ask you to identify to yourself a number of things around you that you can experience with your 5 senses, from sight all the way to taste. This self-regulation can be useful not only during a panic attack, but also other distressing situations such as a PTSD flashback or dissociation.',
];

const GroundingScreen = (props) => {
  const colors = useSelector((state) => state.settings.colors);
  const colorMode = useSelector((state) => state.settings.colorPalette);
  const [styles] = useState({
    screen: {
      flex: 1,
      backgroundColor: colors.light,
    },
    prompt: {
      marginLeft: 60,
      fontSize: 18,
      marginTop: 50,
      width: '80%',
      fontFamily: 'OpenSans_400Regular',
      color: colors.text,
    },
    checkboxContainer: {
      marginHorizontal: 50,
      marginTop: 50,
    },
    checkbox: {
      marginVertical: 12,
      backgroundColor: colorMode === 'Dark' ? colors.shade1 : 'white',
      borderColor: colorMode === 'Dark' ? colors.shade3 : '#ccc',
      ...Shadow,
    },
    checked: {
      color: '#bfbfbf',
      textDecorationLine: 'line-through',
    },
    checkboxText: {
      color: colors.title,
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
      color: colors.text,
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
        if (phaseNum === numComplete && newValue) {
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
      <WalkthroughModal name="grounding" textArray={MODAL_TEXT} />
      {phaseNum >= 1 && (
        <Text style={styles.prompt}>
          Identify and say to yourself {phaseNum} thing{phaseNum === 1 ? '' : 's'} you can{' '}
          {GROUNDING_SENSES[5 - phaseNum]}:
        </Text>
      )}
      <View style={styles.checkboxContainer}>
        {phaseNum >= 1 && (
          <CheckBox
            title={`I can ${GROUNDING_SENSES[5 - phaseNum]} 1 thing`}
            checked={checkbox1}
            onPress={() => check(!checkbox1, setCheckbox1)}
            textStyle={checkbox1 ? styles.checked : styles.checkboxText}
            containerStyle={styles.checkbox}
            checkedColor={colorMode === 'Dark' ? colors.accent : colors.shade3}
            fontFamily="OpenSans_600SemiBold"
          />
        )}
        {phaseNum >= 2 && (
          <CheckBox
            title={`I can ${GROUNDING_SENSES[5 - phaseNum]} a 2nd thing`}
            checked={checkbox2}
            onPress={() => check(!checkbox2, setCheckbox2)}
            textStyle={checkbox2 ? styles.checked : styles.checkboxText}
            containerStyle={styles.checkbox}
            checkedColor={colorMode === 'Dark' ? colors.accent : colors.shade3}
            fontFamily="OpenSans_600SemiBold"
          />
        )}
        {phaseNum >= 3 && (
          <CheckBox
            title={`I can ${GROUNDING_SENSES[5 - phaseNum]} a 3rd thing`}
            checked={checkbox3}
            onPress={() => check(!checkbox3, setCheckbox3)}
            textStyle={checkbox3 ? styles.checked : styles.checkboxText}
            containerStyle={styles.checkbox}
            checkedColor={colorMode === 'Dark' ? colors.accent : colors.shade3}
            fontFamily="OpenSans_600SemiBold"
          />
        )}
        {phaseNum >= 4 && (
          <CheckBox
            title={`I can ${GROUNDING_SENSES[5 - phaseNum]} a 4th thing`}
            checked={checkbox4}
            onPress={() => check(!checkbox4, setCheckbox4)}
            textStyle={checkbox4 ? styles.checked : styles.checkboxText}
            containerStyle={styles.checkbox}
            checkedColor={colorMode === 'Dark' ? colors.accent : colors.shade3}
            fontFamily="OpenSans_600SemiBold"
          />
        )}
        {phaseNum >= 5 && (
          <CheckBox
            title={`I can ${GROUNDING_SENSES[5 - phaseNum]} a 5th thing`}
            checked={checkbox5}
            onPress={() => check(!checkbox5, setCheckbox5)}
            textStyle={checkbox5 ? styles.checked : styles.checkboxText}
            containerStyle={styles.checkbox}
            checkedColor={colorMode === 'Dark' ? colors.accent : colors.shade3}
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
            color={colors.shade2}
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

export default GroundingScreen;
