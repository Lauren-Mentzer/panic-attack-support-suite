import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { View, Text, Animated } from 'react-native';
import { color } from 'd3-color';
import { deactivateKeepAwake, activateKeepAwake } from 'expo-keep-awake';

import Toggle from '../components/UI/Toggle';
import Shadow from '../constants/shadow';
import MainButton from '../components/UI/MainButton';
import WalkthroughModal from '../components/WalkthroughModal';

const PANIC_MODE = 0;
const PREVENT_MODE = 1;
const IN_TEXT = 'Breathe in through your nose';
const OUT_TEXT = 'Breathe out through your mouth';
const HOLD_TEXT = 'Hold';
const IN_TIME = [4, 4];
const HOLD_TIME = [1, 7];
const OUT_TIME = [4, 8];

const MODAL_TEXT = [
  "During a panic attack, or even just a stressful situation, the body often turns to a 'fight or flight' response, provoking a heightened heart rate, blood pressure, and the inability to catch your breath. If this is something you experience frequently, learning some deep breathing exercises can help to invoke the relaxation response. This page can guide you through two such breathing exercises.",
  'The first exercise is geared toward when you are currently experiencing a panic attack. The simple rhythm of breathing in for 4 seconds, holding for 1, and breathing out for 4 is easy to stick to, but if you are having trouble slowing your breath down, feel free to pause the animation until you feel you are ready to resume.',
  "The second exercise, which can be accessed by toggling to 'Preventative Mode' at the bottom of the screen, is a more involved exercise that is best done before the onset of a panic attack. If you can feel your heart rate rising from a stressful situation, it might be helpful to try this 4-7-8 rhythm to keep your body from entering its 'fight or flight' state. It can even be helpful to practice this exercise when you are feeling calm, so that your body gets used to the idea that deep breathing is linked to feeling relaxed.",
];

