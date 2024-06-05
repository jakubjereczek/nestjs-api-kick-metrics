export function omitProperties<T extends object, K extends keyof T>(
  obj: T,
  keysToOmit: K[],
): Omit<T, K> {
  const result: Partial<T> = { ...obj };
  for (const key of keysToOmit) {
    delete result[key];
  }
  return result as Omit<T, K>;
}
