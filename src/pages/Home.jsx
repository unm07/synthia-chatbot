// Home.jsx
import React, { useState,useEffect,useRef } from 'react';
import Header from '../components/Header';
import HomeInput from '../components/HomeInput';
import LogoutButton from '../components/LogoutButton';
import DeleteChatsButton from '../components/DeleteChatsButton';

function Home() {

  return (
    <div>
      <Header />
      <div class="button-container">
      <DeleteChatsButton />
      <LogoutButton/>
      </div>
      <HomeInput />
    </div>
  );
}

export default Home;
