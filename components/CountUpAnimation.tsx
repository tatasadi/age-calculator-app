import React, { useState, useEffect } from "react"

const CountUpAnimation = ({
  end,
  duration,
}: {
  end: number
  duration: number
}) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    // The total duration of the animation.
    const totalDuration = duration || 1000
    // The difference between the end number and the start number.
    const diff = end - start

    // If the end number is already reached, no need to start the animation.
    if (start === end) return

    // Calculate the time each increment will happen.
    const stepTime = Math.abs(Math.floor(totalDuration / diff))

    const timer = setInterval(() => {
      start += 1
      setCount(start)
      if (start === end) clearInterval(timer)
    }, stepTime)

    // Clear the interval on component unmount.
    return () => clearInterval(timer)
  }, [end, duration])

  return count
}

export default CountUpAnimation

// Example Usage
// <CountUpAnimation end={100} duration={5000} />
