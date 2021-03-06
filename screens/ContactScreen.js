/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { View, Text } from 'react-native';
import * as Linking from 'expo-linking';
import * as SMS from 'expo-sms';

import Shadow from '../constants/shadow';
import MainButton from '../components/UI/MainButton';
import WalkthroughModal from '../components/WalkthroughModal';

const MODAL_TEXT = [
  'This is your emergency contact screen. It can be helpful and very important to let a parent, partner, friend, or other trusted person know that you are having a panic attack, and this easy-access screen makes it simple.',
  'After you have inputted their information via the settings button in the top corner, you will have the option to either call or to text a predetermined message to up to two contacts.',
];

const ContactScreen = () => {
  const colors = useSelector((state) => state.settings.colors);
  const [styles] = useState({
    screen: {
      flex: 1,
      backgroundColor: colors.light,
      paddingVertical: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
      height: '15%',
      width: '80%',
      marginVertical: 10,
      borderRadius: 10,
      ...Shadow,
    },
    buttonContainer: {
      borderRadius: 10,
    },
    title: {
      color: 'white',
      fontSize: 24,
      fontFamily: 'Spartan_400Regular',
    },
    default: {
      width: '50%',
    },
    defaultMessage: {
      fontFamily: 'OpenSans_400Regular',
      fontSize: 15,
      textAlign: 'center',
      color: colors.text,
    },
  });

  const contact1 = useSelector((state) => state.contact.contact1);
  const contact2 = useSelector((state) => state.contact.contact2);

  const textHandler = async (number, message) => {
    SMS.sendSMSAsync(number, message);
  };

  const callHandler = (number) => {
    Linking.openURL(`tel:${+number}`);
  };

  return (
    <View style={styles.screen}>
      <WalkthroughModal name="contact" textArray={MODAL_TEXT} />
      {!!contact1.phone && !!contact1.message.length && (
        <MainButton
          color={colors.shade1}
          style={styles.button}
          containerStyle={styles.buttonContainer}
          onPress={() => textHandler(contact1.phone, contact1.message)}
        >
          <Text style={styles.title}>Message {contact1.nickname.length ? contact1.nickname : 'Contact 1'}</Text>
        </MainButton>
      )}
      {!!contact1.phone && (
        <MainButton
          color={colors.shade1}
          style={styles.button}
          containerStyle={styles.buttonContainer}
          onPress={() => callHandler(contact1.phone)}
        >
          <Text style={styles.title}>Call {contact1.nickname.length ? contact1.nickname : 'Contact 1'}</Text>
        </MainButton>
      )}
      {!!contact2.phone && !!contact2.message.length && (
        <MainButton
          color={colors.shade3}
          style={styles.button}
          containerStyle={styles.buttonContainer}
          onPress={() => textHandler(contact2.phone, contact2.message)}
        >
          <Text style={styles.title}>Message {contact2.nickname.length ? contact2.nickname : 'Contact 2'}</Text>
        </MainButton>
      )}
      {!!contact2.phone && (
        <MainButton
          color={colors.shade3}
          style={styles.button}
          containerStyle={styles.buttonContainer}
          onPress={() => callHandler(contact2.phone)}
        >
          <Text style={styles.title}>Call {contact2.nickname.length ? contact2.nickname : 'Contact 2'}</Text>
        </MainButton>
      )}

      {!contact1.phone && !contact2.phone && (
        <View style={styles.default}>
          <Text style={styles.defaultMessage}>You have not yet inputted your emergency contacts</Text>
        </View>
      )}
    </View>
  );
};

export default ContactScreen;
