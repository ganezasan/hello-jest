const capitalize = str => {
  return str.slice(0, 1).toUpperCase() + str.slice(1, str.length);
}

export const greet = name => {
  const capitalizedName = capitalize(name);
  const hour = new Date().getHours();
  const greetMessage = hour >= 6 && hour < 12 ? 'Good morning' : 'Hello';
  return `${greetMessage} ${capitalizedName}!`;
}