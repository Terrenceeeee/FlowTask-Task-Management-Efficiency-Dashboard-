export function formatDate(
  value: string
): string {
  if (!value) {
    return '未设置'
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return '日期无效'
  }

  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(date)
}

export function formatDateTime(
  value: string
): string {
  if (!value) {
    return ''
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return ''
  }

  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

export function isOverdue(
  dueDate: string,
  completed = false
): boolean {
  if (!dueDate || completed) {
    return false
  }

  const endOfDay = new Date(`${dueDate}T23:59:59`)
  return endOfDay.getTime() < Date.now()
}

export function createId(): string {
  return `task-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 8)}`
}