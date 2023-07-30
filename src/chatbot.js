// chatbot.js
import { useState,useEffect } from 'react';
import { Configuration, OpenAIApi } from 'openai';
import React from 'react';
import {db} from './firebase-config'
import firebase from 'firebase/compat/app';

const useChatbot = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = React.useState(false); 
  const openAIConfig = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});

  const openAI = new OpenAIApi(openAIConfig);

  const sendMessage = async (userMessage) => {
    setIsLoading(true);
    if (userMessage.trim() === '') return;

    setChatHistory((prevChat) => [
      ...prevChat,
      { role: 'user', content: userMessage },
      { role: 'assistant', content: 'Loading...' },
    ]);
    try {

      const systemMessage = {
        role: 'system',
        content: 'You are a chatbot named Synthia. You are kind, friendly, and your task is to help people with day-to-day tasks.',
      };

      const response = await openAI.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [...chatHistory, systemMessage, { role: 'user', content: userMessage }],
      });

      const assistantReply = response.data.choices[0].message.content;

      setChatHistory((prevChat) => [
        ...prevChat.slice(0, -1),
        { role: 'assistant', content: assistantReply },
      ]);
      const user=firebase.auth().currentUser;
      if(user){
        const userDoc=db.collection('users').doc(user.uid);
        userDoc.update({
          chats:firebase.firestore.FieldValue.arrayUnion(
            { role: 'user', content: userMessage },
            { role: 'assistant', content: assistantReply }
          )
        })
      }
    }
    catch (error) {
      console.error('Error sending message:', error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const user = firebase.auth().currentUser;
    if (user) {
      const userDoc = db.collection('users').doc(user.uid);

      const unsubscribe = userDoc.onSnapshot((doc) => {
        if (doc.exists) {
          setChatHistory(doc.data().chats);
        }
      });

      return unsubscribe;
    }
  }, []);

  return [chatHistory, sendMessage, isLoading];
};



export default useChatbot;
