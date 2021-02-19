import React, { useState, useReducer, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { StyleSheet, View, KeyboardAvoidingView, Platform, Button, Text, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/colors';
import Input from './UI/Input';
import TouchableComponent from './UI/TouchableComponent';
import { editContact } from '../store/actions/contact';

const FORM_UPDATE = 'FORM_UPDATE';
const FORM_RESET = 'FORM_RESET';

const formReducer = (state, action) => {
  if (action.type === FORM_UPDATE) {
    let formIsValid = true;
    const updatedValues = { ...state.inputValues, [action.input]: action.value };
    const updatedValidities = { ...state.inputValidities, [action.input]: action.isValid };
    Object.keys(updatedValidities).forEach((key) => {
      if (!updatedValidities[key]) {
        formIsValid = false;
      }
    });
    formIsValid =
      formIsValid &&
      ((updatedValues.nickname === '' && updatedValues.phone === null && updatedValues.message === '') ||
        (updatedValues.nickname.length && !!updatedValues.phone && updatedValues.message.length));
    return { inputValues: updatedValues, inputValidities: updatedValidities, formIsValid };
  }
  if (action.type === FORM_RESET) {
    return {
      inputValues: {
        nickname: action.contact.nickname,
        phone: action.contact.phone,
        message: action.contact.message,
      },
      inputValidities: {
        nickname: (action.contact.phone === null && action.contact.message === '') || action.contact.nickname !== '',
        phone: (action.contact.nickname === null && action.contact.message === '') || action.contact.phone !== '',
        message: (action.contact.phone === null && action.contact.nickname === '') || action.contact.message !== '',
      },
      formIsValid:
        (action.contact.nickname === '' && action.contact.phone === null && action.contact.message === '') ||
        (action.contact.nickname.length && !!action.contact.phone && action.contact.message.length),
    };
  }
  return state;
};

const ContactForm = (props) => {
  const { contact, setShowHelp, contactNum } = props;
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      nickname: contact.nickname,
      phone: contact.phone,
      message: contact.message,
    },
    inputValidities: {
      nickname: (contact.phone === null && contact.message === '') || contact.nickname !== '',
      phone: (contact.nickname === null && contact.message === '') || contact.phone !== '',
      message: (contact.phone === null && contact.nickname === '') || contact.message !== '',
    },
    formIsValid:
      (contact.nickname === '' && contact.phone === null && contact.message === '') ||
      (contact.nickname.length && contact.phone && contact.message.length),
  });

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState],
  );

  const cancelEditHandler = useCallback(() => {
    // TODO: put contact back in
    setIsEditing(false);
  }, [formState, contact, setIsEditing]);

  const saveHandler = useCallback(() => {
    console.log(formState);
    if (!formState.formIsValid) {
      Alert.alert('Incorrect input', 'Please make sure all fields are filled out correctly', [{ text: 'Okay' }]);
    }
    if (contactNum === 1) {
      dispatch(editContact(formState.inputValues, null));
    } else {
      dispatch(editContact(null, formState.inputValues));
    }
    setIsEditing(false);
  }, [formState, dispatch, setIsEditing]);

  return (
    <View>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerText}>{`CONTACT ${contactNum}`}</Text>
          <TouchableComponent activeOpacity={0.5} onPress={() => setShowHelp(true)}>
            <Ionicons
              size={24}
              color={Colors.shade2}
              name={Platform.OS === 'ios' ? 'ios-information-circle-outline' : 'md-information-circle-outline'}
            />
          </TouchableComponent>
        </View>
        {isEditing ? (
          <View style={styles.headerRight}>
            <View style={styles.button}>
              <Button color={Colors.danger} title="Cancel" onPress={cancelEditHandler} />
            </View>
            <View style={styles.button}>
              <Button color={Colors.shade2} title="Save" onPress={saveHandler} />
            </View>
          </View>
        ) : (
          <View style={styles.button}>
            <Button color={Colors.shade2} title="Edit" onPress={() => setIsEditing(true)} />
          </View>
        )}
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={Platform.select({ ios: 0, android: 500 })}
      >
        <Input
          label="Nickname"
          id="nickname"
          errorText="Please enter a name for this contact"
          autoCapitalize="words"
          returnKeyType="next"
          editable={isEditing}
          onInputChange={inputChangeHandler}
          initialValue={contact.nickname}
          initiallyValid={contact.nickname !== ''}
        />
        <Input
          label="Phone Number"
          id="phone"
          errorText="Please enter a phone number for this contact"
          returnKeyType="next"
          keyboardType="phone-pad"
          editable={isEditing}
          minLength={10}
          maxLength={10}
          onInputChange={inputChangeHandler}
          initialValue={contact.phone}
          initiallyValid={contact.phone !== null}
        />
        <Input
          label="Message"
          id="message"
          errorText="Please enter a message to send to this contact"
          autoCapitalize="sentences"
          returnKeyType="done"
          editable={isEditing}
          multiline
          onInputChange={inputChangeHandler}
          initialValue={contact.message}
          initiallyValid={contact.message !== ''}
        />
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerRight: {
    flexDirection: 'row',
  },
  button: {
    minWidth: 80,
    marginRight: 5,
  },
  headerText: {
    fontSize: 14,
    marginVertical: 10,
    fontWeight: 'bold',
    marginRight: 10,
  },
});

export default ContactForm;
