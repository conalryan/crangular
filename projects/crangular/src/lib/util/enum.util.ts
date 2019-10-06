export const enumValueOfString = <T>(input: string, e: T): T[keyof T] | null => {
  const key = Object.keys(e).find(k => e[k] === input);
  return key === undefined ? null : e[key];
};
