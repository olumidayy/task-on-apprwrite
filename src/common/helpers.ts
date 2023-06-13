function randomNumberWithinRange(min, max) {
  return (Math.floor(Math.random() * (max - min + 1)) + min).toString();
}

export function generateOTP() {
  return randomNumberWithinRange(100000, 999999);
}

export function excludeKeys<User, Key extends keyof User>(
  user: User,
): Omit<User, Key> {
  const keys = ['password', 'otp', '$databaseId', '$collectionId'];
  for (let i = 0; i < keys.length; i += 1) {
    // eslint-disable-next-line no-param-reassign
    delete user[keys[i]];
  }
  return user;
}

export function removeUndefinedValues(object: any) {
  const result = {};
  const keys = Object.keys(object);
  for (let i = 0; i < keys.length; i += 1) {
    if (object[keys[i]]) {
      result[keys[i]] = object[keys[i]];
    }
  }
  return result;
}
