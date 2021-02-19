import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { View, StyleSheet, Dimensions, Platform } from 'react-native';
import { Slider } from 'react-native-elements';
import { color } from 'd3-color';

import Colors from '../constants/colors';
import Shadow from '../constants/shadow';
import FlashcardSlider from '../components/UI/Slider';

const FlaschardScreen = (props) => {
  const [sliderPosition, setSliderPosition] = useState(0);
  const flashcardList = useSelector((state) => state.flashcards.list);
  const fadedColor = color(Colors.shade2);
  fadedColor.opacity = 0.3;

  const changeSliderPosition = useCallback(
    (newPosition) => {
      setSliderPosition(newPosition);
    },
    [setSliderPosition],
  );

  return (
    <View style={styles.screen}>
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
          maximumTrackTintColor={Platform.OS === 'ios' ? 'gray' : fadedColor.formatRgb()}
          minimumTrackTintColor={Colors.shade2}
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

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.light,
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
    backgroundColor: Colors.shade2,
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

export default FlaschardScreen;
