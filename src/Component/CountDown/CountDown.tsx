// src/components/Countdown.tsx
import React, { useEffect, useState } from "react";
import { data } from "../../types/types";

interface CountdownProps {
  targetDate: Date;
}

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  function calculateTimeLeft(targetDate: Date) {
    const difference = targetDate.getTime() - new Date().getTime();
    const timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
    return timeLeft;
  }

  return (
    <div className="flex justify-center space-x-4 text-2xl md:text-4xl text-white">
      <div className="flex flex-col items-center">
        <span className="font-bold">{timeLeft.days}</span>
        <span>Days</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="font-bold">{timeLeft.hours}</span>
        <span>Hours</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="font-bold">{timeLeft.minutes}</span>
        <span>Minutes</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="font-bold">{timeLeft.seconds}</span>
        <span>Seconds</span>
      </div>
    </div>
  );
};

export default Countdown;
