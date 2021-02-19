import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/colors';
import Shadow from '../constants/shadow';
import TouchableComponent from './UI/TouchableComponent';
import MainButton from './UI/MainButton';
import CardModal from './UI/CardModal';

const HelpButton = (props) => {
  const { children } = props;
  const [showHelp, setShowHelp] = useState(false);

  return (
    <View>
      <TouchableComponent activeOpacity={0.5} onPress={() => setShowHelp(true)}>
        <Ionicons size={30} color={Colors.shade2} name="information-circle-outline" />
      </TouchableComponent>
      <CardModal visible={showHelp}>
        {children}
        <MainButton
          color={Colors.shade2}
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

const styles = StyleSheet.create({
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
    color: 'white',
    fontSize: 20,
    fontFamily: 'Spartan_400Regular',
  },
});

export default HelpButton;
