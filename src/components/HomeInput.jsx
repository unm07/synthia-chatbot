import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import React, { useState,useEffect,useRef } from 'react';
import useChatbot from '../chatbot';
import firebase from '../firebase-config';
import Text from './Text';


const HomeInput=()=>{
    const [chatHistory, sendMessage] = useChatbot();
    const [isLoading, setIsLoading] = React.useState(false);    
    const [userInput, setUserInput] = useState('');
  
    const [userEmail, setUserEmail] = useState('');
  
    useEffect(() => {
      const user = firebase.auth().currentUser;
      if (user) {
        setUserEmail(user.email);
      }
    }, []);
    
    const chatMessagesRef = useRef(null);
    
    useEffect(() => {
      if (chatMessagesRef.current) {
        chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
      }
    }, [chatHistory]);

    const handleSendMessage = () => {
        if (userInput.trim() !== '') {
          setIsLoading(true);
          sendMessage(userInput);
          setUserInput('');
        }
    };

    const handleChange = (e) => {
        setUserInput(e.target.value);
    };
    
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
          handleSendMessage();
        }
    };
    return(
        <div>
        <div className='text-area' ref={chatMessagesRef}>
      {chatHistory.map((message, index) => (
        <Text 
        key={index} 
        role={message.role} 
        content={message.content}
        email={userEmail}
        />
      ))}
      </div>
        <div className='input-container'>
        <input
        className="input-field"
          type="text"
          value={userInput}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          placeholder="Send a message"
        />
        <button onClick={handleSendMessage}
        className='send-button'><FontAwesomeIcon icon={faPaperPlane} /></button>
      </div>
      </div>
    );
}

export default HomeInput;