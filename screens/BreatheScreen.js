import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { View, Text, Animated, Switch, Platform } from 'react-native';
import { color } from 'd3-color';

const PANIC_MODE = 0;
const PREVENT_MODE = 1;
const IN_TEXT = 'Breathe in through your nose';
const OUT_TEXT = 'Breathe out through your mouth';
const HOLD_TEXT = 'Hold';
const IN_TIME = [4, 4];
const HOLD_TIME = [1, 7];
const OUT_TIME = [4, 8];

const BreatheScreen = (props) => {
  const [styles, setStyles] = useState({});
  const colors = useSelector((state) => state.settings.colors);
  const [displayText, setDisplayText] = useState(IN_TEXT);
  const [displayNumber, setDisplayNumber] = useState(4);
  const [mode, setMode] = useState(PANIC_MODE);
  const animationValue = useRef(new Animated.Value(0)).current;
  const fadedPrimary = color(colors.primary);
  fadedPrimary.opacity = 0.3;
  const fadedShade = color(colors.shade3);
  fadedShade.opacity = 0.3;

  useEffect(() => {
    setStyles({
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
      },
      number: {
        fontSize: 20,
        marginTop: 10,
        fontFamily: 'OpenSans_600SemiBold',
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
      },
    });
  }, []);

  useEffect(() => {
    setTimeout(() => {
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
  }, [displayNumber, mode]);

  useEffect(() => {
    if (displayText === IN_TEXT) {
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

  const toggleMode = () => {
    const newMode = mode === PANIC_MODE ? PREVENT_MODE : PANIC_MODE;
    setMode(newMode);
  };

  return (
    <View style={styles.screen}>
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
                outputRange: [colors.shade3, colors.primary],
              }),
            }}
          />
        </View>
      </View>

      <View style={styles.switchBox}>
        <Text style={styles.label}>Panic Mode</Text>
        <Switch
          value={!!mode}
          onValueChange={toggleMode}
          ios_backgroundColor={colors.primary}
          trackColor={{
            false: Platform.OS === 'android' ? fadedPrimary : colors.primary,
            true: Platform.OS === 'android' ? fadedShade : colors.shade3,
          }}
          thumbColor={Platform.OS === 'android' ? (mode === 0 ? colors.primary : colors.shade3) : undefined}
        />
        <Text style={styles.label}>Preventative Mode</Text>
      </View>
    </View>
  );
};

export default BreatheScreen;
