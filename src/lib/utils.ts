import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function capitalise(str: string) {
  return str[0].toUpperCase() + str.slice(1)
}

// Function to get the day string for a given date
export function getDayStringFromDate(date: string | Date): string {
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]
  const dayIndex = new Date(date).getUTCDay()
  return days[dayIndex]
}

export function formatCompactNumber(number: number) {
  const formatter = Intl.NumberFormat('en', { notation: 'compact' })
  return formatter.format(number)
}

export function getUTCDateRange(date: string | Date) {
  const startDate = new Date(date)
  const endDate = new Date(date)
  // Set start time to 00:00:00.000
  startDate.setUTCHours(0, 0, 0, 0)
  // Set end time to 23:59:59.999
  endDate.setUTCHours(23, 59, 59, 999)
  const startDateString = startDate.toUTCString().replace('GMT', 'UTC')
  const endDateString = endDate.toUTCString().replace('GMT', 'UTC')

  return { startDateString, endDateString }
}
