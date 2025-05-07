import styles from "./Nav.module.css";

// !ICONS
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import AlbumRoundedIcon from "@mui/icons-material/AlbumRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import InterpreterModeRoundedIcon from "@mui/icons-material/InterpreterModeRounded";
import LibraryMusicRoundedIcon from "@mui/icons-material/LibraryMusicRounded";
import MusicNoteRoundedIcon from "@mui/icons-material/MusicNoteRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
// import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

import { NavLink, useNavigation } from "react-router";

interface IItem {
  icon: React.ReactNode;
  title: string;
  href: string;
}

const navItems: IItem[] = [
  { icon: <HomeRoundedIcon fontSize="small" />, title: "Home", href: "/" },
  {
    icon: <MusicNoteRoundedIcon fontSize="small" />,
    title: "Music List",
    href: "/musics",
  },
  {
    icon: <AddRoundedIcon fontSize="small" />,
    title: "Add Music",
    href: "/new-music",
  },
  {
    icon: <PersonRoundedIcon fontSize="small" />,
    title: "Users",
    href: "/users",
  },
  {
    icon: <InterpreterModeRoundedIcon fontSize="small" />,
    title: "Artists",
    href: "/artists",
  },
  {
    icon: <LibraryMusicRoundedIcon fontSize="small" />,
    title: "Albums",
    href: "/albums",
  },
  {
    icon: <AlbumRoundedIcon fontSize="small" />,
    title: "Add Album",
    href: "/new-album",
  },
];

function Nav() {
  return (
    <nav className="flex flex-col">
      <ul className="flex flex-col gap-3">
        {navItems.map((item, index) => (
          <li key={index} className={styles["nav-item"]}>
            <NavLink
              className={({ isActive }) =>
                `${isActive ? styles.active : ""} after:bg-neutral-200 dark:after:bg-neutral-800`
              }
              to={item.href}
            >
              <span>{item.icon}</span>
              <span className="text-nowrap">{item.title}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Nav;
