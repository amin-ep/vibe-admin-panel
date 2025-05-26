import { useEffect, useState } from "react";
import Tabs from "~/components/Tabs";
import BorderedWrapper from "../../../../components/BorderedWrapper";
import MusicPieChart, { type PieChartData } from "./MusicPieChart";

type Props = { musicStats: IMusicStats };

function MusicChartTab({ musicStats }: Props) {
  const [perGenreData, setPerGenreData] = useState<PieChartData[]>([]);
  const [perCategoryData, setPerCategoryData] = useState<PieChartData[]>([]);

  useEffect(() => {
    if (musicStats) {
      const categoriesPerMusic: PieChartData[] = musicStats.musicsPerCategory
        .slice(0, 7)
        .map((category) => {
          return {
            name: category._id,
            value: category.count,
          };
        });

      const genresPerMusic: PieChartData[] = musicStats.musicsPerGenre
        .splice(0, 7)
        .map((genre, idx) => {
          return {
            name: genre._id,
            value: genre.count,
          };
        });
      setPerCategoryData(categoriesPerMusic);
      setPerGenreData(genresPerMusic);
    }
  }, [musicStats]);

  return (
    <div>
      <Tabs>
        <Tabs.TabHead>
          <Tabs.TabItem label="Musics Per Genre" />
          <Tabs.TabItem label="Musics Per Category" />
        </Tabs.TabHead>
        <BorderedWrapper className="mt-4 flex items-center justify-center p-2 sm:p-3 md:p-4 lg:p-5">
          <Tabs.Panel index={0}>
            <MusicPieChart data={perGenreData} />
          </Tabs.Panel>

          <Tabs.Panel index={1}>
            <MusicPieChart data={perCategoryData} />
          </Tabs.Panel>
        </BorderedWrapper>
      </Tabs>
    </div>
  );
}

export default MusicChartTab;
