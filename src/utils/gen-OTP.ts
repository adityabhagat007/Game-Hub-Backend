import { customAlphabet } from "nanoid";

const genOtp = (): string => {
  const otp = String(customAlphabet("0123456789", 6));
  return otp;
};

export default genOtp;
