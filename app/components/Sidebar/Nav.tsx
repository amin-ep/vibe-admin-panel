import styles from "./Nav.module.css";

// !ICONS
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import MusicNoteRoundedIcon from "@mui/icons-material/MusicNoteRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import InterpreterModeRoundedIcon from "@mui/icons-material/InterpreterModeRounded";
import LibraryMusicRoundedIcon from "@mui/icons-material/LibraryMusicRounded";
import AlbumRoundedIcon from "@mui/icons-material/AlbumRounded";
// import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import GroupAddRoundedIcon from "@mui/icons-material/GroupAddRounded";

import { NavLink } from "react-router";

interface IItem {
  icon: React.ReactNode;
  title: string;
  href: string;
}

const navItems: IItem[] = [
  { icon: <HomeRoundedIcon fontSize="medium" />, title: "Home", href: "/" },
  {
    icon: <MusicNoteRoundedIcon fontSize="medium" />,
    title: "Music List",
    href: "/musics",
  },
  {
    icon: <AddRoundedIcon fontSize="medium" />,
    title: "Add Music",
    href: "/new-music",
  },
  {
    icon: <PersonRoundedIcon fontSize="medium" />,
    title: "Users",
    href: "/users",
  },
  {
    icon: <InterpreterModeRoundedIcon fontSize="medium" />,
    title: "Artists",
    href: "/artists",
  },
  {
    icon: <GroupAddRoundedIcon fontSize="medium" />,
    title: "Add Artist",
    href: "/new-artist",
  },
  {
    icon: <LibraryMusicRoundedIcon fontSize="medium" />,
    title: "Albums",
    href: "/albums",
  },
  {
    icon: <AlbumRoundedIcon fontSize="medium" />,
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
              className={({ isActive }) => (isActive ? styles.active : "")}
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
