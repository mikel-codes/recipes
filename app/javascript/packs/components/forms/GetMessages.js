export const GetMessages = (formElement) => {
  const messages = [];
  if (formElement.validity.typeMismatch)
    messages.push(`${formElement.type} type mismatch`);
  if (formElement.validity.tooShort) messages.push("too short");
  if (formElement.validity.valueMissing) {
    messages.push(`${formElement.name} is a required field`);
  }
  return messages;
};
