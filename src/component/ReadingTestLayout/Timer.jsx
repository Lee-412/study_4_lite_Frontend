"use client";
import React, { useState, useEffect } from "react";

export default function Timer({ initialSeconds, onTimeUp }) {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (seconds === 0) {
      onTimeUp();
      return;
    }

    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds, onTimeUp]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  return <p className="font-bold text-xl">{formatTime(seconds)}</p>;
}
