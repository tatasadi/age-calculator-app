import React from "react"
import { Input } from "./ui/input"

export default function InputWithLabel({
  id,
  type,
  label,
  placeholder = "",
}: {
  id: string
  type: string
  label: string
  placeholder?: string
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="text-xs font-bold uppercase leading-normal tracking-[0.1875rem] text-neutral-smokey-grey lg:text-sm lg:tracking-[0.21875rem]"
      >
        {label}
      </label>
      <Input id={id} type={type} placeholder={placeholder} />
    </div>
  )
}
