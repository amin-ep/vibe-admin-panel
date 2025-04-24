import { useMediaQuery } from "@mui/material";
import clsx from "clsx";
import { useState } from "react";
import { Link } from "react-router";
import { useAuth } from "~/context/AuthContext";
import { useOutsideClick } from "~/hooks/useOutsideClick";
import { FILE_BASE_URL } from "~/utils/constants";
import DropdownMenu from "../DropdownMenu";

export default function UserAccountBtn() {
  const [optionsIsOpen, setOptionsIsOpen] = useState(false);
  const { userdata, logout } = useAuth();

  const imageClasses = "w-9 aspect-square rounded-full md:w-11";

  return (
    <>
      <button
        onClick={() => setOptionsIsOpen(true)}
        className={clsx("flex items-center justify-between gap-2 px-3")}
      >
        {userdata?.imageUrl ? (
          <img
            className={clsx("object-cover", imageClasses)}
            src={`${FILE_BASE_URL}/${userdata?.imageUrl}`}
            alt="user"
          />
        ) : (
          <span
            className={clsx(
              imageClasses,
              "bg-gradient-to-br from-blue-500 to-cyan-300 flex items-center justify-center text-white"
            )}
          >
            {userdata?.firstName.at(0) ?? userdata?.username.at(0)}
          </span>
        )}
        <span
          className={clsx(
            "transition",
            optionsIsOpen ? "rotate-180" : "rotate-0"
          )}
        >
          <img src="/icons/arrow-down.svg" alt="arrow-down" className="w-3.5" />
        </span>
      </button>
      {optionsIsOpen && (
        <DropdownMenu
          className="right-3 top-15 md:top-17 md:after:right-12.5 after:right-9.5"
          close={() => setOptionsIsOpen(false)}
        >
          <DropdownMenu.Row className="border-b border-stone-300 dark:border-stone-700">
            <DropdownMenu.RowSpan className="text-stone-900 dark:text-stone-100">
              {userdata?.firstName ?? userdata?.username}
            </DropdownMenu.RowSpan>
            <DropdownMenu.RowSpan className="capitalize">
              {userdata?.role}
            </DropdownMenu.RowSpan>
          </DropdownMenu.Row>
          <DropdownMenu.Row>
            <DropdownMenu.RowLink to="/account">
              My Profile
            </DropdownMenu.RowLink>
            <DropdownMenu.RowButton onClick={logout}>
              Logout
            </DropdownMenu.RowButton>
          </DropdownMenu.Row>
        </DropdownMenu>
      )}
    </>
  );
}
