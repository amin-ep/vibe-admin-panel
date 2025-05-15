import { FILE_BASE_URL } from "~/utils/constants";
import styles from "./HeaderSection.module.css";

type Props = { username: string; profileImg?: string };

function HeaderSection({ username, profileImg }: Props) {
  return (
    <div className={styles["header-section"]}>
      <div className="flex w-full items-center justify-center">
        <img
          src={
            profileImg
              ? `${FILE_BASE_URL}/${profileImg}`
              : "/artist-image-placeholder.png"
          }
          alt={username}
          className="aspect-square w-25 rounded-full object-cover sm:w-30 lg:w-35 xl:w-40"
        />
      </div>
      <h1 className="text-center text-xl text-neutral-900 sm:text-2xl md:text-3xl lg:text-4xl dark:text-white">
        {username}
      </h1>
    </div>
  );
}

export default HeaderSection;
