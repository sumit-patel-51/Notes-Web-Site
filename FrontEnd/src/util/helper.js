export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const getIntials = (name) => {
  if (!name) return "";

  const word = name.split(" ");
  let intials = "";

  for (let i = 0; i < Math.min(word.length, 2); i++) {
    intials += word[i][0];
  }

  return intials.toUpperCase();
};
