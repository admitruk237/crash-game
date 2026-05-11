let _justLoggedIn = false;

export const markJustLoggedIn = () => {
  _justLoggedIn = true;
};

export const consumeJustLoggedIn = () => {
  const value = _justLoggedIn;
  _justLoggedIn = false;
  return value;
};
