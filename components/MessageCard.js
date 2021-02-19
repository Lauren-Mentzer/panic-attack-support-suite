import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { StyleSheet, KeyboardAvoidingView, TextInput, View, Button, Text, Platform } from 'react-native';

import Card from './UI/Card';
import CardModal from './UI/CardModal';
import Colors from '../constants/colors';
import MainButton from './UI/MainButton';

const MessageCard = (props) => {
  const { index, message, editHandler, deleteHandler } = props;
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [inputText, setInputText] = useState('');

  const deleteCardHandler = () => {
    dispatch(deleteHandler(index));
    setIsDeleting(false);
  };

  const cancelDeleteHandler = () => {
    setIsDeleting(false);
  };

  const startDeleteHandler = () => {
    setIsDeleting(true);
  };

  const editCardHandler = () => {
    if (!inputText.trim().length) return;
    dispatch(editHandler(index, inputText.trim()));
    setIsEditing(false);
    setInputText('');
  };

  const cancelEditCardHandler = () => {
    setIsEditing(false);
    setInputText('');
  };

  const startEditCardHandler = () => {
    setIsEditing(true);
    setInputText(message);
  };

  return (
    <Card key={index} style={styles.card}>
      {isEditing ? (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null}>
          <TextInput style={styles.input} multiline value={inputText} onChangeText={(text) => setInputText(text)} />
          <View style={styles.buttonRow}>
            <MainButton
              style={styles.button}
              containerStyle={styles.buttonContainer}
              color={Colors.danger}
              onPress={cancelEditCardHandler}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </MainButton>
            <MainButton
              style={styles.button}
              containerStyle={styles.buttonContainer}
              color={Colors.shade3}
              onPress={editCardHandler}
            >
              <Text style={styles.buttonText}>Save</Text>
            </MainButton>
          </View>
        </KeyboardAvoidingView>
      ) : (
        <View>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.buttonRow}>
            <MainButton
              style={styles.button}
              containerStyle={styles.buttonContainer}
              color={Colors.danger}
              onPress={() => startDeleteHandler(index)}
            >
              <Text style={styles.buttonText}>Delete</Text>
            </MainButton>
            <MainButton
              style={styles.button}
              containerStyle={styles.buttonContainer}
              color={Colors.shade3}
              onPress={() => startEditCardHandler(index)}
            >
              <Text style={styles.buttonText}>Edit</Text>
            </MainButton>
          </View>
        </View>
      )}
      <CardModal visible={isDeleting}>
        <Text style={styles.modalText}>Are you sure you want to delete this message?</Text>
        <View style={styles.modalButtonRow}>
          <MainButton
            style={{ ...styles.button, ...styles.modalButton }}
            containerStyle={styles.buttonContainer}
            color={Colors.danger}
            onPress={cancelDeleteHandler}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </MainButton>
          <MainButton
            style={{ ...styles.button, ...styles.modalButton }}
            containerStyle={styles.buttonContainer}
            color={Colors.shade3}
            onPress={deleteCardHandler}
          >
            <Text style={styles.buttonText}>Yes</Text>
          </MainButton>
        </View>
      </CardModal>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    marginHorizontal: 5,
  },
  message: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: 'OpenSans_400Regular',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 15,
    paddingTop: 15,
    width: '100%',
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  modalText: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 10,
    fontFamily: 'OpenSans_400Regular',
  },
  modalButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modalButton: {
    minWidth: 100,
  },
  button: {
    marginLeft: 10,
    width: 80,
    height: 35,
    borderRadius: 5,
  },
  buttonText: {
    fontFamily: 'Spartan_400Regular',
    color: 'white',
    fontSize: 14,
  },
  buttonContainer: {
    borderRadius: 5,
  },
});

export default MessageCard;
