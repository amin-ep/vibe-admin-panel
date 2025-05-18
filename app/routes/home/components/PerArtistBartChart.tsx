import React, { useEffect, useState } from "react";
import { Bar, BarChart, Legend, XAxis, YAxis, Tooltip } from "recharts";
import BorderedWrapper from "../../../components/BorderedWrapper";
import { useMediaQuery } from "@mui/material";

type Props = { data: IMusicStats["musicsPerArtist"] };

type BarChartData = { name: string; musics: number };

function PerArtistBartChart({ data }: Props) {
  const [chartData, setChartData] = useState<BarChartData[]>([]);

  const isXsmWindow = useMediaQuery("(min-width:425px)");
  const isSmWindow = useMediaQuery("(min-width:640px)");
  const isMdWindow = useMediaQuery("(min-width:768px)");
  const isLgWindow = useMediaQuery("(min-width:1024px)");

  useEffect(() => {
    if (data) {
      const convertedChartData: BarChartData[] = data.map((item) => {
        return {
          name: item.name,
          musics: item.count,
        };
      });
      setChartData(convertedChartData);
    }
  }, [data]);

  function responsiveElementSize(
    onLgWindow: number,
    onMdWindow: number,
    onSmWindow: number,
    onXsmWindow: number,
    onMobileWindow: number,
  ) {
    const size = isLgWindow
      ? onLgWindow
      : isMdWindow
        ? onMdWindow
        : isSmWindow
          ? onSmWindow
          : isXsmWindow
            ? onXsmWindow
            : onMobileWindow;

    return size;
  }

  const chartHeight = responsiveElementSize(210, 190, 180, 250, 210);

  const chartWidth = responsiveElementSize(400, 300, 290, 400, 300);

  const barRadius = responsiveElementSize(6, 6, 6, 8, 5);
  return (
    <div>
      <header className="py-2.75">
        <h3 className="text-base text-neutral-900 md:text-lg dark:text-neutral-100">
          Musics Per Artist
        </h3>
      </header>

      <>
        <BorderedWrapper className="mt-4 flex items-center justify-center p-2 sm:p-3 md:p-4 lg:p-5">
          <BarChart
            width={chartWidth}
            height={chartHeight}
            data={chartData}
            margin={{
              top: 10,
              right: responsiveElementSize(15, 20, 26, 28, 35),
              left: responsiveElementSize(-15, -20, -26, -28, -35),
              bottom: responsiveElementSize(0, 0, 0, 0, -5),
            }}
            barSize={responsiveElementSize(28, 22, 20, 16, 15)}
          >
            <XAxis
              dataKey="name"
              scale="point"
              padding={{
                left: responsiveElementSize(16, 14, 13, 11, 9),
                right: responsiveElementSize(0, 0, 0, 0, 0),
              }}
            />
            <YAxis />
            <Tooltip />

            <Bar
              dataKey="musics"
              fill="oklch(62.3% 0.214 259.815)"
              radius={barRadius}
              className="fill-blue-500"
              background={{ radius: barRadius }}
            />
          </BarChart>
        </BorderedWrapper>
      </>
    </div>
  );
}

export default PerArtistBartChart;
