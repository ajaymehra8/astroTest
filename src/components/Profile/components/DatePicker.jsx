"use client";

import React, { useEffect, useRef } from "react";
import flatpickr from "flatpickr";
import { Calendar } from "lucide-react";
import "flatpickr/dist/themes/material_blue.css";

const DatePickerFlatpickr = ({ id, value, onChange }) => {
  const inputRef = useRef(null);
  const calendarIconRef = useRef(null);
  const fpRef = useRef(null); // 👈 store flatpickr instance

  useEffect(() => {
    if (!inputRef.current) return;

    fpRef.current = flatpickr(inputRef.current, {
      dateFormat: "Y-m-d",
      defaultDate: value || null,
      minDate: "1940-01-01",
      maxDate: "2025-12-31",
      disableMobile: true,
      onChange: (selectedDates) => {
        const formatted = selectedDates[0]
          ? selectedDates[0].toLocaleDateString("en-CA") // gives yyyy-mm-dd
          : "";

        onChange(formatted);
      },
    });

    const handleIconClick = () => {
      if (fpRef.current && typeof fpRef.current.open === "function") {
        fpRef.current.open();
      }
    };

    calendarIconRef.current?.addEventListener("click", handleIconClick);

    return () => {
      fpRef.current?.destroy();
      calendarIconRef.current?.removeEventListener("click", handleIconClick);
    };
  }, [value, onChange]);

  return (
    <div className="relative w-full">
      <input
        ref={inputRef}
        id={id}
        type="text"
        defaultValue={value}
        className="mt-1 block w-full rounded-[8px] bg-[#F9F4FD] sm:text-sm text-[#646464] font-roboto text-[14px] px-[12px] py-[10px] pr-10 border border-[#ccc] focus:outline-none focus:ring-0 focus:border-none"
      />

      <span
        ref={calendarIconRef}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 rounded-full p-1 cursor-pointer transition"
      >
        <Calendar size={22} className="text-[#7F449E]" />
      </span>
    </div>
  );
};

export default DatePickerFlatpickr;
