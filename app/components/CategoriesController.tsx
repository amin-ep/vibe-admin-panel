import clsx from "clsx";
import FormLabel from "./FormLabel";
import { categoriesArr } from "~/utils/constants";
import { useState } from "react";

import TrashButton from "./TrashButton";

function CategoriesController() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleButtonClick = (title: string) => {
    const categoryIsAdded = selectedCategories.includes(title);
    if (categoryIsAdded) {
      setSelectedCategories((c) => c.filter((el) => el !== title));
    } else {
      setSelectedCategories([...selectedCategories, title]);
    }
  };

  return (
    <div className={clsx("flex flex-col gap-1.5 md:gap-2")}>
      <input type="hidden" name="categories" value={selectedCategories} />
      <div className="flex items-center justify-between">
        <FormLabel label="Categories" />
        <TrashButton onClick={() => setSelectedCategories([])} />
      </div>
      <div
        className={clsx(
          "flex flex-row flex-wrap items-center justify-start gap-2",
        )}
      >
        {categoriesArr.map((category, index) => (
          <button
            className={clsx(
              "relative rounded-full border border-neutral-300 bg-transparent p-1.5 text-xs text-neutral-900 md:p-2 md:text-sm",
              "before:absolute before:inset-0 before:-z-1 before:w-full before:scale-0 before:content-around before:rounded-full before:bg-neutral-200 before:transition before:duration-300 hover:before:scale-[1]",
              "dark:border-neutral-800 dark:text-neutral-500 dark:before:bg-neutral-800",
            )}
            key={index}
            onClick={() => handleButtonClick(category.title)}
            type="button"
            {...(selectedCategories.includes(category.title) && {
              style: {
                borderColor: category.colorCode,
                backgroundColor: category.colorCode,
              },
            })}
          >
            {category.title}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CategoriesController;
