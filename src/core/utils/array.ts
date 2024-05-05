export function findBy<T, K extends keyof T>(
  source: T[],
  key: K,
  value: T[K],
): T | undefined {
  return source.find((item) => item[key] === value);
}

export function findAllBy<T, K extends keyof T>(
  source: T[],
  key: K,
  value: T[K],
): T[] {
  return source.filter((item) => item[key] === value);
}