export function formatDate(dateString: string): string {
  if (!dateString) {
    return '未设置'
  }

  const date = new Date(`${dateString}T00:00:00`)

  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(date)
}

export function getDateInputValue(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export function getToday(): string {
  return getDateInputValue(new Date())
}

export function getFutureDate(days: number): string {
  const date = new Date()

  date.setDate(date.getDate() + days)

  return getDateInputValue(date)
}

export function isTaskOverdue(
  dueDate: string,
  completed: boolean
): boolean {
  if (!dueDate || completed) {
    return false
  }

  return dueDate < getToday()
}