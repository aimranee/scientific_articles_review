import { extractReferences } from "./convertJsonToText";

export function extractBack(obj: any, loading: boolean) {
  let components: string[] = [];

  function recurse(current: any, property: any) {
    // console.log("LOG1 => current  : " + current + "  property : " + property);
    if (Array.isArray(current)) {
      for (let i = 0; i < current.length; i++) {
        recurse(current[i], property);
      }
    } else if (typeof current === "object") {
      for (const key in current) {
        if (key !== "$" && key !== "body" && key !== "front") {
          // console.log(extractReferences(current[key]).join("\n\n\n1.   "));
          components = extractReferences(current[key]);
        }
      }
    } else {
      console.log("error");
    }
  }

  recurse(obj, "");

  return components;
}
