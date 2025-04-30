import { Link } from "react-router";
import { useTheme } from "~/hooks/useTheme";
import HeaderTooltip from "./HeaderTooltip";
import UserAccountBtn from "./UserAccountBtn";
import DropdownMenu from "../DropdownMenu";
import clsx from "clsx";
import { useState } from "react";

// icons
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import WbSunnyRoundedIcon from "@mui/icons-material/WbSunnyRounded";
import BedtimeRoundedIcon from "@mui/icons-material/BedtimeRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import IconButton from "./IconButton";

type Props = { openSidebar: () => void };

export default function Header({ openSidebar }: Props) {
  const [themOptionsIsOpen, setThemeOptionsIsOpen] = useState<boolean>(false);
  const { theme, setThemeDark, setThemeLight, setThemeSystem } = useTheme();

  const onDropdownBtnClick = (action: () => void) => {
    action();
    setThemeOptionsIsOpen(false);
  };

  return (
    <header className="fixed top-0 right-0 left-0 z-10 flex h-16 items-center justify-between border-b border-neutral-200 bg-white px-1 md:h-18 md:px-3 dark:border-b dark:border-neutral-700 dark:bg-neutral-900">
      <div className="flex flex-row items-center gap-3">
        <IconButton className="md:hidden" onClick={openSidebar}>
          <MenuRoundedIcon />
        </IconButton>
        <Link to="/">
          <img src="logo-horizontal.png" alt="logo" className="w-20" />
        </Link>
      </div>
      <div className="flex items-center">
        <HeaderTooltip
          onClick={() => setThemeOptionsIsOpen(true)}
          title={theme}
        >
          {theme === "dark" ? (
            <BedtimeRoundedIcon />
          ) : theme === "light" ? (
            <WbSunnyRoundedIcon />
          ) : (
            <SettingsRoundedIcon />
          )}
        </HeaderTooltip>

        <UserAccountBtn />
      </div>
      {themOptionsIsOpen && (
        <DropdownMenu
          close={() => setThemeOptionsIsOpen(false)}
          className="top-16.5 right-9 after:right-15.5 md:top-17 md:after:right-19.5"
        >
          <DropdownMenu.Row>
            <DropdownMenu.RowButton
              onClick={() => onDropdownBtnClick(setThemeDark)}
              className={clsx(
                "flex flex-row items-center justify-start",
                theme === "dark" && "text-blue-600",
              )}
            >
              <span>Dark</span>
            </DropdownMenu.RowButton>
            <DropdownMenu.RowButton
              onClick={() => onDropdownBtnClick(setThemeLight)}
              className={clsx(
                "flex flex-row items-center justify-start",
                theme === "light" && "text-blue-600",
              )}
            >
              <span>Light</span>
            </DropdownMenu.RowButton>
            <DropdownMenu.RowButton
              onClick={() => onDropdownBtnClick(setThemeSystem)}
              className={clsx(
                "flex flex-row items-center justify-start",
                theme === "system" && "text-blue-600",
              )}
            >
              <span>System</span>
            </DropdownMenu.RowButton>
          </DropdownMenu.Row>
        </DropdownMenu>
      )}
    </header>
  );
}
