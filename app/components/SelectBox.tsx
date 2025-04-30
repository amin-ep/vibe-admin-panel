import { useEffect, useMemo, useState } from "react";
import FormLabel from "./FormLabel";
import { useOutsideClick } from "~/hooks/useOutsideClick";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import clsx from "clsx";

import CheckRoundedIcon from "@mui/icons-material/CheckRounded";

export interface ISelectItem {
  imageUrl: string;
  title: string;
}

type Props = {
  items: ISelectItem[];
  placeholder: string;
  label?: string;
  searchPlaceholder: string;
  selectMethod?: "single" | "multiple";
  inputName: string;
};

function SelectBox({
  items,
  placeholder,
  label,
  searchPlaceholder,
  selectMethod = "single",
  inputName,
}: Props) {
  const [value, setValue] = useState<string | null | string[]>(null);
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const ref = useOutsideClick(() => setMenuIsOpen(false));

  const searchedItems = useMemo(() => {
    if (searchTerm.length === 0) {
      return items;
    } else {
      const filteredItems = items.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      return filteredItems;
    }
  }, [items, searchTerm]);

  const handleClickItem = (val: string) => {
    if (selectMethod === "single") {
      setValue(val);
      setMenuIsOpen(false);
    } else {
      const valuesArr = value as string[];
      if (valuesArr) {
        if (valuesArr.includes(val)) {
          setValue(valuesArr.filter((v) => v !== val));
        } else {
          setValue([...(valuesArr as string[]), val]);
        }
      } else {
        setValue([val]);
      }
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="z-4 flex flex-col gap-1.5 md:gap-2">
      <input type="hidden" name={inputName} value={value as string} />
      {label && <FormLabel label={label} />}
      <div className="relative bg-white dark:bg-neutral-900">
        {/* Select Button */}
        <button
          type="button"
          className="flex w-full items-center justify-between rounded-lg border border-neutral-300 p-2 text-xs text-neutral-900 md:p-3 md:text-sm dark:border-neutral-700 dark:text-neutral-200 dark:ring-neutral-900"
          onClick={() => setMenuIsOpen(true)}
        >
          <span className="overflow-hidden whitespace-nowrap">
            {typeof value === "string"
              ? value
              : (value as string[])
                ? value?.join(", ")
                : value === null && placeholder}
          </span>
          <img
            src="/icons/arrow-down.svg"
            alt="arrow-down"
            className={clsx(
              "w-4 transition md:w-4.5",
              menuIsOpen ? "rotate-180" : "",
            )}
          />
        </button>

        {menuIsOpen && (
          <div
            ref={ref as React.RefObject<HTMLDivElement | null>}
            className="absolute top-10 flex w-full flex-col gap-1.5 bg-white md:top-14 md:gap-2.5 dark:bg-neutral-900"
          >
            {/* Search input */}
            <div className="relative">
              <input
                type="search"
                className="input"
                placeholder={searchPlaceholder}
                onChange={handleSearchChange}
                value={searchTerm}
              />
              <span className="absolute top-0.75 right-2 text-neutral-400 md:top-2.25 md:right-4">
                <SearchRoundedIcon fontSize="small" />
              </span>
            </div>
            {/* Items wrapper */}
            <div className="flex max-h-42.5 flex-col rounded-lg border border-neutral-300 bg-white md:max-h-45 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200">
              {searchedItems.map((item, index) => (
                <button
                  className={clsx(
                    "flex items-center justify-between text-xs hover:bg-neutral-200 md:text-sm dark:hover:bg-neutral-800",
                    index === 0 && "rounded-t-lg",
                    index === items.length - 1 && "rounded-b-lg",
                  )}
                  key={index}
                  type="button"
                  onClick={() => handleClickItem(item.title)}
                >
                  <div className="flex items-center justify-start gap-2 p-2">
                    {item.imageUrl && (
                      <img
                        className="aspect-square w-4.5"
                        src={item.imageUrl}
                        alt={item.title + " icon"}
                      />
                    )}
                    <span>{item.title}</span>
                  </div>
                  {value &&
                    ((value as string) === item.title ||
                      (value as string[]).includes(item.title)) && (
                      <span className="px-3 text-blue-500 dark:text-blue-400">
                        <CheckRoundedIcon fontSize="small" />
                      </span>
                    )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SelectBox;
