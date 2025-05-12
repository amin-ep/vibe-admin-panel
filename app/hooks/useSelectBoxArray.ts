import { useEffect, useState } from "react";
import type { ISelectItem } from "~/components/SelectBox/SelectBox";
import { FILE_BASE_URL } from "~/utils/constants";

export function useSelectBoxArray(data: IArtist[] | IMusic[]) {
  const [dataArr, setDataArr] = useState<ISelectItem[]>([]);

  useEffect(() => {
    if (data) {
      let artistsSelectItems: ISelectItem[] = [];
      data.map((el, index) => {
        artistsSelectItems[index] = {
          title: el.name,
          imageUrl:
            (el as IArtist).imageUrl || (el as IMusic).coverImageUrl
              ? `${FILE_BASE_URL}/${(el as IArtist).imageUrl || (el as IMusic).coverImageUrl}`
              : "/artist-image-placeholder.png",
        };
      });
      setDataArr(artistsSelectItems);
    }
  }, [data]);

  return dataArr;
}
