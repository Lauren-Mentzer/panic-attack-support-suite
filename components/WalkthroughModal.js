import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import CardModal from './UI/CardModal';
import MainButton from './UI/MainButton';
import Shadow from '../constants/shadow';
import { setWalkthrough } from '../store/actions/settings';

const WalkthroughModal = ({ name, textArray = [] }) => {
  const dispatch = useDispatch();
  const colors = useSelector((state) => state.settings.colors);
  const colorMode = useSelector((state) => state.settings.colorPalette);
  const [styles] = useState({
    container: {
      width: '100%',
      alignItems: 'center',
      minHeight: 150,
      justifyContent: 'space-between',
    },
    buttonRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
    },
    button: {
      height: 40,
      width: 120,
      borderRadius: 10,
      ...Shadow,
    },
    arrow: {
      height: 45,
    },
    buttonContainer: {
      borderRadius: 10,
    },
    title: {
      color: 'white',
      fontSize: 20,
      fontFamily: 'Spartan_400Regular',
    },
    modalText: {
      color: colors.text,
      fontFamily: 'OpenSans_400Regular',
      marginBottom: 10,
    },
    invisible: {
      height: 0,
      width: 0,
      color: 'transparent',
    },
  });
  const firstTime = useSelector((state) => state.settings.walkthrough[name]);
  const [arrayIndex, setArrayIndex] = useState(0);

  const changeIndex = (increment) => {
    setArrayIndex((index) => index + increment);
  };

  const setFirstTime = () => {
    dispatch(setWalkthrough(false, name));
  };

  return (
    <CardModal visible={firstTime} animated>
      <View style={styles.container}>
        {textArray && <Text style={styles.modalText}>{textArray[arrayIndex]}</Text>}
        <View style={styles.buttonRow}>
          <MainButton
            style={arrayIndex > 0 ? styles.arrow : styles.invisible}
            onPress={() => changeIndex(arrayIndex > 0 ? -1 : 0)}
          >
            <Ionicons size={32} color={colorMode === 'Dark' ? colors.accent : colors.primary} name="arrow-back" />
          </MainButton>
          {textArray && arrayIndex === textArray.length - 1 && (
            <MainButton
              color={colors.shade2}
              style={styles.button}
              containerStyle={styles.buttonContainer}
              onPress={setFirstTime}
            >
              <Text style={styles.title}>Okay</Text>
            </MainButton>
          )}
          <MainButton
            style={arrayIndex < textArray.length - 1 ? styles.arrow : styles.invisible}
            onPress={() => changeIndex(arrayIndex < textArray.length - 1 ? 1 : 0)}
          >
            <Ionicons size={32} color={colorMode === 'Dark' ? colors.accent : colors.primary} name="arrow-forward" />
          </MainButton>
        </View>
      </View>
    </CardModal>
  );
};

export default WalkthroughModal;