const BreatheScreen = (props) => {
  const { navigation } = props;
  const colors = useSelector((state) => state.settings.colors);
  const colorMode = useSelector((state) => state.settings.colorPalette);
  const [styles] = useState({
    screen: {
      flex: 1,
      backgroundColor: colors.light,
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    textBox: {
      height: 80,
      width: '100%',
      alignItems: 'center',
    },
    text: {
      fontFamily: 'OpenSans_400Regular',
      fontSize: 16,
      color: colors.text,
    },
    number: {
      fontSize: 20,
      marginTop: 10,
      fontFamily: 'OpenSans_600SemiBold',
      color: colors.text,
    },
    circleOutline: {
      width: 200,
      height: 200,
      borderRadius: 100,
      borderColor: colors.primary,
      borderWidth: 2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    circleInside: {
      backgroundColor: colors.shade3,
      borderRadius: 200,
    },
    switchBox: {
      height: 100,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    label: {
      fontFamily: 'OpenSans_600SemiBold',
      margin: 10,
      color: colors.title,
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

  const [displayText, setDisplayText] = useState(IN_TEXT);
  const [displayNumber, setDisplayNumber] = useState(4);
  const [mode, setMode] = useState(PANIC_MODE);
  const [isPaused, setIsPaused] = useState(false);
  const animationValue = useRef(new Animated.Value(0)).current;
  const fadedPrimary = color(colors.primary);
  fadedPrimary.opacity = 0.3;
  const fadedShade = color(colors.shade3);
  fadedShade.opacity = 0.3;

  useEffect(() => {
    const leaveListener = (e) => {
      e.preventDefault();
      deactivateKeepAwake('breathe');
      navigation.dispatch(e.data.action);
    };
    navigation.addListener('beforeRemove', leaveListener);
    activateKeepAwake('breathe');
    return () => {
      navigation.removeListener('beforeRemove', leaveListener);
    };
  }, [navigation]);

  useEffect(() => {
    let timeout;
    if (!isPaused) {
      timeout = setTimeout(() => {
        let newNum = displayNumber ? displayNumber - 1 : null;
        let newText = displayText;
        if (displayText === IN_TEXT && newNum === 0) {
          newNum = mode === 0 ? null : HOLD_TIME[mode];
          newText = HOLD_TEXT;
          setDisplayText(newText);
        } else if (displayText === OUT_TEXT && newNum === 0) {
          newNum = IN_TIME[mode];
          newText = IN_TEXT;
          setDisplayText(newText);
        } else if (displayText === HOLD_TEXT && !newNum) {
          newNum = OUT_TIME[mode];
          newText = OUT_TEXT;
          setDisplayText(newText);
        }
        setDisplayNumber(newNum);
      }, 1000);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [displayNumber, mode, isPaused]);

  useEffect(() => {
    if (displayText === IN_TEXT && !isPaused) {
      Animated.sequence([
        Animated.timing(animationValue, {
          toValue: 200,
          duration: 1000 * IN_TIME[mode],
          useNativeDriver: false,
        }),
        Animated.timing(animationValue, {
          toValue: 0,
          duration: 1000 * OUT_TIME[mode],
          delay: 1000 * HOLD_TIME[mode],
          useNativeDriver: false,
        }),
      ]).start();
    }
  }, [displayText, mode]);

  const toggleMode = useCallback(() => {
    const newMode = mode === PANIC_MODE ? PREVENT_MODE : PANIC_MODE;
    setMode(newMode);
    setDisplayText(IN_TEXT);
    setDisplayNumber(IN_TIME[newMode]);
    animationValue.setValue(0);
  }, [mode]);

  const togglePause = useCallback(() => {
    if (isPaused) {
      let inTime;
      let holdTime;
      let outTime;
      switch (displayText) {
        case IN_TEXT:
          inTime = displayNumber;
          holdTime = HOLD_TIME[mode];
          outTime = OUT_TIME[mode];
          break;
        case HOLD_TEXT:
          inTime = 0;
          holdTime = displayNumber || 1;
          outTime = OUT_TIME[mode];
          break;
        case OUT_TEXT:
          inTime = 0;
          holdTime = 0;
          outTime = displayNumber;
          break;
        default:
      }
      const animationArray = [];
      if (inTime) {
        animationArray.push(
          Animated.timing(animationValue, {
            toValue: 200,
            duration: inTime * 1000,
            useNativeDriver: false,
          }),
        );
      }
      animationArray.push(
        Animated.timing(animationValue, {
          toValue: 0,
          duration: outTime * 1000,
          delay: holdTime * 1000,
          useNativeDriver: false,
        }),
      );
      Animated.sequence(animationArray).start();
      setIsPaused(false);
    } else {
      Animated.timing(animationValue).stop();
      setIsPaused(true);
    }
  }, [isPaused, mode]);

  return (
    <View style={styles.screen}>
      <WalkthroughModal name="breathe" textArray={MODAL_TEXT} />
      <View style={styles.content}>
        <View style={styles.textBox}>
          <Text style={styles.text}>{displayText}</Text>
          <Text style={styles.number}>{displayNumber}</Text>
        </View>
        <View style={styles.circleOutline}>
          <Animated.View
            style={{
              ...styles.circleInside,
              height: animationValue,
              width: animationValue,
              backgroundColor: animationValue.interpolate({
                inputRange: [0, 200],
                outputRange: [
                  colorMode === 'Dark' ? colors.shade1 : colors.shade3,
                  colorMode === 'Dark' ? colors.shade3 : colors.primary,
                ],
              }),
            }}
          />
        </View>
        <MainButton
          color={colors.shade2}
          onPress={togglePause}
          style={styles.button}
          containerStyle={styles.buttonContainer}
        >
          <Text style={styles.buttonText}>{isPaused ? 'Resume' : 'Pause'}</Text>
        </MainButton>
      </View>

      <View style={styles.switchBox}>
        <Text style={styles.label}>Panic Mode</Text>
        <Toggle toggleValue={!!mode} toggleHandler={toggleMode} />
        <Text style={styles.label}>Preventative Mode</Text>
      </View>
    </View>
  );
};

export default BreatheScreen;
