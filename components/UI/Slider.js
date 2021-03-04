import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { View, FlatList, Platform, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import MainButton from './MainButton';
import Card from './Card';

const Slider = (props) => {
  const { dataList, cardWidth, sliderPosition, changeSliderPosition } = props;
  const colors = useSelector((state) => state.settings.colors);
  const colorMode = useSelector((state) => state.settings.colorPalette);
  const [styles] = useState({
    listContainer: {
      backgroundColor: 'gray',
      width: '75%',
      minHeight: 250,
    },
    slider: {
      marginVertical: 60,
      marginHorizontal: 5,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    arrow: {
      borderRadius: 20,
      overflow: 'hidden',
      width: 40,
      height: 40,
    },
    card: {
      minHeight: 250,
      marginHorizontal: 10,
      marginVertical: 3,
    },
    text: {
      fontSize: 24,
      fontFamily: 'OpenSans_400Regular',
      color: colors.text,
    },
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [disabledColor, setDisabledColor] = useState();
  const [enabledColor, setEnabledColor] = useState();
  const sliderRef = useRef();

  useEffect(() => {
    setDisabledColor(colorMode === 'Dark' ? colors.shade3 : '#ccc');
    setEnabledColor(colorMode === 'Dark' ? colors.accent : colors.primary);
  }, [colors]);

  useEffect(() => {
    sliderRef.current.scrollToIndex({
      index: sliderPosition,
      animated: true,
    });
    setCurrentIndex(sliderPosition);
  }, [sliderPosition]);

  const goRightHandler = useCallback(() => {
    const newIndex = currentIndex + 1;
    sliderRef.current.scrollToIndex({
      index: newIndex,
      animated: true,
    });
    setCurrentIndex(newIndex);
    changeSliderPosition(newIndex);
  }, [currentIndex, dataList]);

  const goLeftHandler = useCallback(() => {
    const newIndex = currentIndex - 1;
    sliderRef.current.scrollToIndex({
      index: newIndex,
      animated: true,
    });
    setCurrentIndex(newIndex);
    changeSliderPosition(newIndex);
  }, [currentIndex, dataList]);

  return (
    <View style={styles.slider}>
      <MainButton style={styles.arrow} onPress={goLeftHandler} disabled={currentIndex === 0}>
        <Ionicons
          size={32}
          color={currentIndex === 0 ? disabledColor : enabledColor}
          name={Platform.select({ ios: 'ios-arrow-back', android: 'md-arrow-back' })}
        />
      </MainButton>
      <View style={{ width: cardWidth }}>
        <FlatList
          ref={sliderRef}
          horizontal
          pagingEnabled
          initialNumToRender={5}
          maxToRenderPerBatch={5}
          showsHorizontalScrollIndicator={false}
          windowSize={5}
          removeClippedSubviews={false}
          data={dataList}
          viewabilityConfig={{ itemVisiblePercentThreshold: 0 }}
          renderItem={(item) => (
            <Card style={{ ...styles.card, width: cardWidth - 20 }}>
              <Text style={styles.text}>{item.item}</Text>
            </Card>
          )}
          scrollEnabled={false}
          keyExtractor={(_, index) => index.toString()}
          style={{ width: cardWidth, height: 256 }}
        />
      </View>
      <MainButton style={styles.arrow} onPress={goRightHandler} disabled={currentIndex === dataList.length - 1}>
        <Ionicons
          size={32}
          color={currentIndex === dataList.length - 1 ? disabledColor : enabledColor}
          name={Platform.select({ ios: 'ios-arrow-forward', android: 'md-arrow-forward' })}
        />
      </MainButton>
    </View>
  );
};

export default Slider;
