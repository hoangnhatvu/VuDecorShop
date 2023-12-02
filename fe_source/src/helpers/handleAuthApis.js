import axios from 'axios';
import {useState} from 'react';
import {API_URL} from '@env';

const register = async data => {
  try {
    const endpoint = `${API_URL}auth/register`;
    const body = {
      user_name: data.name,
      email: data.email,
      password: data.password,
    };
    const response = await axios.post(endpoint, body);
    return response;
  } catch (error) {
    throw error;
  }
};

const sendOtp = async email => {
  try {
    const endpoint = `${API_URL}auth/otp`;
    const body = {
      email: email,
    };
    const response = await axios.post(endpoint, body);
    return response;
  } catch (error) {
    throw error;
  }
};

const verifyOtp = async (email, otp) => {
  try {
    const endpoint = `${API_URL}auth/verify`;
    const body = {
      email: email,
      otp: otp,
    };
    const response = await axios.post(endpoint, body);
    return response;
  } catch (error) {
    throw error;
  }
};

export {register, sendOtp, verifyOtp};
