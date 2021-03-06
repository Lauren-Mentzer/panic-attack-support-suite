import React, { useState, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { View, Dimensions, Platform } from 'react-native';
import { Slider } from 'react-native-elements';
import { color } from 'd3-color';
import { deactivateKeepAwake, activateKeepAwake } from 'expo-keep-awake';

import Shadow from '../constants/shadow';
import FlashcardSlider from '../components/UI/Slider';
import WalkthroughModal from '../components/WalkthroughModal';

const MODAL_TEXT = [
  'It can be difficult or impossible to speak for any number of reasons, whether during a panic attack or not, and this section of the app aims to help you communicate with those around you even when non- or semi-verbal.',
  "This page provides you with a space to view virtual 'flashcards' which should display messages that you think would be useful to have on-hand. The people around you may not understand what is happening, so an explanation could be useful.",
  "We've included a few sample messages, but these can be changed via the settings in the top right corner. And don't forget to check out the 'chat' tab along the bottom!",
];

const FlaschardScreen = (props) => {
  const { navigation } = props;
  const colors = useSelector((state) => state.settings.colors);
  const colorMode = useSelector((state) => state.settings.colorPalette);
  const [styles] = useState({
    screen: {
      flex: 1,
      backgroundColor: colors.light,
      alignItems: 'center',
    },
    sliderContainer: {
      width: '80%',
    },
    iosThumb: {
      backgroundColor: 'white',
      ...Shadow,
      height: 30,
      width: 30,
      borderRadius: 15,
    },
    androidThumb: {
      height: 25,
      width: 25,
      backgroundColor: colorMode === 'Dark' ? colors.accent : colors.shade2,
      ...Shadow,
    },
    iosTrack: {
      height: 2,
    },
    androidTrack: {
      height: 6,
      borderRadius: 3,
    },
  });

  const [sliderPosition, setSliderPosition] = useState(0);
  const flashcardList = useSelector((state) => state.flashcards.list);
  const fadedColor = color(colorMode === 'Dark' ? colors.accent : colors.shade2);
  fadedColor.opacity = 0.3;

  useEffect(() => {
    const leaveListener = (e) => {
      e.preventDefault();
      deactivateKeepAwake('flashcards');
      navigation.dispatch(e.data.action);
    };
    navigation.addListener('beforeRemove', leaveListener);
    activateKeepAwake('flashcards');
    return () => {
      navigation.removeListener('beforeRemove', leaveListener);
    };
  }, [navigation]);

  const changeSliderPosition = useCallback(
    (newPosition) => {
      setSliderPosition(newPosition);
    },
    [setSliderPosition],
  );

  return (
    <View style={styles.screen}>
      <WalkthroughModal name="flashcards" textArray={MODAL_TEXT} />
      <FlashcardSlider
        dataList={flashcardList}
        cardWidth={Dimensions.get('window').width * 0.75}
        sliderPosition={sliderPosition}
        changeSliderPosition={changeSliderPosition}
      />
      <View style={styles.sliderContainer}>
        <Slider
          value={sliderPosition}
          onValueChange={(value) => setSliderPosition(value)}
          minimumValue={0}
          maximumValue={flashcardList.length - 1}
          maximumTrackTintColor={Platform.select({
            ios: colorMode === 'Dark' ? colors.shade2 : 'gray',
            android: fadedColor.toString(),
          })}
          minimumTrackTintColor={colorMode === 'Dark' ? colors.accent : colors.shade2}
          allowTouchTrack
          thumbStyle={Platform.OS === 'ios' ? styles.iosThumb : styles.androidThumb}
          trackStyle={Platform.OS === 'ios' ? styles.iosTrack : styles.androidTrack}
          animateTransitions
          step={1}
        />
      </View>
    </View>
  );
};

export default FlaschardScreen;
