import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ScrollView, View, Text, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Shadow from '../../constants/shadow';
import Card from '../../components/UI/Card';
import MessageCard from '../../components/MessageCard';
import MainButton from '../../components/UI/MainButton';
import { addCard, editCard, removeCard } from '../../store/actions/flashcards';
import HelpButton from '../../components/HelpButton';

const CommunicateSettingsScreen = () => {
  const dispatch = useDispatch();
  const colors = useSelector((state) => state.settings.colors);
  const colorMode = useSelector((state) => state.settings.colorPalette);
  const [styles] = useState({
    screen: {
      flex: 1,
      backgroundColor: colors.light,
      paddingVertical: 10,
      paddingHorizontal: 20,
    },
    contents: {
      paddingBottom: 20,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 15,
    },
    headerText: {
      fontFamily: 'OpenSans_600SemiBold',
      fontSize: 16,
      color: colors.title,
    },
    card: {
      marginVertical: 10,
      marginHorizontal: 5,
    },
    input: {
      borderWidth: 1,
      padding: 15,
      paddingTop: 15,
      width: '100%',
      marginBottom: 10,
      borderColor: colorMode === 'Dark' ? colors.shade3 : '#ccc',
      backgroundColor: colorMode === 'Dark' ? colors.shade1 : undefined,
      color: colors.text,
    },
    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    button: {
      marginLeft: 10,
      minWidth: 80,
    },
    addButton: {
      marginVertical: 10,
    },
    description: {
      marginBottom: 10,
      fontFamily: 'OpenSans_400Regular',
      color: colors.text,
    },
    bulletItem: {
      paddingLeft: 15,
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginVertical: 5,
    },
    bullet: {
      marginLeft: 10,
      paddingTop: 2,
      width: '80%',
      fontFamily: 'OpenSans_400Regular',
      color: colors.text,
    },
    bottomButton: {
      height: 45,
      width: '98%',
      marginHorizontal: '1%',
      marginVertical: 10,
      borderRadius: 10,
      ...Shadow,
    },
    bottomButtonContainer: {
      borderRadius: 10,
    },
    bottomButtonText: {
      fontFamily: 'Spartan_400Regular',
      fontSize: 20,
      color: colorMode === 'Dark' ? 'black' : 'white',
      textAlign: 'center',
    },
    cardButton: {
      marginLeft: 10,
      width: 80,
      height: 35,
      borderRadius: 5,
    },
    cardButtonText: {
      fontFamily: 'Spartan_400Regular',
      color: 'white',
      fontSize: 14,
    },
    smallButtonContainer: {
      borderRadius: 5,
    },
  });

  const scrollRef = useRef();
  const flashcardList = useSelector((state) => state.flashcards.list);
  const [isAdding, setIsAdding] = useState(false);
  const [inputText, setInputText] = useState('');

  const addCardHandler = () => {
    if (!inputText.trim().length) return;
    dispatch(addCard(inputText.trim()));
    setIsAdding(false);
    setInputText('');
    // Timeout to wait for next render cycle so new card will be present
    setTimeout(() => {
      if (scrollRef && scrollRef.current) {
        scrollRef.current.scrollToEnd({ animated: true });
      }
    });
  };

  const deleteAddCardHandler = () => {
    setInputText('');
    setIsAdding(false);
  };

  const startAddCardHandler = () => {
    setIsAdding(true);
    // Timeout to wait for next render cycle so new input will be present
    setTimeout(() => {
      if (scrollRef && scrollRef.current) {
        scrollRef.current.scrollToEnd({ animated: true });
      }
    });
  };

  return (
    <ScrollView style={styles.screen} ref={scrollRef}>
      <View style={styles.contents}>
        <View style={styles.header}>
          <Text style={styles.headerText}>FLASHCARD MESSAGES</Text>
          <HelpButton>
            <View>
              <Text style={styles.description}>
                Write down some messages that you think would be helpful to show someone if you were having a panic
                attack and were having trouble speaking. We&apos;ve included a few default messages, but make them
                personal to you and how you commonly experience panic attacks.
              </Text>
              <Text style={styles.description}>Some ideas:</Text>
              <View style={styles.bulletItem}>
                <Ionicons
                  color={colorMode === 'Dark' ? colors.accent : colors.shade3}
                  size={24}
                  name={Platform.OS === 'ios' ? 'chevron-forward-circle-outline' : 'chevron-forward-circle'}
                />
                <Text style={styles.bullet}>Explain what is going on</Text>
              </View>
              <View style={styles.bulletItem}>
                <Ionicons
                  color={colorMode === 'Dark' ? colors.accent : colors.shade3}
                  size={24}
                  name={Platform.OS === 'ios' ? 'chevron-forward-circle-outline' : 'chevron-forward-circle'}
                />
                <Text style={styles.bullet}>Suggest some ways they might be able to help you</Text>
              </View>
              <View style={styles.bulletItem}>
                <Ionicons
                  color={colorMode === 'Dark' ? colors.accent : colors.shade3}
                  size={24}
                  name={Platform.OS === 'ios' ? 'chevron-forward-circle-outline' : 'chevron-forward-circle'}
                />
                <Text style={styles.bullet}>
                  Describe a few of your common personal triggers that may have started your panic attack
                </Text>
              </View>
            </View>
          </HelpButton>
        </View>
        {flashcardList.map((message, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <MessageCard message={message} index={index} key={index} editHandler={editCard} deleteHandler={removeCard} />
        ))}
        {isAdding && (
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <Card style={styles.card}>
              <TextInput style={styles.input} multiline value={inputText} onChangeText={(text) => setInputText(text)} />
              <View style={styles.buttonRow}>
                <MainButton
                  style={styles.cardButton}
                  containerStyle={styles.smallButtonContainer}
                  color={colors.danger}
                  onPress={deleteAddCardHandler}
                >
                  <Text style={styles.cardButtonText}>Discard</Text>
                </MainButton>
                <MainButton
                  style={styles.cardButton}
                  containerStyle={styles.smallButtonContainer}
                  color={colors.shade3}
                  onPress={addCardHandler}
                >
                  <Text style={styles.cardButtonText}>Save</Text>
                </MainButton>
              </View>
            </Card>
          </KeyboardAvoidingView>
        )}
        <MainButton
          style={styles.bottomButton}
          containerStyle={styles.bottomButtonContainer}
          color={colorMode === 'Dark' ? colors.accent : colors.shade2}
          onPress={startAddCardHandler}
        >
          <Text style={styles.bottomButtonText}>Add Message</Text>
        </MainButton>
      </View>
    </ScrollView>
  );
};

export default CommunicateSettingsScreen;
