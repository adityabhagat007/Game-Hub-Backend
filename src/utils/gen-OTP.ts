const genOtp = (): string => {
  const otp = String(Math.floor(100000 + Math.random() * 900000));
  return otp;
};

export default genOtp;
