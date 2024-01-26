import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {url} from './URL';
import Loader from '../components/Loader';


const RedirectionPage = () => {

    const {accessToken} = useParams();
    const navigate = useNavigate();

    const getUser = async () => {
        try {
            const data = await axios.post(url + "/anyuser", {accessToken});
            const role = data.data.msg.role;
            console.log(role);
            if (role === 'USER'){
                navigate('/home');
            } else if( role === 'HOSPITAL'){
                navigate('/hospital/home');
            } else if( role === 'BLOODBANK'){
                navigate('/blood-bank/home');
            } else {
                console.log("NO ROLE");
                navigate('/login');
            }      
        } catch (error) {
            console.log(error);
            localStorage.removeItem('RSaccessToken');
            navigate('/login');
        }
    }
    useEffect(()=>{
        localStorage.setItem('RSaccessToken', accessToken);
        getUser();
    });

    return (
        <div style={{ height: '100%', width: '100%', minHeight: '500px', maxWidth: '100%', maxHeight: '100%', overflowY: 'hidden', padding: 10, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Loader/>
        </div>
    );
};

export default RedirectionPage;
