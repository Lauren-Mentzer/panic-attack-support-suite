import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, SafeAreaView, ScrollView, KeyboardAvoidingView, TextInput, Platform, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Card from '../components/UI/Card';
import MainButton from '../components/UI/MainButton';
import { saveMessage } from '../store/actions/messages';

const ChatScreen = (props) => {
  const dispatch = useDispatch();
  const [styles, setStyles] = useState({});
  const colors = useSelector((state) => state.settings.colors);
  const messageList = useSelector((state) => state.messages.list);
  const [textMessage, setTextMessage] = useState('');
  const scrollRef = useRef();

  useEffect(() => {
    setStyles({
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
      message: {
        fontSize: 16,
        fontFamily: 'OpenSans_400Regular',
      },
      inputWrapper: {
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        padding: 12,
      },
      input: {
        width: '80%',
        fontFamily: 'OpenSans_400Regular',
      },
      submitButton: {
        borderRadius: 12,
        overflow: 'hidden',
        height: 24,
        width: 24,
      },
    });
  }, []);

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
      <SafeAreaView style={styles.messagesContainer}>
        <ScrollView ref={scrollRef} onContentSizeChange={() => scrollRef.current.scrollToEnd({ animated: true })}>
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
            />
            <MainButton style={styles.submitButton} onPress={submitMessageHandler}>
              <Ionicons
                size={22}
                color={colors.primary}
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
