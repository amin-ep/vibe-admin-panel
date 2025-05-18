import { useMediaQuery } from "@mui/material";
import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from "recharts";
import type { ActiveShape } from "recharts/types/util/types";

export type PieChartData = {
  name: string;
  value: number;
};
type Props = { data: PieChartData[] };

function MusicPieChart({ data }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const isXsmWindow = useMediaQuery("(min-width:425px)");
  const isSmWindow = useMediaQuery("(min-width:640px)");
  const isMdWindow = useMediaQuery("(min-width:768px)");
  const isLgWindow = useMediaQuery("(min-width:1024px)");

  const renderActiveShape = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  }: {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    startAngle: number;
    endAngle: number;
    fill: string;
    payload: { [k: string]: string };
    percent: number;
    value: number;
  }) => {
    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {payload.value}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
      </g>
    );
  };

  const pieChartAdvantages = isLgWindow
    ? 210
    : isMdWindow
      ? 190
      : isSmWindow
        ? 180
        : isXsmWindow
          ? 170
          : 150;

  const colors: string[] = [
    "#4F46E5",
    "#10B981",
    "#F59E0B",
    "#EC4899",
    "#3B82F6",
    "#8B5CF6",
    "#F43F5E",
  ];

  return (
    <div className="flex items-center justify-start">
      <PieChart width={pieChartAdvantages} height={pieChartAdvantages}>
        <Pie
          data={data}
          activeIndex={activeIndex}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={
            isLgWindow ? 90 : isMdWindow ? 80 : isXsmWindow ? 70 : 60
          }
          innerRadius={
            isLgWindow ? 35 : isMdWindow ? 30 : isXsmWindow ? 28 : 25
          }
          cornerRadius={5}
          dataKey="value"
          onMouseEnter={(_, index) => setActiveIndex(index)}
          activeShape={renderActiveShape as ActiveShape}
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={colors[index]} />
          ))}
        </Pie>
      </PieChart>
      <menu className="px-3">
        {data.map((item, index) => (
          <li
            className="flex flex-row items-center justify-start gap-1 sm:gap-2"
            key={item.name}
          >
            <span
              className={`aspect-square w-2 rounded-full sm:w-3`}
              style={{ background: colors[index] }}
            ></span>
            <p className="text-xs text-neutral-800 sm:text-sm dark:text-neutral-100">
              {item.name}
            </p>
          </li>
        ))}
      </menu>
    </div>
  );
}

export default MusicPieChart;
