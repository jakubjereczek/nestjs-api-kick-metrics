export function findById<T extends { id: string }>(source: T[], id: string): T {
  return source.find((s) => s.id === id);
}
