import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, ScrollView, Text, View, Platform, Alert } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import Colors from '../../constants/colors';
import Input from '../../components/UI/Input';
import HeaderButton from '../../components/UI/HeaderButton';
import { editContact } from '../../store/actions/contact';
import HelpButton from '../../components/HelpButton';

const ContactSettingsScreen = (props) => {
  const { navigation } = props;
  const dispatch = useDispatch();
  const contact1 = useSelector((state) => state.contact.contact1);
  const contact2 = useSelector((state) => state.contact.contact2);
  const [contact1Name, setContact1Name] = useState(contact1.nickname);
  const [contact1Phone, setContact1Phone] = useState(contact1.phone);
  const [contact1Message, setContact1Message] = useState(contact1.message);
  const [contact2Name, setContact2Name] = useState(contact2.nickname);
  const [contact2Phone, setContact2Phone] = useState(contact2.phone);
  const [contact2Message, setContact2Message] = useState(contact2.message);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const save = useCallback(() => {
    dispatch(
      editContact(
        { nickname: contact1Name, phone: contact1Phone, message: contact1Message },
        { nickname: contact2Name, phone: contact2Phone, message: contact2Message },
      ),
    );
  }, [contact1Name, contact1Phone, contact1Message, contact2Name, contact2Phone, contact2Message]);

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item title="Settings" iconName={Platform.OS === 'ios' ? 'save-sharp' : 'save'} onPress={save} />
        </HeaderButtons>
      ),
    });
  }, [save]);

  useEffect(() => {
    const contact1Changes =
      contact1.nickname !== contact1Name || contact1.phone !== contact1Phone || contact1.message !== contact1Message;
    const contact2Changes =
      contact2.nickname !== contact2Name || contact2.phone !== contact2Phone || contact2.message !== contact2Message;
    setHasUnsavedChanges(contact1Changes || contact2Changes);
  }, [contact1Name, contact1Phone, contact1Message, contact2Name, contact2Phone, contact2Message, contact1, contact2]);

  useEffect(() => {
    const leaveListener = (e) => {
      if (!hasUnsavedChanges) return;
      e.preventDefault();
      Alert.alert('Discard changes?', 'You have unsaved changes. Are you sure to discard them and leave the screen?', [
        { text: "Don't leave", style: 'default' },
        {
          text: 'Discard',
          style: 'destructive',
          onPress: () => navigation.dispatch(e.data.action),
        },
      ]);
    };
    navigation.addListener('beforeRemove', leaveListener);
    return () => {
      navigation.removeListener('beforeRemove', leaveListener);
    };
  }, [navigation, hasUnsavedChanges]);

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.contents}>
        <View style={styles.headerRow}>
          <Text style={styles.headerLabel}>CONTACT 1</Text>
          <HelpButton>
            <View>
              <Text style={styles.description}>
                Choose one or two people who would be good emergency contacts in the event that you have a panic attack,
                and input their name and phone number below.
              </Text>
              <Text style={styles.description}>
                None of the following fields are required, but inputting a phone number will allow emergency phone calls
                to be easily made, and additionally inputting a message will let you send that text with the touch of a
                button.
              </Text>
              <Text style={styles.description}>
                It might be a good idea to let your emergency contacts know how the app works before using these
                features.
              </Text>
            </View>
          </HelpButton>
        </View>
        <View style={styles.inputWrapper}>
          <Input
            label="Nickname"
            id="nickname"
            autoCapitalize="words"
            returnKeyType="next"
            editable
            onInputChange={(_, value) => setContact1Name(value)}
            initialValue={contact1Name}
            initiallyValid
          />
        </View>
        <View style={styles.inputWrapper}>
          <Input
            label="Phone Number"
            id="phone"
            returnKeyType="next"
            keyboardType="phone-pad"
            editable
            onInputChange={(_, value) => setContact1Phone(value)}
            initialValue={contact1Phone}
            initiallyValid
          />
        </View>
        <View style={styles.inputWrapper}>
          <Input
            label="Text Message"
            id="message"
            autoCapitalize="sentences"
            returnKeyType="next"
            editable
            onInputChange={(_, value) => setContact1Message(value)}
            initialValue={contact1Message}
            initiallyValid
          />
        </View>
        <Text style={styles.label}>CONTACT 2</Text>
        <View style={styles.inputWrapper}>
          <Input
            label="Nickname"
            id="nickname"
            autoCapitalize="words"
            returnKeyType="next"
            editable
            onInputChange={(_, value) => setContact2Name(value)}
            initialValue={contact2Name}
            initiallyValid
          />
        </View>
        <View style={styles.inputWrapper}>
          <Input
            label="Phone Number"
            id="phone"
            returnKeyType="next"
            keyboardType="phone-pad"
            editable
            onInputChange={(_, value) => setContact2Phone(value)}
            initialValue={contact2Phone}
            initiallyValid
          />
        </View>
        <View style={styles.inputWrapper}>
          <Input
            label="Text Message"
            id="message"
            autoCapitalize="sentences"
            returnKeyType="next"
            editable
            onInputChange={(_, value) => setContact2Message(value)}
            initialValue={contact2Message}
            initiallyValid
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.light,
    paddingHorizontal: 20,
  },
  contents: {
    paddingBottom: 20,
  },
  label: {
    fontFamily: 'OpenSans_600SemiBold',
    fontSize: 16,
    color: '#777',
    marginTop: 30,
  },
  headerLabel: {
    fontFamily: 'OpenSans_600SemiBold',
    fontSize: 16,
    color: '#777',
  },
  headerRow: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  inputWrapper: {
    marginVertical: 10,
  },
  description: {
    marginBottom: 10,
    fontFamily: 'OpenSans_400Regular',
  },
});

export default ContactSettingsScreen;
