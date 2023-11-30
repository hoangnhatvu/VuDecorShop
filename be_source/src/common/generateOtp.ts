import crypto from 'crypto'

export const generateOTP = () => {
  const otp = Math.floor(100000 + Math.random() * 900000);

  const currentTime = Math.floor(Date.now() / 1000);

  const validityPeriod = 60;

  const combinedString = `${otp}.${currentTime}.${validityPeriod}`;

  const secretKey = 'vudecorshop';

  const hmac = crypto.createHmac('sha256', secretKey);

  hmac.update(combinedString);

  const signature = hmac.digest('hex');

  const finalString = `${otp}.${currentTime}.${validityPeriod}.${signature}`;

  return finalString;
};

