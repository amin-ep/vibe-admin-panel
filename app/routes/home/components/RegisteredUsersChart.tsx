import { useMediaQuery } from "@mui/material";
import clsx from "clsx";
import moment from "moment";
import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import BorderedWrapper from "~/components/BorderedWrapper";

type Props = { users: IUser[]; className?: string };

type RegisteredData = { month: string; registered: number };

function RegisteredUsersChart({ users, className }: Props) {
  const [registeredData, setRegisteredData] = useState<RegisteredData[]>([]);

  const isXsmWindow = useMediaQuery("(min-width:425px)");
  const isSmWindow = useMediaQuery("(min-width:640px)");
  const isMdWindow = useMediaQuery("(min-width:768px)");
  const isLgWindow = useMediaQuery("(min-width:1024px)");
  const isXlWindow = useMediaQuery("(min-width:1280px)");

  useEffect(() => {
    if (users) {
      let months: string[] = [];
      for (let i = 0; months.length !== 6; i++) {
        const month = moment().subtract(i, "months").format("MMM");
        months.unshift(month);
      }
      const updatedRegisteredData: RegisteredData[] = months.map((month) => {
        return {
          month,
          registered:
            users.filter((usr) => moment(usr.createdAt).format("MMM") == month)
              .length ?? 0,
        };
      });
      setRegisteredData(updatedRegisteredData);
    }
  }, [users]);

  return (
    <BorderedWrapper className={clsx("p-3", className)}>
      <h3 className="text-base text-neutral-900 md:text-lg dark:text-neutral-100">
        Registered Users
      </h3>
      <div className="flex items-center justify-center">
        <LineChart
          className="mt-3"
          width={
            isXlWindow
              ? 400
              : isLgWindow
                ? 320
                : isMdWindow
                  ? 600
                  : isSmWindow
                    ? 580
                    : isXsmWindow
                      ? 400
                      : 280
          }
          height={isMdWindow ? 180 : 156}
          data={registeredData}
          margin={{
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Line
            type="linear"
            dataKey="registered"
            stroke="oklch(62.3% 0.214 259.815)"
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </div>
    </BorderedWrapper>
  );
}

export default RegisteredUsersChart;
