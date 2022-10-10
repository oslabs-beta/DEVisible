//  jsonVerify returns null if argument is empty of invalid JSON
const jsonVerify = (jsonString: string) => {
  const error = null;
  if (!jsonString) return error;
  try {
    return JSON.parse(jsonString);
  } catch {
    return error;
  }
};

export default jsonVerify;
