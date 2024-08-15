import React, {useState} from 'react';
import hasJWT from '../../api/JWT';
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import MainLayout from './Layout';

function Home(){
    return (
      <MainLayout>
        <a>HOME</a>
      </MainLayout>
  );
}

export default Home;