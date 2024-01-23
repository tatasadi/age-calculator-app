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

export function calculateAge(data: {
  day: number
  month: number
  year: number
}) {
  const today = new Date()
  const birthDate = new Date(
    Number(data.year),
    Number(data.month) - 1,
    Number(data.day),
  )

  // Calculate differences
  let ageYears = today.getFullYear() - birthDate.getFullYear()
  let ageMonths = today.getMonth() - birthDate.getMonth()
  let ageDays = today.getDate() - birthDate.getDate()

  // Adjust years and months if necessary
  if (ageMonths < 0 || (ageMonths === 0 && ageDays < 0)) {
    ageYears--
    ageMonths = (ageMonths + 12) % 12
  }

  // Adjust days
  if (ageDays < 0) {
    const daysInPreviousMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      0,
    ).getDate()
    ageDays += daysInPreviousMonth
    ageMonths--
    if (ageMonths < 0) {
      ageYears--
      ageMonths += 12
    }
  }

  return {
    year: String(ageYears),
    month: String(ageMonths),
    day: String(ageDays),
  }
}
