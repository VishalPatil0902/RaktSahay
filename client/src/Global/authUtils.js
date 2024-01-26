import axios from 'axios'
import { url } from './URL';

export const setAuthToken = (token) => {
    localStorage.setItem('RSaccessToken', token);
};

export const logout = async () => {
    try {
        localStorage.removeItem('RSaccessToken');
        window.location.assign(url + '/logout');
        window.location.reload();
    } catch (error) {
        console.log("Could not Logout !");
    }   
    
}


export const getAuthToken = () => {
    return localStorage.getItem('RSaccessToken');
};


export const isAuthenticated = () => {
    const token = getAuthToken();
    return token !== null; 
    // return true
};


export const getUserDetails = async () => {
    const token = getAuthToken();

    if (!token) {
        return false;
    }

    try {
        const response = await axios.post(url + "/anyuser", {accessToken: token}
            // {
            // headers: {
            //     Authorization: `Bearer ${token}`,
            //     'Content-Type': 'application/json',
            // },
            // }
        );
        
        if (response.status === 200) {
            const userDetails = response.data;
            return userDetails.msg._doc;
        } else {
            localStorage.removeItem('RSaccessToken');
            return false;
        }
    } catch (error) {
        console.error('Error fetching user details:', error.message);
        localStorage.removeItem('RSaccessToken');
        window.location.href = "/error";
        return false;
    }
};


