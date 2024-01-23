"use client"
import InputWithLabel from "@/components/InputWithLabel"
import Reference from "@/components/Reference"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import iconArrow from "@/public/images/icon-arrow.svg"
import { z } from "zod"
import { useState } from "react"
import { calculateAge, validateDateInThePast } from "@/lib/utils"
import CountUpAnimation from "@/components/CountUpAnimation"

const currentYear = new Date().getFullYear()

const formSchema = z
  .object({
    day: z
      .string()
      .min(1, "This field is required")
      .refine((val) => !isNaN(Number(val)), {
        message: "Day must be a number",
        path: ["day"],
      })
      .transform((val) => parseInt(val, 10))
      .refine((val) => val >= 1 && val <= 31, {
        message: "Must be a valid day",
        path: ["day"],
      }),
    month: z
      .string()
      .min(1, "This field is required")
      .refine((val) => !isNaN(Number(val)), {
        message: "Month must be a number",
        path: ["month"],
      })
      .transform((val) => parseInt(val, 10))
      .refine((val) => val >= 1 && val <= 12, {
        message: "Must be a valid month",
        path: ["month"],
      }),
    year: z
      .string()
      .min(1, { message: "This field is required" })
      .refine((val) => !isNaN(Number(val)), {
        message: "Year must be a number",
        path: ["year"],
      })
      .transform((val) => parseInt(val, 10))
      .refine((val) => val <= currentYear, {
        message: "Must be in the past",
        path: ["year"],
      }),
  })
  .refine(
    (data) => {
      const isValidDate = !isNaN(
        new Date(
          Number(data.year),
          Number(data.month) - 1,
          Number(data.day),
        ).getTime(),
      )
      return isValidDate
    },
    {
      message: "Invalid date",
      path: ["date"],
    },
  )

const initFormState = { day: "", month: "", year: "" }
const initDisplayData = { day: "--", month: "--", year: "--" }

export default function Home() {
  const [formData, setFormData] = useState(initFormState)
  const [errors, setErrors] = useState({
    day: [] as string[],
    month: [] as string[],
    year: [] as string[],
    general: "",
  })
  const [displayData, setDisplayData] = useState(initDisplayData)

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    const result = formSchema.safeParse(formData)
    if (result.success) {
      const dateValidation = validateDateInThePast(
        `${result.data.year}-${result.data.month.toString().padStart(2, "0")}-${result.data.day.toString().padStart(2, "0")}`,
      )
      if (!dateValidation.valid) {
        setErrors((prev) => ({
          ...prev,
          general: dateValidation.message || "",
        }))
        setDisplayData(initDisplayData)
        return
      }
      setErrors({
        day: [],
        month: [],
        year: [],
        general: "",
      })
      setDisplayData(calculateAge(result.data))
    } else {
      const newErrors = result.error.flatten().fieldErrors
      setErrors({
        day: newErrors.day || [],
        month: newErrors.month || [],
        year: newErrors.year || [],
        general: "",
      })
      setDisplayData(initDisplayData)
    }
  }

  return (
    <main className="flex h-full min-h-screen w-full max-w-7xl flex-col items-center px-4 pt-20 lg:min-h-0 lg:pt-32">
      <h1 className="hidden">Calculate Age App</h1>
      <div className="flex flex-col gap-8 rounded-3xl rounded-br-[6.25rem] bg-white px-6 py-12 lg:rounded-br-[12.5rem] lg:p-14">
        <form onSubmit={handleSubmit}>
          <div className="flex gap-4 lg:gap-8">
            <InputWithLabel
              id="day"
              type="text"
              label="Day"
              placeholder="DD"
              value={formData.day}
              onChange={handleChange}
              errors={errors.day}
              generalError={errors.general}
            />
            <InputWithLabel
              id="month"
              type="text"
              label="Month"
              placeholder="MM"
              value={formData.month}
              onChange={handleChange}
              errors={errors.month}
              generalError={errors.general}
            />
            <InputWithLabel
              id="year"
              type="text"
              label="Year"
              placeholder="YYYY"
              value={formData.year}
              onChange={handleChange}
              errors={errors.year}
              generalError={errors.general}
            />
          </div>
          {errors.general && (
            <p className="mt-2 text-left text-xs italic leading-normal text-primary-light-red lg:text-sm">
              {errors.general ?? ""}
            </p>
          )}
          <div className="relative flex justify-center border-b border-neutral-light-grey lg:justify-end">
            <Button type="submit" className="relative top-[2rem]">
              <Image src={iconArrow} alt="icon arrow" />
            </Button>
          </div>
        </form>
        <div className="mt-8">
          <h2 className="display-text">
            <span>
              {displayData.year === "--" ? (
                displayData.year
              ) : (
                <CountUpAnimation
                  end={Number(displayData.year)}
                  duration={1000}
                />
              )}
            </span>{" "}
            years
          </h2>
          <h2 className="display-text">
            <span>
              {displayData.year === "--" ? (
                displayData.year
              ) : (
                <CountUpAnimation
                  end={Number(displayData.month)}
                  duration={1000}
                />
              )}
            </span>{" "}
            month
          </h2>
          <h2 className="display-text">
            <span>
              {displayData.year === "--" ? (
                displayData.year
              ) : (
                <CountUpAnimation
                  end={Number(displayData.day)}
                  duration={1000}
                />
              )}
            </span>{" "}
            days
          </h2>
        </div>
      </div>
      <Reference />
    </main>
  )
}
