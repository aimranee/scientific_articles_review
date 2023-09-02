export const extractHighlightedTextByWords = (
  textareaContent: string,
  highlight: [string, string]
) => {
  const [startIndex, endIndex] = highlight;
  const words = textareaContent.split(" ");
  const highlightedWords = words.slice(
    parseInt(startIndex),
    parseInt(endIndex) + 1
  );
  return highlightedWords.join(" ");
};
