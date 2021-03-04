import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Shadow from '../constants/shadow';
import TouchableComponent from './UI/TouchableComponent';
import MainButton from './UI/MainButton';
import CardModal from './UI/CardModal';

const HelpButton = (props) => {
  const { children } = props;
  const colors = useSelector((state) => state.settings.colors);
  const colorMode = useSelector((state) => state.settings.colorPalette);
  const [styles] = useState({
    button: {
      marginTop: 10,
      height: 45,
      borderRadius: 10,
      ...Shadow,
    },
    buttonContainer: {
      borderRadius: 10,
      alignSelf: 'center',
    },
    buttonText: {
      color: colorMode === 'Dark' ? colors.light : 'white',
      fontSize: 20,
      fontFamily: 'Spartan_400Regular',
    },
  });

  const [showHelp, setShowHelp] = useState(false);

  return (
    <View>
      <TouchableComponent activeOpacity={0.5} onPress={() => setShowHelp(true)}>
        <Ionicons
          size={30}
          color={colorMode === 'Dark' ? colors.accent : colors.shade2}
          name="information-circle-outline"
        />
      </TouchableComponent>
      <CardModal visible={showHelp}>
        {children}
        <MainButton
          color={colorMode === 'Dark' ? colors.accent : colors.shade2}
          style={styles.button}
          containerStyle={styles.buttonContainer}
          onPress={() => setShowHelp(false)}
        >
          <Text style={styles.buttonText}>Okay</Text>
        </MainButton>
      </CardModal>
    </View>
  );
};

export default HelpButton;
