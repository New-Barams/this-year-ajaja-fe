export const checkEmailValidation = (email: string) => {
  const emailRegExp = new RegExp(
    '^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$',
  );
  return emailRegExp.test(email);
};
