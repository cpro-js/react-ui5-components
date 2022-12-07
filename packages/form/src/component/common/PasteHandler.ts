export const handlePastedText = (text: string) => {
  const cleanedText =
    text.length && text.endsWith("\r\n")
      ? text.substring(0, text.lastIndexOf("\r\n"))
      : text;
  return cleanedText.split(/\r\n|\r|\n|\t/g);
};
