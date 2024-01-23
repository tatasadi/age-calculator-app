import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function validateDateInThePast(dateString: string): {
  valid: boolean
  message?: string
} {
  const regex = /^\d{4}-\d{2}-\d{2}$/

  // First check for the pattern (YYYY-MM-DD)
  if (!regex.test(dateString)) {
    return { valid: false, message: "Must be a valid date" }
  }

  const date = new Date(dateString)
  const today = new Date()

  // Check if the date is valid
  if (date.toString() === "Invalid Date") {
    return { valid: false, message: "Must be a valid date" }
  }

  // Check if the date is in the future
  if (date.getTime() > today.getTime()) {
    return { valid: false, message: "Must be in the past" }
  }

  // Check for correct month and day (e.g., no April 31st)
  const splitDate = dateString.split("-")
  const year = parseInt(splitDate[0], 10)
  const month = parseInt(splitDate[1], 10) - 1 // Month is 0-indexed in JavaScript Date
  const day = parseInt(splitDate[2], 10)

  // Create a new date with the extracted year, month, and day
  const testDate = new Date(year, month, day)

  // Check if the date matches the input date (handles cases like April 31st)
  if (
    testDate.getFullYear() !== year ||
    testDate.getMonth() !== month ||
    testDate.getDate() !== day
  ) {
    return { valid: false, message: "Must be a valid date" }
  }

  return { valid: true }
}
