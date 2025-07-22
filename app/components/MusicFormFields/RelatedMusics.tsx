import clsx from "clsx";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { FILE_BASE_URL } from "~/utils/constants";
import FormLabel from "../FormLabel";
import styles from "./RelatedMusics.module.css";

interface IProps<T extends FieldValues> {
  musics: IMusic[];
  className?: string;
  selectedMusicIds: string[];
  control: Control<T>;
}

function RelatedMusics<T extends FieldValues>({
  musics,
  className,
  selectedMusicIds,
  control,
}: IProps<T>) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedMusics, setSelectedMusics] = useState<string[]>([]);

  const searchedItems = useMemo(() => {
    if (searchTerm.length === 0) {
      return musics;
    } else {
      const filteredItems = musics.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      return filteredItems;
    }
  }, [musics, searchTerm]);

  function handleChangeSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
  }

  return (
    <Controller
      control={control}
      name={"relatedMusics" as Path<T>}
      render={({ field }) => {
        useEffect(() => {
          if (selectedMusicIds && selectedMusicIds.length > 0) {
            setSelectedMusics(selectedMusicIds);
            field.onChange(selectedMusicIds);
          }
        }, [selectedMusicIds]);

        function handleClickMovieCard(id: string) {
          const movieIsSelected = selectedMusics.includes(id);
          if (movieIsSelected) {
            const updatedSelectedMovies = selectedMusics.filter(
              (music) => music !== id,
            );
            setSelectedMusics(updatedSelectedMovies);
            field.onChange(updatedSelectedMovies);
          } else {
            setSelectedMusics([...selectedMusics, id]);
            field.onChange([...selectedMusics, id]);
          }
        }

        return (
          <div className={clsx(className, "flex flex-col gap-1.5 md:gap-2")}>
            <div className="flex items-center justify-start gap-1">
              <FormLabel label={"Related Musics"} />
              <motion.span
                key={selectedMusics.length}
                className="text-xs md:text-sm"
                initial={{
                  scale: 1,
                }}
                animate={{
                  scale: [1, 1.4, 0.9, 1.1, 1],
                }}
                transition={{
                  duration: 0.3,
                  bounce: 1.5,
                }}
              >
                ({selectedMusics.length})
              </motion.span>
            </div>
            <section>
              <input
                onChange={handleChangeSearch}
                type="search"
                className="input"
                placeholder="Search music"
              />
            </section>
            <div
              className={clsx(
                "grid max-h-132 w-full grid-cols-2 gap-2 overflow-y-auto p-2 sm:grid-cols-4 sm:gap-4 lg:max-h-148 lg:grid-cols-5 lg:p-4",
              )}
            >
              {searchedItems.map((music) => (
                <motion.div
                  key={music._id}
                  className={clsx(
                    "h-64 cursor-pointer overflow-hidden rounded-lg border lg:h-70",
                    selectedMusics.includes(music._id)
                      ? "border-blue-500 bg-blue-500/10 dark:bg-blue-950/10"
                      : "border-neutral-300 dark:border-neutral-700",
                    styles.card,
                  )}
                  whileHover={{
                    scale: 1.05,
                  }}
                  whileTap={{
                    scale: 0.95,
                  }}
                  onClick={() => handleClickMovieCard(music._id)}
                >
                  <img
                    src={`${FILE_BASE_URL}/${music.coverImageUrl}`}
                    alt={music.name}
                    className="aspect-square w-full rounded-t-lg"
                  />
                  <article className="mt-2 p-2">
                    <h2
                      className={clsx(
                        "mb-1 font-semibold",
                        selectedMusics.includes(music._id)
                          ? "text-blue-500"
                          : "text-neutral-900 dark:text-neutral-100",
                      )}
                    >
                      {music.name}
                    </h2>
                    <p className="overflow-hidden text-sm text-neutral-600 italic dark:text-neutral-500">
                      {music.artists.length === 0
                        ? music.artists.map((artist) => artist.name)
                        : music.artists.map((artist) => artist.name).join(", ")}
                    </p>
                  </article>
                </motion.div>
              ))}
            </div>
          </div>
        );
      }}
    />
  );
}

export default RelatedMusics;
