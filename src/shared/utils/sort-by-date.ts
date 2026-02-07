export function sortByDate<T>(
  items: T[],
  key: keyof T,
  order: 'asc' | 'desc' = 'desc'
): T[] {
  return [...items].sort((a, b) => {
    const dateA = new Date(a[key] as string).getTime()
    const dateB = new Date(b[key] as string).getTime()
    return order === 'desc' ? dateB - dateA : dateA - dateB
  })
}
