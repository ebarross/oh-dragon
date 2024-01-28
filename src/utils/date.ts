/**
 * Transform an ISO datetime into a short format date.
 * @example
 * 2024-01-30T08:00:00.000Z -> 30/01/2024 08:00
 */
export function formatDateTime(dateTime: string) {
  if (!isISODateTime(dateTime)) {
    return dateTime
  }

  const splitted = dateTime.split('T')
  const [year, month, day] = splitted[0].split('-')
  const [hour, minute] = splitted[1].split(':')
  const date = `${day}/${month}/${year} ${hour}:${minute}`

  return date
}

function isISODateTime(dateTime: string) {
  const format = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/
  return format.test(dateTime)
}
