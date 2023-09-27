export function extractReferences(jsonData: any): string[] {
  const formattedText: string[] = [];

  function extractRef(ref: any) {
    let authors = "";
    if (ref["string-name"]) {
      authors = ref["string-name"]
        .map((author: any) => {
          const authorName = `${author["given-names"]?.[0] || ""} ${
            author["surname"]?.[0] || ""
          }`;
          return authorName.trim();
        })
        .join(", ");
    }

    const articleTitle = ref["article-title"]?.[0] || "";
    const journalTitle = ref["source"]?.[0] || "";
    const volume = ref["volume"]?.[0] || "";
    const fpage = ref["fpage"]?.[0] || "";
    const lpage = ref["lpage"]?.[0] || "";
    const year = ref["year"]?.[0] || "";

    if (
      authors ||
      articleTitle ||
      journalTitle ||
      volume ||
      fpage ||
      lpage ||
      year
    ) {
      const referenceText = `${authors} (${year}). ${articleTitle}. ${journalTitle}, ${volume}, ${fpage}-${lpage}.`;
      formattedText.push(referenceText);
      // console.log("==> " + referenceText);
    }
  }

  if (
    jsonData.back &&
    jsonData.back[0] &&
    jsonData.back[0]["ref-list"] &&
    jsonData.back[0]["ref-list"][0] &&
    jsonData.back[0]["ref-list"][0]["ref"]
  ) {
    const refs = jsonData.back[0]["ref-list"][0]["ref"];

    if (Array.isArray(refs)) {
      refs.forEach((ref: any) => {
        extractRef(ref["mixed-citation"][0]);
      });
    } else {
      extractRef(refs["mixed-citation"][0]);
    }
  }

  return formattedText;
}
