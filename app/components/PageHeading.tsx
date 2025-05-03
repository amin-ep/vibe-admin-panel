import React from "react";

type Props = { children?: React.ReactNode; title: string };

function PageHeading({ children, title }: Props) {
  return (
    <div className="mb-3 flex w-full items-center justify-between sm:mb-4 md:mb-5">
      <h1 className="text-2xl text-neutral-900 sm:text-3xl dark:text-neutral-200">
        {title}
      </h1>
      <>{children}</>
    </div>
  );
}

export default PageHeading;
