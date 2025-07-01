import FavoriteIcon from "@mui/icons-material/Favorite";
import clsx from "clsx";
import BorderedWrapper from "~/components/BorderedWrapper";
import { FILE_BASE_URL } from "~/utils/constants";
import { textExpander } from "~/utils/helpers";

type Props = { heading: string; data: IMusic[] | IAlbum[]; className?: string };

function PopularList({ heading, data, className }: Props) {
  return (
    <BorderedWrapper className={clsx("p-3", className)}>
      <h3 className="text-base text-neutral-900 md:text-lg dark:text-neutral-100">
        {heading}
      </h3>
      <ul className="mt-4 flex flex-col gap-3">
        {data
          .sort((a, b) => b.likeQuantity - a.likeQuantity)
          .slice(0, 3)
          .map((item) => (
            <li
              key={item._id}
              className="flex flex-row items-center justify-between"
            >
              <div className="flex items-center gap-3 text-nowrap">
                <img
                  src={`${FILE_BASE_URL}/${item.coverImageUrl}`}
                  alt={item.name}
                  className="aspect-square w-11 rounded-lg object-cover md:w-13"
                />
                <div className="w-full">
                  <h4 className="overflow-hidden text-sm font-semibold text-neutral-900 dark:text-neutral-50">
                    {textExpander(item.name, 20)}
                  </h4>
                  <p className="mt-0.5 text-xs text-neutral-700 italic dark:text-neutral-400">
                    {item.artists.map((artist) => artist.name)}
                  </p>
                </div>
              </div>
              <span className="flex items-center gap-1 text-neutral-700 dark:text-neutral-400">
                <FavoriteIcon className="!h-3 !w-3" />
                <p className="text-xs">{item.likeQuantity}</p>
              </span>
            </li>
          ))}
      </ul>
    </BorderedWrapper>
  );
}

export default PopularList;
