//  jsonVerify returns null if argument is empty of invalid JSON
const jsonVerify = (jsonString: string) => {
  const error = null;
  if (!jsonString) return error;
  try {
    const carrotRemovedString = jsonString.replaceAll('^', '');
    return JSON.parse(carrotRemovedString);
  } catch {
    return error;
  }
};

export default jsonVerify;
