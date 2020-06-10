//__mocks__/react-native-keychain

let credentials;
const setGenericPassword = async (username, password) => {
  credentials = { password: password };
  return true;
};
const getGenericPassword = async () => {
  return credentials;
};
const resetGenericPassword = async () => {
  credentials = { password: undefined };
  return true;
};
export { setGenericPassword, getGenericPassword, resetGenericPassword };
