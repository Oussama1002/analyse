"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { CHART_COLORS } from "@/lib/constants/charts";

interface BarChartData {
  name: string;
  [key: string]: string | number;
}

interface CustomBarChartProps {
  data: BarChartData[];
  bars: { dataKey: string; name: string; color?: string }[];
  layout?: "horizontal" | "vertical";
  height?: number;
}

export function CustomBarChart({
  data,
  bars,
  layout = "vertical",
  height = 300,
}: CustomBarChartProps) {
  const isHorizontal = layout === "horizontal";

  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart
        data={data}
        layout={isHorizontal ? "vertical" : "horizontal"}
        margin={{ top: 5, right: 20, left: isHorizontal ? 80 : 10, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" className="stroke-zinc-200 dark:stroke-zinc-800" />
        {isHorizontal ? (
          <>
            <XAxis type="number" tick={{ fontSize: 12 }} />
            <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} width={75} />
          </>
        ) : (
          <>
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
          </>
        )}
        <Tooltip
          contentStyle={{
            backgroundColor: "var(--tooltip-bg, #fff)",
            border: "1px solid #e4e4e7",
            borderRadius: "8px",
          }}
        />
        <Legend />
        {bars.map((bar, index) => (
          <Bar
            key={bar.dataKey}
            dataKey={bar.dataKey}
            name={bar.name}
            fill={bar.color ?? CHART_COLORS[index % CHART_COLORS.length]}
            radius={[4, 4, 0, 0]}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}
