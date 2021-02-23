/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { View, Text } from 'react-native';

import Shadow from '../constants/shadow';
import MainButton from '../components/UI/MainButton';

const RELAX_PROMPTS = [
  'Place your phone down in a spot where you will be able to see the screen as you do these muscle relaxation exercises. Press "Start" when you are ready.',
  'Scrunch up your toes as tightly as you can',
  'Tense up your calves',
  'Squeeze your upper leg muscles and bottom',
  'Tighten your stomach muscles',
  'Squeeze your shoulders up to your ears and tense your upper arms',
  'Tense up your lower arms',
  'Make tight fists with both hands',
  'Squeeze your eyes shut and scrunch your face up as much as possible',
  'Tighten the muscles in your entire body at once',
  'Nicely done, you have completed this muscle relaxation exercise. Hopefully you feel a bit less tense and more relaxed.',
];

const RelaxScreen = (props) => {
  const [styles, setStyles] = useState({});
  const colors = useSelector((state) => state.settings.colors);
  const [phaseNum, setPhaseNum] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isRelax, setIsRelax] = useState(false);

  useEffect(() => {
    setStyles({
      screen: {
        flex: 1,
        backgroundColor: colors.light,
        justifyContent: 'center',
        alignItems: 'center',
      },
      promptBox: {
        width: '75%',
        minHeight: 50,
      },
      prompt: {
        fontFamily: 'OpenSans_400Regular',
        fontSize: 18,
        textAlign: 'center',
      },
      seconds: {
        fontFamily: 'OpenSans_600SemiBold',
        fontSize: 32,
        marginTop: 20,
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
      buttonText: {
        color: 'white',
        fontSize: 24,
        fontFamily: 'Spartan_400Regular',
      },
    });
  }, []);

  useEffect(() => {
    if (phaseNum && phaseNum !== 10) {
      setTimeout(() => {
        if (seconds === 1 && isRelax) {
          setPhaseNum(phaseNum + 1);
          setIsRelax(false);
          if (phaseNum === 9) {
            setSeconds(0);
          } else {
            setSeconds(10);
          }
        } else if (seconds === 1 && !isRelax) {
          setIsRelax(true);
          setSeconds(5);
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    }
  }, [seconds]);

  const onStart = () => {
    setSeconds(10);
    setPhaseNum(1);
  };

  return (
    <View style={styles.screen}>
      <View style={styles.promptBox}>
        <Text style={styles.prompt}>{isRelax ? 'Relax' : RELAX_PROMPTS[phaseNum]}</Text>
      </View>
      {!!seconds && <Text style={styles.seconds}>{seconds.toString()}</Text>}
      {phaseNum === 0 && (
        <MainButton
          color={colors.shade2}
          style={styles.button}
          containerStyle={styles.buttonContainer}
          onPress={onStart}
        >
          <Text style={styles.buttonText}>Start</Text>
        </MainButton>
      )}
      {phaseNum === 10 && (
        <MainButton
          color={colors.shade2}
          style={styles.button}
          containerStyle={styles.buttonContainer}
          onPress={() => props.navigation.navigate('Home')}
        >
          <Text style={styles.buttonText}>Finish</Text>
        </MainButton>
      )}
    </View>
  );
};

export default RelaxScreen;
