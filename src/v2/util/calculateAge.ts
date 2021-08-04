import moment from 'moment'

export function calculateAge() {
  const originDate = moment('2011-08-09', 'YYYY-MM-DD')
  const current = moment().startOf('day')
  const years = current.diff(originDate, 'years')
  originDate.add(years, 'years')
  const days = current.diff(originDate, 'days')
  return { years, days }
}
