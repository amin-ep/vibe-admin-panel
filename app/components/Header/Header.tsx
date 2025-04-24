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

  return (
    <header className="h-16 md:h-18 bg-white border-b border-gray-200 flex justify-between items-center px-1 md:px-3">
      <div className="flex  flex-row items-center gap-3">
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
          className="top-16.5 right-9 after:right-15.5 md:after:right-19.5 md:top-17"
        >
          <DropdownMenu.Row>
            <DropdownMenu.RowButton
              onClick={setThemeDark}
              className={clsx(
                "flex flex-row justify-start items-center",
                theme === "dark" && "text-cyan-600"
              )}
            >
              <span>Dark</span>
            </DropdownMenu.RowButton>
            <DropdownMenu.RowButton
              onClick={setThemeLight}
              className={clsx(
                "flex flex-row justify-start items-center",
                theme === "light" && "text-cyan-600"
              )}
            >
              <span>Light</span>
            </DropdownMenu.RowButton>
            <DropdownMenu.RowButton
              onClick={setThemeSystem}
              className={clsx(
                "flex flex-row justify-start items-center",
                theme === "system" && "text-cyan-600"
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
