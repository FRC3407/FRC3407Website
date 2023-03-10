export function aOrAn(nextWord: string) {
  if (nextWord.trim().match(/^[aieouAIEOU].*/)) return "an";
  return "a";
}

export function mergeObjects(
  ob1: { [key: string]: any },
  ob2: { [key: string]: any }
) {
  for (const [key, val] of Object.entries(ob2)) {
    if (val !== null && typeof val === `object`) {
      if (ob1[key] === undefined) {
        ob1[key] = ob2[key];
      }
      ob1[key] = mergeObjects(ob1[key], ob2[key]);
    } else {
      ob1[key] = val;
    }
  }
  return ob1;
}

export function hexToUtf8(s: string) {
  return decodeURIComponent(
    s
      .replace(/\s+/g, "") // remove spaces
      .replace(/[0-9a-f]{2}/g, "%$&") // add '%' before each 2 characters
  );
}

const utf8encoder = new TextEncoder();

export function utf8ToHex(s: string) {
  const rb = utf8encoder.encode(s);
  let r = "";

  // @ts-expect-error
  for (const b of rb) {
    r += ("0" + b.toString(16)).slice(-2);
  }
  return r;
}
