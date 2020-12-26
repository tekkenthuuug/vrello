const ratePassword = password => {
  const numberOfSpecialChars =
    password.match(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/g)?.length | 0;

  const numberOfNumericChars = password.match(/[123456789]/g)?.length | 0;

  const numberOfLetters =
    password.length - numberOfNumericChars - numberOfSpecialChars;

  return (
    password.length +
    numberOfLetters * 3 +
    numberOfNumericChars +
    numberOfSpecialChars * 4
  );
};

export default ratePassword;
