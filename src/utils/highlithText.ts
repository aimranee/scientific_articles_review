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
export const extractHighlightedTextByWordsTT = (
  textareaContent: string,
  highlight: [string, string],
  contextWords: number
) => {
  const [startIndex, endIndex] = highlight;
  const words = textareaContent.split(" ");

  // Calculate the start and end indices for the context
  let startContext = parseInt(startIndex) - contextWords;
  let endContext = parseInt(endIndex) + contextWords;

  // Make sure the start and end context indices are within bounds
  startContext = Math.max(startContext, 0);
  endContext = Math.min(endContext, words.length - 1);

  // Extract the context and highlighted words
  const highlightedWords = words.slice(startContext, endContext + 1);

  // Join the context and highlighted words
  return highlightedWords.join(" ");
};

export const extractHighlightedTextByWords88 = (
  textareaContent: string,
  highlight: [string, string],
  contextWords: number
) => {
  const [startIndex, endIndex] = highlight;
  const words = textareaContent.split(" ");

  // Calculate the start and end indices for the context
  let startContext = parseInt(startIndex) - contextWords;
  let endContext = parseInt(endIndex) + contextWords;

  // Make sure the start and end context indices are within bounds
  startContext = Math.max(startContext, 0);
  endContext = Math.min(endContext, words.length - 1);

  // Extract the context and highlighted words
  const highlightedWords = words.slice(startContext, endContext + 1);

  // Create a result string with "..." for non-detected words
  const resultWords: any = [];
  let nonDetectedFlag = false;
  words.forEach((word, index) => {
    if (index >= startContext && index <= endContext) {
      resultWords.push(highlightedWords.shift());
    } else {
      if (!nonDetectedFlag) {
        nonDetectedFlag = true;
        resultWords.push("...");
      }
    }
  });

  // Join the result words
  return resultWords.join(" ");
};
