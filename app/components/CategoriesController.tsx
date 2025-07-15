import clsx from "clsx";
import { useState } from "react";
import { categoriesArr } from "~/utils/constants";
import FormLabel from "./FormLabel";

import {
  Controller,
  type Control,
  type ControllerRenderProps,
  type Path,
  type RegisterOptions,
} from "react-hook-form";
import FormErrorText from "./FormErrorText";
import TrashButton from "./TrashButton";

type Props<T extends FormValues> = {
  wrapperClassName?: string;
  errorMessage?: string;
  defaultValue?: string[];
  control: Control<T>;
  rules: RegisterOptions<T>;
};

function CategoriesController<T extends FormValues>({
  wrapperClassName,
  errorMessage,
  defaultValue,
  control,
  rules,
}: Props<T>) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    defaultValue ?? [],
  );

  const handleButtonClick = (
    title: string,
    field: ControllerRenderProps<T>,
  ) => {
    const categoryIsAdded = selectedCategories.includes(title);
    if (categoryIsAdded) {
      setSelectedCategories((c) => c.filter((el) => el !== title));
      const filteredFieldValue = selectedCategories.filter((v) => v !== title);
      field.onChange(filteredFieldValue);
    } else {
      setSelectedCategories([...selectedCategories, title]);
      field.onChange([...selectedCategories, title]);
    }
  };

  return (
    <Controller
      name={"categories" as Path<T>}
      control={control}
      rules={rules}
      render={({ field }) => (
        <div
          className={clsx("flex flex-col gap-1.5 md:gap-2", wrapperClassName)}
        >
          <div className="flex h-6 items-center justify-between">
            <FormLabel label="Categories" />
            {selectedCategories.length > 0 && (
              <TrashButton
                onClick={() => {
                  setSelectedCategories([]);
                  field.onChange([]);
                }}
              />
            )}
          </div>
          <div
            className={clsx(
              "flex flex-row flex-wrap items-center justify-start gap-2",
            )}
          >
            {categoriesArr.sort().map((category, index) => (
              <button
                className={clsx(
                  "relative rounded-lg border border-neutral-300 bg-transparent p-0.5 text-xs text-neutral-900 md:p-1 md:text-sm",
                  "before:absolute before:inset-0 before:-z-1 before:w-full before:scale-0 before:content-around before:rounded-lg before:bg-neutral-200 before:transition before:duration-300 hover:before:scale-[1]",
                  "dark:border-neutral-800 dark:text-neutral-500 dark:before:bg-neutral-800",
                  "active:scale-[0.8]",
                )}
                key={index}
                onClick={() => handleButtonClick(category.title, field)}
                type="button"
                {...(selectedCategories.includes(category.title) && {
                  style: {
                    borderColor: category.bgColorCode,
                    backgroundColor: category.bgColorCode,
                    color: category.textColorCode,
                  },
                })}
              >
                {category.title}
              </button>
            ))}
          </div>
          {errorMessage && <FormErrorText>{errorMessage}</FormErrorText>}
        </div>
      )}
    />
  );
}

export default CategoriesController;
