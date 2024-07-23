// chatbot.js
import { useState, useEffect } from 'react';
import React from 'react';
import { db } from './firebase-config';
import firebase from 'firebase/compat/app';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);

const useChatbot = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const sendMessage = async (userMessage) => {
    setIsLoading(true);
    if (userMessage.trim() === '') return;

    setChatHistory((prevChat) => [
      ...prevChat,
      { role: 'user', content: userMessage },
      { role: 'assistant', content: 'Loading...' },
    ]);

    try {
      // Generate response using Gemini AI
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const result = await model.generateContent({
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: userMessage,
              },
            ],
          },
        ],
        generationConfig: {
          maxOutputTokens: 1000,
          temperature: 0.1,
        },
      });
      
      const assistantReply = result.response.text();

      // Update chat history with the assistant's reply
      setChatHistory((prevChat) => [
        ...prevChat.slice(0, -1),
        { role: 'assistant', content: assistantReply },
      ]);

      // Update Firestore with the new chat messages
      const user = firebase.auth().currentUser;
      if (user) {
        const userDoc = db.collection('users').doc(user.uid);
        userDoc.update({
          chats: firebase.firestore.FieldValue.arrayUnion(
            { role: 'user', content: userMessage },
            { role: 'assistant', content: assistantReply }
          )
        });
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const user = firebase.auth().currentUser;
    if (user) {
      const userDoc = db.collection('users').doc(user.uid);

      const unsubscribe = userDoc.onSnapshot((doc) => {
        if (doc.exists) {
          setChatHistory(doc.data().chats || []);
        }
      });

      return unsubscribe;
    }
  }, []);

  return [chatHistory, sendMessage, isLoading];
};

export default useChatbot;
