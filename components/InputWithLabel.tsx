import React, { ChangeEventHandler } from "react"
import { Input } from "./ui/input"

export default function InputWithLabel({
  id,
  type,
  label,
  placeholder = "",
  value,
  onChange,
  errors = [],
  generalError = "",
}: {
  id: string
  type: string
  label: string
  placeholder?: string
  value?: string
  onChange: ChangeEventHandler<HTMLInputElement>
  errors?: string[]
  generalError?: string
}) {
  return (
    <div className="flex flex-col items-start">
      <label
        htmlFor={id}
        className={`mb-2 text-xs font-bold uppercase leading-normal tracking-[0.1875rem] lg:text-sm lg:tracking-[0.21875rem] ${(errors?.length ?? 0) > 0 || generalError ? "text-primary-light-red" : "text-neutral-smokey-grey"}`}
      >
        {label}
      </label>
      <Input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={
          (errors?.length ?? 0) > 0 || generalError
            ? "border-primary-light-red"
            : ""
        }
      />
      {(errors?.length ?? 0) > 0 && (
        <p className="mt-2 text-right text-xs italic leading-normal text-primary-light-red lg:text-sm">
          {errors?.[0] ?? ""}
        </p>
      )}
    </div>
  )
}
