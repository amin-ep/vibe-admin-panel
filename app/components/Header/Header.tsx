import { useState } from "react";
import { Link, useLocation, useParams } from "react-router";
import { useTheme } from "~/hooks/useTheme";
import UserAccountBtn from "./UserAccountBtn";

// icons
import BedtimeRoundedIcon from "@mui/icons-material/BedtimeRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import WbSunnyRoundedIcon from "@mui/icons-material/WbSunnyRounded";
import IconButton from "../IconLinkButton/IconLinkButton";
import ThemeDropdown from "./ThemeDropdown";
import Logo from "../Logo";

type Props = { openSidebar?: () => void };

export default function Header({ openSidebar }: Props) {
  const [themOptionsIsOpen, setThemeOptionsIsOpen] = useState<boolean>(false);
  const { theme, setThemeDark, setThemeLight, setThemeSystem } = useTheme();

  const location = useLocation();

  return (
    <header className="fixed top-0 right-0 left-0 z-10 flex h-16 items-center justify-between border-b border-neutral-200 bg-white px-1 md:h-18 md:px-3 dark:border-b dark:border-neutral-700 dark:bg-neutral-900">
      <div className="flex items-center gap-3">
        {location.pathname.split("/")[1] !== "account" && (
          <IconButton className="md:hidden" onClick={openSidebar}>
            <MenuRoundedIcon />
          </IconButton>
        )}
        <Logo />
      </div>
      <div className="flex items-center">
        <IconButton onClick={() => setThemeOptionsIsOpen(true)}>
          {theme === "dark" ? (
            <BedtimeRoundedIcon />
          ) : theme === "light" ? (
            <WbSunnyRoundedIcon />
          ) : (
            <SettingsRoundedIcon />
          )}
        </IconButton>

        <UserAccountBtn />
      </div>
      {themOptionsIsOpen && (
        <ThemeDropdown
          onClose={() => setThemeOptionsIsOpen(false)}
          setThemeDark={setThemeDark}
          setThemeLight={setThemeLight}
          setThemeSystem={setThemeSystem}
          theme={theme}
        />
      )}
    </header>
  );
}
