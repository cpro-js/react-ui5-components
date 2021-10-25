const escapeReg = /[[\]{}()*+?.\\^$|]/g;

const escapeRegExp = (str: string) => {
  return str.replace(escapeReg, "\\$&");
};

export const startsWithPerTerm = <T>(
  inputValue: string,
  itemLabel: string
): boolean => {
  const reg = new RegExp(
    `(^|\\s)${escapeRegExp(inputValue.toLowerCase())}.*`,
    "g"
  );

  return reg.test(itemLabel.toLowerCase());
};
