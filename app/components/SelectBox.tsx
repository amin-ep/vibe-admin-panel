import { useMemo, useState } from "react";
import { useOutsideClick } from "~/hooks/useOutsideClick";
import FormLabel from "./FormLabel";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import clsx from "clsx";

import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import FormErrorText from "./FormErrorText";
import TrashButton from "./TrashButton";

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
  wrapperClassName?: string;
  errorMessage?: string;
};

function SelectBox({
  items,
  placeholder,
  label,
  searchPlaceholder,
  selectMethod = "single",
  inputName,
  errorMessage,
  wrapperClassName,
}: Props) {
  const valueInitialState = () => {
    return selectMethod === "multiple" ? [] : "";
  };
  const [value, setValue] = useState<string | string[]>(valueInitialState);
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

  const handleRemoveValue = (val: string) => {
    const valuesArr = value as string[];
    setValue(valuesArr.filter((v) => v !== val));
  };

  const handleClickItem = (val: string) => {
    if (selectMethod === "single") {
      setValue(val);
      setMenuIsOpen(false);
    } else {
      const valuesArr = value as string[];
      if (valuesArr) {
        if (valuesArr.includes(val)) {
          handleRemoveValue(val);
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
    <div
      className={clsx("z-4 flex flex-col gap-1.5 md:gap-2", wrapperClassName)}
    >
      <input type="hidden" name={inputName} value={value as string} />
      <div className="flex items-center justify-between">
        {label && <FormLabel label={label} />}
        <TrashButton onClick={() => setValue(valueInitialState)} />
      </div>
      <div className="relative bg-white dark:bg-neutral-900">
        {/* Select Button */}
        <button
          type="button"
          className="flex w-full items-center justify-between rounded-lg border border-neutral-300 p-2 text-xs text-neutral-900 md:p-3 md:text-sm dark:border-neutral-700 dark:text-neutral-200 dark:ring-neutral-900"
          onClick={() => setMenuIsOpen(true)}
        >
          <span className="flex flex-row gap-1 overflow-hidden whitespace-nowrap">
            {value.length === 0
              ? placeholder
              : selectMethod === "multiple"
                ? (value as string[]).map((val) => (
                    <span
                      key={val}
                      className="flex flex-row items-center justify-between gap-1 rounded-md bg-blue-100 px-1 py-0.5 dark:bg-blue-950"
                    >
                      <span>{val}</span>
                      <span
                        onClick={() => handleRemoveValue(val)}
                        className="text-neutral-900 dark:text-neutral-100"
                      >
                        <CloseRoundedIcon fontSize="small" />
                      </span>
                    </span>
                  ))
                : value}
          </span>

          <KeyboardArrowDownRoundedIcon
            className={clsx(
              "w-4 !transition md:w-4.5",
              menuIsOpen ? "rotate-180" : "",
            )}
          />
        </button>

        {menuIsOpen && (
          <div
            ref={ref as React.RefObject<HTMLDivElement | null>}
            className="absolute top-10 z-1 flex w-full flex-col gap-1.5 bg-white md:top-14 md:gap-2.5 dark:bg-neutral-900"
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
            <div className="flex max-h-42.5 flex-col overflow-auto rounded-lg border border-neutral-300 bg-white md:max-h-45 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200">
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
                        className="aspect-square w-4.5 rounded-sm md:w-6.5"
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
      {errorMessage && <FormErrorText>{errorMessage}</FormErrorText>}
    </div>
  );
}

export default SelectBox;
