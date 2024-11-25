export const GenerateVerificationOTP = (length = 6): string => {
  const charSet =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let verificatonCode = "";

  for (let i = 0; i < length; i++) {
    verificatonCode += charSet.charAt(
      Math.floor(Math.random() * charSet.length)
    );
  }
  return verificatonCode;
};
