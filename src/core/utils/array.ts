export function findBy<T, K extends keyof T>(
  source: T[],
  key: K,
  value: T[K],
): T | undefined {
  return source.find((item) => item[key] === value);
}

export function findAllBy<T>(source: T[], query: Partial<T>): T[] {
  return source.filter((item) =>
    Object.keys(query).every((key) => item[key] === query[key]),
  );
}
