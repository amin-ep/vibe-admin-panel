import { useMediaQuery } from "@mui/material";
import clsx from "clsx";
import Overlay from "~/components/Overlay/Overlay";
import Nav from "./Nav";
import styles from "./Sidebar.module.css";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function Sidebar({ isOpen, setIsOpen }: Props) {
  const isDesktopView = useMediaQuery("(min-width:768px)");

  const closeSidebar = () => setIsOpen(false);

  const onMouseOver = () => {
    if (isDesktopView) {
      setIsOpen(true);
    }
  };

  const onMouseLeave = () => {
    if (isDesktopView) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {!isDesktopView && (
        <Overlay id="sidebar-overlay" close={closeSidebar} isOpen={isOpen} />
      )}
      <aside
        className={clsx(
          "fixed top-0 bottom-0 left-0 z-11 h-screen w-80 -translate-x-84 overflow-y-auto border-r border-neutral-200 bg-white p-4 text-neutral-900 transition-all sm:w-84 md:top-18 md:w-20 md:translate-x-0 dark:border-neutral-700 dark:bg-neutral-900",
          !isDesktopView
            ? isOpen
              ? "translate-x-0"
              : ""
            : isOpen
              ? "md:w-60"
              : "",
          styles.aside,
        )}
        onMouseOver={onMouseOver}
        onMouseOut={onMouseLeave}
      >
        <div className="relative flex items-center justify-center md:hidden">
          <img src="/logo.png" alt="vibe" className="w-30" />
          <button
            className="absolute top-0 right-0 text-neutral-800 dark:text-white"
            onClick={() => setIsOpen(false)}
          >
            <CloseRoundedIcon />
          </button>
        </div>
        <Nav />
      </aside>
    </>
  );
}

export default Sidebar;
