"use client";

import { Combobox } from "@headlessui/react";
import { useEffect, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

export default function StateDropdown({ options = [], selected, setSelected }) {
  const [query, setQuery] = useState("");

  const filteredOptions =
    query === ""
      ? options
      : options.filter((option) =>
          option.name.toLowerCase().includes(query.toLowerCase())
        );

  return (
    <div className="mt-2 w-fit">
      <Combobox value={selected} onChange={setSelected}>
        <div className="relative">
          <div className="relative flex w-full items-start rounded-md border border-[#67308c] px-4 py-2">
            <Combobox.Input
              className="flex-1 border-none bg-transparent text-sm focus:outline-none focus:ring-0"
              displayValue={(option) => option?.name || ""}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={selected ? selected : "Select your state"}
            />
            <Combobox.Button
              onClick={() => {
                setQuery("");
              }}
            >
              <ChevronDown
                className="h-4 w-4 text-gray-400 ml-2"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md border border-[#67308c] bg-white py-1 text-base shadow-lg z-10">
            {filteredOptions.length === 0 ? (
              <div className="cursor-default select-none px-4 py-2 text-gray-500">
                No results found.
              </div>
            ) : (
              filteredOptions.map((option) => (
                <Combobox.Option
                  key={option.id}
                  value={option}
                  className={({ active }) =>
                    `relative cursor-pointer text-start select-none py-2 pl-10 pr-4 ${
                      active ? "bg-[#67308c] text-white" : "text-gray-900"
                    }`
                  }
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {option.name}
                      </span>
                      {selected && (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? "text-white" : "text-[#67308c]"
                          }`}
                        >
                          <Check className="h-4 w-4" aria-hidden="true" />
                        </span>
                      )}
                    </>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </div>
      </Combobox>
    </div>
  );
}
