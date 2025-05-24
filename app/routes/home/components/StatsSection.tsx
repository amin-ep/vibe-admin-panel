import InterpreterModeRoundedIcon from "@mui/icons-material/InterpreterModeRounded";
import LibraryMusicRoundedIcon from "@mui/icons-material/LibraryMusicRounded";
import MusicNoteRoundedIcon from "@mui/icons-material/MusicNoteRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import clsx from "clsx";
import StatsCard from "./StatsCard";
import styles from "./StatsSection.module.css";

type Props = {
  usersCount: number;
  albumsCount: number;
  musicsCount: number;
  artistsCount: number;
  className?: string;
};

function StatsSection({
  albumsCount,
  artistsCount,
  musicsCount,
  usersCount,
  className,
}: Props) {
  return (
    <section className={clsx(styles.section, className)}>
      <StatsCard
        count={musicsCount}
        icon={
          <MusicNoteRoundedIcon
            classes={{
              root: styles.icon,
            }}
            className="text-purple-600"
          />
        }
        title="Musics"
        className="border-purple-200 bg-purple-50 text-purple-600 dark:border-purple-800 dark:bg-purple-950 dark:text-purple-300"
        iconClassName="bg-purple-100"
      />
      <StatsCard
        count={albumsCount}
        icon={
          <LibraryMusicRoundedIcon
            classes={{
              root: styles.icon,
            }}
            className="text-amber-600"
          />
        }
        title="Albums"
        className="border-amber-200 bg-amber-50 text-amber-600 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-300"
        iconClassName="bg-amber-100"
      />
      <StatsCard
        count={usersCount}
        icon={
          <PersonRoundedIcon
            classes={{
              root: styles.icon,
            }}
            className="text-blue-400"
          />
        }
        title="Users"
        className="border-blue-200 bg-blue-50 text-blue-600 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300"
        iconClassName="bg-blue-100"
      />
      <StatsCard
        count={artistsCount}
        icon={
          <InterpreterModeRoundedIcon
            classes={{
              root: styles.icon,
            }}
            className="text-pink-600"
          />
        }
        title="Artists"
        className="border-pink-200 bg-pink-50 text-pink-600 dark:border-pink-800 dark:bg-pink-950 dark:text-pink-300"
        iconClassName="bg-pink-100"
      />
    </section>
  );
}

export default StatsSection;
