export function getStringQuery(
  value: unknown
): string {
  if (typeof value === 'string') {
    return value
  }

  if (Array.isArray(value)) {
    const first = value[0]

    return typeof first === 'string'
      ? first
      : ''
  }

  return ''
}

export function getPositiveInt(
  value: unknown,
  defaultValue = 1
): number {
  const text = getStringQuery(value)
  const number = Number(text)

  if (
    !Number.isInteger(number) ||
    number < 1
  ) {
    return defaultValue
  }

  return number
}