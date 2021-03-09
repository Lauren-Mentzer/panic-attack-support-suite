import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, SafeAreaView, ScrollView, KeyboardAvoidingView, TextInput, Platform, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { deactivateKeepAwake, activateKeepAwake } from 'expo-keep-awake';

import Card from '../components/UI/Card';
import MainButton from '../components/UI/MainButton';
import WalkthroughModal from '../components/WalkthroughModal';
import { saveMessage } from '../store/actions/messages';

const MODAL_TEXT = [
  'This page is another communication tool for when it is difficult to speak verbally. Here, you can write messages (as if they are a text message) to show to the person you are trying to communicate with. This could be helpful if the person asks a question that is not addressed in your flashcards.',
];

const ChatScreen = (props) => {
  const { navigation } = props;
  const dispatch = useDispatch();
  const colors = useSelector((state) => state.settings.colors);
  const colorMode = useSelector((state) => state.settings.colorPalette);
  const [styles] = useState({
    screen: {
      flex: 1,
      justifyContent: 'space-between',
      backgroundColor: colors.light,
    },
    messageCard: {
      marginVertical: 10,
      marginHorizontal: 5,
      padding: 10,
    },
    messagesContainer: {
      height: '100%',
      justifyContent: 'space-between',
      marginHorizontal: 20,
    },
    scroll: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    message: {
      fontSize: 16,
      fontFamily: 'OpenSans_400Regular',
      color: colors.text,
    },
    inputWrapper: {
      marginVertical: 10,
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      padding: 12,
      borderColor: colors.shade2,
      borderWidth: colorMode === 'Dark' ? 1 : 0,
    },
    input: {
      width: '80%',
      fontFamily: 'OpenSans_400Regular',
      color: colors.text,
    },
    submitButton: {
      borderRadius: 12,
      overflow: 'hidden',
      height: 24,
      width: 24,
    },
  });

  const messageList = useSelector((state) => state.messages.list);
  const [textMessage, setTextMessage] = useState('');
  const scrollRef = useRef();

  useEffect(() => {
    const leaveListener = (e) => {
      e.preventDefault();
      deactivateKeepAwake('chat');
      navigation.dispatch(e.data.action);
    };
    navigation.addListener('beforeRemove', leaveListener);
    activateKeepAwake('chat');
    return () => {
      navigation.removeListener('beforeRemove', leaveListener);
    };
  }, [navigation]);

  useEffect(() => {
    if (!scrollRef || !scrollRef.current) return;
    scrollRef.current.scrollToEnd({ animated: true });
  }, []);

  const submitMessageHandler = () => {
    if (textMessage.trim().length > 0) {
      dispatch(saveMessage(textMessage.trim()));
      setTextMessage('');
    }
  };

  return (
    <View style={styles.screen}>
      <WalkthroughModal name="chat" textArray={MODAL_TEXT} />
      <SafeAreaView style={styles.messagesContainer}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          ref={scrollRef}
          onContentSizeChange={() => scrollRef.current.scrollToEnd({ animated: true })}
        >
          {messageList.map((message, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Card key={index} style={styles.messageCard}>
              <Text style={styles.message}>{message}</Text>
            </Card>
          ))}
        </ScrollView>
        <KeyboardAvoidingView>
          <Card style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              multiline
              fontSize={16}
              placeholder="Text Message"
              returnKeyType="done"
              value={textMessage}
              onChangeText={(newText) => setTextMessage(newText)}
              placeholderTextColor={colors.text}
            />
            <MainButton style={styles.submitButton} onPress={submitMessageHandler}>
              <Ionicons
                size={22}
                color={colorMode === 'Dark' ? colors.accent : colors.primary}
                name={Platform.select({ ios: 'ios-send', android: 'md-send' })}
              />
            </MainButton>
          </Card>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};

export default ChatScreen;
