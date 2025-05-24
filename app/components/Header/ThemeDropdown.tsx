import clsx from "clsx";
import DropdownMenu from "../DropdownMenu";

type Props = {
  onClose: () => void;
  theme: Theme;
  setThemeDark: () => void;
  setThemeLight: () => void;
  setThemeSystem: () => void;
};

function ThemeDropdown({
  onClose,
  setThemeDark,
  theme,
  setThemeLight,
  setThemeSystem,
}: Props) {
  const onDropdownBtnClick = (action: () => void) => {
    action();
    onClose();
  };
  return (
    <DropdownMenu
      close={onClose}
      className="top-17 right-11.75 after:right-15.5 md:top-17 md:after:right-19.5"
    >
      <DropdownMenu.Row>
        <DropdownMenu.RowButton
          onClick={() => onDropdownBtnClick(setThemeDark)}
          className={clsx(
            "flex flex-row items-center justify-start",
            theme === "dark" && "text-blue-400",
          )}
        >
          <span>Dark</span>
        </DropdownMenu.RowButton>
        <DropdownMenu.RowButton
          onClick={() => onDropdownBtnClick(setThemeLight)}
          className={clsx(
            "flex flex-row items-center justify-start",
            theme === "light" && "text-blue-400",
          )}
        >
          <span>Light</span>
        </DropdownMenu.RowButton>
        <DropdownMenu.RowButton
          onClick={() => onDropdownBtnClick(setThemeSystem)}
          className={clsx(
            "flex flex-row items-center justify-start",
            theme === "system" && "text-blue-400",
          )}
        >
          <span>System</span>
        </DropdownMenu.RowButton>
      </DropdownMenu.Row>
    </DropdownMenu>
  );
}

export default ThemeDropdown;
