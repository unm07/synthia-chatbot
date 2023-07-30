import React from "react";
import { getFirestore, collection,updateDoc , doc, query, deleteDoc, getDocs } from 'firebase/firestore';
import { useAuth } from "../pages/useAuth";
import { db } from "../firebase-config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const DeleteChatsButton = () => {
  const auth = useAuth();

    const handleDeleteChats = async () => {
        if (auth.currentUser) {
          try {
            const userDocRef = doc(db, "users", auth.currentUser.uid);
            await updateDoc(userDocRef, {
              chats: []
            });
            console.log('Chats array emptied');
          } catch (error) {
            console.error('Error emptying chats array:', error);
          }
        } else {
          console.log('User not logged in');
        }
    };

  return (
    <button
      onClick={handleDeleteChats}
      className="delete-chats-button"
    >
    <FontAwesomeIcon className="trash-icon" icon={faTrash} />
    </button>
  )
};

export default DeleteChatsButton;
