"use client";

import { CHART_COLORS } from "@/lib/constants/charts";

interface FunnelStep {
  name: string;
  value: number;
}

interface FunnelChartProps {
  data: FunnelStep[];
  height?: number;
}

export function FunnelChart({ data, height = 320 }: FunnelChartProps) {
  const maxValue = Math.max(...data.map((d) => d.value));

  const funnelData = data.map((step, index) => ({
    ...step,
    fill: CHART_COLORS[index % CHART_COLORS.length],
    widthPercent: (step.value / maxValue) * 100,
    conversionRate:
      index > 0
        ? ((step.value / data[index - 1].value) * 100).toFixed(1)
        : "100",
  }));

  return (
    <div className="space-y-3" style={{ minHeight: height }}>
      {funnelData.map((step, index) => (
        <div key={step.name} className="space-y-1">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">{step.name}</span>
            <span className="text-zinc-500 dark:text-zinc-400">
              {step.value.toLocaleString()}
              {index > 0 && (
                <span className="ml-2 text-xs text-indigo-600 dark:text-indigo-400">
                  ({step.conversionRate}%)
                </span>
              )}
            </span>
          </div>
          <div className="h-10 w-full rounded-lg bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
            <div
              className="h-full rounded-lg transition-all duration-500 flex items-center justify-center text-xs font-medium text-white"
              style={{
                width: `${step.widthPercent}%`,
                backgroundColor: step.fill,
                minWidth: step.value > 0 ? "60px" : "0",
              }}
            >
              {step.value > 0 && step.widthPercent > 15 && step.value}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
