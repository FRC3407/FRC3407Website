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
