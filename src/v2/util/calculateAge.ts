import { DateTime } from 'luxon'

export function calculateAge() {
  const originDate = DateTime.fromISO('2011-08-09')
  const current = DateTime.now()
  const { years, days } = current.diff(originDate, ['years', 'days'])
  return { years, days }
}

export function calculatedAgePhrase() {
  const { years, days } = calculateAge()

  const daysWord = Math.floor(days) == 1 ? 'day' : 'days'

  return `${years} years and ${Math.floor(days)} ${daysWord}`
}
