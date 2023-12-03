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

const sendOtp = async (email, type) => {
  try {
    const endpoint = `${API_URL}auth/otp`;
    const body = {
      email: email,
      type: type,
    };
    const response = await axios.post(endpoint, body);
    return response;
  } catch (error) {
    throw error;
  }
};

const verifyOtp = async (email, otp, type) => {
  try {
    const endpoint = `${API_URL}auth/verify`;
    const body = {
      email: email,
      otp: otp,
      type: type,
    };
    const response = await axios.post(endpoint, body);
    return response;
  } catch (error) {
    throw error;
  }
};

const forgotPassword = async (data, updated_token) => {
  try {
    const endpoint = `${API_URL}auth/forgotPassword`;
    const body = {
      email: data.email,
      password: data.password,
      updated_token: updated_token,
    };
    const response = await axios.post(endpoint, body);
    return response;
  } catch (error) {
    throw error;
  }
};

export {register, sendOtp, verifyOtp, forgotPassword};
