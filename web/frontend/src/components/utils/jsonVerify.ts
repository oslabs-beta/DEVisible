/**
 * function to verify if a string is a JSON string and format dependency versions
 * @param jsonString - string to verify
 * @returns if valid - JSON Object
 * @throws null - if argument is empty or invalid JSON
 */
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
