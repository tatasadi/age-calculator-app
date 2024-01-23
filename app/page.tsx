import InputWithLabel from "@/components/InputWithLabel"
import Reference from "@/components/Reference"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import iconArrow from "@/public/images/icon-arrow.svg"

export default function Home() {
  return (
    <main className="flex h-full min-h-screen w-full max-w-7xl flex-col items-center px-4 pt-20 lg:min-h-0 lg:pt-32">
      <h1 className="hidden">Calculate Age App</h1>
      <div className="flex flex-col gap-8 rounded-3xl rounded-br-[6.25rem] bg-white px-6 py-12 lg:rounded-br-[12.5rem] lg:p-14">
        <form>
          <div className="flex gap-4 lg:gap-8">
            <InputWithLabel id="day" type="text" label="Day" placeholder="DD" />
            <InputWithLabel
              id="month"
              type="text"
              label="Month"
              placeholder="MM"
            />
            <InputWithLabel
              id="year"
              type="text"
              label="Year"
              placeholder="YYYY"
            />
          </div>
          <div className="relative flex justify-center border-b border-neutral-light-grey lg:justify-end">
            <Button type="submit" className="relative top-[2rem]">
              <Image src={iconArrow} alt="icon arrow" />
            </Button>
          </div>
        </form>
        <div className="mt-8">
          <h2 className="display-text">
            <span>38</span> years
          </h2>
          <h2 className="display-text">
            <span>3</span> month
          </h2>
          <h2 className="display-text">
            <span>26</span> days
          </h2>
        </div>
      </div>
      <Reference />
    </main>
  )
}
