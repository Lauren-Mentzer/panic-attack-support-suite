/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { View, Text } from 'react-native';
import { activateKeepAwake, deactivateKeepAwake } from 'expo-keep-awake';
import * as Speech from 'expo-speech';

import Shadow from '../constants/shadow';
import MainButton from '../components/UI/MainButton';
import WalkthroughModal from '../components/WalkthroughModal';
import Toggle from '../components/UI/Toggle';

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

const RELAX_AUDIO = [
  '',
  'Toes',
  'Calves',
  'Upper Legs',
  'Stomach',
  'Shoulders',
  'Lower Arms',
  'Fists',
  'Face',
  'Body',
  'Nicely done',
];

const MODAL_TEXT = [
  'Before or after a panic attack, your body might feel tight, your muscles clenched from the effort of trying to remain in control. This progressive muscle relaxation exercise can help your body to unclench and relax.',
  "This page will take you through a timed exercise where, one muscle group at a time, you will be asked to clench and then relax. By doing this through the entire body, you will learn to relax your muscles and perhaps even identify tension you didn't even realize you had.",
];

const RelaxScreen = (props) => {
  const { navigation } = props;
  const colors = useSelector((state) => state.settings.colors);
  const [styles] = useState({
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
      color: colors.text,
    },
    seconds: {
      fontFamily: 'OpenSans_600SemiBold',
      fontSize: 32,
      marginTop: 20,
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
    buttonText: {
      color: 'white',
      fontSize: 24,
      fontFamily: 'Spartan_400Regular',
    },
    audioRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 100,
    },
    label: {
      fontFamily: 'OpenSans_600SemiBold',
      color: colors.title,
      marginRight: 10,
    },
    container: {
      width: '100%',
      alignItems: 'center',
    },
  });

  const [phaseNum, setPhaseNum] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isRelax, setIsRelax] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [audioOn, setAudioOn] = useState(false);

  useEffect(() => {
    let timeout;
    if (phaseNum === 10) {
      deactivateKeepAwake('relax');
    }
    if (phaseNum && phaseNum !== 10 && !isPaused) {
      timeout = setTimeout(() => {
        if (seconds === 1 && isRelax) {
          const newPhase = phaseNum + 1;
          setPhaseNum(newPhase);
          setIsRelax(false);
          if (phaseNum === 9) {
            setSeconds(0);
          } else {
            setSeconds(10);
            if (audioOn) {
              Speech.speak(RELAX_AUDIO[newPhase]);
            }
          }
        } else if (seconds === 1 && !isRelax) {
          setIsRelax(true);
          setSeconds(5);
          if (audioOn) {
            Speech.speak('Relax');
          }
        } else {
          const newSeconds = seconds - 1;
          setSeconds(newSeconds);
          if (audioOn) {
            Speech.speak(newSeconds.toString());
          }
        }
      }, 1000);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [seconds, isPaused, audioOn]);

  const onStart = () => {
    setSeconds(10);
    setPhaseNum(1);
    activateKeepAwake('relax');
    if (audioOn) {
      Speech.speak(RELAX_AUDIO[1]);
    }
  };

  const togglePause = () => {
    setIsPaused((value) => !value);
  };

  const toggleAudio = () => {
    setAudioOn((isOn) => !isOn);
  };

  useEffect(() => {
    const leaveListener = (e) => {
      e.preventDefault();
      deactivateKeepAwake('relax');
      navigation.dispatch(e.data.action);
    };
    navigation.addListener('beforeRemove', leaveListener);
    return () => {
      navigation.removeListener('beforeRemove', leaveListener);
    };
  }, [navigation]);

  return (
    <View style={styles.screen}>
      <WalkthroughModal name="relax" textArray={MODAL_TEXT} />
      <View style={styles.promptBox}>
        <Text style={styles.prompt}>{isRelax ? 'Relax' : RELAX_PROMPTS[phaseNum]}</Text>
      </View>
      {!!seconds && <Text style={styles.seconds}>{seconds.toString()}</Text>}
      {phaseNum === 0 && (
        <View style={styles.container}>
          <View style={styles.audioRow}>
            <Text style={styles.label}>Turn Audio Cues On</Text>
            <Toggle toggleValue={audioOn} toggleHandler={toggleAudio} />
          </View>
          <MainButton
            color={colors.shade2}
            style={styles.button}
            containerStyle={styles.buttonContainer}
            onPress={onStart}
          >
            <Text style={styles.buttonText}>Start</Text>
          </MainButton>
        </View>
      )}
      {phaseNum > 0 && phaseNum < 10 && (
        <View style={styles.container}>
          <View style={styles.audioRow}>
            <Text style={styles.label}>Turn Audio Cues On</Text>
            <Toggle toggleValue={audioOn} toggleHandler={toggleAudio} />
          </View>
          <MainButton
            color={colors.shade2}
            style={styles.button}
            containerStyle={styles.buttonContainer}
            onPress={togglePause}
          >
            <Text style={styles.buttonText}>{isPaused ? 'Resume' : 'Pause'}</Text>
          </MainButton>
        </View>
      )}
      {phaseNum === 10 && (
        <MainButton
          color={colors.shade2}
          style={styles.button}
          containerStyle={styles.buttonContainer}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.buttonText}>Finish</Text>
        </MainButton>
      )}
    </View>
  );
};

export default RelaxScreen;
