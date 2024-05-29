import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(number: number): string {
  if (number >= 1_000_000) {
    return `${(number / 1_000_000).toFixed(1)}M`
  } else if (number >= 1_000) {
    return `${(number / 1_000).toFixed(1)}k`
  } else {
    return number.toString()
  }
}

export async function copyToClipboard(text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text)
  } catch (err) {
    console.error('Could not copy text: ', err)
    throw err
  }
}
