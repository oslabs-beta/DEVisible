//  jsonVerify returns null if argument is empty of invalid JSON
const jsonVerify = (jsonString: string) => {
  const error = null;
  console.log('string', jsonString);
  if (!jsonString) return error;
  try {
    const carrotRemovedString = jsonString.replaceAll('^', '');
    return JSON.parse(carrotRemovedString);
  } catch {
    return error;
  }
};

export default jsonVerify;
